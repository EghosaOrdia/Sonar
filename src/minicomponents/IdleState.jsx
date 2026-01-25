import React from "react";
import { FolderOpen, FolderClosed } from "lucide-react";

const IdleState = () => {
  return (
    <div className="state text-center py-12" data-step="1">
      <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 text-primary-green border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-[#1ED760]/50 transition-colors duration-300 cursor-pointer">
        <FolderOpen className="lucide-icon group-hover:scale-125 transition-all duration-300" />
      </button>

      <p className="text-dark-foreground mb-8">
        Click to select your music folder
      </p>

      <button
        id="pickFolderBtn"
        className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow btn-primary bg-[#1ED760] hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full"
      >
        <FolderClosed />
        Select Folder
      </button>
    </div>
  );
};

export default IdleState;
