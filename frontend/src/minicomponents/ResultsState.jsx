import { CheckCircle, Clock, RotateCcw, SparklesIcon, X } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import ResearchTrack from "./ResearchTrack";
import useTrackStore from "../store/useTrackStore";
import useStep from "../store/useStep";
import { formatMilliseconds } from "../constants/functions";
import SpotifyConnect from "./SpotifyConnect";
import { toast } from "sonner";

const ResultsState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [researchTrack, setResearchTrack] = useState(null);
  const results = useTrackStore((state) => state.results);

  const resetTrackStore = useTrackStore((state) => state.reset);
  const setStep = useStep((state) => state.setStep);
  const hasRunRef = useRef(false);

  const validResults = results.filter((song) => song?.match);
  const notFoundResults = results.filter((song) => !song?.match);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    toast.success("Scan complete!", {
      description: `Found ${results.length} songs, (${validResults.length} matched, (${notFoundResults.length} not found)`,
    });
  }, []);

  return (
    <div className="state animate__animated animate__zoomIn">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent == "research" && (
          <ResearchTrack track={researchTrack} closeModal={setIsOpen} />
        )}
        {modalContent == "spotify-connect" && (
          <SpotifyConnect closeModal={setIsOpen} />
        )}
      </Modal>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">{results.length} songs found</h3>
          <p className="text-dark-foreground">
            <span className="text-primary-green">
              {validResults.length} matched
            </span>

            <span> · {notFoundResults.length} not found</span>
          </p>
        </div>
        <button
          onClick={() => {
            resetTrackStore();
            setStep(1);
          }}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 transition-all duration-200 hover:bg-primary-dark/70 text-dark-foreground hover:text-white cursor-pointer"
        >
          <X />
        </button>
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
                <CheckCircle className="lucide-icon text-primary-green" />
                <span className="text-sm font-medium text-dark-foreground">
                  Matched on Spotify
                </span>
              </div>
              <div className="space-y-1">
                {validResults.map((song) => (
                  <div
                    key={song.match.id}
                    style={{ "--i": song.match.id }}
                    className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer  hover:bg-white/5"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                      <img
                        alt={song.match.track_name}
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
                <X className="lucide-icon text-dark-foreground" />
                <span className="text-sm font-medium text-dark-foreground">
                  Not found on Spotify
                </span>
              </div>
              <div className="space-y-1">
                {results
                  .filter((song) => !song?.match)
                  .map(
                    (song) =>
                      !song.matched && (
                        <div
                          key={0}
                          className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none"
                        >
                          <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0"></div>

                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">Unknown</p>
                            <p className="text-sm text-dark-foreground truncate">
                              Unknown
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="lucide-icon" />
                            <span className="text-sm text-dark-foreground">
                              {song.duration || "N/A"}
                            </span>
                            <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-primary-green/10 text-primary-green border-0">
                              Not Found
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
          setIsOpen(true);
          setModalContent("spotify-connect");
          // setStep(4);
        }}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow px-4 w-full btn-primary bg-primary-green hover:bg-[#1abc54] text-black font-bold py-4 h-auto rounded-full text-lg"
      >
        <SparklesIcon className="lucide-icon text-black" />
        Create Spotify Playlist (8 songs)
      </button>
    </div>
  );
};

export default ResultsState;
