import React from "react";

const HowItWorks = () => {
  return (
    <section className="mt-20 py-14">
      <div className="text-center text-white max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          How It <span className="text-[#1ED760]">Works</span>
        </h2>
        <p className="text-dark-foreground text-lg max-w-xl mx-auto">
          Four simple steps to transform your music library
        </p>
        <div className="steps text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="step-card glass-card p-8 relative group">
            <span
              component="number-badge"
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-sm font-mono text-dark-foreground"
            >
              1
            </span>
            <div
              component="icon-box"
              className="step-iconbox w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i data-lucide="folder-open" className="lucide-icon"></i>
            </div>
            <h3 className="step-title text-xl font-semibold mb-3">
              Select Folder
            </h3>
            <p className="step-description text-dark-foreground text-sm leading-relaxed">
              Grant access to your local music directory
            </p>
          </div>
          <div className="step-card glass-card p-8 relative group">
            <span
              component="number-badge"
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-sm font-mono text-dark-foreground"
            >
              2
            </span>
            <div
              component="icon-box"
              className="step-iconbox w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i data-lucide="scan" className="lucide-icon"></i>
            </div>
            <h3 className="step-title text-xl font-semibold mb-3">
              Scan Metadata
            </h3>
            <p className="step-description text-dark-foreground text-sm leading-relaxed">
              We read song info locally — nothing leaves your device
            </p>
          </div>
          <div className="step-card glass-card p-8 relative group">
            <span
              component="number-badge"
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-sm font-mono text-dark-foreground"
            >
              3
            </span>
            <div
              component="icon-box"
              className="step-iconbox w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i data-lucide="audio-lines" className="lucide-icon"></i>
            </div>
            <h3 className="step-title text-xl font-semibold mb-3">
              Match on Spotify
            </h3>
            <p className="step-description text-dark-foreground text-sm leading-relaxed">
              Songs are automatically matched to spotify's catalog
            </p>
          </div>
          <div className="step-card glass-card p-8 relative group">
            <span
              component="number-badge"
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-sm font-mono text-dark-foreground"
            >
              4
            </span>
            <div
              component="icon-box"
              className="step-iconbox w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i data-lucide="link" className="lucide-icon"></i>
            </div>
            <h3 className="step-title text-xl font-semibold mb-3">
              Connect Spotify Account
            </h3>
            <p className="step-description text-dark-foreground text-sm leading-relaxed">
              Your curated playlist is ready in seconds
            </p>
          </div>
          <div className="step-card glass-card p-8 relative group">
            <span
              component="number-badge"
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-sm font-mono text-dark-foreground"
            >
              5
            </span>
            <div
              component="icon-box"
              className="step-iconbox w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i data-lucide="list-video" className="lucide-icon"></i>
            </div>
            <h3 className="step-title text-xl font-semibold mb-3">
              Create Playlist
            </h3>
            <p className="step-description text-dark-foreground text-sm leading-relaxed">
              Your curated playlist is ready in seconds
            </p>
          </div>
        </div>
        <div
          className="mt-6 flex items-center justify-center gap-3 text-dark-foreground/60 text-sm"
          style="opacity: 1"
        >
          <i data-lucide="shield" className="lucide-icon"></i>
          Your music lever leaves your device. We only read metadata.
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
