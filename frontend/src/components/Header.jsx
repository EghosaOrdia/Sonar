import { Music2 } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { SpotifyConnect } from "./modals";
import useAuth from "../store/useAuth";

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);

  return (
    <>
      <Modal isOpen={modal}>
        <SpotifyConnect closeModal={closeModal} />
      </Modal>
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500 py-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-500 ">
          <div className="flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all duration-500 sonar-glass border border-transparent">
            <a
              href="#top"
              data-testid="logo-link"
              className="flex items-center gap-2 group"
            >
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#1DB954]/10 ring-1 ring-[#1DB954]/30">
                <Music2 size={20} className="text-[#1DB954]" />
                <span className="absolute inset-0 rounded-lg bg-[#1DB954]/10 blur-md -z-10"></span>
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                Sonar
              </span>
              <span className="ml-1 hidden sm:inline-flex text-[10px] font-mono-plex uppercase tracking-[0.18em] text-zinc-500">
                v0.4 beta
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-400">
              <a
                href="#how"
                className="hover:text-white transition-colors"
                data-testid="nav-how"
              >
                How it works
              </a>
              <a
                href="#features"
                className="hover:text-white transition-colors"
                data-testid="nav-features"
              >
                Features
              </a>
              <a
                href="#studio"
                className="hover:text-white transition-colors"
                data-testid="nav-studio"
              >
                Sync studio
              </a>
              <a
                href="#faq"
                className="hover:text-white transition-colors"
                data-testid="nav-faq"
              >
                FAQ
              </a>
            </nav>
            {!isAuthenticated && (
              <button
                onClick={() => setModal(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold text-sm px-4 py-3 transition-all hover:shadow-[0_8px_24px_rgba(29,185,84,0.35)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.5 17.3a.75.75 0 0 1-1.03.25c-2.83-1.73-6.39-2.12-10.58-1.16a.75.75 0 1 1-.33-1.46c4.58-1.04 8.51-.6 11.69 1.34.36.22.47.69.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.24-1.99-8.18-2.57-12.01-1.41a.94.94 0 1 1-.55-1.8c4.39-1.34 9.84-.7 13.55 1.6.45.28.59.86.3 1.3Zm.13-3.4c-3.88-2.3-10.28-2.52-13.99-1.4a1.13 1.13 0 0 1-.66-2.15c4.27-1.3 11.32-1.04 15.79 1.61a1.13 1.13 0 0 1-1.14 1.94Z"
                  ></path>
                </svg>
                <span>Connect</span>
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={() => setModal(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold text-sm transition-all hover:shadow-[0_8px_24px_rgba(29,185,84,0.35)]"
              >
                <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-white/10 overflow-hidden">
                  <img
                    src={
                      user?.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
                    }
                    alt="profile"
                  />
                </div>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
