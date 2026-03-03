const severityStyles = {
  critical: "bg-[#d9584d] text-white",
  high: "bg-[#e08537] text-white",
  medium: "bg-[#e3b943] text-[#1f2937]",
  low: "bg-[#62be68] text-white",
};

const severityLabel = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function SeverityBadge({ type, count = 0, showLabel = false, className = "" }) {
  const normalizedType = String(type || "").toLowerCase();
  const visualType = severityStyles[normalizedType] ? normalizedType : "low";
  const label = severityLabel[visualType];

  return (
    <span
      className={`h-8 min-w-8 px-2.5 inline-flex items-center justify-center gap-1 rounded-md text-[13px] font-semibold ${severityStyles[visualType]} ${className}`}
      role="status"
      aria-label={`${label} severity vulnerabilities: ${count}`}
      title={`${label}: ${count}`}
    >
      {showLabel && <span className="text-[11px] uppercase tracking-wide">{label}</span>}
      <span>{count}</span>
    </span>
  );
}
