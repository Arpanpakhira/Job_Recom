import { motion } from "framer-motion";

export default function StatsCard({
    title,
    value,
    icon,
}) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm"
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm opacity-70">
                        {title}
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                        {value}
                    </h3>
                </div>

                <div>{icon}</div>
            </div>
        </motion.div>
    );
}