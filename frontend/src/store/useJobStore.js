import { create } from "zustand";
import { searchJobs } from "../services/jsearchService";

const useJobStore = create((set, get) => ({
  // ── State ──
  jobs: [],
  isLoading: false,
  error: null,
  selectedRole: "",
  location: "",
  page: 1,
  hasSearched: false,

  filters: {
    datePosted: "all",
    employmentType: "",
    remoteOnly: false,
    jobRequirements: "",
  },

  // ── Actions ──
  setSelectedRole: (role) => set({ selectedRole: role, page: 1 }),
  setLocation: (location) => set({ location }),
  setPage: (page) => set({ page }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      page: 1,
    })),

  resetFilters: () =>
    set({
      filters: {
        datePosted: "all",
        employmentType: "",
        remoteOnly: false,
        jobRequirements: "",
      },
      page: 1,
    }),

  fetchJobs: async () => {
    const { selectedRole, location, page, filters } = get();
    if (!selectedRole) return;

    set({ isLoading: true, error: null });

    try {
      const result = await searchJobs(selectedRole, {
        location,
        page,
        datePosted: filters.datePosted,
        employmentType: filters.employmentType,
        remoteOnly: filters.remoteOnly,
        jobRequirements: filters.jobRequirements,
      });

      set({
        jobs: result.jobs,
        isLoading: false,
        hasSearched: true,
      });
    } catch (err) {
      const message =
        err.response?.status === 429
          ? "API rate limit reached. Please try again in a minute."
          : err.response?.status === 403
            ? "Invalid API key. Please add your RapidAPI key in the .env file."
            : err.message || "Failed to fetch jobs";

      set({
        jobs: [],
        isLoading: false,
        error: message,
        hasSearched: true,
      });
    }
  },
}));

export default useJobStore;
