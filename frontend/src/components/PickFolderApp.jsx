import { useEffect, useState } from "react";
import useStep from "../store/useStep";
import useAuth from "../store/useAuth";
import { ScanningState, ResultsState, IdleState } from "../minicomponents";
import SuccessState from "../minicomponents/SuccessState";
import Modal from "./Modal";
import SpotifyConnect from "../minicomponents/SpotifyConnect";
import ConfigurePlaylist from "../minicomponents/ConfigurePlaylist";
import useTrackStore from "../store/useTrackStore";

const BASE_URL = "https://spotsync-pdwy.onrender.com";

const PickFolderApp = () => {
  const step = useStep((state) => state.step);
  const setStep = useStep((state) => state.setStep);
  const { setIsAuthenticated, clearAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
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
        headers: { "session-id": sessionId },
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
    <section id="pickfolder" className="py-24 lg:py-32 px-6 relative">
      <div className="app-overlay absolute inset-0 pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10 text-white">
        <div className="section-header text-center mb-12">
          <h2 className="text-10xl sm:text-4xl lg:text-10xl font-bold tracking-tight mb-4">
            Start
            <span className="text-primary-green"> Converting</span>
          </h2>
          <p className="text-dark-foreground text-lg">
            Select your music folder and watch the magic happen
          </p>
        </div>
        <div className="glass-card p-8 lg:p-12">
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <SpotifyConnect closeModal={setIsOpen} />
          </Modal>
          {step === 1 && <IdleState />}
          {step === 2 && <ScanningState />}
          {step === 3 && <ResultsState />}
          {step === 4 && <SuccessState />}
        </div>
      </div>
    </section>
  );
};

export default PickFolderApp;
