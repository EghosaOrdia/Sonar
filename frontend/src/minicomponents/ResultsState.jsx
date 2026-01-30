// import useStep from "../store/useStep";
import {
  ArrowRight,
  CheckCircle2Icon,
  Clock,
  Lock,
  RefreshCcw,
  RotateCcw,
} from "lucide-react";
import { songs } from "../constants/data";
import { useState } from "react";
import Modal from "../components/Modal";
import { spotify } from "../constants/media";
import ResearchTrack from "./ResearchTrack";
import useTrackStore from "../store/useTrackStore";
import useStep from "../store/useStep";
import { formatMilliseconds } from "../constants/functions";

const ResultsState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [researchTrack, setResearchTrack] = useState(null);
  const results = useTrackStore((state) => state.results);
  const setStep = useStep((state) => state.setStep);

  const loginWithSpotify = () => {
    window.location.href = "http://localhost:5000/spotify/login";
  };

  return (
    <div className="state opacity-100 transform-none">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent == "research" && <ResearchTrack track={researchTrack} />}

        {modalContent == "spotify-connect" && (
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
                      <p className="text-primary-green text-sm font-bold">
                        100%
                      </p>
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
        )}
      </Modal>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">10 songs found</h3>
          <p className="text-dark-foreground">
            <span className="text-primary-green">8 matched</span>
            <span> · 2 not found</span>
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent h-9 w-9 text-dark-foreground hover:text-white"></button>
      </div>
      <div className="shrink-0 h-px w-full bg-white/10 mb-6"></div>
      <div
        dir="ltr"
        className="ltr custom-scroll relative overflow-scroll h-80 pr-4 mb-6"
      >
        <div className="h-full w-full rounded-[inherit] overflow-scroll min-w-full table">
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-dark-foreground">
                  Matched on Spotify
                </span>
              </div>
              <div className="space-y-1">
                {results.map((song) => (
                  <div
                    key={song.id}
                    className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none hover:bg-white/5"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                      <img
                        alt={song.songName}
                        className="w-full h-full object-cover"
                        src={song.match.thumbnail}
                      />
                      <div
                        onClick={() => {
                          setIsOpen(true);
                          setModalContent("research");
                          setResearchTrack(song);
                        }}
                        className="absolute inset-0 bg-black/40 opacity-0 hover:bg-primary-green/70 hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <RotateCcw className="lucide-icon" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {song.match.track_name}
                      </p>
                      <p className="text-sm text-dark-foreground truncate">
                        {song.match.artist}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="lucide-icon" />
                      <span className="text-sm text-dark-foreground">
                        {formatMilliseconds(song.match.duration)}
                      </span>
                      <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-primary-green/10 text-primary-green border-0">
                        Matched
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-dark-foreground">
                  Not found on Spotify
                </span>
              </div>
              <div className="space-y-1">
                {songs.map(
                  (song) =>
                    !song.matched && (
                      <div
                        key={song.id}
                        className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none"
                      >
                        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0"></div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {song.songName}
                          </p>
                          <p className="text-sm text-dark-foreground truncate">
                            Unknown Artist
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="lucide-icon" />
                          <span className="text-sm text-dark-foreground">
                            {song.duration}
                          </span>
                          <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-primary-green/10 text-primary-green border-0">
                            {song.matched ? "Matched" : "Not Found"}
                          </div>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          // setIsOpen(true);
          // setModalContent("spotify-connect");
          setStep(4);
        }}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow px-4 w-full btn-primary bg-primary-green hover:bg-[#1abc54] text-black font-bold py-4 h-auto rounded-full text-lg"
      >
        Create Spotify Playlist (8 songs)
      </button>
    </div>
  );
};

export default ResultsState;
