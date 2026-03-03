const chipStyles = {
  Completed: "bg-[#e6f4ea] border border-[#b8e0c2] text-[#45af5e]",
  Scheduled: "bg-[#e6eaf0] border border-[#cfd6de] text-[#65748d]",
  Failed: "bg-[#fce9e7] border border-[#efbfba] text-[#d9574b]",
};

export default function StatusChip({ status, className = "" }) {
  const safeStatus = chipStyles[status] ? status : "Scheduled";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-[14px] leading-none font-semibold ${chipStyles[safeStatus]} ${className}`}
      role="status"
      aria-label={`Scan status: ${safeStatus}`}
    >
      {safeStatus}
    </span>
  );
}
