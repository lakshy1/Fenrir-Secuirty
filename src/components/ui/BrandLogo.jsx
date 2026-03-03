export default function BrandLogo() {
  return (
    <div className="flex items-center gap-3 select-none align-middle">
      {/* Circle */}
      <div className="w-9 h-9 rounded-full bg-[#4c9ea3] flex items-center justify-center">
        <div className="w-3.5 h-3.5 bg-white rounded-full" />
      </div>

      {/* Text */}
      <span className="text-[20px] leading-none font-semibold tracking-tight text-[#4c9ea3]">
        aps
      </span>
    </div>
  );
}
