import { create } from "zustand";

const useThemeStore = create((set) => ({
    darkMode:
        localStorage.getItem("theme") === "dark",

    toggleTheme: () =>
        set((state) => {
            const next = !state.darkMode;

            localStorage.setItem(
                "theme",
                next ? "dark" : "light"
            );

            return {
                darkMode: next,
            };
        }),
}));

export default useThemeStore;