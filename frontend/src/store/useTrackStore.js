import { create } from "zustand";

const useTrackStore = create(
  (set) => ({
    playlistName: "",
    tracks: [],
    results: [],
    playlistUrl: "",

    setPlayListName: (newPlaylist) => set({ playlistName: newPlaylist }),
    setTracks: (newTrack) => set({ tracks: newTrack }),
    addResult: (result) =>
      set((state) => ({
        results: [...state.results, result],
      })),
    setResults: (result) => set({ results: result }),
    setPlaylistUrl: (newPlaylistUrl) => set({ playlistUrl: newPlaylistUrl }),

    addTrack: (track) =>
      set((state) => ({
        tracks: [...state.tracks, track],
      })),

    reset: () => {
      set({ playlistName: "", tracks: [], results: [] });
      localStorage.removeItem("track-storage");
    },
  }),
  {
    name: "track-storage",
    partialize: (state) => ({
      tracks: state.tracks,
      results: state.results,
    }),
  },
);

export default useTrackStore;
