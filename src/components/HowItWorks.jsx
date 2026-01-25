import React from "react";
import { FolderOpen, Scan, AudioLines, Link, Shield } from "lucide-react";

const steps = [
  {
    Number: 1,
    Title: "Select Folder",
    Description: "Grant access to your local music directory",
    Icon: FolderOpen,
  },
  {
    Number: 2,
    Title: "Scan Metadata",
    Description: "We read song info locally — nothing leaves your device",
    Icon: Scan,
  },
  {
    Number: 3,
    Title: "Match on Spotify",
    Description: "Songs are automatically matched to spotify's catalog",
    Icon: AudioLines,
  },
  {
    Number: 4,
    Title: "Connect Spotify Account",
    Description: "Your curated playlist is ready in seconds",
    Icon: Link,
  },
  {
    Number: 5,
    Title: "Create Playlist",
    Description: "Your curated playlist is ready in seconds",
    Icon: Link,
  },
];
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
          {steps.map((step) => {
            const Icon = step.Icon;
            return (
              <div
                key={step.Number}
                className="step-card glass-card p-8 relative group"
              >
                <span
                  component="number-badge"
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-sm font-mono text-dark-foreground"
                >
                  {step.Number}
                </span>
                <div
                  component="icon-box"
                  className="bg-[#1ed76015] text-[#1ed760] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon className="lucide-icon" />
                </div>
                <h3 className="step-title text-xl font-semibold mb-3">
                  {step.Title}
                </h3>
                <p className="step-description text-dark-foreground text-sm leading-relaxed">
                  {step.Description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3 text-dark-foreground/60 text-sm opacity-100">
          <Shield className="lucide-icon" />
          Your music lever leaves your device. We only read metadata.
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
