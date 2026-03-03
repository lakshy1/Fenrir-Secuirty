import { Home } from "lucide-react";
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

  return (
    <div className="dashboard-topbar flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pl-14 pr-4 sm:px-8 py-4 border-b">
      <div className="flex items-center gap-2 sm:gap-3 text-[15px] sm:text-[18px] flex-wrap">
        <span className="font-semibold">{title}</span>
        <Home size={14} className="dashboard-breadcrumb-icon" />
        <span className="dashboard-breadcrumb-muted">/</span>
        <span className="dashboard-breadcrumb-muted">{crumbOne}</span>
        <span className="dashboard-breadcrumb-muted">/</span>
        <span className="dashboard-breadcrumb-accent">{crumbTwo}</span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <Button
          onClick={onPrimaryAction}
          variant="secondary"
          className="dashboard-outline-btn h-11 sm:h-12 px-4 sm:px-6 flex-1 sm:flex-none rounded-xl text-[14px] sm:text-[16px] font-medium"
          ariaLabel={primaryAction}
        >
          {primaryAction}
        </Button>
        <Button
          onClick={onDangerAction}
          variant="danger"
          className="h-11 sm:h-12 px-4 sm:px-6 flex-1 sm:flex-none rounded-xl text-[14px] sm:text-[16px] font-medium"
          ariaLabel={dangerAction}
        >
          {dangerAction}
        </Button>
      </div>
    </div>
  );
}
