import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Gamepad2,
  CreditCard,
  User,
  Info,
  Menu,
  X,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/learn-hub", label: "Learn Hub", icon: Gamepad2 },
    { path: "/flashcards", label: "Flashcards", icon: CreditCard },
    { path: "/study-notes", label: "Study Notes", icon: BookOpen },
    { path: "/chat-with-cash", label: "Chat with Cash", icon: MessageCircle },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-econome-green-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-econome-green-400 to-econome-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-econome-green-800">
                Econome
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} to={path}>
                  <Button
                    variant={location.pathname === path ? "default" : "ghost"}
                    className={`flex items-center space-x-1 ${
                      location.pathname === path
                        ? "bg-econome-green-500 hover:bg-econome-green-600 text-white"
                        : "text-econome-green-700 hover:text-econome-green-800 hover:bg-econome-green-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-econome-green-700 hover:text-econome-green-800 hover:bg-econome-green-50"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-econome-green-200">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={location.pathname === path ? "default" : "ghost"}
                    className={`w-full justify-start flex items-center space-x-2 ${
                      location.pathname === path
                        ? "bg-econome-green-500 hover:bg-econome-green-600 text-white"
                        : "text-econome-green-700 hover:text-econome-green-800 hover:bg-econome-green-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
