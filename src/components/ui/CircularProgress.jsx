import { useEffect, useState } from "react";

export default function CircularProgress({
  progress = 0,
  size = 120,
  strokeWidth = 10,
}) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Animate on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timeout);
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>

        {/* Background Circle */}
        <circle
          stroke="#E5E5E5"
          className="dark:stroke-[#2A2A2A]"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress Circle */}
        <circle
          stroke="#0CC8A8"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.8s ease",
          }}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {/* Percentage Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-gray-900 dark:fill-white font-semibold text-lg"
        >
          {animatedProgress}%
        </text>
      </svg>

      <span className="text-sm text-gray-500 mt-2">
        In Progress
      </span>
    </div>
  );
}