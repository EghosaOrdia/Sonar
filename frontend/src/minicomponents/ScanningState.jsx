import { useEffect, useState } from "react";
import useStep from "../store/useStep";
import useTrackStore from "../store/useTrackStore";

const steps = [
  { label: "Uploading and checking your file", progress: 25 },
  { label: "Processing your information", progress: 50 },
  { label: "Sending for reviewing", progress: 75 },
  { label: "Waiting for results", progress: 95 },
];

const sendToServer = async (data) => {
  const res = await fetch("http://localhost:5000/spotify/search/batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const ScanningState = () => {
  const setStep = useStep((state) => state.setStep);
  const tracks = useTrackStore((state) => state.tracks);
  const setResults = useTrackStore((state) => state.setResults);

  const [progress, setProgress] = useState(steps[0]);

  const runProcess = async () => {
    try {
      // Step 1 → 3 (timed)
      for (let i = 0; i < 3; i++) {
        setProgress(steps[i]);
        await sleep(2500);
      }

      // Actual server work
      const response = await sendToServer(tracks);

      // Final UI state
      setProgress(steps[3]);

      if (response?.results) {
        setResults(response.results);
        setStep(3);
      }
    } catch (err) {
      console.error("Scanning failed:", err);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      runProcess();
    }, 0);

    return () => clearTimeout(id);
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
        <div className="absolute inset-0 rounded-full border border-primary-green/50 pulse-ring"></div>
      </div>

      <div className="flex items-center justify-center gap-1 h-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-1 bg-current rounded-full wave-bar"></div>
        ))}
      </div>

      <p className="text-xl font-medium mt-6 mb-2">{progress.label}...</p>

      <p className="text-dark-foreground mb-8">
        Please wait while we process your files
      </p>

      <div className="max-w-md mx-auto">
        <div className="relative w-full overflow-hidden rounded-full h-2 bg-white/10">
          <div
            style={{ width: `${progress.progress}%` }}
            className="progress-fill h-full bg-primary transition-all duration-500"
          />
        </div>
        <p className="text-sm text-dark-foreground mt-2">
          {progress.progress}%
        </p>
      </div>
    </div>
  );
};

export default ScanningState;
