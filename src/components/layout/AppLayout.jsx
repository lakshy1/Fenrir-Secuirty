import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import BrandLogo from "../ui/BrandLogo";
import { useTheme } from "../../context/ThemeContext";

export default function AppLayout({ children, topBar = null }) {
  const [open, setOpen] = useState(false);
  const { theme, isSwitching, targetTheme } = useTheme();

  return (
    <div
      className={`app-shell ${theme === "dark" ? "theme-dark" : "theme-light"} relative flex min-h-screen`}
    >
      <div className="hidden lg:block absolute top-8 left-8 z-50">
        <BrandLogo />
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed lg:static z-40 h-full lg:h-auto lg:self-stretch transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {topBar ? (
          <div className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="lg:hidden absolute left-4 top-4 text-[var(--shell-text-secondary)] z-10"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
            {topBar}
          </div>
        ) : (
          <div className="flex items-center justify-between px-8 py-5 border-b border-[var(--shell-border)] bg-[var(--shell-bg)]">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="lg:hidden text-[var(--shell-text-secondary)]"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        )}

        <main className="flex-1 min-h-0" id="main-content">
          {children}
        </main>
      </div>

      {isSwitching && (
        <div className="theme-switch-loader">
          <span className="theme-switch-spinner" />
          <p>Switching into {targetTheme} mode</p>
        </div>
      )}
    </div>
  );
}
