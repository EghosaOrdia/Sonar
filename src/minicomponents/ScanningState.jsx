import React from "react";

const ScanningState = () => {
  return (
    <div
      className="state text-center py-12 hidden"
      data-step="2"
      style="opacity: 1; transform: none"
    >
      <div className="relative w-40 h-40 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-[#1ED760]/20"></div>
        <div className="absolute inset-4 rounded-full border border-[#1ED760]/30"></div>
        <div className="absolute inset-8 rounded-full border border-[#1ED760]/40"></div>
        <div className="absolute inset-0 radar-sweep">
          <div
            className="absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"
            style="
                      background: linear-gradient(
                        90deg,
                        rgba(30, 215, 96, 0.8),
                        transparent
                      );
                    "
          ></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center"></div>
        <div className="absolute inset-0 rounded-full border border-[#1ED760]/50 pulse-ring"></div>
      </div>
      <div className="flex items-center justify-center gap-1 h-8">
        <div className="w-1 bg-current rounded-full wave-bar"></div>
        <div className="w-1 bg-current rounded-full wave-bar"></div>
        <div className="w-1 bg-current rounded-full wave-bar"></div>
        <div className="w-1 bg-current rounded-full wave-bar"></div>
        <div className="w-1 bg-current rounded-full wave-bar"></div>
        <div className="w-1 bg-current rounded-full wave-bar"></div>
        <div className="w-1 bg-current rounded-full wave-bar"></div>
      </div>
      <p className="text-xl font-medium mt-6 mb-2">Finalizing results...</p>
      <p className="text-dark-foreground mb-8">
        Please wait while we process your files
      </p>
      <div className="max-w-md mx-auto">
        <div className="relative w-full overflow-hidden rounded-full h-2 bg-white/10">
          <div
            className="progress-fill h-full w-full flex-1 bg-primary transition-all"
            style="transform: translateX(-10%)"
          ></div>
        </div>
        <p className="text-sm text-dark-foreground mt-2">95%</p>
      </div>
    </div>
  );
};

export default ScanningState;
