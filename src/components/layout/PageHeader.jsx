import { Home } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

export default function PageHeader({
  title = "Scan",
  breadcrumb = ["Private Assets", "New Scan"],
  primaryAction = "Export Report",
  dangerAction = "Stop Scan",
  onPrimaryAction,
  onDangerAction,
}) {
  const crumbOne = breadcrumb[0] ?? "";
  const crumbTwo = breadcrumb[1] ?? "";
  const [primaryProgress, setPrimaryProgress] = useState(null);
  const [dangerProgress, setDangerProgress] = useState(null);
  const [lastEvent, setLastEvent] = useState("System idle");
  const [liveTime, setLiveTime] = useState(() => new Date());
  const timersRef = useRef([]);

  useEffect(() => {
    const clockId = window.setInterval(() => setLiveTime(new Date()), 1000);
    return () => {
      window.clearInterval(clockId);
      timersRef.current.forEach((timer) => window.clearInterval(timer));
      timersRef.current = [];
    };
  }, []);

  const formatTime = (value) =>
    value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const runProgress = ({ setter, duration, onDone }) => {
    const stepMs = 120;
    const steps = Math.ceil(duration / stepMs);
    const increment = 100 / steps;
    let value = 0;

    setter(0);
    const timerId = window.setInterval(() => {
      value = Math.min(100, Math.round(value + increment));
      setter(value);

      if (value >= 100) {
        window.clearInterval(timerId);
        timersRef.current = timersRef.current.filter((timer) => timer !== timerId);
        window.setTimeout(() => {
          setter(null);
          Promise.resolve(onDone?.()).catch(() => {});
        }, 120);
      }
    }, stepMs);

    timersRef.current.push(timerId);
  };

  const handlePrimary = () => {
    if (primaryProgress !== null) {
      return;
    }
    setLastEvent("Exporting report...");
    runProgress({
      setter: setPrimaryProgress,
      duration: 1600,
      onDone: () => {
        setLastEvent(`Report exported at ${formatTime(new Date())}`);
        onPrimaryAction?.();
      },
    });
  };

  const handleDanger = () => {
    if (dangerProgress !== null) {
      return;
    }
    setLastEvent(`${dangerAction} in progress...`);
    runProgress({
      setter: setDangerProgress,
      duration: 1200,
      onDone: () => {
        setLastEvent(`${dangerAction} completed at ${formatTime(new Date())}`);
        onDangerAction?.();
      },
    });
  };

  const primaryLabel =
    primaryProgress === null ? primaryAction : `Exporting ${String(primaryProgress).padStart(2, "0")}%`;
  const dangerVerb = /start/i.test(dangerAction)
    ? "Starting"
    : /stop/i.test(dangerAction)
      ? "Stopping"
      : "Updating";
  const dangerLabel =
    dangerProgress === null ? dangerAction : `${dangerVerb} ${String(dangerProgress).padStart(2, "0")}%`;

  return (
    <div className="dashboard-topbar flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pl-14 pr-4 sm:px-8 py-4 border-b">
      <div className="flex items-center gap-2 sm:gap-3 text-[15px] sm:text-[18px] flex-wrap">
        <span className="font-semibold">{title}</span>
        <Home size={14} className="dashboard-breadcrumb-icon" />
        <span className="dashboard-breadcrumb-muted">/</span>
        <span className="dashboard-breadcrumb-muted">{crumbOne}</span>
        <span className="dashboard-breadcrumb-muted">/</span>
        <span className="dashboard-breadcrumb-accent">{crumbTwo}</span>
        <span className="text-[12px] sm:text-[13px] text-[var(--shell-text-secondary)] ml-1">
          {formatTime(liveTime)}
        </span>
      </div>

      <div className="flex flex-col items-stretch sm:items-end gap-2 w-full sm:w-auto">
        <p
          className="text-[12px] text-[var(--shell-text-secondary)] sm:text-right"
          role="status"
          aria-live="polite"
        >
          {lastEvent}
        </p>
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <Button
          onClick={handlePrimary}
          variant="secondary"
          className="dashboard-outline-btn h-11 sm:h-12 px-4 sm:px-6 flex-1 sm:flex-none rounded-xl text-[14px] sm:text-[16px] font-medium"
          ariaLabel={primaryAction}
          disabled={primaryProgress !== null}
        >
          {primaryLabel}
        </Button>
        <Button
          onClick={handleDanger}
          variant="danger"
          className="h-11 sm:h-12 px-4 sm:px-6 flex-1 sm:flex-none rounded-xl text-[14px] sm:text-[16px] font-medium"
          ariaLabel={dangerAction}
          disabled={dangerProgress !== null}
        >
          {dangerLabel}
        </Button>
        </div>
      </div>
    </div>
  );
}
