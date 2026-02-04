import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { RotateCcw, Clock } from "lucide-react";
import { formatMilliseconds } from "../constants/functions";
import useTrackStore from "../store/useTrackStore";

const sendToServer = async (data) => {
  const res = await fetch("http://localhost:5000/spotify/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

const ResearchTrack = ({ track, closeModal }) => {
  const [trackResults, setTrackResults] = useState([]);
  const isFetchingRef = useRef(false);
  const currentTrackRef = useRef(null);
  const storeTrackResults = useTrackStore((state) => state.results);
  const setTracks = useTrackStore((state) => state.setResults);

  useEffect(() => {
    if (!track || isFetchingRef.current || currentTrackRef.current === track)
      return;

    const fetchResults = async () => {
      isFetchingRef.current = true;
      currentTrackRef.current = track;

      const data = {
        fileName: track.match.track_name,
        artist: track.match.artist,
        title: track.match.track_name,
      };
      // console.log("Sending data:", data);

      try {
        const response = await sendToServer(data);
        // console.log("Full Spotify search response:", response);

        if (response && response.match) {
          const results = Array.isArray(response.match)
            ? response.match
            : [response.match];
          setTrackResults(results);
          // console.log("Updated trackResults:", results);
        } else {
          setTrackResults([
            {
              match: {
                id: "na",
                track_name: "Not Available",
                artist: "Not Available",
                duration: 25000,
                thumbnail: "/placeholder.png",
              },
            },
          ]);
          // console.log("Set default trackResults due to no response.match");
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setTrackResults([
          {
            match: {
              id: "error",
              track_name: "Error Loading",
              artist: "Try Again",
              duration: 0,
              thumbnail: "/placeholder.png",
            },
          },
        ]);
      } finally {
        isFetchingRef.current = false;
      }
    };

    fetchResults();
  }, [track]);

  return (
    <>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2 className="tracking-tight text-xl font-bold flex items-center gap-2">
          <RotateCcw className="lucide-icon text-primary-green" />
          Re-Search Results
        </h2>
        <p className="text-sm text-[#A1A1AA]">
          <span>
            Searching for alternative versions of{" "}
            <span className="text-white font-medium">
              "{track?.match?.track_name || "Unknown Track"}"
            </span>{" "}
            by{" "}
            <span className="text-white font-medium">
              {track?.match?.artist || "Unknown Artist"}
            </span>
          </span>
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <p className="text-sm text-[#A1A1AA]">
            Showing{" "}
            <span className="text-white font-medium">
              {trackResults.length > 0 ? trackResults.length : 0}
            </span>{" "}
            results
          </p>
          <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-primary-green/10 text-primary-green border-0">
            Re-search
          </div>
        </div>
        <div className="relative pr-4">
          <div className="h-full w-full rounded-[inherit]">
            <div className="min-h-full">
              <div className="space-y-1 custom-scroll">
                {Array.isArray(trackResults) && trackResults.length > 0 ? (
                  trackResults.map((song) => (
                    <div
                      onClick={() => {
                        const newMatch = song.match ?? song;

                        const updatedResults = storeTrackResults.map((item) =>
                          item.match?.id === track.match?.id
                            ? { ...item, match: newMatch }
                            : item,
                        );

                        setTracks(updatedResults);
                        toast.success("Track list updated successfully");
                        closeModal(false);
                      }}
                      key={song?.match?.id || song?.id || Math.random()}
                      className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none hover:bg-white/5"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        <img
                          alt={song?.track_name || "Track"}
                          className="w-full h-full object-cover"
                          src={song?.thumbnail || "/placeholder.png"}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">
                          {song?.track_name || "Unknown Track"}
                        </p>
                        <p className="text-sm text-dark-foreground">
                          {song?.artist || "Unknown Artist"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="lucide-icon" />
                        <span className="text-sm text-dark-foreground">
                          {song?.duration
                            ? formatMilliseconds(song?.duration)
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center gap-1 h-8">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-current rounded-full wave-bar"
                      ></div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <button className="bg-primary-green/50 w-full py-2 px-6 rounded-full font-bold duration-150 hover:scale-105 cursor-pointer flex gap-2 justify-center items-center ">
                  <RotateCcw className="lucide-icon" />
                  Load More Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchTrack;
