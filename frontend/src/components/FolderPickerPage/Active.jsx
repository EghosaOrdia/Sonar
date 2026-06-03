import {
  CircleCheck,
  ExternalLink,
  Info,
  ListMusic,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useTrackStore from "../../store/useTrackStore";
import useStep from "../../store/useStep";
import { toast } from "sonner";
import { BASE_URL } from "../../constants/data";
import useAuth from "../../store/useAuth";
import { spotify } from "../../constants/media";

const statusSteps = [
  { id: 0, title: "Reading Metadata" },
  { id: 1, title: "Matching catalog" },
  { id: 2, title: "Creating playlist" },
];

const loginWithSpotify = () => {
  const sessionId = crypto.randomUUID();
  localStorage.setItem("spotify_session_id", sessionId);
  window.location.href = `${BASE_URL}/spotify/login?session_id=${sessionId}`;
};

const Active = () => {
  const hasRunRef = useRef(false);
  const [loadingState, setLoadingState] = useState(false);
  const { tracks, addResult, reset } = useTrackStore();

  const { isAuthenticated } = useAuth();

  const setStep = useStep((state) => state.setStep);
  const [playListDetails, setPlaylistDetails] = useState({
    title: "",
    status: "Sync in progress",
    currentStep: 0,
    matchedCount: 0,
    scannedCount: 0,
    totalCount: tracks.length,
    playlistUrl: "",
  });

  const resetPlaylist = () => {
    setPlaylistDetails({
      title: "",
      status: "",
      currentStep: 0,
      matchedCount: 0,
      scannedCount: 0,
      totalCount: 0,
      playlistUrl: "",
    });
  };

  const changeEvent = (e) => {
    setPlaylistDetails((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const streamFromServer = async (data) => {
    const res = await fetch(`${BASE_URL}/spotify/search/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const parts = buffer.split("\n\n");
      buffer = parts.pop();

      for (const part of parts) {
        const line = part.replace(/^data: /, "").trim();

        if (!line) continue;

        const data = JSON.parse(line);
        const trackResult = { match: data.match };

        if (data.match.found) {
          setPlaylistDetails((prev) => ({
            ...prev,
            matchedCount: prev.matchedCount + 1,
          }));
        }
        addResult(trackResult);
        setPlaylistDetails((prev) => ({
          ...prev,
          scannedCount: prev.scannedCount + 1,
        }));
      }
    }

    setPlaylistDetails((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    toast("Scanning Started", {
      description: "Reading your music files...",
      icon: <Info />,
    });

    const runProcess = async () => {
      try {
        await streamFromServer(tracks);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching song", {
          description: "Please try again",
        });
        reset();
        setStep(1);
      }
    };

    runProcess();
  }, []);

  return (
    <div className="relative rounded-2xl bg-[#06070b] border border-white/5 p-6 sm:p-10 min-h-90">
      <div className="relative" data-testid="process-view">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-mono-plex uppercase tracking-[0.22em] text-zinc-500">
              {playListDetails.title}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <CircleCheck className="h-5 w-5 text-[#1DB954]" />
              <input
                className="grow text-xl sm:text-2xl text-white border-zinc-500 border-b-2 border-dashed  focus:border-primary-green outline-none"
                placeholder="Playlist name"
                value={playListDetails.title}
                onChange={changeEvent}
              />
            </div>
          </div>
          <button
            onClick={() => {
              reset();
              resetPlaylist();
              setStep(1);
            }}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5">
          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              style={{
                width: `${Math.round(
                  (playListDetails.scannedCount / playListDetails.totalCount) *
                    100,
                )}%`,
              }}
              className="h-full rounded-full bg-linear-to-r from-[#1DB954] to-[#1ED760] shadow-[0_0_18px_rgba(29,185,84,0.6)] transition-all duration-300"
            ></div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono-plex text-zinc-500">
            <span>
              <span>
                {Math.round(
                  (playListDetails.scannedCount / playListDetails.totalCount) *
                    100,
                )}
              </span>
              % · <span>{playListDetails.matchedCount}</span> /{" "}
              <span>{playListDetails.totalCount}</span> matched
            </span>
            <span>
              <span>{playListDetails.scannedCount}</span> files read
            </span>
          </div>
        </div>
        <div className="mt-7 grid grid-cols-3 items-center gap-2">
          {statusSteps.map((step) => (
            <div
              key={step.id}
              className={`rounded-xl border px-3 py-3 text-xs transition-all text-white items-center ${playListDetails.currentStep >= step.id ? "border-[#1DB954]/30 bg-[#1DB954]/6" : "border-white/5"}`}
            >
              <div className="flex items-center gap-2">
                <CircleCheck
                  className={`h-3.5 w-3.5 ${playListDetails.currentStep >= step.id ? "text-[#1DB954]" : "text-white/20"}`}
                />

                <span className="truncate font-mono-plex uppercase tracking-[0.16em] text-[10px]">
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        {isAuthenticated && (
          <div className="burst mt-7 rounded-2xl border border-[#1DB954]/30 bg-linear-to-br from-[#0d1812] to-[#0a0b10] p-5">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-linear-to-br from-[#1DB954] to-emerald-800 grid place-items-center shadow-[0_8px_24px_rgba(29,185,84,0.4)]">
                <ListMusic className="h-6 w-6 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono-plex uppercase tracking-[0.2em] text-[#1DB954]">
                  Push to Spotify
                </div>
                <div className="font-display text-lg text-white truncate">
                  {playListDetails.title} ·{" "}
                  <span>{playListDetails.matchedCount}</span> tracks
                </div>
              </div>
              <a
                target="_blank"
                href={playListDetails.playlistUrl}
                className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold text-sm px-4 py-2 transition-all hover:shadow-[0_8px_24px_rgba(29,185,84,0.35)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.5 17.3a.75.75 0 0 1-1.03.25c-2.83-1.73-6.39-2.12-10.58-1.16a.75.75 0 1 1-.33-1.46c4.58-1.04 8.51-.6 11.69 1.34.36.22.47.69.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.24-1.99-8.18-2.57-12.01-1.41a.94.94 0 1 1-.55-1.8c4.39-1.34 9.84-.7 13.55 1.6.45.28.59.86.3 1.3Zm.13-3.4c-3.88-2.3-10.28-2.52-13.99-1.4a1.13 1.13 0 0 1-.66-2.15c4.27-1.3 11.32-1.04 15.79 1.61a1.13 1.13 0 0 1-1.14 1.94Z"
                  ></path>
                </svg>{" "}
                Create Playlist
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <button
            onClick={() => {
              loginWithSpotify();
              setLoadingState(true);
            }}
            className={`${loadingState ? "loading-btn" : "bg-primary-green"} flex gap-3 p-4 font-family-sans text-lg items-center justify-center rounded-3xl hover:scale-95 duration-200 transition-all cursor-pointer mt-7`}
          >
            {loadingState ? (
              <RotateCcw className="lucide-icon" />
            ) : (
              <img src={spotify} alt="spotify logo" className="w-9 h-9" />
            )}
            <span className="font-bold">Connect Spotify account</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Active;
