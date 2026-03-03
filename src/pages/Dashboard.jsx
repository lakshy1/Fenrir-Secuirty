import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Columns2,
  Plus,
  RefreshCw,
  CircleSlash2,
  TriangleAlert,
  AlertTriangle,
  SearchCheck,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/layout/PageHeader";
import StatusChip from "../components/ui/StatusChip";
import SeverityBadge from "../components/ui/SeverityBadge";
import Button from "../components/ui/Button";
import PageTransition from "../components/ui/PageTransition";
import { SkeletonBlock } from "../components/ui/Skeleton";
import { scans as initialScans } from "../data/data";

const severitySummary = [
  {
    label: "Critical Severity",
    value: 86,
    change: "+2% increase than yesterday",
    tone: "up",
    icon: CircleSlash2,
    iconWrap: "bg-[#f0dce9]",
    iconColor: "text-[#b92f69]",
  },
  {
    label: "High Severity",
    value: 16,
    change: "+0.9% increase than yesterday",
    tone: "up",
    icon: TriangleAlert,
    iconWrap: "bg-[#f2e1cf]",
    iconColor: "text-[#b56726]",
  },
  {
    label: "Medium Severity",
    value: 26,
    change: "+0.9% decrease than yesterday",
    tone: "down",
    icon: AlertTriangle,
    iconWrap: "bg-[#ece8d8]",
    iconColor: "text-[#a9911f]",
  },
  {
    label: "Low Severity",
    value: 16,
    change: "+0.9% increase than yesterday",
    tone: "up",
    icon: SearchCheck,
    iconWrap: "bg-[#dbe2f4]",
    iconColor: "text-[#355fd6]",
  },
];

const columnPresets = [
  {
    key: "all",
    label: "All Columns",
    show: { type: true, status: true, progress: true, vulnerabilities: true, lastScan: true },
  },
  {
    key: "compact",
    label: "Compact View",
    show: { type: true, status: true, progress: false, vulnerabilities: false, lastScan: true },
  },
  {
    key: "risk",
    label: "Risk View",
    show: { type: false, status: true, progress: true, vulnerabilities: true, lastScan: false },
  },
];

