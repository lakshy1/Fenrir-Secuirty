export function SkeletonBlock({ className = "" }) {
  return (
    <span
      className={`block rounded-md bg-[linear-gradient(110deg,rgba(148,163,184,0.22)_8%,rgba(148,163,184,0.34)_18%,rgba(148,163,184,0.22)_33%)] bg-[length:220%_100%] animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBlock
          key={index}
          className={`h-3.5 ${index === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}
