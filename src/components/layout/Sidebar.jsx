import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  FolderCheck,
  FileSearch,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import BrandLogo from "../ui/BrandLogo";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutGrid },
  { name: "Projects", path: "/project", icon: FolderCheck },
  { name: "Scans", path: "/scans", icon: FileSearch, dot: true },
  { name: "Schedule", path: "/schedule", icon: Calendar },
];

const navItems2 = [
  { name: "Notifications", path: "/notifications", icon: Bell, dot: true },
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "Support", path: "/support", icon: HelpCircle },
];

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const { theme, toggleTheme, isSwitching } = useTheme();

  return (
    <aside className="sidebar-shell relative w-[330px] max-w-full h-dvh lg:h-full min-h-0 lg:min-h-full flex flex-col overflow-y-auto">
      <div className="lg:hidden shrink-0 flex items-center justify-between px-6 pt-6">
        <BrandLogo />
        <button
          type="button"
          onClick={onClose}
          className="h-9 w-9 inline-flex items-center justify-center rounded-md text-[var(--shell-text-secondary)] hover:bg-[var(--shell-muted-btn-bg)]"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Top Section */}
      <div className="flex-1 min-h-0 pb-5">
        {/* Navigation */}
        <nav className="mt-8 lg:mt-[128px] px-6 lg:px-8 space-y-2" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                end
                className={({ isActive }) =>
                  `sidebar-link relative flex items-center gap-4 px-5 py-3.5 rounded-full text-[14px] leading-none transition-all duration-200 ${
                    isActive
                      ? "sidebar-link-active font-semibold"
                      : "font-medium"
                  }`
                }
              >
                <span className="relative">
                  <Icon size={21} strokeWidth={1.9} />
                  {item.dot && (
                    <span
                      className="absolute -left-1 -bottom-1 h-2.5 w-2.5 rounded-full bg-[#ea873d] border border-[var(--sidebar-bg)]"
                      aria-hidden="true"
                    />
                  )}
                </span>
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-[var(--shell-border)] my-7 lg:my-8 mx-6 lg:mx-8" />

        <nav className="px-6 lg:px-8 space-y-2" aria-label="Secondary navigation">
          {navItems2.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                end
                className={({ isActive }) =>
                  `sidebar-link relative flex items-center gap-4 px-5 py-3.5 rounded-full text-[14px] leading-none transition-all duration-200 ${
                    isActive
                      ? "sidebar-link-active font-semibold"
                      : "font-medium"
                  }`
                }
              >
                <span className="relative">
                  <Icon size={21} strokeWidth={1.9} />
                  {item.dot && (
                    <span
                      className="absolute -left-1 -bottom-1 h-2.5 w-2.5 rounded-full bg-[#ea873d] border border-[var(--sidebar-bg)]"
                      aria-hidden="true"
                    />
                  )}
                </span>
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto shrink-0">
        <div className="px-6 lg:px-7 pb-3">
          <button
            type="button"
            onClick={toggleTheme}
            disabled={isSwitching}
            className="theme-toggle-btn w-full"
            aria-label="Toggle dark and light mode"
          >
            <span className={`theme-toggle-thumb ${theme === "dark" ? "is-dark" : ""}`}>
              {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
            </span>
            <span className="theme-toggle-label">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
          </button>
        </div>

        {/* Bottom Profile */}
        <div className="px-6 lg:px-7 py-6 border-t border-[var(--shell-border)]">
          <div className="relative group/profile">
            <button
              type="button"
              className="w-full group rounded-xl px-2 py-2 text-left transition-colors hover:bg-[var(--shell-muted-btn-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shell-accent)]"
              aria-label="Open profile actions"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f3d047] flex items-center justify-center text-[#1f2937] font-semibold text-base">
                  L
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[var(--shell-text-secondary)] text-[12px] leading-none mb-2 truncate">
                    admin@edu.com
                  </div>
                  <div className="text-[18px] leading-none text-[var(--shell-text-primary)] font-semibold">
                    Security Lead
                  </div>
                </div>
                <ChevronRight
                  size={26}
                  className="text-[var(--shell-text-primary)] transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </button>

            <div className="pointer-events-none absolute left-0 right-0 bottom-[calc(100%+8px)] z-50 w-full rounded-xl border border-[var(--shell-border)] bg-[var(--shell-surface)] p-1 opacity-0 shadow-[0_10px_28px_rgba(12,17,29,0.2)] transition-all duration-200 group-hover/profile:pointer-events-auto group-hover/profile:opacity-100 group-focus-within/profile:pointer-events-auto group-focus-within/profile:opacity-100 lg:left-full lg:right-auto lg:top-1/2 lg:bottom-auto lg:ml-2 lg:w-40 lg:-translate-y-1/2">
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem("dashboard_entry_loader");
                  onClose?.();
                  navigate("/login");
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--shell-text-secondary)] transition-colors hover:bg-[#fce9e7] hover:text-[#d9574b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9574b]/40"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
