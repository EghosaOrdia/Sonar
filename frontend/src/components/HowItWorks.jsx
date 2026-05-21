import React from "react";
import {
  FolderOpen,
  Scan,
  AudioLines,
  Link,
  Shield,
  Zap,
  WandSparkles,
  Fingerprint,
  FolderSearch,
  FolderSearch2,
} from "lucide-react";

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
    <section id="how" class="relative py-20 sm:py-28 overflow-hidden">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex flex-col items-start max-w-2xl">
          <span class="text-[10px] font-mono-plex uppercase tracking-[0.22em] text-zinc-500">
            How it works
          </span>
          <h2 class="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            From local file to live playlist in
            <span> </span>
            <span class="text-[#1DB954]">four steps.</span>
          </h2>
          <p class="mt-4 text-zinc-400">
            No upload servers. No accounts to manage besides Spotify. Just a
            clean pipeline that respects your library.
          </p>
        </div>
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            data-testid="how-step-1"
            class="sonar-card relative p-6 sm:p-7 overflow-hidden group"
          >
            <div class="absolute top-6 right-6 text-[10px] font-mono-plex tracking-[0.2em] text-zinc-600">
              01
            </div>
            <div class="relative h-11 w-11 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 grid place-items-center">
              <FolderSearch2 className="h-5 w-5 text-[#1DB954]" />
              <span class="absolute -inset-2 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity how-iconbox"></span>
            </div>
            <h3 class="mt-5 font-display text-lg text-white">Pick a source</h3>
            <p class="mt-2 text-sm leading-relaxed text-zinc-400">
              Point Sonar at a music folder or drop a playlist file (M3U / CSV).
            </p>
            <span
              aria-hidden="true"
              class="hidden lg:block absolute top-1/2 -right-4 h-px w-8 bg-linear-to-r from-white/10 to-transparent"
            ></span>
          </div>
          <div
            data-testid="how-step-2"
            class="sonar-card relative p-6 sm:p-7 overflow-hidden group"
          >
            <div class="absolute top-6 right-6 text-[10px] font-mono-plex tracking-[0.2em] text-zinc-600">
              02
            </div>
            <div class="relative h-11 w-11 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 grid place-items-center">
              <Fingerprint className="h-5 w-5 text-[#1DB954]" />
              <span
                aria-hidden="true"
                class="absolute -inset-2 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity how-iconbox"
              ></span>
            </div>
            <h3 class="mt-5 font-display text-lg text-white">Read metadata</h3>
            <p class="mt-2 text-sm leading-relaxed text-zinc-400">
              ID3 tags, file names, and fingerprints — parsed locally in the
              browser.
            </p>
            <span
              aria-hidden="true"
              class="hidden lg:block absolute top-1/2 -right-4 h-px w-8 bg-linear-to-r from-white/10 to-transparent"
            ></span>
          </div>
          <div
            data-testid="how-step-3"
            class="sonar-card relative p-6 sm:p-7 overflow-hidden group"
          >
            <div class="absolute top-6 right-6 text-[10px] font-mono-plex tracking-[0.2em] text-zinc-600">
              03
            </div>
            <div class="relative h-11 w-11 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 grid place-items-center">
              <WandSparkles className="h-5 w-5 text-[#1DB954]" />
              <span
                aria-hidden="true"
                class="absolute -inset-2 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity how-iconbox"
              ></span>
            </div>
            <h3 class="mt-5 font-display text-lg text-white">
              Match on Spotify
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-zinc-400">
              Tracks are mapped to Spotify with confidence scores and
              human-readable diffs.
            </p>
            <span
              aria-hidden="true"
              class="hidden lg:block absolute top-1/2 -right-4 h-px w-8 bg-linear-to-r from-white/10 to-transparent"
            ></span>
          </div>
          <div
            data-testid="how-step-4"
            class="sonar-card relative p-6 sm:p-7 overflow-hidden group"
          >
            <div class="absolute top-6 right-6 text-[10px] font-mono-plex tracking-[0.2em] text-zinc-600">
              04
            </div>
            <div class="relative h-11 w-11 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 grid place-items-center">
              <Zap className="text-[#1DB954] w-5 h-5" />
              <span
                aria-hidden="true"
                class="absolute -inset-2 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity how-iconbox"
              ></span>
            </div>
            <h3 class="mt-5 font-display text-lg text-white">Push playlist</h3>
            <p class="mt-2 text-sm leading-relaxed text-zinc-400">
              One click to create the playlist in your Spotify account. That's
              it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
