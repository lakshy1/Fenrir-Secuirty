import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-carddark text-sm transition-all"
    >
      Toggle Theme
    </button>
  );
}