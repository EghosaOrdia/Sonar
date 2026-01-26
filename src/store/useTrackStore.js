import { create } from "zustand";

const useTrackStore = create((set) => ({
  tracks: [],

  setTracks: (newTrack) => set({ tracks: newTrack }),

  addTrack: (track) =>
    set((state) => ({
      tracks: [...state.tracks, track],
    })),

  reset: () => set({ tracks: [] }),
}));

export default useTrackStore;
