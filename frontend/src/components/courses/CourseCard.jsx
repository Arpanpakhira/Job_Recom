import { Star, Clock, BarChart, ExternalLink, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseCard({ course, index }) {
  // Brand color scheme based on the provider
  const getProviderStyle = (provider) => {
    switch (provider.toLowerCase()) {
      case "udemy":
        return {
          bg: "bg-purple-100 dark:bg-purple-950/40",
          text: "text-purple-800 dark:text-purple-300 border-purple-200/50 dark:border-purple-900/50",
          accent: "from-purple-500 to-indigo-600",
        };
      case "coursera":
        return {
          bg: "bg-blue-100 dark:bg-blue-950/40",
          text: "text-blue-800 dark:text-blue-300 border-blue-200/50 dark:border-blue-900/50",
          accent: "from-blue-500 to-indigo-600",
        };
      case "edx":
        return {
          bg: "bg-red-100 dark:bg-red-950/40",
          text: "text-red-800 dark:text-red-300 border-red-200/50 dark:border-red-900/50",
          accent: "from-red-500 to-rose-600",
        };
      default:
        return {
          bg: "bg-slate-100 dark:bg-slate-800",
          text: "text-slate-800 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50",
          accent: "from-slate-500 to-slate-700",
        };
    }
  };

  const style = getProviderStyle(course.provider);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Badges & Meta */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${style.bg} ${style.text}`}
          >
            {course.provider}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            {course.price_type}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 min-h-[3.5rem] mb-2 leading-snug">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 truncate">
          by <span className="font-semibold text-slate-600 dark:text-slate-300">{course.instructor}</span>
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-5 leading-relaxed">
          {course.description}
        </p>

        {/* Rating and Students */}
        <div className="flex items-center gap-3 mb-5 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850">
          <div className="flex items-center gap-1">
            <Star className="text-amber-500 fill-amber-500" size={16} />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-250">
              {course.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {course.students_count.toLocaleString()} students
          </span>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="border-t border-slate-100 dark:border-slate-850 pt-4 space-y-4">
        {/* Specs */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock size={14} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <BarChart size={14} />
            {course.level}
          </span>
        </div>

        {/* Skills Tagged */}
        <div className="flex flex-wrap gap-1.5">
          {course.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Enroll Button */}
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold bg-slate-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-slate-700 hover:text-white dark:bg-slate-800 dark:hover:bg-none dark:text-white border border-slate-200 hover:border-transparent dark:border-slate-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <BookOpen size={16} />
          Go to Course
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}
