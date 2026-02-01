import React from "react";
import { spotify } from "../constants/media";

const loginWithSpotify = () => {
  window.location.href = "http://localhost:5000/spotify/login";
};

const SpotifyConnect = () => {
  return (
    <>
      <div className="text-center space-y-1">
        <div className="w-24 h-24 flex bg-primary-green/20 rounded-full mx-auto">
          <RefreshCcw className="size-8 text-primary-green m-auto" />
        </div>
        <h2 className="text-center text-2xl font-medium mt-8">
          Connect your Spotify account
        </h2>
        <p className="text-dark-foreground w-1/2 mx-auto">
          We need permission to create playlist in your library
        </p>

        <button
          onClick={loginWithSpotify}
          className="w-full bg-primary-green flex gap-3 py-4 font-family-sans text-lg items-center justify-center rounded-full btn-primary cursor-pointer mt-8"
        >
          <img src={spotify} alt="spotify logo" className="w-9 h-9" />
          <span className="font-bold">Connect Spotify account</span>
        </button>

        <div className="text-center border-t py-4 border-white/10 text-dark-foreground mt-8">
          <p className="font-bold">PRIVACY FIRST</p>
          <p>We only request access to create and manage playlist.</p>
          <p>Your personal data stays yours</p>
        </div>
      </div>

      <div className="overflow-hidden hidden">
        <div className="p-8 flex flex-col items-center">
          <div className="mb-8 text-center">
            <h1 className="text-white text-[28px] font-bold leading-tight mb-2">
              Connect to Spotify
            </h1>
            <p className="text-dark-foreground">
              Sync your local library seamlessly
            </p>
          </div>

          {/* <div className="w-full mb-6">
                      <button className="w-full h-12 bg-primary hover:bg-primary/90 transition-all rounded-xl flex items-center justify-center gap-3 text-white font-bold">
                        <div className="spinner"></div>
                        <span>Connecting...</span>
                      </button>
                    </div> */}
          <div className="w-full space-y-6">
            <div className="bg-primary-dark rounded-xl p-5 border border-white/10 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-white/10 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&amp;h=60&amp;fit=crop"
                      alt=""
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark rounded-full size-5 flex items-center justify-center">
                    <CheckCircle2Icon fill="#1ed760" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-white text-base font-bold leading-tight">
                    Connected as: Alex_Music_Lover
                  </p>
                  <p className="text-primary-green text-sm font-medium">
                    Ready to sync
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-primary-green/10 text-primary-green px-3 py-2 rounded-lg w-fit">
                <CheckCircle2Icon fill="#1ed760" />

                <span className="text-xs font-bold uppercase tracking-wider">
                  Spotify Premium Account
                </span>
              </div>
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

            <button className="btn-primary w-full flex justify-center align-center gap-4">
              <span>Start Syncing Music</span>
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-4 flex justify-between items-center px-8">
          <div className="flex items-center gap-2 text-[#94c7a7] text-xs">
            <Lock className="lucide-icon" />
            <span>Secure Connection</span>
          </div>
          <button className="text-[#94c7a7] hover:text-white transition-colors text-xs font-medium">
            Change Account
          </button>
        </div>
      </div>
    </>
  );
};

export default SpotifyConnect;
