import { create } from "zustand";

const useResumeStore = create((set) => ({
    analysis: null,

    setAnalysis: (data) =>
        set({
            analysis: data,
        }),

    clearAnalysis: () =>
        set({
            analysis: null,
        }),
}));

export default useResumeStore;