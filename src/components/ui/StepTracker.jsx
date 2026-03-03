export default function StepTracker({
  steps = [],
  activeStep = 0,
}) {
  return (
    <div className="w-full flex flex-wrap items-center">

      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        return (
          <div
            key={step}
            className="flex items-center w-full md:w-auto flex-1 mb-4 md:mb-0"
          >
            {/* Circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all duration-300
                ${
                  isCompleted
                    ? "bg-[#0CC8A8] text-white"
                    : isActive
                    ? "bg-[#0CC8A8] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }
              `}
            >
              {index + 1}
            </div>

            {/* Label */}
            <span
              className={`ml-3 text-sm whitespace-nowrap transition-all duration-300
                ${
                  isCompleted
                    ? "text-[#0CC8A8]"
                    : isActive
                    ? "text-[#0CC8A8] font-medium"
                    : "text-gray-500"
                }
              `}
            >
              {step}
            </span>

            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div
                className={`hidden md:block flex-1 h-[2px] mx-4 transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-[#0CC8A8]"
                      : "bg-gray-300 dark:bg-gray-700"
                  }
                `}
              />
            )}
          </div>
        );
      })}

    </div>
  );
}