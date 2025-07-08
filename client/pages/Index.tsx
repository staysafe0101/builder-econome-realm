import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CashMascot from "@/components/CashMascot";
import {
  Play,
  CreditCard,
  Trophy,
  Star,
  Target,
  Zap,
  Coins,
  TrendingUp,
  Shield,
  Gift,
  Gamepad2,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-econome-green-50 via-white to-econome-blue-50">
      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <CashMascot size="large" animated={true} />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-econome-green-800 mb-6">
            Save the dough,
            <br />
            <span className="text-econome-blue-600">
              let the knowledge flow
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn money skills through fun games, interactive flashcards, and
            level up your financial knowledge with Cash, your friendly guide!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/game-levels">
              <Button className="bg-econome-green-500 hover:bg-econome-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
            <Link to="/flashcards">
              <Button
                variant="outline"
                className="border-econome-blue-500 text-econome-blue-600 hover:bg-econome-blue-50 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Try Flashcards
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-econome-green-800 mb-4">
              How Econome Works
            </h2>
            <p className="text-lg text-gray-600">
              Three fun ways to master money skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Game Levels */}
            <Card className="border-econome-green-200 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-econome-green-400 to-econome-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-econome-green-800">
                  Game Levels
                </CardTitle>
                <CardDescription>
                  Complete interactive levels like Budget Basics and Credit
                  Craze
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-econome-green-100 text-econome-green-700"
                    >
                      <Target className="w-3 h-3 mr-1" />
                      Budget Basics
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-econome-blue-100 text-econome-blue-700"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Credit Craze
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-econome-yellow-100 text-econome-yellow-700"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Investing Island
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flashcards */}
            <Card className="border-econome-blue-200 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-econome-blue-400 to-econome-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-econome-blue-800">
                  Smart Flashcards
                </CardTitle>
                <CardDescription>
                  Interactive cards for finance terms with shuffle and search
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-econome-blue-100 text-econome-blue-700"
                    >
                      <Coins className="w-3 h-3 mr-1" />
                      Daily Terms
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-econome-green-100 text-econome-green-700"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Mark as Learned
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-econome-yellow-100 text-econome-yellow-700"
                    >
                      <Star className="w-3 h-3 mr-1" />
                      Word of the Day
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile & Progress */}
            <Card className="border-econome-yellow-200 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-econome-yellow-400 to-econome-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-econome-yellow-800">
                  Track Progress
                </CardTitle>
                <CardDescription>
                  Earn XP, badges, and customize your avatar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-econome-yellow-100 text-econome-yellow-700"
                    >
                      <Trophy className="w-3 h-3 mr-1" />
                      Earn Badges
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-econome-green-100 text-econome-green-700"
                    >
                      <Star className="w-3 h-3 mr-1" />
                      Gain XP
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-econome-blue-100 text-econome-blue-700"
                    >
                      <Gift className="w-3 h-3 mr-1" />
                      Avatar Customization
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile App Coming Soon Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-econome-green-500 via-econome-blue-500 to-purple-600 rounded-3xl p-8 text-white overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute top-4 left-4 animate-float">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
            <div className="absolute top-8 right-8 animate-bounce delay-100">
              <div className="w-6 h-6 bg-econome-yellow-400 rounded-full animate-coin-flip">
                💰
              </div>
            </div>
            <div className="absolute bottom-4 left-12 animate-wiggle delay-300">
              <div className="w-4 h-4 bg-white/30 rounded-full">💵</div>
            </div>
            <div className="absolute bottom-8 right-4 animate-float delay-200">
              <div className="w-5 h-5 bg-econome-yellow-500 rounded-full">
                📱
              </div>
            </div>

            <div className="relative z-10 text-center">
              <div className="mb-6">
                <CashMascot
                  size="large"
                  message="Get ready! Our mobile app is taking flight soon! 🚀"
                  mood="excited"
                  showCoins={true}
                />
              </div>
              <h2 className="text-4xl font-bold mb-4">
                📱 Mobile App Coming Soon!
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Take Econome everywhere! Learn on the go with offline mode, push
                notifications, and exclusive mobile challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 text-lg font-semibold rounded-xl">
                  🍎 Notify Me - iOS
                </Button>
                <Button className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 text-lg font-semibold rounded-xl">
                  🤖 Notify Me - Android
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-80">
                Be the first to know when we launch! 🎉
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-econome-green-500 to-econome-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <CashMascot
              size="medium"
              message="Ready to become a money master? Let's start your journey!"
              mood="encouraging"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Master Money Skills?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of teens who are already learning with Econome
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learn-hub">
              <Button className="bg-white text-econome-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Zap className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
            <Link to="/game-levels">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-econome-green-600 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                <Play className="w-5 h-5 mr-2" />
                Play Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
