import React, { useEffect, useState } from "react";

const GrindingCard = ({ className }) => {
  const [progress, setProgress] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`rounded-2xl bg-pink-200 h-full p-4 flex items-center justify-between shadow-md ${className}`}>
      <p className="font-semibold text-[#512E2E] text-lg">Grinding</p>

      <div className="relative w-16 h-16">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#512E2E" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>

          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#ddd"
            strokeWidth="8"
          />
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
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
          <circle cx="50" cy="50" r="36" fill="white" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/icons/grinding.svg" alt="grinding" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default GrindingCard;
