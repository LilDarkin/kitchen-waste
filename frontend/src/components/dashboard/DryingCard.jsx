const DryingCard = ({ className }) => {
  // Set the percentage of completion (change this value as needed)
  const progress = 20; // 20% complete

  // Calculate the circle properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      id="dashboard-card2"
      className={`${className} flex items-center justify-between rounded-3xl bg-pink-200 h-20 px-6`}
    >
      <p className="font-semibold text-[#512E2E]">Drying</p>

      <div className="relative w-16 h-16">
        {/* Drop shadow for depth */}
        <div className="absolute inset-0 rounded-full shadow-inner"></div>

        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background gradient */}
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#512E2E" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#512E2E"
            strokeWidth="8"
          />

          {/* Progress circle with gradient */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90, 50, 50)"
          />

          {/* Inner white circle with subtle shadow */}
          <circle cx="50" cy="50" r="36" fill="white" />
        </svg>

        {/* Modern icon in the middle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-gray-700">
          <img src="/icons/drying.svg" alt="drying" />
        </div>
      </div>
    </div>
  );
};

export default DryingCard;
