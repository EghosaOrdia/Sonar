import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { formatMilliseconds } from "../constants/functions";

const sendToServer = async (data) => {
  const res = await fetch("http://localhost:5000/spotify/search/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

const ResearchTrack = ({ track }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const data = {
        fileName: track.match.name,
        size: parseFloat(track.match.size),
        duration: parseInt(track.match.duration),
        artist: track.match.artist,
        title: track.match.title,
      };

      const response = await sendToServer(data);
      console.log("Spotify search response:", response);

      if (response?.results) {
        setResults(response.results);
      } else {
        setResults([
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
              "{track.match.track_name}"
            </span>{" "}
            by{" "}
            <span className="text-white font-medium">{track.match.artist}</span>
          </span>
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <p className="text-sm text-[#A1A1AA]">
            Showing <span className="text-white font-medium">0</span> of{" "}
            <span className="text-white font-medium">{results?.length}</span>{" "}
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
                {results.map((song) => (
                  <div
                    key={song.id}
                    className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none hover:bg-white/5"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                      <img
                        alt={song.match.track_name}
                        className="w-full h-full object-cover"
                        src={song.match.thumbnail}
                      />
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
