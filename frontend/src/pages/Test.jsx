import { IdleState } from "../components/FolderPickerPage";
import { Clock, Disc3, Fingerprint, ListMusic, RotateCcw } from "lucide-react";
import useStep from "../store/useStep";
import Active from "../components/FolderPickerPage/Active";
import useTrackStore from "../store/useTrackStore";
import { formatMilliseconds } from "../constants/functions";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/data";

const Test = () => {
  const { step } = useStep();
  const { results } = useTrackStore();
  const [file, setFile] = useState(null);

  let validResults = results.filter((song) => song?.match?.found === true);
  let unmatchedSongs = results.filter((song) => song?.match?.found === false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const sendToServer = async () => {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `${BASE_URL}/spotify/fingerprint-identify`,
          {
            method: "POST",
            body: formData,
          },
        );
        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    sendToServer();
  }, [file]);

  return (
    <div className="min-h-screen bg-[#05060A] font-family-sans font-normal p-32 grid grid-cols-12 gap-4 lg:gap-5">
      <div className="glass-card col-span-12 lg:col-span-7">
        {/* <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <SpotifyConnect closeModal={setIsOpen} />
        </Modal> */}
        {step === 1 && <IdleState />}
        {step === 2 && <Active />}
      </div>

      {/* To be implemented */}
      <div className="col-span-12 lg:col-span-5">
        <div className="h-full rounded-3xl border border-white/8 bg-linear-to-b from-[#0d0e14] to-[#0a0b10] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between px-2 pt-1">
            <div>
              <div className="text-[10px] font-mono-plex uppercase tracking-[0.22em] text-zinc-500">
                Live matches
              </div>
              <div className="font-display text-lg text-white">
                Spotify catalog
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1DB954]/10 text-[#1DB954] text-[10px] font-mono-plex uppercase tracking-[0.2em] px-2.5 py-1 border border-[#1DB954]/20">
              <Disc3 className="lucide-disc-3 h-3 w-3 animate-spin duration-500" />
              Awaiting source
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#06070b] border border-white/5 min-h-90 max-h-120 overflow-y-auto p-2">
            {validResults.length > 0 ? (
              <div className="space-y-1 max-h-20">
                {validResults.map((song) => (
                  <div
                    key={song.match.id}
                    style={{ "--i": song.match.id }}
                    className="animate__animated animate__fadeInUp song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer text-white hover:bg-white/5"
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
                      <img
                        alt={song.match.track_name}
                        className="w-full h-full object-cover"
                        src={song.match.thumbnail}
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:bg-primary-green/70 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <RotateCcw className="lucide-icon" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium">
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
                {unmatchedSongs.map((song) => (
                  <div class="flex items-center gap-3 rounded-xl px-2 py-2 bg-white/2">
                    <div class="h-9 w-9 rounded-md bg-zinc-900 ring-1 ring-white/5 shrink-0 grid place-items-center text-zinc-600">
                      ?
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="truncate text-sm text-zinc-400">
                        {song.match.track_name}
                      </div>
                      <div class="truncate text-xs text-zinc-600">
                        {song.match.artist}
                      </div>
                    </div>
                    <label
                      htmlFor="track"
                      class="flex justify-between items-center gap-2 text-[10px] font-mono-plex uppercase tracking-[0.16em] text-zinc-500 bg-white/3 px-3 py-1 rounded-full cursor-pointer"
                    >
                      Re-search
                      <Fingerprint className="w-4 h-4" />
                      <input
                        type="file"
                        name="track"
                        id="track"
                        onChange={handleFileChange}
                        hidden
                      />
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full min-h-85 grid place-items-center text-center px-6 py-4">
                <div>
                  <div className="mx-auto h-12 w-12 rounded-xl bg-white/3 border border-white/5 grid place-items-center">
                    <ListMusic className=" h-5 w-5 text-zinc-600" />
                  </div>
                  <p className="mt-4 text-sm text-zinc-500 max-w-xs">
                    Select a folder or playlist file to see matches stream in
                    here in real time.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-mono-plex uppercase tracking-[0.2em] text-zinc-500">
            <span>{validResults.length} matched</span>
            <span>{results.length - validResults.length} unmatched</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
