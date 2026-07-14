import { motion } from "framer-motion";

export default function RoleChips({
  roles,
  selectedRole,
  onSelect,
}) {
  if (!roles || roles.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {roles.map((item, i) => {
        const roleName = typeof item === "string" ? item : item.role;
        const score = typeof item === "object" ? item.score : null;
        const isActive = selectedRole === roleName;

        return (
          <motion.button
            key={roleName}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(roleName)}
            className={`
              relative px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer border
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/25"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
              }
            `}
          >
            {roleName}
            {score !== null && (
              <span
                className={`ml-2 text-xs font-normal ${
                  isActive
                    ? "text-blue-100"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {(score * 100).toFixed(0)}%
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
