import useStep from "../store/useStep";
import { Clock, RotateCcw } from "lucide-react";
import { songs } from "../constants/data";

const ResultsState = () => {
  const setStep = useStep((state) => state.setStep);

  return (
    <div className="state opacity-100 transform-none">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">10 songs found</h3>
          <p className="text-dark-foreground">
            <span className="text-[#1ED760]">8 matched</span>
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
                {songs.map(
                  (song) =>
                    song.matched && (
                      <div
                        key={song.id}
                        className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                          <img
                            alt={song.songName}
                            className="w-full h-full object-cover"
                            src={song.thumbnail}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <RotateCcw className="lucide-icon" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {song.songName}
                          </p>
                          <p className="text-sm text-dark-foreground truncate">
                            {song.artist}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="lucide-icon" />
                          <span className="text-sm text-dark-foreground">
                            {song.duration}
                          </span>
                          <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
                            {song.matched ? "Matched" : "Not Found"}
                          </div>
                        </div>
                      </div>
                    ),
                )}
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
                          <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
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
        onClick={() => setStep(4)}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow px-4 w-full btn-primary bg-[#1ED760] hover:bg-[#1abc54] text-black font-bold py-4 h-auto rounded-full text-lg"
      >
        Create Spotify Playlist (8 songs)
      </button>
    </div>
  );
};

export default ResultsState;
