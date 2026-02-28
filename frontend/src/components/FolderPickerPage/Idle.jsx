import { useState } from "react";
import { FolderOpen, FolderClosed, ListVideo, ListMusic } from "lucide-react";
import { toast } from "sonner";
import useTrackStore from "../../store/useTrackStore";
import useStep from "../../store/useStep";

import {
  extractTracksFromPlaylist,
  pickAndFilterAudioFiles,
  handleDirectoryScan,
} from "../../constants/functions";

const Idle = () => {
  const [importConfig, setImportConfig] = useState({
    loading: false,
    selectedPlaylist: "",
    importType: "folder",
    playlistTracks: [],
  });
  const setTracks = useTrackStore((state) => state.setTracks);
  const setStep = useStep((state) => state.setStep);

  const handleFolderSelection = async () => {
    const files = await handleDirectoryScan();
    setTracks(files);

    if (!files || files.length == 0) return;
    setImportConfig((prev) => ({ ...prev, loading: true }));
    setStep(2);
  };

  const handlePlaylistSelection = async () => {
    const [playlistName, audioFiles] = await extractTracksFromPlaylist();
    setImportConfig((prev) => ({
      ...prev,
      selectedPlaylist: playlistName,
      playlistTracks: audioFiles,
    }));

    toast.success("Uploaded playlist successfully!", {
      description: "Select songs from storage",
    });
  };

  const handlePlaylistSongsSelection = async () => {
    const allowedFiles = await pickAndFilterAudioFiles(
      importConfig.playlistTracks,
    );
    setTracks(allowedFiles);
    setImportConfig((prev) => ({ ...prev, loading: true }));
    if (importConfig.playlistTracks.length > 0) setStep(2);
  };

  return (
    <div className="relative">
      {/* Folder Upload / Playlist Upload Options */}
      <div className="bg-white/2 border-b border-white/20 p-5 rounded-t-2xl flex justify-center">
        <div className="flex bg-primary-dark p-1 rounded-2xl overflow-clip">
          <button
            onClick={() =>
              setImportConfig((prev) => ({ ...prev, importType: "folder" }))
            }
            className={`${importConfig.importType == "folder" ? "bg-btn-green text-black" : "text-white"} px-12 py-2 text-center flex items-center gap-2  transition-all duration-300 font-bold rounded-xl cursor-pointer`}
          >
            <FolderOpen className="lucide-icon" />
            Folder
          </button>
          <button
            onClick={() =>
              setImportConfig((prev) => ({ ...prev, importType: "playlist" }))
            }
            className={`${importConfig.importType == "playlist" ? "bg-btn-green text-black" : "text-white"} px-12 py-2 text-center flex items-center gap-2  transition-all duration-300 font-bold rounded-xl cursor-pointer`}
          >
            <ListMusic className="lucide-icon" />
            Playlist
          </button>
        </div>
      </div>

      {importConfig.importType == "folder" && (
        <div className="state animate__animated animate__zoomIn text-center py-12">
          <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
            <FolderOpen className="size-12 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
          </button>
          <h2 className="text-xl">Drag and drop your folder here</h2>

          <p className="text-dark-foreground mb-8">
            or click to browse your local storage
          </p>

          <button
            onClick={() => handleFolderSelection()}
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

      {importConfig.importType == "playlist" && (
        <div className="state animate__animated animate__zoomIn py-12">
          <div className="text-center">
            <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
              <ListMusic className="size-12 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
            </button>
            <h2 className="text-xl">Drag and drop your playlist here</h2>

            <p className="text-dark-foreground mb-8">
              or click to browse your local storage
            </p>

            <button
              onClick={handlePlaylistSelection}
              id="pickFolderBtn"
              className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow btn-primary hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full"
            >
              <ListVideo className="lucide-icon" />
              Select Playlist
            </button>

            {importConfig.selectedPlaylist && (
              <span className="block bg-primary-dark/40 mx-auto mt-8 py-4 rounded-sm text-dark-foreground font-bold">
                Selected Playlist: {importConfig.selectedPlaylist}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 mt-8">
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

          {/* Checks if playlist has been uploaded */}
          {importConfig.playlistTracks.length > 0 && (
            <div className="flex justify-center gap-4 mt-16 ml-auto">
              <button className="app-iconbox w-12 h-12 mb-8 rounded-xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
                <ListVideo className="size-6 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
              </button>

              <div>
                <h2 className="">Upload songs</h2>
                <p className="text-dark-foreground mb-8 text-sm">
                  <button
                    onClick={handlePlaylistSongsSelection}
                    className="text-btn-green hover:underline cursor-pointer"
                  >
                    click to browse
                  </button>{" "}
                  your local storage
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Idle;
