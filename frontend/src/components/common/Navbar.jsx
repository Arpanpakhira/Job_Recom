import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BriefcaseBusiness, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import useAuthStore from "../../store/useAuthStore";

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

export default function Navbar() {
    const location = useLocation();
    const { isAuthenticated, user, logout } = useAuthStore();

    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    const links = isAuthenticated
        ? [
              { name: "Home", path: "/" },
              { name: "Upload", path: "/upload" },
              { name: "Dashboard", path: "/dashboard" },
              { name: "Analytics", path: "/analytics" },
              { name: "Jobs", path: "/jobs" },
              { name: "Courses", path: "/courses" },
          ]
        : isAuthPage
            ? []
            : [{ name: "Home", path: "/" }];

    return (
        <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="flex items-center gap-2 font-bold text-xl"
                >
                    <BriefcaseBusiness size={28} />
                    SmartMatch
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`transition-all duration-300 ${
                                location.pathname === link.path
                                    ? "font-semibold text-blue-600 dark:text-blue-400"
                                    : "opacity-70 hover:opacity-100"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    {isAuthenticated ? (
                        <div className="relative group">
                            {/* Circle Avatar with Initials */}
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                                {getInitials(user?.name)}
                            </div>

                            {/* Dropdown Menu on Hover */}
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                                <p className="font-semibold text-sm truncate text-gray-800 dark:text-gray-100">
                                    {user?.name || "User"}
                                </p>
                                <p className="text-xs opacity-60 truncate text-gray-500 dark:text-gray-400 mb-3">
                                    {user?.email || ""}
                                </p>
                                <div className="border-t border-gray-100 dark:border-slate-800 my-2" />
                                <button
                                    onClick={logout}
                                    className="w-full text-left flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 py-2 px-3 rounded-xl transition"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
