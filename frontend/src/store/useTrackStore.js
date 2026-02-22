import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTrackStore = create(
  persist(
    (set) => ({
      playlistName: "",
      tracks: [],
      results: [],

      setPlayListName: (newPlaylist) => set({ playlistName: newPlaylist }),
      setTracks: (newTrack) => set({ tracks: newTrack }),
      setResults: (result) => set({ results: result }),

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
  ),
);

export default useTrackStore;
