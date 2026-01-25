import useStep from "../store/useStep";
import { Clock } from "lucide-react";

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
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <img
                      alt="Blinding Lights"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&amp;h=60&amp;fit=crop"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Blinding Lights</p>
                    <p className="text-sm text-dark-foreground truncate">
                      The Weeknd
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />
                    <span className="text-sm text-dark-foreground">3:20</span>
                    <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
                      Matched
                    </div>
                  </div>
                </div>
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <img
                      alt="Shape of You"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&amp;h=60&amp;fit=crop"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Shape of You</p>
                    <p className="text-sm text-dark-foreground truncate">
                      Ed Sheeran
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />

                    <span className="text-sm text-dark-foreground">3:53</span>
                    <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
                      Matched
                    </div>
                  </div>
                </div>
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <img
                      alt="Dance Monkey"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=60&amp;h=60&amp;fit=crop"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Dance Monkey</p>
                    <p className="text-sm text-dark-foreground truncate">
                      Tones and I
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />
                    <span className="text-sm text-dark-foreground">3:29</span>
                    <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
                      Matched
                    </div>
                  </div>
                </div>
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <img
                      alt="Someone Like You"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=60&amp;h=60&amp;fit=crop"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Someone Like You</p>
                    <p className="text-sm text-dark-foreground truncate">
                      Adele
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />
                    <span className="text-sm text-dark-foreground">4:45</span>
                    <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
                      Matched
                    </div>
                  </div>
                </div>
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <img
                      alt="Levitating"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=60&amp;h=60&amp;fit=crop"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Levitating</p>
                    <p className="text-sm text-dark-foreground truncate">
                      Dua Lipa
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />
                    <span className="text-sm text-dark-foreground">3:23</span>
                    <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
                      Matched
                    </div>
                  </div>
                </div>
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <img
                      alt="Uptown Funk"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&amp;h=60&amp;fit=crop"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Uptown Funk</p>
                    <p className="text-sm text-dark-foreground truncate">
                      Bruno Mars
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />

                    <span className="text-sm text-dark-foreground">4:30</span>
                    <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
                      Matched
                    </div>
                  </div>
                </div>
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <img
                      alt="Stay"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=60&amp;h=60&amp;fit=crop"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Stay</p>
                    <p className="text-sm text-dark-foreground truncate">
                      The Kid LAROI
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />
                    <span className="text-sm text-dark-foreground">2:21</span>
                    <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
                      Matched
                    </div>
                  </div>
                </div>
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <img
                      alt="Heat Waves"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=60&amp;h=60&amp;fit=crop"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Heat Waves</p>
                    <p className="text-sm text-dark-foreground truncate">
                      Glass Animals
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />
                    <span className="text-sm text-dark-foreground">3:58</span>
                    <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#1ED760]/10 text-[#1ED760] border-0">
                      Matched
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-dark-foreground">
                  Not found on Spotify
                </span>
              </div>
              <div className="space-y-1">
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">My Local Track</p>
                    <p className="text-sm text-dark-foreground truncate">
                      Unknown Artist
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />
                    <span className="text-sm text-dark-foreground">4:12</span>
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-white/10 text-dark-foreground">
                      Not found
                    </div>
                  </div>
                </div>
                <div className="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer opacity-100 transform-none">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Untitled Demo</p>
                    <p className="text-sm text-dark-foreground truncate">
                      Local Band
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="lucide-icon" />
                    <span className="text-sm text-dark-foreground">2:58</span>
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-white/10 text-dark-foreground">
                      Not found
                    </div>
                  </div>
                </div>
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
