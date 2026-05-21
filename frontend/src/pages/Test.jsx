import { FileMusic, FolderOpen } from "lucide-react";
import React from "react";

const Test = () => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden min-h-screen bg-[#05060A] font-family-sans font-normal">
      <div className="relative beam-border rounded-2xl transition-colors border-white/10 px-6 pt-10 sm:pt-14 flex flex-col items-center text-center cursor-pointer group">
        <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
          <FileMusic className="size-12 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
        </button>

        <label
          htmlFor="musicfile"
          className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow btn-primary hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full"
        >
          <FileMusic className="lucide-icon" />
          Select Audio File
        </label>
        <input type="file" name="musicfile" id="musicfile" hidden />
      </div>
    </section>
  );
};

export default Test;
