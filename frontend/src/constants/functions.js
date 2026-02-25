const sanitizeFileName = (raw) => {
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

    return {
      title: sanitizeFileName(title) || file.name.replace(/\.[^/.]+$/, ""), // fallback to filename
      artist: sanitizeFileName(artist) || "",
    };
  } catch {
    return {
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "",
    };
  }
};

async function ScanAudioFiles(directoryHandle) {
  const results = [];

  for await (const entry of WalkDirectory(directoryHandle)) {
    const ext = entry.name.split(".").pop().toLowerCase();
    if (!AUDIO_EXTENSIONS.includes(ext)) continue;

    const file = await entry.getFile();
    results.push(extractMetadata(file));
  }

  return results;
}

function formatMilliseconds(ms) {
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
  const [playlistFileHandle] = await window.showOpenFilePicker({
    types: [
      {
        description: "Playlist Files",
        accept: { "audio/x-mpegurl": [".m3u", ".m3u8"] },
      },
    ],
  });

  const playlistFile = await playlistFileHandle.getFile();

  const content = await playlistFile.text();
  const paths = parseM3U(content);
  const tracks = [];

  for (const relativePath of paths) {
    const file = getFileName(relativePath);
    tracks.push(file);
  }

  return [playlistFile.name, tracks];
};

export const pickAndFilterAudioFiles = async (allowedFileNames) => {
  // const allowedSet = new Set(allowedFileNames);

  const fileHandles = await window.showOpenFilePicker({
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

  const matchedFiles = [];
  for (const handle of fileHandles) {
    const file = await handle.getFile();

    if (allowedFileNames.includes(file.name)) {
      const metadata = await extractMetadata(file);
      matchedFiles.push(metadata);
    }
  }

  return matchedFiles;
};

export { sanitizeFileName, ScanAudioFiles, formatMilliseconds };
