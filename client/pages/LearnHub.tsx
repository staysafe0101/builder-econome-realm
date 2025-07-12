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
  Gamepad2,
  CreditCard,
  BookOpen,
  MessageCircle,
  Trophy,
  Star,
  Target,
  Zap,
  Clock,
  Users,
  TrendingUp,
  Gift,
} from "lucide-react";

export default function LearnHub() {
  const learningTools = [
    {
      id: 1,
      title: "Interactive Games",
      description:
        "Level up through Budget Basics, Credit Craze, and 6 more games!",
      icon: Gamepad2,
      color: "econome-green",
      route: "/game-levels",
      features: ["XP & Badges", "Progress Tracking", "8 Fun Games"],
      stats: { levels: 8, completed: 2, difficulty: "All Levels" },
      isNew: false,
    },
    {
      id: 2,
      title: "Smart Flashcards",
      description: "Master financial terms with interactive cards",
      icon: CreditCard,
      color: "econome-blue",
      route: "/flashcards",
      features: ["Word of the Day", "Smart Shuffling", "Progress Tracking"],
      stats: { cards: 50, learned: 15, difficulty: "Beginner" },
      isNew: false,
    },
    {
      id: 3,
      title: "Study Notes",
      description: "Colorful, concise notes for every financial topic",
      icon: BookOpen,
      color: "econome-yellow",
      route: "/study-notes",
      features: ["PDF Downloads", "Easy Navigation", "Visual Learning"],
      stats: { notes: 6, topics: 6, difficulty: "All Levels" },
      isNew: true,
    },
    {
      id: 4,
      title: "AI Chat with Cash",
      description: "Ask Cash anything about money and finance!",
      icon: MessageCircle,
      color: "purple",
      route: "#",
      features: ["24/7 Available", "Teen-Friendly", "Instant Answers"],
      stats: { questions: "∞", topics: "All", difficulty: "Any Level" },
      isNew: true,
      isChat: true,
    },
  ];

  const dailyChallenges = [
    {
      title: "Budget Balance Challenge",
      description: "Create a monthly budget for a $500 income",
      xp: 50,
      timeEstimate: "10 min",
      difficulty: "Easy",
    },
    {
      title: "Credit Score Quiz",
      description: "Test your knowledge on credit fundamentals",
      xp: 75,
      timeEstimate: "15 min",
      difficulty: "Medium",
    },
    {
      title: "Investment Scenario",
      description: "Choose the best investment strategy",
      xp: 100,
      timeEstimate: "20 min",
      difficulty: "Hard",
    },
  ];

  const recentAchievements = [
    { title: "First Steps", desc: "Completed first game level", earned: true },
    { title: "Card Master", desc: "Learned 10 flashcards", earned: true },
    {
      title: "Streak Keeper",
      desc: "7-day learning streak",
      earned: true,
    },
    {
      title: "Budget Boss",
      desc: "Master budget basics level",
      earned: false,
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
              message="Welcome to your learning hub! Choose your adventure and let's master money together! 🚀"
              animated={true}
              mood="excited"
              showCoins={true}
            />
          </div>
          <h1 className="text-4xl font-bold text-econome-green-800 mb-4">
            Learn Hub
          </h1>
          <p className="text-xl text-gray-600">
            Your one-stop destination for mastering money skills
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-econome-green-200">
            <CardContent className="pt-6">
              <Trophy className="w-8 h-8 text-econome-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-econome-green-700">
                750
              </div>
              <div className="text-sm text-gray-600">Total XP</div>
            </CardContent>
          </Card>
          <Card className="text-center border-econome-blue-200">
            <CardContent className="pt-6">
              <Star className="w-8 h-8 text-econome-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-econome-blue-700">3</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </CardContent>
          </Card>
          <Card className="text-center border-econome-yellow-200">
            <CardContent className="pt-6">
              <Target className="w-8 h-8 text-econome-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-econome-yellow-700">
                7
              </div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="text-center border-purple-200">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">3</div>
              <div className="text-sm text-gray-600">Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-econome-green-800 mb-6">
            Learning Tools
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {learningTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className={`border-2 border-${tool.color}-200 hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}
                >
                  {tool.isNew && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-red-500 text-white animate-pulse">
                        NEW!
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${tool.color}-400 to-${tool.color}-600 rounded-full flex items-center justify-center`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className={`text-xl text-${tool.color}-800`}>
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">
                          Features:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {tool.features.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={`bg-${tool.color}-100 text-${tool.color}-700`}
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {Object.entries(tool.stats).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-lg font-bold text-gray-700">
                              {value}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      {tool.isChat ? (
                        <Button
                          className={`w-full bg-${tool.color}-500 hover:bg-${tool.color}-600 text-white`}
                          onClick={() => {
                            // This would open the chat - for now just show alert
                            alert("Chat with Cash opening soon!");
                          }}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat with Cash
                        </Button>
                      ) : (
                        <Link to={tool.route}>
                          <Button
                            className={`w-full bg-${tool.color}-500 hover:bg-${tool.color}-600 text-white`}
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Start Learning
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Daily Challenges */}
          <section>
            <h2 className="text-2xl font-bold text-econome-green-800 mb-6">
              Daily Challenges
            </h2>
            <div className="space-y-4">
              {dailyChallenges.map((challenge, index) => (
                <Card
                  key={index}
                  className="border-econome-green-200 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-econome-green-800">
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {challenge.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">
                              {challenge.xp} XP
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">
                              {challenge.timeEstimate}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              challenge.difficulty === "Easy"
                                ? "border-green-300 text-green-700"
                                : challenge.difficulty === "Medium"
                                  ? "border-yellow-300 text-yellow-700"
                                  : "border-red-300 text-red-700"
                            }`}
                          >
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        className="bg-econome-green-500 hover:bg-econome-green-600 text-white ml-4"
                        size="sm"
                      >
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Achievements */}
          <section>
            <h2 className="text-2xl font-bold text-econome-green-800 mb-6">
              Recent Achievements
            </h2>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={`border-2 ${
                    achievement.earned
                      ? "border-econome-yellow-200 bg-econome-yellow-50"
                      : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.earned
                            ? "bg-econome-yellow-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <Trophy
                          className={`w-5 h-5 ${
                            achievement.earned ? "text-white" : "text-gray-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            achievement.earned
                              ? "text-econome-yellow-800"
                              : "text-gray-500"
                          }`}
                        >
                          {achievement.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            achievement.earned
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          {achievement.desc}
                        </p>
                      </div>
                      {achievement.earned ? (
                        <Badge className="bg-econome-green-500">Earned</Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Coming Soon Section */}
        <section className="mt-12">
          <Card className="border-2 border-dashed border-econome-blue-300 bg-gradient-to-r from-econome-blue-50 to-white">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <CashMascot
                  size="medium"
                  message="Exciting new features are flying your way soon!"
                  mood="excited"
                />
              </div>
              <h3 className="text-2xl font-bold text-econome-blue-800 mb-4">
                🚀 Coming Soon: Mobile App!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Take your financial learning on the go with our upcoming mobile
                app featuring offline mode, push notifications, and exclusive
                mobile-only challenges!
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-econome-blue-500 text-econome-blue-600"
                >
                  📱 Notify Me - iOS
                </Button>
                <Button
                  variant="outline"
                  className="border-econome-green-500 text-econome-green-600"
                >
                  🤖 Notify Me - Android
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
