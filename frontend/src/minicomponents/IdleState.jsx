import { FolderOpen, FolderClosed, ListVideo, ListMusic } from "lucide-react";
import useTrackStore from "../store/useTrackStore";
import useStep from "../store/useStep";
import {
  extractTracksFromPlaylist,
  pickAndFilterAudioFiles,
  ScanAudioFiles,
} from "../constants/functions";
import { useState } from "react";

const handleScan = async () => {
  try {
    const dir = await window.showDirectoryPicker();
    const audioData = await ScanAudioFiles(dir);
    return audioData;
  } catch (err) {
    console.warn("Folder pick cancelled or failed: ", err);
  }
};

const IdleState = () => {
  const [importType, setImportType] = useState("folder");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const setTracks = useTrackStore((state) => state.setTracks);
  const setStep = useStep((state) => state.setStep);

  const Move = async () => {
    const files = await handleScan();

    if (!files || files.length == 0) return;
    setTracks(files);
    setStep(2);
  };

  const PlayListMove = async () => {
    const audioFiles = await extractTracksFromPlaylist();
    setPlaylistTracks(audioFiles);
  };

  return (
    <div>
      <div className="bg-white/2 border-b border-white/20 p-5 flex justify-center">
        <div className="flex bg-primary-dark p-1 rounded-2xl overflow-clip">
          <button
            onClick={() => setImportType("folder")}
            className={`${importType == "folder" ? "bg-btn-green text-black" : "text-white"} px-12 py-2 text-center flex items-center gap-2  transition-all duration-300 font-bold rounded-xl cursor-pointer`}
          >
            <FolderOpen className="lucide-icon" />
            Folder
          </button>
          <button
            onClick={() => setImportType("playlist")}
            className={`${importType == "playlist" ? "bg-btn-green text-black" : "text-white"} px-12 py-2 text-center flex items-center gap-2  transition-all duration-300 font-bold rounded-xl cursor-pointer`}
          >
            <ListMusic className="lucide-icon" />
            Playlist
          </button>
        </div>
      </div>

      {importType == "folder" && (
        <div className="state animate__animated animate__zoomIn text-center py-12">
          <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
            <FolderOpen className="size-12 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
          </button>
          <h2 className="text-xl">Drag and drop your folder here</h2>

          <p className="text-dark-foreground mb-8">
            or click to browse your local storage
          </p>

          <button
            onClick={() => Move()}
            id="pickFolderBtn"
            className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow btn-primary hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full"
          >
            <FolderClosed className="lucide-icon" />
            Select Folder
          </button>

          <div className="flex flex-col items-center gap-4 mt-16">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-500 font-bold">
              Supported Audio Formats
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-slate-300 text-xs font-medium tracking-wide">
                .mp3
              </span>
              <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-slate-300 text-xs font-medium tracking-wide">
                .aac
              </span>
              <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-slate-300 text-xs font-medium tracking-wide">
                .wav
              </span>
            </div>
          </div>
        </div>
      )}

      {importType == "playlist" && (
        <div className="state animate__animated animate__zoomIn py-12">
          <div className="actions flex justify-center gap-8">
            <div className="flex gap-4">
              <button className="app-iconbox w-12 h-12 mb-8 rounded-xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
                <ListMusic className="size-6 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
              </button>
              <div>
                <h2 className="">Drag and drop your playlist here</h2>
                <p className="text-dark-foreground mb-8 text-sm">
                  or{" "}
                  <button
                    onClick={PlayListMove}
                    className="text-btn-green hover:underline cursor-pointer"
                  >
                    click to browse
                  </button>{" "}
                  your local storage
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="app-iconbox w-12 h-12 mb-8 rounded-xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
                <ListVideo className="size-6 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
              </button>
              <div>
                <h2 className="">Drag and drop your songs here</h2>
                <p className="text-dark-foreground mb-8 text-sm">
                  or{" "}
                  <button
                    onClick={async () => {
                      const allowedFiles =
                        await pickAndFilterAudioFiles(playlistTracks);
                      setPlaylistTracks(allowedFiles);
                      setTracks(allowedFiles);
                      setStep(2);
                    }}
                    className="text-btn-green hover:underline cursor-pointer"
                  >
                    click to browse
                  </button>{" "}
                  your local storage
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-500 font-bold">
              Supported Playlist Formats
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-slate-300 text-xs font-medium tracking-wide">
                .m3u
              </span>
              <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-slate-300 text-xs font-medium tracking-wide">
                .m3u8
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdleState;
