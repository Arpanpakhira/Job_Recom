import { create } from "zustand";
import { searchCourses } from "../services/courseService";

const useCourseStore = create((set, get) => ({
  // ── State ──
  courses: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedSkill: "",
  page: 1,
  totalPages: 1,
  totalCount: 0,
  hasSearched: false,

  filters: {
    provider: "",
    level: "",
    priceType: "All",
  },

  // ── Actions ──
  setSearchQuery: (query) => set({ searchQuery: query, page: 1, selectedSkill: "" }),
  setSelectedSkill: (skill) => set({ selectedSkill: skill, searchQuery: "", page: 1 }),
  setPage: (page) => set({ page }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      page: 1,
    })),

  resetFilters: () =>
    set({
      filters: {
        provider: "",
        level: "",
        priceType: "All",
      },
      searchQuery: "",
      selectedSkill: "",
      page: 1,
    }),

  fetchCourses: async () => {
    const { searchQuery, selectedSkill, page, filters } = get();
    
    // The search keyword can be the query string or the selected lacking skill chip
    const activeQuery = selectedSkill || searchQuery;

    set({ isLoading: true, error: null });

    try {
      const result = await searchCourses(activeQuery, {
        page,
        provider: filters.provider,
        level: filters.level,
        priceType: filters.priceType,
      });

      set({
        courses: result.courses,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
        isLoading: false,
        hasSearched: true,
      });
    } catch (err) {
      set({
        courses: [],
        isLoading: false,
        error: err.message || "Failed to fetch courses",
        hasSearched: true,
      });
    }
  },
}));

export default useCourseStore;
