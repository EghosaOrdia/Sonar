import { create } from "zustand";

const useAuth = create((set) => ({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: (user) => set({ isAuthenticated: true, user }),
  clearAuth: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuth;
