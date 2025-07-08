import { useState, useEffect } from "react";

interface CashMascotProps {
  size?: "small" | "medium" | "large";
  message?: string;
  animated?: boolean;
  mood?: "happy" | "excited" | "thinking" | "encouraging";
  showCoins?: boolean;
}

export default function CashMascot({
  size = "medium",
  message,
  animated = true,
  mood = "happy",
  showCoins = false,
}: CashMascotProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("bounce");

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (animated) {
      const animations = ["bounce", "pulse", "wiggle"];
      const interval = setInterval(() => {
        setCurrentAnimation(
          animations[Math.floor(Math.random() * animations.length)],
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [animated]);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  const moodExpressions = {
    happy: "😊",
    excited: "🤩",
    thinking: "🤔",
    encouraging: "💪",
  };

  const getAnimationClass = () => {
    if (!animated) return "";
    switch (currentAnimation) {
      case "bounce":
        return "animate-bounce";
      case "pulse":
        return "animate-pulse";
      case "wiggle":
        return "animate-wiggle";
      default:
        return "animate-bounce";
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Cash Stork - Enhanced 3D-style design */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Main body */}
        <div
          className={`w-full h-full bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg border-4 border-econome-green-500 ${getAnimationClass()}`}
          style={{
            background: `
              radial-gradient(circle at 30% 20%, #ffffff 0%, #f3f4f6 30%, #e5e7eb 100%),
              linear-gradient(135deg, #40d890 0%, #22c55e 100%)
            `,
          }}
        >
          {/* Stork face */}
          <div className="text-center">
            <div className="text-2xl mb-1">🦩</div>
            <div className="text-sm">{moodExpressions[mood]}</div>
          </div>
        </div>

        {/* Beak */}
        <div className="absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-2">
          <div className="w-6 h-2 bg-orange-400 rounded-r-full shadow-sm"></div>
        </div>

        {/* Wings animation */}
        {animated && (
          <>
            <div className="absolute -left-3 top-1/3 transform -translate-y-1/2">
              <div className="w-6 h-8 bg-gradient-to-br from-econome-green-300 to-econome-green-500 rounded-full animate-pulse shadow-md"></div>
            </div>
            <div className="absolute -right-3 top-1/3 transform -translate-y-1/2">
              <div className="w-6 h-8 bg-gradient-to-br from-econome-green-300 to-econome-green-500 rounded-full animate-pulse shadow-md"></div>
            </div>
          </>
        )}

        {/* Flying coins animation */}
        {showCoins && (
          <>
            <div className="absolute -top-2 -left-2 animate-bounce delay-100">
              <div className="w-4 h-4 bg-gradient-to-br from-econome-yellow-400 to-econome-yellow-600 rounded-full shadow-lg">
                <span className="text-xs">💰</span>
              </div>
            </div>
            <div className="absolute -top-3 -right-1 animate-bounce delay-300">
              <div className="w-3 h-3 bg-gradient-to-br from-econome-yellow-400 to-econome-yellow-600 rounded-full shadow-lg">
                <span className="text-xs">💴</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -left-3 animate-bounce delay-500">
              <div className="w-3 h-3 bg-gradient-to-br from-econome-yellow-400 to-econome-yellow-600 rounded-full shadow-lg">
                <span className="text-xs">💵</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Enhanced speech bubble */}
      {message && isVisible && (
        <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl p-4 max-w-xs z-10 border-2 border-econome-green-200">
          <div className="text-sm text-gray-800 font-medium">{message}</div>

          {/* Bubble tail */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-white"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-econome-green-200"></div>
          </div>

          {/* Typing indicator */}
          <div className="flex space-x-1 mt-2 justify-center">
            <div className="w-1 h-1 bg-econome-green-500 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-econome-green-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-1 h-1 bg-econome-green-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      )}
    </div>
  );
}
