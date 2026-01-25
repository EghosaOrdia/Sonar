import useStep from "../store/useStep";
import { Clock } from "lucide-react";

const songs = [
  {
    id: 1,
    songName: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:20",
    matched: true,
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&amp;h=60&amp;fit=crop",
  },
  {
    id: 2,
    songName: "Shape of You",
    artist: "Ed Sheeran",
    duration: "3:54",
    matched: true,
    thumbnail:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&amp;h=60&amp;fit=crop",
  },
  {
    id: 3,
    songName: "Dance Monkey",
    artist: "Tones and I",
    duration: "3:29",
    matched: true,
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=60&amp;h=60&amp;fit=crop",
  },
  {
    id: 4,
    songName: "Someone Like You",
    artist: "Adele",
    duration: "4:45",
    matched: true,
    thumbnail:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=60&amp;h=60&amp;fit=crop",
  },
  {
    id: 5,
    songName: "Levitating",
    artist: "Dua Lupa",
    duration: "3:23",
    matched: true,
    thumbnail:
      "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=60&amp;h=60&amp;fit=crop",
  },
  {
    id: 6,
    songName: "Uptown Funk",
    artist: "Bruno Mars",
    duration: "4:30",
    matched: true,
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&amp;h=60&amp;fit=crop",
  },
  {
    id: 7,
    songName: "Stay",
    artist: "The Kid LAROI",
    duration: "2:21",
    matched: true,
    thumbnail:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=60&amp;h=60&amp;fit=crop",
  },
  {
    id: 8,
    songName: "Heat Waves",
    artist: "Glass Animals",
    duration: "3:58",
    matched: true,
    thumbnail:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=60&amp;h=60&amp;fit=crop",
  },
  {
    id: 9,
    songName: "My Local Track",
    artist: "",
    duration: "4:12",
    matched: false,
    thumbnail: "",
  },
  {
    id: 10,
    songName: "Untitled Demo",
    artist: "",
    duration: "2:58",
    matched: false,
    thumbnail: "",
  },
];

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
                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"></div>
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
