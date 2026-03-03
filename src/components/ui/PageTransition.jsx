export default function PageTransition({ children, className = "", ...props }) {
  return (
    <div className={`page-transition-enter ${className}`} {...props}>
      {children}
    </div>
  );
}
