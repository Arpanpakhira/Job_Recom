import { useState, useEffect } from "react";
import { Search, Sparkles, X, RefreshCw } from "lucide-react";
import useResumeStore from "../../store/useResumeStore";
import useCourseStore from "../../store/useCourseStore";
import { ROLE_REQUIRED_SKILLS } from "../../utils/constants";

export default function CourseFilters() {
  const analysis = useResumeStore((s) => s.analysis);
  const {
    searchQuery,
    selectedSkill,
    filters,
    isLoading,
    setSearchQuery,
    setSelectedSkill,
    setFilter,
    resetFilters,
    fetchCourses,
  } = useCourseStore();

  const [localSearch, setLocalSearch] = useState(searchQuery || selectedSkill || "");

  // Update local search input when global state changes
  useEffect(() => {
    const targetVal = searchQuery || selectedSkill || "";
    if (localSearch !== targetVal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalSearch(targetVal);
    }
  }, [searchQuery, selectedSkill, localSearch]);

  // Extract lacking skills for quick chips
  let lackingSkills = [];
  if (analysis) {
    const role = analysis.recommendedRole || analysis.recommendedRoles?.[0]?.role || "Software Developer";
    const requiredSkills = ROLE_REQUIRED_SKILLS[role] || [];
    const userSkillsLower = (analysis.skills || []).map((s) => s.toLowerCase());
    lackingSkills = requiredSkills.filter(
      (skill) => !userSkillsLower.includes(skill.toLowerCase())
    );
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      fetchCourses();
    }
  };

  const handleClear = () => {
    setLocalSearch("");
    resetFilters();
    fetchCourses();
  };

  const handleSkillChipClick = (skill) => {
    if (selectedSkill === skill) {
      // Toggle off
      setSelectedSkill("");
    } else {
      setSelectedSkill(skill);
    }
    fetchCourses();
  };

  return (
    <div className="space-y-6">
      
      {/* ── Lacking Skills Recommendation Chips ── */}
      {lackingSkills.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-amber-500 fill-amber-500/20" />
            <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Focus Areas (Skills Missing From Your Resume)
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {lackingSkills.map((skill) => {
              const isSelected = selectedSkill === skill;
              return (
                <button
                  key={skill}
                  onClick={() => handleSkillChipClick(skill)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 border border-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                      : "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-950/40 hover:border-red-300 dark:hover:border-red-900 hover:scale-102"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white animate-ping" : "bg-red-500"}`} />
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Search Bar & Filter Options ── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        
        {/* Search form */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search courses by topic, skill, instructor..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all font-medium"
            />
            {localSearch && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex gap-2.5">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
            >
              Search
            </button>
            
            <button
              type="button"
              onClick={handleClear}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all cursor-pointer"
              title="Reset Filters"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </form>

        {/* Dropdown filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-slate-850">
          
          {/* Provider */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform</label>
            <select
              value={filters.provider}
              onChange={(e) => {
                setFilter("provider", e.target.value);
                fetchCourses();
              }}
              className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-semibold text-sm transition-all"
            >
              <option value="">All Platforms</option>
              <option value="Udemy">Udemy</option>
              <option value="Coursera">Coursera</option>
              <option value="edX">edX</option>
            </select>
          </div>

          {/* Level */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Difficulty Level</label>
            <select
              value={filters.level}
              onChange={(e) => {
                setFilter("level", e.target.value);
                fetchCourses();
              }}
              className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-semibold text-sm transition-all"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Pricing */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pricing</label>
            <select
              value={filters.priceType}
              onChange={(e) => {
                setFilter("priceType", e.target.value);
                fetchCourses();
              }}
              className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-semibold text-sm transition-all"
            >
              <option value="All">All Types</option>
              <option value="Free">Free / Audit Available</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}
