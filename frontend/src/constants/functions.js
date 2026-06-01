export const sanitizeFileName = (raw) => {
  let cleaned = raw
    // Remove file extension
    .replace(/\.[^/.]+$/, "")
    // Remove common unwanted phrases (case-insensitive)
    .replace(/\b(download\s*from\s*\w+(\.com)?)\b/gi, "")
    .replace(/\b(www\.\w+(\.com)?)\b/gi, "")
    .replace(/\b(official\s*(music\s*)?video)\b/gi, "")
    .replace(/\b(audio)\b/gi, "")
    .replace(/\b(lyrics)\b/gi, "")
    .replace(/\b(hd|4k|1080p|720p|320kbps|128kbps|mp3|flac|wav|aac)\b/gi, "")
    .replace(/\b(ft\.?|feat\.?|featuring)\b/gi, "")
    .replace(/\b(remix|remastered|live|acoustic|instrumental)\b/gi, "")
    // Remove any word containing a domain (e.g., example.com, site.net)
    .replace(/\b\w+\.\w+\b/gi, "")
    // Remove brackets, parentheses, and their contents if they contain unwanted text
    .replace(
      /[$$].*?(official|video|audio|lyrics|download|www|hd|kbps).*?[$$]/gi,
      "",
    )
    // Replace remaining brackets/parentheses with spaces
    .replace(/[$$$$]/g, " ")
    // Replace underscores, hyphens, and multiple spaces with single spaces
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    // Remove leading/trailing numbers (e.g., track numbers like "01 - ")
    .replace(/^\d+\s*-\s*/, "")
    // Trim extra spaces
    .trim();

  return cleaned;
};

async function* WalkDirectory(dirHandle) {
  for await (const entry of dirHandle.values()) {
    if (entry.kind == "file") {
      yield entry;
    } else if (entry.kind == "directory") {
      yield* WalkDirectory(entry);
    }
  }
}

import * as mm from "music-metadata";
const AUDIO_EXTENSIONS = ["mp3", "wav", "flac", "ogg", "m4a"];
/**
 * Extract title + artist from a File object using music-metadata-browser
 */
const extractMetadata = async (file) => {
  try {
    const metadata = await mm.parseBlob(file);
    const { title, artist } = metadata.common;
    const fileName = file.name.replace(/\.[^/.]+$/, "");

    return {
      title: sanitizeFileName(title) ?? "",
      artist: sanitizeFileName(artist) ?? "",
      fileName: fileName,
    };
  } catch {
    return {
      title: null ?? "",
      artist: null ?? "",
      fileName: file.name.replace(/\.[^/.]+$/, ""),
    };
  }
};

export async function ScanAudioFiles(directoryHandle) {
  const results = [];

  for await (const entry of WalkDirectory(directoryHandle)) {
    const ext = entry.name.split(".").pop().toLowerCase();
    if (!AUDIO_EXTENSIONS.includes(ext)) continue;

    const file = await entry.getFile();
    const metaData = await extractMetadata(file);
    results.push(metaData);
  }

  return results;
}

// Feature detection: check if File System Access API is supported
const isFileSystemAccessSupported = () => {
  return typeof window !== "undefined" && "showDirectoryPicker" in window;
};

// Fallback: use webkitdirectory attribute
const pickDirectoryFallback = async () => {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.webkitdirectory = true;
    input.multiple = true;

    input.onchange = () => {
      resolve(Array.from(input.files));
    };

    input.click();
  });
};

export const handleDirectoryScan = async () => {
  try {
    let audioData;

    if (isFileSystemAccessSupported()) {
      // Use File System Access API if available
      const dir = await window.showDirectoryPicker();
      audioData = await ScanAudioFiles(dir);
    } else {
      // Fallback to webkitdirectory
      const files = await pickDirectoryFallback();
      audioData = [];

      for (const file of files) {
        const ext = file.name.split(".").pop().toLowerCase();
        if (!AUDIO_EXTENSIONS.includes(ext)) continue;

        const metaData = await extractMetadata(file);
        audioData.push(metaData);
      }
    }

    return audioData;
  } catch (err) {
    console.warn("Folder pick cancelled or failed: ", err);
  }
};

export function formatMilliseconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms / 1000) % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Parse an M3U file and return an array of relative file paths
 */
const parseM3U = (content) => {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
};

const getFileName = (path) => {
  return path.split(/[/\\]/).pop();
};

export const extractTracksFromPlaylist = async () => {
  try {
    let playlistFile;

    if (isFileSystemAccessSupported()) {
      const [playlistFileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Playlist Files",
            accept: { "audio/x-mpegurl": [".m3u", ".m3u8"] },
          },
        ],
      });
      playlistFile = await playlistFileHandle.getFile();
    } else {
      // Fallback for browsers without File System Access API
      playlistFile = await new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".m3u,.m3u8";
        input.onchange = () => {
          if (input.files[0]) resolve(input.files[0]);
        };
        input.click();
      });
    }

    const content = await playlistFile.text();
    const paths = parseM3U(content);
    const tracks = [];

    for (const relativePath of paths) {
      const file = getFileName(relativePath);
      tracks.push(file);
    }

    return [playlistFile.name, tracks];
  } catch (err) {
    console.warn("Playlist pick cancelled or failed: ", err);
    return ["", []];
  }
};

export const pickAndFilterAudioFiles = async (allowedFileNames) => {
  try {
    let fileHandles;

    if (isFileSystemAccessSupported()) {
      fileHandles = await window.showOpenFilePicker({
        multiple: true,
        types: [
          {
            description: "Audio Files",
            accept: {
              "audio/*": [".mp3", ".wav", ".flac", ".m4a", ".aac"],
            },
          },
        ],
      });
    } else {
      // Fallback for browsers without File System Access API
      const files = await new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.accept = ".mp3,.wav,.flac,.m4a,.aac";
        input.onchange = () => {
          resolve(Array.from(input.files));
        };
        input.click();
      });

      fileHandles = files;
    }

    const matchedFiles = [];
    for (const handle of fileHandles) {
      const file = handle instanceof File ? handle : await handle.getFile();

      if (allowedFileNames.includes(file.name)) {
        const metadata = await extractMetadata(file);
        matchedFiles.push(metadata);
      }
    }

    return matchedFiles;
  } catch (err) {
    console.warn("File pick cancelled or failed: ", err);
    return [];
  }
};
