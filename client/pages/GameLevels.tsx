import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CashMascot from "@/components/CashMascot";
import {
  Play,
  Lock,
  Star,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Home,
} from "lucide-react";

export default function GameLevels() {
  const levels = [
    {
      id: 1,
      title: "Budget Basics",
      description: "Learn the fundamentals of creating and managing a budget",
      icon: PiggyBank,
      difficulty: "Beginner",
      xp: 100,
      unlocked: true,
      completed: false,
      color: "econome-green",
    },
    {
      id: 2,
      title: "Credit Craze",
      description: "Master credit cards, scores, and responsible borrowing",
      icon: CreditCard,
      difficulty: "Intermediate",
      xp: 200,
      unlocked: true,
      completed: false,
      color: "econome-blue",
    },
    {
      id: 3,
      title: "Investing Island",
      description: "Dive into stocks, bonds, and building wealth over time",
      icon: TrendingUp,
      difficulty: "Advanced",
      xp: 300,
      unlocked: false,
      completed: false,
      color: "econome-yellow",
    },
    {
      id: 4,
      title: "Housing Haven",
      description: "Navigate renting, buying, and homeownership decisions",
      icon: Home,
      difficulty: "Intermediate",
      xp: 250,
      unlocked: false,
      completed: false,
      color: "econome-green",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-econome-green-50 via-white to-econome-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <CashMascot
              size="large"
              message="Choose your adventure! Each level teaches important money skills."
            />
          </div>
          <h1 className="text-4xl font-bold text-econome-green-800 mb-4">
            Game Levels
          </h1>
          <p className="text-xl text-gray-600">
            Complete levels to earn XP, unlock badges, and master money skills!
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-econome-green-600">2</div>
              <div className="text-sm text-gray-600">Levels Unlocked</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-econome-blue-600">0</div>
              <div className="text-sm text-gray-600">Levels Completed</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-econome-yellow-600">
                0
              </div>
              <div className="text-sm text-gray-600">Total XP</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-600">0</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Levels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => {
            const IconComponent = level.icon;
            const isLocked = !level.unlocked;

            return (
              <Card
                key={level.id}
                className={`relative overflow-hidden border-2 transition-all duration-200 ${
                  isLocked
                    ? "border-gray-200 bg-gray-50"
                    : `border-${level.color}-200 hover:shadow-lg hover:scale-105`
                }`}
              >
                {level.completed && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-econome-green-500">
                      <Trophy className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 ${
                      isLocked
                        ? "bg-gray-300"
                        : `bg-gradient-to-br from-${level.color}-400 to-${level.color}-600`
                    } rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    {isLocked ? (
                      <Lock className="w-8 h-8 text-gray-500" />
                    ) : (
                      <IconComponent className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <CardTitle
                    className={`${
                      isLocked ? "text-gray-500" : `text-${level.color}-800`
                    }`}
                  >
                    {level.title}
                  </CardTitle>
                  <CardDescription>{level.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Difficulty:</span>
                      <Badge
                        variant="outline"
                        className={
                          isLocked
                            ? "border-gray-300 text-gray-500"
                            : `border-${level.color}-300 text-${level.color}-700`
                        }
                      >
                        {level.difficulty}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">XP Reward:</span>
                      <div className="flex items-center">
                        <Star
                          className={`w-4 h-4 mr-1 ${
                            isLocked ? "text-gray-400" : "text-yellow-500"
                          }`}
                        />
                        <span
                          className={`font-bold ${
                            isLocked ? "text-gray-500" : "text-yellow-600"
                          }`}
                        >
                          {level.xp}
                        </span>
                      </div>
                    </div>

                    <Button
                      className={`w-full ${
                        isLocked
                          ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                          : `bg-${level.color}-500 hover:bg-${level.color}-600`
                      } text-white`}
                      disabled={isLocked}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </>
                      ) : level.completed ? (
                        <>
                          <Trophy className="w-4 h-4 mr-2" />
                          Replay
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Level
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-econome-green-800 mb-4">
            More Levels Coming Soon!
          </h3>
          <p className="text-gray-600 mb-6">
            Complete current levels to unlock new adventures and earn special
            rewards.
          </p>
          <div className="mb-4">
            <CashMascot
              size="medium"
              message="Keep playing to unlock more exciting levels!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
