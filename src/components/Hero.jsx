import { FolderOpen } from "lucide-react";
import { hero_bg } from "../constants/media";

const Hero = () => {
  return (
    <section className="relative py-24">
      <div className="hero-float-bg absolute top-0 left-0 w-full h-150 opacity-40 pointer-events-none z-0">
        <img
          src={hero_bg}
          alt="abstract dark flowing sound waves green minimal subtle"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="hero-heading text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tighter">
          SpotSync
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-dark-foreground max-w-2xl mx-auto mb-2 leading-relaxed">
          Turn your local music collection into Spotify playlists.
        </p>
        <p className="text-base text-dark-foreground/60 max-w-xl mx-auto mb-12">
          No uploads required. Your files stay private on your device.
        </p>
        <a
          href="#pickfolder"
          className="select-folder inline-flex items-center justify-center gap-4 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow btn-primary text-lg px-10 py-4 h-auto bg-[#1ED760] hover:bg-[#1abc54] text-black font-bold rounded-full"
        >
          <FolderOpen className="lucide-icon" />
          <span>Select Music Folder</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
