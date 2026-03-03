const variantStyles = {
  primary: "dashboard-accent-btn text-white border border-transparent",
  secondary: "dashboard-muted-btn border",
  ghost:
    "border border-transparent text-[var(--shell-text-secondary)] bg-transparent hover:bg-[var(--shell-muted-btn-bg)] hover:text-[var(--shell-text-primary)]",
  danger: "dashboard-danger-btn border",
};

export default function Button({
  as: Component = "button",
  type = "button",
  variant = "primary",
  className = "",
  isLoading = false,
  ariaLabel,
  disabled,
  children,
  ...props
}) {
  const isDisabled = disabled || isLoading;
  const spinnerTone = variant === "primary" ? "border-white/40 border-t-white" : "border-[#9aa4b4] border-t-[var(--shell-accent)]";

  return (
    <Component
      type={Component === "button" ? type : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shell-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--shell-surface)] ${variantStyles[variant] ?? variantStyles.primary} ${className}`}
      aria-label={ariaLabel}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <span
          className={`h-4 w-4 rounded-full border-2 ${spinnerTone} animate-[spin_900ms_linear_infinite]`}
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  );
}
