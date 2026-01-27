import { useEffect } from "react";
import useStep from "../store/useStep";

const ScanningState = () => {
  const setStep = useStep((state) => state.setStep);

  useEffect(() => {
    setTimeout(() => {
      setStep(3);
    }, 3000);
  });

  return (
    <div className="state text-center py-12 opacity-100 transform-none">
      <div className="relative w-40 h-40 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-primary-green/20"></div>
        <div className="absolute inset-4 rounded-full border border-primary-green/30"></div>
        <div className="absolute inset-8 rounded-full border border-primary-green/40"></div>
        <div className="absolute inset-0 radar-sweep">
          <div className="scan-imp absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center"></div>
        <div className="absolute inset-0 rounded-full border border-primary-green/50 pulse-ring"></div>
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
          <div className="progress-fill h-full w-full flex-1 bg-primary transition-all -translate-x-1/10"></div>
        </div>
        <p className="text-sm text-dark-foreground mt-2">95%</p>
      </div>
    </div>
  );
};

export default ScanningState;
