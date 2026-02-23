import { X, AudioLines, Redo, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { spotify } from "../constants/media";
import useTrackStore from "../store/useTrackStore";
import { BASE_URL } from "../constants/data";
import { useState } from "react";
import useStep from "../store/useStep";

const ConfigurePlaylist = ({ closeModal, setSyncState }) => {
  const setStep = useStep((state) => state.setStep);

  const { playlistName, setPlayListName, results, setPlaylistUrl } =
    useTrackStore();
  const validResults = results.filter((song) => song?.match);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChange = (input) => {
    setPlayListName(input.target.value);
  };

  const handlePlaylist = async () => {
    const sessionId = localStorage.getItem("spotify_session_id");
    setLoadingBtn(true);

    try {
      const playlistRes = await fetch(`${BASE_URL}/spotify/playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "session-id": sessionId,
        },
        body: JSON.stringify({
          name: playlistName,
          public: false,
        }),
      });
      if (!playlistRes.ok) {
        const err = playlistRes.json();
        toast.error("Failed to create playlist", {
          description: err.detail,
        });
        return;
      }

      const { playlist_id, playlist_url } = await playlistRes.json();
      setPlaylistUrl(playlist_url);

      toast.success("Playlist created!", {
        description: "Adding songs...",
      });

      const trackUris = results.map((r) => r.match?.uri).filter(Boolean);
      const addTracksRes = await fetch(`${BASE_URL}/spotify/playlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "session-id": sessionId,
        },
        body: JSON.stringify({
          playlist_id,
          track_uris: trackUris,
        }),
      });
      if (!addTracksRes.ok) {
        const err = await addTracksRes.json();
        toast.error("Playlist", {
          description: err.detail,
        });
        return;
      }

      toast.success("Songs created successfully");
      closeModal(false);
      setStep(4);
    } catch (err) {
      console.error("Something went wrong", err);
      toast.error("Something went wrong", { description: err.message });
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="text-center space-y-1 pb-8 font-family-sans">
      <div className="flex justify-end items-center">
        <button
          onClick={() => closeModal(false)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 transition-all duration-200 hover:bg-primary-dark/70 text-dark-foreground hover:text-white cursor-pointer"
        >
          <X className="lucide-icon" />
        </button>
      </div>
      <h2 className="text-center text-3xl font-medium">
        Configure Your Playlist
      </h2>
      <p className="text-dark-foreground mx-auto">
        Choose your playlist name, description, and cover image before we create
        it on Spotify.
      </p>

      <form action="#" method="post" className="mt-8 text-left">
        <div className="form-action space-y-3">
          <label htmlFor="pname" className="block text-lg text-slate-400">
            Playlist Name
          </label>
          <input
            type="text"
            name="pname"
            id="pname"
            placeholder="My Converted Playlist"
            value={playlistName}
            onChange={handleChange}
            className="w-full bg-primary-dark/50 border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green transition-all outline-none text-lg"
          />
        </div>

        <div className="mt-8 space-y-3">
          <label htmlFor="pname" className="block text-lg text-slate-400">
            Playlist Preview
          </label>
          <div className="bg-primary-dark/40 border border-white/5 rounded-lg p-4 custom-scroll  max-h-45 overflow-y-auto space-y-1">
            {validResults.map((song, idx) => (
              <div
                key={song.match.id}
                className="flex items-center justify-between p-3 rounded-md hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono text-xs">
                    {idx + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                      {song.match.track_name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {song.match.artist}
                    </span>
                  </div>
                </div>
                <AudioLines className="lucide-icon text-dark-foreground" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => setSyncState(false)}
            className="flex-1 order-2 md:order-1 px-8 py-4 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${loadingBtn ? "cursor-not-allowed loading-btn" : "hover:scale-[1.02] active:scale-[0.98] cursor-pointer"} spotify-gradient-bg flex-2 order-1 md:order-2 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-black text-sm font-bold  transition-all shadow-lg shadow-primary/20`}
            onClick={handlePlaylist}
          >
            {loadingBtn ? (
              <RotateCcw />
            ) : (
              <img src={spotify} alt="spotify logo" className="w-9 h-9" />
            )}
            <span className="font-bold">Create Spotify playlist</span>
          </button>
        </div>
      </form>

      {/* <div className="text-center border-t py-4 border-white/10 text-dark-foreground mt-8">
        <p className="font-bold text-xl">Privacy First</p>
        <p>We only request access to create and manage playlists.</p>
        <p>Your personal data stays yours</p>
      </div> */}
    </div>
  );
};

export default ConfigurePlaylist;
