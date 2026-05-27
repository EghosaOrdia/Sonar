import { CircleCheck, ExternalLink, ListMusic, RotateCcw } from "lucide-react";
import React from "react";
import useTrackStore from "../../store/useTrackStore";

const Active = () => {
  const { reset } = useTrackStore();

  return (
    <div className="relative rounded-2xl bg-[#06070b] border border-white/5 p-6 sm:p-10 min-h-90">
      <div className="relative" data-testid="process-view">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-mono-plex uppercase tracking-[0.22em] text-zinc-500">
              Sync in progress
            </div>
            <h3 className="mt-1 font-display text-xl sm:text-2xl text-white inline-flex items-center gap-2">
              <CircleCheck className="h-5 w-5 text-[#1DB954]" />
              My Offline Library
            </h3>
          </div>
          <button
            onClick={() => reset()}
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5">
          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              data-testid="sync-progress-bar"
              className="w-full h-full rounded-full bg-linear-to-r from-[#1DB954] to-[#1ED760] shadow-[0_0_18px_rgba(29,185,84,0.6)] transition-all duration-300"
            ></div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono-plex text-zinc-500">
            <span>
              <span>100</span>% · <span>15</span> / <span>15</span> matched
            </span>
            <span>
              <span>16</span> files read
            </span>
          </div>
        </div>
        <div className="mt-7 grid grid-cols-3 gap-2">
          <div className="rounded-xl border px-3 py-3 text-xs transition-all border-[#1DB954]/30 bg-[#1DB954]/6 text-white">
            <div className="flex items-center gap-2">
              <CircleCheck className="h-3.5 w-3.5 text-[#1DB954]" />
              <span className="truncate font-mono-plex uppercase tracking-[0.16em] text-[10px]">
                Reading metadata
              </span>
            </div>
          </div>
          <div className="rounded-xl border px-3 py-3 text-xs transition-all border-[#1DB954]/30 bg-[#1DB954]/6 text-white">
            <div className="flex items-center gap-2">
              <CircleCheck className=" h-3.5 w-3.5 text-[#1DB954]" />
              <span className="truncate font-mono-plex uppercase tracking-[0.16em] text-[10px]">
                Matching catalog
              </span>
            </div>
          </div>
          <div className="rounded-xl border px-3 py-3 text-xs transition-all border-[#1DB954]/30 bg-[#1DB954]/6 text-white">
            <div className="flex items-center gap-2">
              <CircleCheck className="h-3.5 w-3.5 text-[#1DB954]" />
              <span className="truncate font-mono-plex uppercase tracking-[0.16em] text-[10px]">
                Creating playlist
              </span>
            </div>
          </div>
        </div>
        <div className="burst mt-7 rounded-2xl border border-[#1DB954]/30 bg-linear-to-br from-[#0d1812] to-[#0a0b10] p-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-linear-to-br from-[#1DB954] to-emerald-800 grid place-items-center shadow-[0_8px_24px_rgba(29,185,84,0.4)]">
              <ListMusic className="h-6 w-6 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-mono-plex uppercase tracking-[0.2em] text-[#1DB954]">
                Pushed to Spotify
              </div>
              <div className="font-display text-lg text-white truncate">
                My Offline Library · <span>15</span> tracks
              </div>
            </div>
            <button
              data-testid="open-on-spotify-btn"
              className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold text-sm px-4 py-2 transition-all hover:shadow-[0_8px_24px_rgba(29,185,84,0.35)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.5 17.3a.75.75 0 0 1-1.03.25c-2.83-1.73-6.39-2.12-10.58-1.16a.75.75 0 1 1-.33-1.46c4.58-1.04 8.51-.6 11.69 1.34.36.22.47.69.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.24-1.99-8.18-2.57-12.01-1.41a.94.94 0 1 1-.55-1.8c4.39-1.34 9.84-.7 13.55 1.6.45.28.59.86.3 1.3Zm.13-3.4c-3.88-2.3-10.28-2.52-13.99-1.4a1.13 1.13 0 0 1-.66-2.15c4.27-1.3 11.32-1.04 15.79 1.61a1.13 1.13 0 0 1-1.14 1.94Z"
                ></path>
              </svg>{" "}
              Open
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Active;
