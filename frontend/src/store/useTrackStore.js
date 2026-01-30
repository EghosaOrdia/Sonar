import { create } from "zustand";

const useTrackStore = create((set) => ({
  tracks: [],
  results: [],

  setTracks: (newTrack) => set({ tracks: newTrack }),
  setResults: (result) => set({ results: result }),

  addTrack: (track) =>
    set((state) => ({
      tracks: [...state.tracks, track],
    })),

  reset: () => set({ tracks: [], results: [] }),
}));

export default useTrackStore;
