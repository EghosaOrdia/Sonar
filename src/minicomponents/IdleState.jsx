// JUMP TO LINE 20 TO VIEW COMPONENT
import React, { useEffect } from "react";
import * as mm from "music-metadata";
import { FolderOpen, FolderClosed } from "lucide-react";
import useTrackStore from "../store/useTrackStore";
import useStep from "../store/useStep";

async function* WalkDirectory(dirHandle) {
  for await (const entry of dirHandle.values()) {
    if (entry.kind == "file") {
      yield entry;
    } else if (entry.kind == "directory") {
      yield* WalkDirectory(entry);
    }
  }
}

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
      /[\$\$].*?(official|video|audio|lyrics|download|www|hd|kbps).*?[\$\$]/gi,
      "",
    )
    // Replace remaining brackets/parentheses with spaces
    .replace(/[\$\$\$\$]/g, " ")
    // Replace underscores, hyphens, and multiple spaces with single spaces
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    // Remove leading/trailing numbers (e.g., track numbers like "01 - ")
    .replace(/^\d+\s*-\s*/, "")
    // Trim extra spaces
    .trim();

  return cleaned;
};

const AUDIO_EXTENSIONS = ["mp3", "wav", "flac", "ogg", "m4a"];

async function ScanAudioFiles(directoryHandle) {
  const results = [];

  for await (const entry of WalkDirectory(directoryHandle)) {
    const ext = entry.name.split(".").pop().toLowerCase();
    if (!AUDIO_EXTENSIONS.includes(ext)) continue;

    const file = await entry.getFile();
    const metadata = await mm.parseBlob(file);
    results.push({
      fileName: sanitizeFileName(entry.name),
      size: file.size,
      duration: metadata.format.duration,
      artist: sanitizeFileName(metadata.common.artist),
      title: sanitizeFileName(metadata.common.title),
      album: metadata.common.album,
      year: metadata.common.year,
    });
  }

  return results;
}

const sendToServer = async (data) => {
  await fetch("/api/audio-metadata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

const handleScan = async () => {
  try {
    const dir = await window.showDirectoryPicker();
    const audioData = await ScanAudioFiles(dir);

    // await sendToServer(audioData);
    return audioData;
  } catch (err) {
    console.warn("Folder pick cancelled or failed: ", err);
  }
};

const IdleState = () => {
  const setStep = useStep((state) => state.setStep);
  const setTracks = useTrackStore((state) => state.setTracks);

  const Move = async () => {
    const files = await handleScan();

    if (!files || files.length == 0) return;
    setTracks(files);
    console.log(files);

    setStep(2);
  };

  return (
    <div className="state text-center py-12">
      <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 text-primary-green border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-[#1ED760]/50 transition-colors duration-300 cursor-pointer">
        <FolderOpen className="lucide-icon group-hover:scale-125 transition-all duration-300" />
      </button>

      <p className="text-dark-foreground mb-8">
        Click to select your music folder
      </p>

      <button
        onClick={() => Move()}
        id="pickFolderBtn"
        className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow btn-primary bg-[#1ED760] hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full"
      >
        <FolderClosed />
        Select Folder
      </button>
    </div>
  );
};

export default IdleState;
