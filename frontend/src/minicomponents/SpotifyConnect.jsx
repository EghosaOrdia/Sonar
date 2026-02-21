import { spotify } from "../constants/media";
import { ArrowRight, CheckCircle2Icon, Lock, X } from "lucide-react";
import useAuth from "../store/useAuth";

const BASE_URL = "https://spotsync-pdwy.onrender.com";

const SpotifyConnect = ({ closeModal }) => {
  const { isAuthenticated, user, clearAuth } = useAuth();

  const loginWithSpotify = () => {
    const sessionId = crypto.randomUUID();
    localStorage.setItem("spotify_session_id", sessionId);
    window.location.href = `${BASE_URL}/spotify/login?session_id=${sessionId}`;
  };

  const handleDisconnect = async () => {
    const sessionId = localStorage.getItem("spotify_session_id");
    if (sessionId) {
      await fetch(`${BASE_URL}/spotify/session`, {
        method: "DELETE",
        headers: { "session-id": sessionId },
      });
      localStorage.removeItem("spotify_session_id");
    }
    clearAuth();
  };

  return (
    <>
      {!isAuthenticated && (
        <div className="text-center space-y-1 font-family-sans">
          <div className="flex justify-end items-center">
            <button
              onClick={() => closeModal(false)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 transition-all duration-200 hover:bg-primary-dark/70 text-dark-foreground hover:text-white cursor-pointer"
            >
              <X className="lucide-icon" />
            </button>
          </div>
          <h2 className="text-center text-3xl font-medium mt-8">
            Connect your Spotify account
          </h2>
          <p className="text-dark-foreground w-1/2 mx-auto">
            We need permission to create playlists in your library
          </p>

          <button
            onClick={loginWithSpotify}
            className="bg-primary-green flex gap-3 py-4 font-family-sans text-lg items-center justify-center rounded-full btn-primary cursor-pointer mt-4 mx-auto"
          >
            <img src={spotify} alt="spotify logo" className="w-9 h-9" />
            <span className="font-bold">Connect Spotify account</span>
          </button>

          <div className="text-center border-t py-4 border-white/10 text-dark-foreground mt-8">
            <p className="font-bold text-xl">Privacy First</p>
            <p>We only request access to create and manage playlists.</p>
            <p>Your personal data stays yours</p>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className="overflow-hidden font-family-sans">
          <div className="flex justify-end items-center">
            <button
              onClick={() => closeModal(false)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 transition-all duration-200 hover:bg-primary-dark/70 text-dark-foreground hover:text-white cursor-pointer"
            >
              <X className="lucide-icon" />
            </button>
          </div>

          <div className="px-8 pb-8 flex flex-col items-center">
            <div className="mb-8 text-center">
              <h1 className="text-white text-[28px] font-bold leading-tight mb-2">
                Connect to Spotify
              </h1>
              <p className="text-dark-foreground">
                Sync your local library seamlessly
              </p>
            </div>

            <div className="w-full space-y-6">
              <div className="bg-primary-dark rounded-xl p-5 border border-white/10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-white/10 overflow-hidden">
                      <img
                        src={
                          user?.images?.[0]?.url ||
                          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
                        }
                        alt="profile"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark rounded-full size-5 flex items-center justify-center">
                      <CheckCircle2Icon fill="#1ed760" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white text-base font-bold leading-tight">
                      Connected as: {user?.display_name ?? "Spotify User"}
                    </p>
                    <p className="text-primary-green text-sm font-medium">
                      Ready to sync
                    </p>
                  </div>
                </div>

                {user?.product === "premium" && (
                  <div className="flex items-center gap-2 bg-primary-green/10 text-primary-green px-3 py-2 rounded-lg w-fit">
                    <CheckCircle2Icon fill="#fff" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Spotify Premium Account
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Connection Status</p>
                  <p className="text-primary-green text-sm font-bold">100%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-primary-green rounded-full w-full"></div>
                </div>
                <p className="text-dark-foreground text-xs text-center mt-1 italic">
                  API Handshake successful
                </p>
              </div>

              <button
                onClick={() => closeModal(false)}
                className="btn-primary w-full flex justify-center items-center gap-4"
              >
                <span>Sync Music</span>
                <ArrowRight />
              </button>
            </div>
          </div>

          <div className="border-t border-white/5 py-4 flex justify-between items-center px-8">
            <div className="flex items-center gap-2 text-[#94c7a7] text-sm">
              <Lock className="size-4" />
              <span>Secure Connection</span>
            </div>
            <button
              onClick={handleDisconnect}
              className="text-[#94c7a7] hover:text-white transition-colors text-sm font-medium cursor-pointer"
            >
              Change Account
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SpotifyConnect;
