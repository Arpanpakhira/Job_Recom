import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  SearchX,
  AlertTriangle,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageTransition from "../components/common/PageTransition";
import CourseFilters from "../components/courses/CourseFilters";
import CourseCard from "../components/courses/CourseCard";
import useResumeStore from "../store/useResumeStore";
import useCourseStore from "../store/useCourseStore";

export default function CourseListings() {
  const analysis = useResumeStore((s) => s.analysis);
  const {
    courses,
    isLoading,
    error,
    selectedSkill,
    searchQuery,
    page,
    totalPages,
    hasSearched,
    setSearchQuery,
    setPage,
    fetchCourses,
  } = useCourseStore();

  // Initial fetch setting
  useEffect(() => {
    if (analysis && !selectedSkill && !searchQuery) {
      // Fetch courses based on the recommended role first
      const defaultRole = analysis.recommendedRole || analysis.recommendedRoles?.[0]?.role || "Software Developer";
      setSearchQuery(defaultRole);
    }
  }, [analysis, selectedSkill, searchQuery, setSearchQuery]);

  // Trigger search when page, selectedSkill, or searchQuery changes
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses, page]);

  // Pagination triggers
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
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
              Analyze your resume to calculate your performance score, identify key lacking skills, and get personalized course recommendations.
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

  // Active query indicator text
  const activeSearch = selectedSkill || searchQuery || "General";

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-6xl">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Recommended Courses</h1>
                <p className="text-sm opacity-60">
                  Improve your profile score by learning key skills in lacking areas
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <CourseFilters />

          {/* Results section */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    <div className="h-4 w-10 bg-slate-100 dark:bg-slate-850 rounded" />
                  </div>
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-850 rounded" />
                  <div className="h-20 bg-slate-100 dark:bg-slate-850 rounded" />
                  <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-sm text-red-500 dark:text-red-400 max-w-md mb-6">
                {error}
              </p>
              <button
                onClick={fetchCourses}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
              >
                Try Again
              </button>
            </motion.div>
          ) : courses.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Showing{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-250">
                    {courses.length}
                  </span>{" "}
                  courses for{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    "{activeSearch}"
                  </span>
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {courses.map((course, i) => (
                  <CourseCard
                    key={course.course_id}
                    course={course}
                    index={i}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-6 pb-8">
                  <button
                    onClick={handlePrevPage}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <span className="text-sm font-semibold text-slate-500">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : hasSearched ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <SearchX size={28} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No courses found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                Try adjusting your filters or searching for a different skill topic.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-6">
                <GraduationCap size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Select a skill focus area
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                Click on one of your focus skill chips above to get curated learning suggestions.
              </p>
            </motion.div>
          )}

        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
