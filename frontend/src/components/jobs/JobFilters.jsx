import {
  MapPin,
  Calendar,
  Briefcase,
  Wifi,
  RotateCcw,
  Search,
  Award,
} from "lucide-react";

const DATE_OPTIONS = [
  { value: "all", label: "Any time" },
  { value: "today", label: "Today" },
  { value: "3days", label: "Last 3 days" },
  { value: "week", label: "Past week" },
  { value: "month", label: "Past month" },
];

const EMPLOYMENT_OPTIONS = [
  { value: "", label: "All types" },
  { value: "FULLTIME", label: "Full-time" },
  { value: "PARTTIME", label: "Part-time" },
  { value: "CONTRACTOR", label: "Contract" },
  { value: "INTERN", label: "Internship" },
];

const EXPERIENCE_OPTIONS = [
  { value: "", label: "Experience" },
  { value: "no_experience", label: "Fresher" },
  { value: "under_3_years_experience", label: "0-3 years" },
  { value: "more_than_3_years_experience", label: "3years+" },
];

export default function JobFilters({
  location,
  onLocationChange,
  filters,
  onFilterChange,
  onReset,
  onSearch,
  isLoading,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Location Input */}
        <div className="flex-1 relative">
          <MapPin
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="City, state, or country..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>

        {/* Date Posted */}
        <div className="relative">
          <Calendar
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <select
            value={filters.datePosted}
            onChange={(e) =>
              onFilterChange("datePosted", e.target.value)
            }
            className="pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {DATE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Employment Type */}
        <div className="relative">
          <Briefcase
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <select
            value={filters.employmentType}
            onChange={(e) =>
              onFilterChange("employmentType", e.target.value)
            }
            className="pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {EMPLOYMENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div className="relative">
          <Award
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <select
            value={filters.jobRequirements}
            onChange={(e) =>
              onFilterChange("jobRequirements", e.target.value)
            }
            className="pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {EXPERIENCE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Remote Toggle */}
        <button
          onClick={() =>
            onFilterChange("remoteOnly", !filters.remoteOnly)
          }
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 cursor-pointer ${
            filters.remoteOnly
              ? "bg-teal-50 dark:bg-teal-900/30 border-teal-400 dark:border-teal-600 text-teal-700 dark:text-teal-400"
              : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-400"
          }`}
        >
          <Wifi size={14} />
          Remote
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          title="Reset filters"
        >
          <RotateCcw size={14} />
        </button>

        {/* Search */}
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
        >
          <Search size={14} />
          Search
        </button>
      </div>
    </div>
  );
}
