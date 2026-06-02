import { useState } from "react";
import {
  FolderOpen,
  ListVideo,
  FileMusic,
  ShieldCheck,
  CloudUpload,
} from "lucide-react";
import { toast } from "sonner";
import useTrackStore from "../../store/useTrackStore";
import useStep from "../../store/useStep";

import {
  extractTracksFromPlaylist,
  pickAndFilterAudioFiles,
  handleDirectoryScan,
} from "../../constants/functions";
import useAuth from "../../store/useAuth";

const Idle = () => {
  const [unlocked, setUnlocked] = useState(false);
  const { isAuthenticated } = useAuth();
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

  const guardedClick = (e, handler) => {
    if (!unlocked) {
      e.stopPropagation();
      toast.error("Connect spotify account", {
        description: "Please sync your spotify account",
      });
      return;
    }
    handler(e);
  };

  if (isAuthenticated) setUnlocked(true);

  return (
    <div className="relative rounded-3xl border border-white/8 bg-linear-to-b from-[#0d0e14] to-[#0a0b10] p-3 sm:p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
      {/* Folder Upload / Playlist Upload Options */}
      <div className="flex items-center justify-between p-1 rounded-full bg-black/40 border border-white/5 mb-3">
        <div className="flex items-center gap-1 p-1">
          <button
            onClick={() =>
              setImportConfig((prev) => ({ ...prev, importType: "folder" }))
            }
            className={`${importConfig.importType == "folder" ? "bg-[#1DB954] text-black shadow-[0_4px_14px_rgba(29,185,84,0.35)]" : "text-zinc-400  hover:text-white"} inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all`}
          >
            <FolderOpen className="lucide-icon" />
            Folder
          </button>
          <button
            onClick={() =>
              setImportConfig((prev) => ({ ...prev, importType: "playlist" }))
            }
            className={`${importConfig.importType == "playlist" ? "bg-btn-green text-black shadow-[0_4px_14px_rgba(29,185,84,0.35)]" : "text-zinc-400  hover:text-white"} inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all`}
          >
            <FileMusic className="lucide-icon" />
            Playlist
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 pr-3 text-[10px] font-mono-plex uppercase tracking-[0.2em] text-zinc-500">
          <ShieldCheck className="h-3.5 w-3.5 text-[#1DB954]" />
          Local only
        </div>
      </div>

      <div className="state animate__animated animate__zoomIn text-center py-12 relative rounded-2xl bg-[#06070b] p-6 sm:p-10 min-h-90">
        {importConfig.importType == "folder" && (
          <div className="relative beam-border rounded-2xl transition-colors border-white/10 px-6 pt-10 sm:pt-14 flex flex-col items-center text-center cursor-pointer group">
            <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
              <FolderOpen className="size-12 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
            </button>
            <h2 className="text-xl">Drag and drop your folder here</h2>

            <p className="text-dark-foreground mb-8">
              or click to browse your local storage
            </p>

            <button
              onClick={(e) => {
                guardedClick(e, () => handleFolderSelection());
              }}
              id="pickFolderBtn"
              className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow btn-primary hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full"
            >
              <CloudUpload className="lucide-icon" />
              Select Folder
            </button>
          </div>
        )}

        {importConfig.importType == "playlist" && (
          <div className="relative beam-border rounded-2xl transition-colors border-white/10 px-6 pt-10 sm:pt-14 flex flex-col items-center text-center cursor-pointer group">
            <div className="text-center">
              <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
                <FileMusic className="size-12 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
              </button>
              <h2 className="text-xl">Drag and drop your playlist here</h2>

              <p className="text-dark-foreground mb-8">
                or click to browse your local storage
              </p>

              <button
                onClick={(e) => {
                  guardedClick(e, () => handlePlaylistSelection());
                }}
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

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-mono-plex uppercase tracking-[0.18em] text-zinc-600">
          <span>.mp3</span>
          <span>.flac</span>
          <span>.wav</span>
          <span>.m4a</span>
          <span>.m3u</span>
          <span>.csv</span>
        </div>
      </div>
    </div>
  );
};

export default Idle;
