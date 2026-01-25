import React from "react";
import { CircleCheck, Headphones, ExternalLink } from "lucide-react";
import useStep from "../store/useStep";

const SuccessState = () => {
  const setStep = useStep((state) => state.setStep);

  return (
    <div className="state text-center py-12 opacity-100 transform-none">
      <div className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-full bg-white/5 text-primary-green border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-[#1ED760]/50 transition-colors duration-300 cursor-pointer transform-none">
        <CircleCheck className="lucide-icon group-hover:scale-125 transition-all duration-300" />
      </div>
      <h3 className="text-3xl font-bold mb-3">Playlist Created!</h3>
      <p className="text-dark-foreground mb-8 max-w-sm mx-auto">
        Your playlist with 8 songs is now available on Spotify
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow btn-primary bg-[#1ED760] hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full">
          <Headphones className="lucide-icon" />
          Open in Spotify
          <ExternalLink className="lucide-icon" />
        </button>
        <button
          onClick={() => setStep(1)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border shadow-sm hover:bg-accent hover:text-accent-foreground btn-secondary px-8 py-3 h-auto rounded-full border-white/15"
        >
          Create Another Playlist
        </button>
      </div>
    </div>
  );
};

export default SuccessState;
