import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  SearchX,
  AlertTriangle,
  Upload,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageTransition from "../components/common/PageTransition";
import RoleChips from "../components/jobs/RoleChips";
import JobFilters from "../components/jobs/JobFilters";
import JobCard from "../components/jobs/JobCard";
import JobCardSkeleton from "../components/jobs/JobCardSkeleton";

import useResumeStore from "../store/useResumeStore";
import useJobStore from "../store/useJobStore";

export default function JobListings() {
  const analysis = useResumeStore((s) => s.analysis);

  const {
    jobs,
    isLoading,
    error,
    selectedRole,
    location,
    page,
    filters,
    hasSearched,
    setSelectedRole,
    setLocation,
    setPage,
    setFilter,
    resetFilters,
    fetchJobs,
  } = useJobStore();

  // Auto-search when role changes
  const handleRoleSelect = useCallback(
    (role) => {
      setSelectedRole(role);
    },
    [setSelectedRole]
  );

  // Trigger search when selectedRole changes
  useEffect(() => {
    if (selectedRole) {
      fetchJobs();
    }
  }, [selectedRole, fetchJobs]);

  // Search handler for manual search button / Enter key
  const handleSearch = useCallback(() => {
    if (selectedRole) {
      fetchJobs();
    }
  }, [selectedRole, fetchJobs]);

  // Pagination
  const handleNextPage = () => {
    setPage(page + 1);
    fetchJobs();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchJobs();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── No Resume Uploaded ──
  if (!analysis) {
    return (
      <DashboardLayout>
        <PageTransition>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/30"
            >
              <Upload size={40} className="text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-3">
              Upload Your Resume First
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
              We need to analyze your resume to recommend the best job
              roles for you. Upload your resume to get personalized job
              listings.
            </p>

            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Upload size={18} />
              Upload Resume
            </Link>
          </div>
        </PageTransition>
      </DashboardLayout>
    );
  }

  const recommendedRoles = analysis.recommendedRoles || [];

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-6xl">
          {/* ── Header ── */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Briefcase size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Job Listings</h1>
                {/*<p className="text-sm opacity-60">
                  Real-time jobs matching your AI-predicted roles
                </p>*/}
              </div>
            </div>
          </div>

          {/* ── Role Chips ── */}
          {recommendedRoles.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles
                  size={16}
                  className="text-amber-500"
                />
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Your Recommended Roles
                </h2>
              </div>
              <RoleChips
                roles={recommendedRoles}
                selectedRole={selectedRole}
                onSelect={handleRoleSelect}
              />
            </div>
          )}

          {/* ── Filters ── */}
          <JobFilters
            location={location}
            onLocationChange={setLocation}
            filters={filters}
            onFilterChange={setFilter}
            onReset={resetFilters}
            onSearch={handleSearch}
            isLoading={isLoading}
          />

          {/* ── Results ── */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-5">
              <JobCardSkeleton count={6} />
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <AlertTriangle
                  size={28}
                  className="text-red-500"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-sm text-red-500 dark:text-red-400 max-w-md">
                {error}
              </p>
              <button
                onClick={handleSearch}
                className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
              >
                Try Again
              </button>
            </motion.div>
          ) : jobs.length > 0 ? (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {jobs.length}
                </span>{" "}
                jobs for{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  "{selectedRole}"
                </span>
                {location && (
                  <>
                    {" "}
                    in{" "}
                    <span className="font-semibold">
                      {location}
                    </span>
                  </>
                )}
              </p>

              <div className="grid md:grid-cols-2 gap-5">
                {jobs.map((job, i) => (
                  <JobCard
                    key={job.job_id || i}
                    job={job}
                    index={i}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4 pt-4 pb-8">
                <button
                  onClick={handlePrevPage}
                  disabled={page <= 1}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="text-sm font-semibold text-slate-500">
                  Page {page}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={jobs.length < 10}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          ) : hasSearched ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <SearchX
                  size={28}
                  className="text-slate-400"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No jobs found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                Try adjusting your filters, changing the location,
                or selecting a different role.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-6">
                <Briefcase
                  size={32}
                  className="text-blue-500"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Select a role to get started
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                Click on one of your recommended roles above to
                search for matching job listings.
              </p>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
