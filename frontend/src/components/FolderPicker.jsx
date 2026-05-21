import { useEffect, useState } from "react";
import useStep from "../store/useStep";
import useAuth from "../store/useAuth";
import Modal from "./Modal";
import {
  IdleState,
  ScanningState,
  ResultsState,
  SuccessState,
} from "./FolderPickerPage";
import SpotifyConnect from "./modals/SpotifyConnect";
import useTrackStore from "../store/useTrackStore";
import { BASE_URL } from "../constants/data";
import { Disc3, ListMusic } from "lucide-react";

const FolderPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { step, setStep } = useStep();
  const { setIsAuthenticated, clearAuth } = useAuth();
  const { results } = useTrackStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authenticated = params.get("authenticated");
    const sessionId = params.get("session_id");

    if (authenticated === "true" && sessionId) {
      setIsOpen(true);
      localStorage.setItem("spotify_session_id", sessionId);
      window.history.replaceState({}, "", window.location.pathname);
      fetchUserProfile(sessionId);
    } else {
      const existingSession = localStorage.getItem("spotify_session_id");
      if (existingSession) {
        checkExistingSession(existingSession);
      }
    }

    if (results.length > 1) {
      setStep(3);
    }
  }, []);

  const fetchUserProfile = async (sessionId) => {
    try {
      const res = await fetch(`${BASE_URL}/spotify/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-id": sessionId,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setIsAuthenticated(data);
    } catch (err) {
      console.error("Could not fetch user profile:", err);
      localStorage.removeItem("spotify_session_id");
      clearAuth();
    }
  };

  const checkExistingSession = async (sessionId) => {
    try {
      const res = await fetch(`${BASE_URL}/spotify/me`, {
        headers: { "session-id": sessionId },
      });
      const data = await res.json();

      if (data.authenticated) {
        fetchUserProfile(sessionId);
      }
    } catch {
      localStorage.removeItem("spotify_session_id");
    }
  };

  return (
    <section id="studio" className="relative py-20 sm:py-28 overflow-hidden">
      {/* <div className="app-overlay absolute inset-0 pointer-events-none"></div> */}
      <div className="max-w-6xl mx-auto relative z-10 text-white">
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-mono-plex uppercase tracking-[0.22em] text-zinc-500">
            The sync studio
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            Drop in music. Walk out with a<span data-ve-dynamic="true"> </span>
            <span className="text-[#1DB954]">Spotify playlist.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            A live demo of how Sonar reads, matches, and rebuilds. Pick a folder
            or a playlist file — no real upload happens.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-12 gap-4 lg:gap-5">
          <div className="glass-card col-span-12 lg:col-span-7">
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <SpotifyConnect closeModal={setIsOpen} />
            </Modal>
            {step === 1 && <IdleState />}
            {step === 2 && <ScanningState />}
            {step === 4 && <SuccessState />}
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="h-full rounded-3xl border border-white/8 bg-linear-to-b from-[#0d0e14] to-[#0a0b10] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between px-2 pt-1">
                <div>
                  <div className="text-[10px] font-mono-plex uppercase tracking-[0.22em] text-zinc-500">
                    Live matches
                  </div>
                  <div className="font-display text-lg text-white">
                    Spotify catalog
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1DB954]/10 text-[#1DB954] text-[10px] font-mono-plex uppercase tracking-[0.2em] px-2.5 py-1 border border-[#1DB954]/20">
                  <Disc3 className="lucide-disc-3 h-3 w-3 animate-spin duration-500" />
                  Awaiting source
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-[#06070b] border border-white/5 min-h-90 max-h-120 overflow-y-auto p-2">
                <div className="h-full min-h-85 grid place-items-center text-center px-6">
                  <div>
                    <div className="mx-auto h-12 w-12 rounded-xl bg-white/3 border border-white/5 grid place-items-center">
                      <ListMusic className=" h-5 w-5 text-zinc-600" />
                    </div>
                    <p className="mt-4 text-sm text-zinc-500 max-w-xs">
                      Select a folder or playlist file to see matches stream in
                      here in real time.
                    </p>
                  </div>
                  {step === 3 && <ResultsState />}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-mono-plex uppercase tracking-[0.2em] text-zinc-500">
                <span>0 matched</span>
                <span>
                  <span data-ve-dynamic="true">1</span> unmatched
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FolderPicker;