const filterOrder = ["all", "Completed", "Scheduled", "Failed"];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [columnPresetIndex, setColumnPresetIndex] = useState(0);
  const [scans, setScans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEntryLoader, setShowEntryLoader] = useState(() => {
    const shouldShowLoader = sessionStorage.getItem("dashboard_entry_loader") === "1";
    if (shouldShowLoader) {
      sessionStorage.removeItem("dashboard_entry_loader");
    }
    return shouldShowLoader;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const pageSize = 15;
  const activeColumns = columnPresets[columnPresetIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setScans(initialScans);
      setIsLoading(false);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showEntryLoader) {
      return;
    }
    const timer = window.setTimeout(() => setShowEntryLoader(false), 1100);
    return () => window.clearTimeout(timer);
  }, [showEntryLoader]);

  const filteredScans = useMemo(
    () =>
      scans.filter((scan) => {
        const matchesSearch =
          scan.name.toLowerCase().includes(search.toLowerCase()) ||
          scan.type.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = activeFilter === "all" || scan.status === activeFilter;
        return matchesSearch && matchesFilter;
      }),
    [scans, search, activeFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filteredScans.length / pageSize));
  const clampedPage = Math.min(currentPage, totalPages);

  const paginatedScans = useMemo(() => {
    const start = (clampedPage - 1) * pageSize;
    return filteredScans.slice(start, start + pageSize);
  }, [clampedPage, filteredScans]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => setToast(""), 1800);
  };

  const onFilterClick = () => {
    const currentIndex = filterOrder.indexOf(activeFilter);
    const nextFilter = filterOrder[(currentIndex + 1) % filterOrder.length];
    setActiveFilter(nextFilter);
    setCurrentPage(1);
    showToast(`Filter: ${nextFilter === "all" ? "All scans" : nextFilter}`);
  };

  const onColumnClick = () => {
    const nextIndex = (columnPresetIndex + 1) % columnPresets.length;
    setColumnPresetIndex(nextIndex);
    showToast(`Columns: ${columnPresets[nextIndex].label}`);
  };

  const onNewScan = () => {
    const nextId = scans.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    setScans((prev) => [
      {
        id: nextId,
        name: `New Target ${nextId}`,
        type: "Greybox",
        status: "Scheduled",
        progress: 0,
        vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
        lastScan: "Scheduled now",
      },
      ...prev,
    ]);
    showToast("New scan scheduled");
  };

  return (
    <AppLayout
      topBar={
        <PageHeader
          onPrimaryAction={() => showToast("Report exported")}
          onDangerAction={() => showToast("No active scan to stop")}
        />
      }
    >
      {showEntryLoader && (
        <div className="dashboard-entry-loader" role="status" aria-live="polite" aria-label="Loading dashboard">
          <div className="dashboard-entry-loader-panel">
            <span className="dashboard-entry-loader-spinner" aria-hidden="true" />
            <p className="dashboard-entry-loader-title">Preparing Dashboard</p>
            <p className="dashboard-entry-loader-subtitle">Loading scan intelligence and workspace state</p>
          </div>
        </div>
      )}

      <PageTransition className="dashboard-page h-full pb-3">
        <div className="h-3 dashboard-strip" />

        <section className="dashboard-meta-bar flex flex-wrap lg:flex-nowrap items-center gap-x-3 lg:gap-x-4 gap-y-2 px-4 sm:px-6 lg:px-7 py-3 sm:py-4 text-[13px] lg:text-[14px] overflow-x-auto lg:overflow-visible no-scrollbar">
          <MetaItem label="Org:" value="Project X" />
          <MetaItem label="Owner:" value="Nammagiri" />
          <MetaItem label="Total Scans:" value="100" />
          <MetaItem label="Scheduled:" value="1000" />
          <MetaItem label="Rescans:" value="100" />
          <MetaItem label="Failed Scans:" value="100" noDivider />
          <div className="dashboard-refresh w-full lg:w-auto lg:ml-auto flex items-center gap-2 whitespace-nowrap">
            <RefreshCw size={17} aria-hidden="true" />
            <span>10 mins ago</span>
          </div>
        </section>

        <section
          className="dashboard-severity-row grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 px-4 sm:px-6 lg:px-7 py-3 sm:py-4"
          aria-live="polite"
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <SeveritySkeleton key={index} />)
            : severitySummary.map((item) => {
                const Icon = item.icon;
                const TrendIcon = item.tone === "down" ? ArrowDown : ArrowUp;
                return (
                  <article key={item.label} className="dashboard-severity-card min-w-0 card-fade-up">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[16px] lg:text-[17px] leading-tight font-semibold">{item.label}</h3>
                      <span
                        className={`h-10 w-10 rounded-xl inline-flex items-center justify-center ${item.iconWrap}`}
                        aria-hidden="true"
                      >
                        <Icon size={20} className={item.iconColor} />
                      </span>
                    </div>
                    <div className="flex items-end gap-2 lg:gap-2.5 flex-nowrap min-w-0">
                      <p className="text-[34px] lg:text-[38px] leading-none font-semibold tracking-[-0.01em]">
                        {item.value}
                      </p>
                      <p
                        className={`pb-1 text-[11px] lg:text-[12px] leading-none flex items-center whitespace-nowrap ${
                          item.tone === "down" ? "text-[#3d7a57]" : "text-[#b92f69]"
                        }`}
                      >
                        <TrendIcon size={12} aria-hidden="true" />
                        {item.change}
                      </p>
                    </div>
                  </article>
                );
              })}
        </section>

        <section className="dashboard-table-panel mt-3 rounded-2xl mx-3 mb-8 sm:mx-4 lg:mx-3 pt-6 overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 px-3 sm:px-4 pt-4 sm:pt-5 pb-3">
            <div className="relative flex-1 min-w-0 w-full sm:w-auto">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#93979c]" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search scans by name or type..."
                className="dashboard-search-input w-full h-12 rounded-xs border pl-14 pr-4 text-[16px] placeholder:text-[#9ca1a8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shell-accent)]"
                aria-label="Search scans by name or type"
              />
            </div>

            <Button
              onClick={onFilterClick}
              variant="secondary"
              className="h-12 px-5 sm:px-7 w-full sm:w-auto text-[15px] sm:text-[16px]"
              ariaLabel={`Cycle filter. Current: ${activeFilter === "all" ? "All scans" : activeFilter}`}
            >
              <SlidersHorizontal size={18} aria-hidden="true" />
              {activeFilter === "all" ? "Filter" : activeFilter}
            </Button>

            <Button
              onClick={onColumnClick}
              variant="secondary"
              className="h-12 px-5 sm:px-7 w-full sm:w-auto text-[15px] sm:text-[16px]"
              ariaLabel={`Cycle visible columns. Current: ${activeColumns.label}`}
            >
              <Columns2 size={18} aria-hidden="true" />
              {activeColumns.label}
            </Button>

            <Button
              onClick={onNewScan}
              className="h-12 px-6 sm:px-8 w-full sm:w-auto text-[15px] sm:text-[16px]"
              ariaLabel="Create a new scan"
            >
              <Plus size={18} aria-hidden="true" />
              New scan
            </Button>
          </div>

          <div className="dashboard-table-shell overflow-x-auto" role="region" aria-label="Scans table">
            <table className="w-full min-w-[860px]">
              <thead>
                <tr className="h-14 border-b text-[14px]">
                  <th className="text-left px-8 font-medium">Scan Name</th>
                  {activeColumns.show.type && <th className="text-left px-8 font-medium">Type</th>}
                  {activeColumns.show.status && <th className="text-left px-8 font-medium">Status</th>}
                  {activeColumns.show.progress && <th className="text-left px-8 font-medium">Progress</th>}
                  {activeColumns.show.vulnerabilities && (
                    <th className="text-left px-8 font-medium">Vulnerability</th>
                  )}
                  {activeColumns.show.lastScan && <th className="text-left px-8 font-medium">Last Scan</th>}
                </tr>
              </thead>

              <tbody aria-live="polite" aria-busy={isLoading}>
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <tr key={index} className="dashboard-table-row h-[72px]">
                      <td className="px-8 py-3">
                        <SkeletonBlock className="h-4 w-44" />
                      </td>
                      {activeColumns.show.type && (
                        <td className="px-8 py-3">
                          <SkeletonBlock className="h-4 w-20" />
                        </td>
                      )}
                      {activeColumns.show.status && (
                        <td className="px-8 py-3">
                          <SkeletonBlock className="h-8 w-28 rounded-md" />
                        </td>
                      )}
                      {activeColumns.show.progress && (
                        <td className="px-8 py-3">
                          <SkeletonBlock className="h-2.5 w-36 rounded-full" />
                        </td>
                      )}
                      {activeColumns.show.vulnerabilities && (
                        <td className="px-8 py-3">
                          <div className="flex items-center gap-2">
                            <SkeletonBlock className="h-8 w-8 rounded-md" />
                            <SkeletonBlock className="h-8 w-8 rounded-md" />
                          </div>
                        </td>
                      )}
                      {activeColumns.show.lastScan && (
                        <td className="px-8 py-3">
                          <SkeletonBlock className="h-4 w-24" />
                        </td>
                      )}
                    </tr>
                  ))
                ) : paginatedScans.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-10 text-center text-[var(--shell-text-secondary)]">
                      No scans match the current filters.
                    </td>
                  </tr>
                ) : (
                  paginatedScans.map((scan) => (
                    <tr
                      key={scan.id}
                      onClick={() => navigate(`/scan/${scan.id}`)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigate(`/scan/${scan.id}`);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open scan details for ${scan.name}`}
                      className="dashboard-table-row h-[72px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shell-accent)] focus-visible:ring-inset"
                    >
                      <td className="px-8 text-[14px] sm:text-[12px] font-semibold">{scan.name}</td>
                      {activeColumns.show.type && (
                        <td className="px-8 text-[14px] sm:text-[12px]">{scan.type}</td>
                      )}
                      {activeColumns.show.status && (
                        <td className="px-8">
                          <StatusChip status={scan.status} />
                        </td>
                      )}
                      {activeColumns.show.progress && (
                        <td className="px-8">
                          <div className="flex items-center gap-4 min-w-[180px]">
                            <div
                              className="h-2.5 w-32 bg-[var(--shell-progress-track)] rounded-full overflow-hidden"
                              aria-label={`Scan progress ${scan.progress}%`}
                            >
                              <div
                                className={`h-full rounded-full ${
                                  scan.status === "Failed" ? "bg-[#d7574d]" : "bg-[#4ea1a4]"
                                }`}
                                style={{ width: `${scan.progress}%` }}
                              />
                            </div>
                            <span className="text-[14px] sm:text-[12px] font-medium">{scan.progress}%</span>
                          </div>
                        </td>
                      )}
                      {activeColumns.show.vulnerabilities && (
                        <td className="px-8">
                          <div className="flex items-center gap-2">
                            <SeverityBadge type="critical" count={scan.vulnerabilities.critical} />
                            <SeverityBadge type="high" count={scan.vulnerabilities.high} />
                            {scan.vulnerabilities.medium > 0 && (
                              <SeverityBadge type="medium" count={scan.vulnerabilities.medium} />
                            )}
                            {scan.vulnerabilities.low > 0 && (
                              <SeverityBadge type="low" count={scan.vulnerabilities.low} />
                            )}
                          </div>
                        </td>
                      )}
                      {activeColumns.show.lastScan && (
                        <td className="px-8 text-[14px] sm:text-[12px]">{scan.lastScan}</td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <footer className="dashboard-pagination flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t rounded-b-2xl">
            <p className="text-[14px] sm:text-[15px]">
              Showing <span className="font-semibold">{isLoading ? 0 : paginatedScans.length}</span> of{" "}
              <span className="font-semibold">{isLoading ? 0 : filteredScans.length}</span> Scans
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={clampedPage === 1 || isLoading}
                className="dashboard-page-btn h-9 w-9 !p-0 rounded-md border"
                ariaLabel="Previous page"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={clampedPage === totalPages || isLoading}
                className="dashboard-page-btn h-9 w-9 !p-0 rounded-md border"
                ariaLabel="Next page"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </footer>
        </section>
      </PageTransition>

      {toast && (
        <div
          className="fixed right-4 bottom-4 z-[110] px-4 py-2 rounded-lg bg-[#111827] text-white text-sm shadow-lg"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}
    </AppLayout>
  );
}

function MetaItem({ label, value, noDivider = false }) {
  return (
    <div className="dashboard-meta-item flex items-center gap-2 shrink-0 whitespace-nowrap">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
      {!noDivider && <span className="ml-4 hidden lg:inline">|</span>}
    </div>
  );
}

function SeveritySkeleton() {
  return (
    <div className="dashboard-severity-card min-w-0 card-fade-up">
      <div className="flex items-center justify-between mb-3">
        <SkeletonBlock className="h-5 w-40" />
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
      </div>
      <div className="flex items-end gap-2">
        <SkeletonBlock className="h-10 w-14" />
        <SkeletonBlock className="h-3.5 w-32 mb-1" />
      </div>
    </div>
  );
}
