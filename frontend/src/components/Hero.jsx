import { ArrowRight, FolderOpen, ShieldCheck, Sparkles } from "lucide-react";
import { hero_bg } from "../constants/media";

const Hero = () => {
  return (
    <section
      id="top"
      className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 lg:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 sonar-grid-bg"></div>
      <div className="absolute inset-0 sonar-grid-overlay opacity-70"></div>
      <div className="sonar-noise"></div>
      <div
        aria-hidden="true"
        className="hero-orb-1 orb absolute -top-20 left-1/2 -translate-x-1/2 h-130 w-130 rounded-full"
      ></div>
      <div
        aria-hidden="true"
        className="hero-orb-2 orb absolute top-40 -left-32 h-100 w-100 rounded-full opacity-50"
      ></div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex justify-center fade-up delay-75">
          <a
            href="#studio"
            data-testid="hero-eyebrow"
            className="group inline-flex items-center gap-2 rounded-full sonar-glass p-3 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#1DB954] shadow-[0_0_12px_rgba(29,185,84,0.8)]"></span>
            <span className="font-mono-plex uppercase tracking-[0.18em]">
              Now in private beta
            </span>
            <ArrowRight
              size={19}
              className="text-zinc-500 group-hover:text-[#1DB954] transition-colors"
            />
          </a>
        </div>
        <h1 className="mt-7 font-display text-center text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-white fade-up delay-150">
          Rebuild your offline music
          <br className="hidden sm:block" />
          <span> </span>
          <span className="relative inline-block">
            <span className="relative z-10 bg-linear-to-b from-[#1ED760] to-[#1DB954] bg-clip-text text-transparent">
              instantly on Spotify.
            </span>
            <span
              aria-hidden="true"
              className="aura absolute -inset-x-6 -inset-y-2 z-0 rounded-full blur-2xl"
            ></span>
          </span>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-center text-base sm:text-lg leading-relaxed text-zinc-400 fade-up delay-240">
          Sonar reads your local songs and playlist files, matches them to
          Spotify's catalog with surgical precision, and recreates everything as
          a single tap. Your files never leave your device.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 fade-up delay-340">
          <button
            data-testid="hero-connect-spotify"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold px-6 py-3.5 transition-all hover:shadow-[0_12px_40px_rgba(29,185,84,0.4)]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.5 17.3a.75.75 0 0 1-1.03.25c-2.83-1.73-6.39-2.12-10.58-1.16a.75.75 0 1 1-.33-1.46c4.58-1.04 8.51-.6 11.69 1.34.36.22.47.69.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.24-1.99-8.18-2.57-12.01-1.41a.94.94 0 1 1-.55-1.8c4.39-1.34 9.84-.7 13.55 1.6.45.28.59.86.3 1.3Zm.13-3.4c-3.88-2.3-10.28-2.52-13.99-1.4a1.13 1.13 0 0 1-.66-2.15c4.27-1.3 11.32-1.04 15.79 1.61a1.13 1.13 0 0 1-1.14 1.94Z"
              ></path>
            </svg>
            Connect Spotify
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            data-testid="hero-try-demo"
            className="inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-6 py-3.5 transition-all"
          >
            <Sparkles className="text-[#1DB954]" size={19} />
            Try the live demo
          </button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 fade-up delay-440">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-[#1DB954]" />
            Files stay on your device
          </span>
          <span className="hidden sm:inline text-zinc-700">·</span>
          <span>Reads metadata only</span>
          <span className="hidden sm:inline text-zinc-700">·</span>
          <span>No backend uploads</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
