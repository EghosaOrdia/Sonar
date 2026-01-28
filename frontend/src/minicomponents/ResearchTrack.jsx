import React from "react";
import { RotateCcw } from "lucide-react";

const ResearchTrack = ({ track }) => {
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
            <span className="text-white font-medium">"{track.songName}"</span>{" "}
            by <span className="text-white font-medium">{track.artist}</span>
          </span>
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <p className="text-sm text-[#A1A1AA]">
            Showing <span className="text-white font-medium">0</span> of{" "}
            <span className="text-white font-medium">0</span> results
          </p>
          <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-primary-green/10 text-primary-green border-0">
            Re-search
          </div>
        </div>
        <div className="relative pr-4">
          <div className="h-full w-full rounded-[inherit]">
            <div className="min-h-full">
              <div className="space-y-2 h-67.5 overflow-scroll custom-scroll">
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none hover:bg-white/5">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5">
                    <img
                      alt="blinding lights"
                      className="w-full h-full object-cover"
                      src={track.thumbnail}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.songName}</p>
                    <p className="text-sm text-dark-foreground truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>
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
