import { useEffect, useRef, useState } from "react";
import useStep from "../store/useStep";
import useTrackStore from "../store/useTrackStore";
import { toast } from "sonner";
import { Info, Scan } from "lucide-react";
import { BASE_URL } from "../constants/data";

const steps = [
  { label: "Uploading and checking your file", progress: 25 },
  { label: "Processing your information", progress: 50 },
  { label: "Sending for reviewing", progress: 75 },
  { label: "Waiting for results", progress: 95 },
];

const sendToServer = async (data) => {
  const res = await fetch(`${BASE_URL}/spotify/search/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const ScanningState = () => {
  const hasRunRef = useRef(false);
  const [progress, setProgress] = useState(steps[0]);
  const setStep = useStep((state) => state.setStep);
  const { tracks, setResults } = useTrackStore();

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    toast("Scanning Started", {
      description: "Reading your music files...",
      icon: <Info />,
    });
    const runProcess = async () => {
      try {
        for (let i = 0; i < 4; i++) {
          setProgress(steps[i]);
          await sleep(2500);
        }

        const response = await sendToServer(tracks);

        if (response?.results) {
          setResults(response.results);
          toast.success("Songs fetched success");
          setStep(3);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching song", {
          description: "Please try again",
        });
        setStep(1);
        setProgress(steps[0]);
      }
    };

    runProcess();
  }, [tracks, setResults, setStep]);

  return (
    <div className="state animate__animated animate__zoomIn text-center py-12 px-8">
      <div className="relative w-40 h-40 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-primary-green/20"></div>
        <div className="absolute inset-4 rounded-full border border-primary-green/30"></div>
        <div className="absolute inset-8 rounded-full border border-primary-green/40"></div>
        <div className="absolute inset-0 radar-sweep">
          <div className="scan-imp absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Scan className="lucide-icon text-primary-green" />
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
