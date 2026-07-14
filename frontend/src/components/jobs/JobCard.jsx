import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Building2,
  ExternalLink,
  Briefcase,
} from "lucide-react";

function getTimeAgo(dateString) {
  if (!dateString) return "";
  const now = new Date();
  const posted = new Date(dateString);
  const diffMs = now - posted;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function getEmploymentBadge(type) {
  const map = {
    FULLTIME: {
      label: "Full-time",
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    },
    PARTTIME: {
      label: "Part-time",
      color:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    },
    CONTRACTOR: {
      label: "Contract",
      color:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    },
    INTERN: {
      label: "Internship",
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
    },
  };
  return map[type] || { label: type, color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" };
}

export default function JobCard({ job, index }) {
  const badge = getEmploymentBadge(job.job_employment_type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -4 }}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
    >
      {/* Header: Logo + Company */}
      <div className="flex items-start gap-4 mb-4">
        {job.employer_logo ? (
          <img
            src={job.employer_logo}
            alt={job.employer_name}
            className="w-12 h-12 rounded-xl object-contain bg-gray-50 dark:bg-slate-800 p-1 border border-slate-100 dark:border-slate-700 shrink-0"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0 ${job.employer_logo ? "hidden" : ""}`}
        >
          {job.employer_name?.[0] || "?"}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {job.job_title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-sm opacity-70">
            <Building2 size={14} />
            <span className="truncate">{job.employer_name}</span>
          </div>
        </div>
      </div>

      {/* Meta: Location, Date, Type */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
        {job.job_city || job.job_country ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <MapPin size={13} />
            {[job.job_city, job.job_state, job.job_country]
              .filter(Boolean)
              .join(", ")}
          </span>
        ) : null}

        {job.job_is_remote && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400">
            🌐 Remote
          </span>
        )}

        {badge.label && (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${badge.color}`}
          >
            <Briefcase size={12} />
            {badge.label}
          </span>
        )}

        {job.job_posted_at_datetime_utc && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            <Clock size={13} />
            {getTimeAgo(job.job_posted_at_datetime_utc)}
          </span>
        )}
      </div>

      {/* Description */}
      {job.job_description && (
        <p className="text-sm opacity-60 line-clamp-3 mb-5 leading-relaxed">
          {job.job_description}
        </p>
      )}

      {/* Apply Button */}
      <a
        href={job.job_apply_link || job.job_google_link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
      >
        Apply Now
        <ExternalLink size={14} />
      </a>

      {/* Salary hint if available */}
      {(job.job_min_salary || job.job_max_salary) && (
        <div className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          💰{" "}
          {job.job_min_salary && job.job_max_salary
            ? `$${job.job_min_salary.toLocaleString()} – $${job.job_max_salary.toLocaleString()}`
            : job.job_min_salary
              ? `From $${job.job_min_salary.toLocaleString()}`
              : `Up to $${job.job_max_salary.toLocaleString()}`}
          {job.job_salary_period ? ` / ${job.job_salary_period.toLowerCase()}` : ""}
        </div>
      )}
    </motion.div>
  );
}
