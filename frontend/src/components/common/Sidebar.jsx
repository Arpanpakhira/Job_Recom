import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    Upload,
    BarChart3,
    Briefcase,
    GraduationCap,
    User,
    LogOut,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

const menuItems = [
    {
        icon: LayoutDashboard,
        name: "Dashboard",
        path: "/dashboard",
    },
    {
        icon: Upload,
        name: "Upload",
        path: "/upload",
    },
    {
        icon: BarChart3,
        name: "Analytics",
        path: "/analytics",
    },
    {
        icon: Briefcase,
        name: "Job Listings",
        path: "/jobs",
    },
    {
        icon: GraduationCap,
        name: "Courses",
        path: "/courses",
    },
    {
        icon: User,
        name: "Profile",
        path: "/profile",
    },
];

export default function Sidebar() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <aside className="w-64 min-h-screen border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col justify-between">
            <div className="flex-1">
                <div className="p-6">
                    <h2 className="font-bold text-xl">
                        SmartMatch
                    </h2>
                </div>

                <nav className="px-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                        >
                            <item.icon size={20} />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all font-medium"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
}