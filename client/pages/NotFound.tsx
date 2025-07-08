import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import CashMascot from "@/components/CashMascot";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-econome-green-50 via-white to-econome-blue-50">
      <div className="text-center">
        <div className="mb-8">
          <CashMascot
            size="large"
            message="Oops! Looks like this page took a wrong turn. Let me help you get back on track!"
          />
        </div>
        <h1 className="text-6xl font-bold text-econome-green-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">
          Oops! This page seems to have flown away
        </p>
        <Link to="/">
          <Button className="bg-econome-green-500 hover:bg-econome-green-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
