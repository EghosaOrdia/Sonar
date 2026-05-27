import React from "react";
import { IdleState } from "../components/FolderPickerPage";
import { Disc3, ListMusic } from "lucide-react";
import useStep from "../store/useStep";
import Active from "../components/FolderPickerPage/Active";
import useTrackStore from "../store/useTrackStore";

const Test = () => {
  const { step } = useStep();
  const { results } = useTrackStore();

  return (
    <div className="mt-12 grid grid-cols-12 gap-4 lg:gap-5">
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
            {results.length > 1}
            <div className="h-full min-h-85 grid place-items-center text-center px-6">
              <div>
                <div className="mx-auto h-12 w-12 rounded-xl bg-white/3 border border-white/5 grid place-items-center">
                  <ListMusic className=" h-5 w-5 text-zinc-600" />
                </div>
                <p className="mt-4 text-sm text-zinc-500 max-w-xs">
                  Select a folder or playlist file to see matches stream in here
                  in real time.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-mono-plex uppercase tracking-[0.2em] text-zinc-500">
            <span>0 matched</span>
            <span>
              <span data-ve-dynamic="true">1</span> unmatched
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
