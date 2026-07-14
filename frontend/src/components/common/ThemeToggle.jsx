import { Moon, Sun } from "lucide-react";
import useThemeStore from "../../store/useThemeStore";

export default function ThemeToggle() {
    const { darkMode, toggleTheme } = useThemeStore();

    const handleToggle = () => {
        toggleTheme();

        document.documentElement.classList.toggle("dark");
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700"
        >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}