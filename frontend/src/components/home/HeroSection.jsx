import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Upload } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 py-24 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-bold leading-tight"
                        >
                            Discover Jobs
                            <span className="block text-blue-600">
                                Powered by AI
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 text-lg opacity-80 max-w-xl"
                        >
                            Upload your resume and get AI-powered role
                            predictions, skill insights, and personalized
                            job recommendations instantly.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-4 mt-8"
                        >
                            <Link
                                to="/upload"
                                className="px-6 py-4 rounded-xl bg-blue-600 text-white flex items-center gap-2 hover:scale-105 transition"
                            >
                                <Upload size={18} />
                                Upload Resume
                            </Link>

                            <Link
                                to="/dashboard"
                                className="px-6 py-4 rounded-xl border flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                Explore Dashboard
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: .9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: .7 }}
                        className="bg-white dark:bg-slate-900 border rounded-3xl p-8 shadow-xl"
                    >
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold">
                                    Recommended Role
                                </h3>
                                <p className="text-3xl font-bold text-blue-600">
                                    Backend Developer
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Match Confidence
                                </h3>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mt-2">
                                    <div className="bg-blue-600 h-4 rounded-full w-[91%]" />
                                </div>
                                <p className="mt-2 font-semibold">
                                    91%
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">
                                    Skills Detected
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Java",
                                        "Spring Boot",
                                        "SQL",
                                        "Hibernate",
                                    ].map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full bg-blue-100 text-blue-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}