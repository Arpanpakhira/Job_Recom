import { motion } from "framer-motion";

export default function JobCardSkeleton({ count = 6 }) {
  return Array.from({ length: count }).map((_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.05 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 animate-pulse"
    >
      {/* Header skeleton */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2" />
        </div>
      </div>

      {/* Meta skeleton */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>

      {/* Description skeleton */}
      <div className="space-y-2 mb-5">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
      </div>

      {/* Button skeleton */}
      <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-xl" />
    </motion.div>
  ));
}
