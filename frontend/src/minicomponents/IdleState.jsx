import { FolderOpen, FolderClosed } from "lucide-react";
import useTrackStore from "../store/useTrackStore";
import useStep from "../store/useStep";
import { ScanAudioFiles } from "../constants/functions";

const handleScan = async () => {
  try {
    const dir = await window.showDirectoryPicker();
    const audioData = await ScanAudioFiles(dir);
    return audioData;
  } catch (err) {
    console.warn("Folder pick cancelled or failed: ", err);
  }
};

const IdleState = () => {
  const setTracks = useTrackStore((state) => state.setTracks);
  const setStep = useStep((state) => state.setStep);

  const Move = async () => {
    const files = await handleScan();

    if (!files || files.length == 0) return;
    setTracks(files);
    setStep(2);
  };

  return (
    <div className="state animate__animated animate__zoomIn text-center py-12">
      <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
        <FolderOpen className="size-12 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
      </button>

      <p className="text-dark-foreground mb-8">
        Click to select your music folder
      </p>

      <button
        onClick={() => Move()}
        id="pickFolderBtn"
        className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow btn-primary bg-primary-grborder-primary-green hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full"
      >
        <FolderClosed className="lucide-icon" />
        Select Folder
      </button>
    </div>
  );
};

export default IdleState;
