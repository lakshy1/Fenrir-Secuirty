/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";

const ThemeContext = createContext();
const STORAGE_KEY = "fenrir_shell_theme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    return storedTheme === "dark" ? "dark" : "light";
  });
  const [isSwitching, setIsSwitching] = useState(false);
  const [targetTheme, setTargetTheme] = useState(theme);

  const toggleTheme = useCallback(() => {
    if (isSwitching) {
      return;
    }
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTargetTheme(nextTheme);
    setIsSwitching(true);
    window.setTimeout(() => {
      setTheme(nextTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
      setIsSwitching(false);
    }, 360);
  }, [isSwitching, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isSwitching, targetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
