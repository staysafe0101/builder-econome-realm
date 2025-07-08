import { useState, useEffect } from "react";

interface CashMascotProps {
  size?: "small" | "medium" | "large";
  message?: string;
  animated?: boolean;
}

export default function CashMascot({
  size = "medium",
  message,
  animated = true,
}: CashMascotProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Placeholder for 3D Cash stork - will be replaced with actual 3D model */}
      <div className={`${sizeClasses[size]} relative`}>
        <div
          className={`w-full h-full bg-gradient-to-br from-econome-blue-400 to-econome-blue-600 rounded-full flex items-center justify-center shadow-lg ${
            animated ? "animate-bounce" : ""
          }`}
        >
          <span className="text-white font-bold text-lg">🦩</span>
        </div>

        {/* Wings animation effect */}
        {animated && (
          <>
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-econome-blue-300 rounded-full animate-pulse"></div>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-econome-blue-300 rounded-full animate-pulse"></div>
          </>
        )}
      </div>

      {/* Speech bubble */}
      {message && isVisible && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 max-w-xs z-10">
          <div className="text-sm text-gray-800">{message}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
}
