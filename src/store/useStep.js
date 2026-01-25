import { create } from "zustand";

const useStep = create((set) => ({
  step: 1,
  setStep: (nextStep) => set({ step: nextStep }),
}));

export default useStep;
