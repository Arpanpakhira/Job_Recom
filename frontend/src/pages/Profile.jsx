import DashboardLayout from "../layouts/DashboardLayout";
import PageTransition from "../components/common/PageTransition";
import useResumeStore from "../store/useResumeStore";
import useAuthStore from "../store/useAuthStore";
import { Mail, Briefcase, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const getInitials = (name) => {
    if (!name) return "US";
    const trimmed = name.trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length >= 2) {
        return parts[0].slice(0, 2).toUpperCase();
    } else if (parts.length === 1) {
        return parts[0].toUpperCase();
    }
    return "US";
};

export default function Profile() {
    const { user } = useAuthStore();
    const analysis = useResumeStore((state) => state.analysis);

    // Split extracted resume text into lines to display line-by-line
    const rawLines = analysis?.extractedText
        ? analysis.extractedText.split(/\r?\n/)
        : [];

    // Filter out duplicate non-empty lines to prevent duplicated blocks
    const seen = new Set();
    const lines = [];
    for (const line of rawLines) {
        const trimmed = line.trim();
        if (trimmed.length === 0) {
            lines.push(line);
        } else if (!seen.has(trimmed)) {
            seen.add(trimmed);
            lines.push(line);
        }
    }

    return (
        <DashboardLayout>
            <PageTransition>
                <div className="space-y-8 max-w-6xl mx-auto">
                    <div>
                        <h1 className="text-4xl font-bold">Profile</h1>
                        <p className="opacity-70 mt-2">
                            Manage your account and view your analyzed resume content.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: User details */}
                        <div className="space-y-6">
                            <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-3xl shadow-lg mb-4">
                                    {getInitials(user?.name)}
                                </div>
                                <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
                                <p className="text-sm opacity-60 flex items-center gap-1.5 mt-1">
                                    <Mail size={14} />
                                    {user?.email}
                                </p>

                                {analysis && (
                                    <div className="w-full mt-6 pt-6 border-t border-gray-100 dark:border-slate-800 text-left space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl">
                                                <Briefcase size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs opacity-50">Target Role</p>
                                                <p className="font-semibold text-sm">
                                                    {analysis.recommendedRole}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-xl">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs opacity-50">Skills Extracted</p>
                                                <p className="font-semibold text-sm">
                                                    {analysis.skills.length} Skills
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Parsed Resume Content */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl h-full flex flex-col">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FileText className="text-blue-600" size={22} />
                                    Analyzed Resume Content
                                </h2>
                                
                                <div className="border-b border-gray-100 dark:border-slate-800 mb-6" />

                                {analysis ? (
                                    <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20 p-6 rounded-2xl border border-gray-100 dark:border-slate-800/50 text-xs md:text-sm leading-relaxed text-left">
                                        {lines.map((line, index) => {
                                            const trimmed = line.trim();
                                            if (trimmed.length === 0) {
                                                return <div key={index} className="h-4" />;
                                            }
                                            return (
                                                <div
                                                    key={index}
                                                    className="py-1 px-3 rounded-lg border-l-2 border-transparent hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/10 hover:translate-x-1.5 transition-all duration-200 opacity-85 hover:opacity-100 cursor-default whitespace-pre-wrap min-h-[1.6rem]"
                                                >
                                                    {line}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                                        <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-gray-400 dark:text-gray-500 mb-4">
                                            <Upload size={32} />
                                        </div>
                                        <h3 className="text-lg font-semibold">No Resume Analyzed</h3>
                                        <p className="text-sm opacity-60 mt-1 max-w-sm">
                                            Please upload and analyze a resume first to view its parsed content here.
                                        </p>
                                        <Link
                                            to="/upload"
                                            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition shadow-lg shadow-blue-500/20"
                                        >
                                            Upload Resume
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}