import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CashMascot from "@/components/CashMascot";
import {
  User,
  Trophy,
  Star,
  Target,
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  Gamepad2,
  Edit3,
} from "lucide-react";

export default function Profile() {
  const userStats = {
    name: "Alex Johnson",
    level: 3,
    totalXP: 750,
    xpToNextLevel: 250,
    streakDays: 7,
    joinDate: "March 2024",
    completedLevels: 2,
    totalLevels: 4,
    learnedCards: 15,
    totalCards: 50,
  };

  const badges = [
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first game level",
      icon: "🎯",
      earned: true,
      earnedDate: "March 15, 2024",
    },
    {
      id: 2,
      name: "Card Master",
      description: "Learned 10 flashcards",
      icon: "🃏",
      earned: true,
      earnedDate: "March 18, 2024",
    },
    {
      id: 3,
      name: "Streak Keeper",
      description: "7-day learning streak",
      icon: "🔥",
      earned: true,
      earnedDate: "March 22, 2024",
    },
    {
      id: 4,
      name: "Budget Boss",
      description: "Master budget basics level",
      icon: "💰",
      earned: false,
      earnedDate: null,
    },
    {
      id: 5,
      name: "Credit Champion",
      description: "Complete credit craze level",
      icon: "💳",
      earned: false,
      earnedDate: null,
    },
    {
      id: 6,
      name: "Investment Expert",
      description: "Finish investing island",
      icon: "📈",
      earned: false,
      earnedDate: null,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "level",
      action: "Started Budget Basics level",
      date: "2 hours ago",
      xp: 50,
    },
    {
      id: 2,
      type: "flashcard",
      action: "Learned 3 new flashcards",
      date: "1 day ago",
      xp: 30,
    },
    {
      id: 3,
      type: "badge",
      action: "Earned Streak Keeper badge",
      date: "2 days ago",
      xp: 100,
    },
  ];

  const avatarOptions = [
    { id: 1, name: "Cool Cat", emoji: "😎", unlocked: true },
    { id: 2, name: "Money Tree", emoji: "🌱", unlocked: true },
    { id: 3, name: "Piggy Bank", emoji: "🐷", unlocked: true },
    {
      id: 4,
      name: "Rocket Ship",
      emoji: "🚀",
      unlocked: false,
      requiredXP: 1000,
    },
    { id: 5, name: "Crown", emoji: "👑", unlocked: false, requiredXP: 1500 },
    { id: 6, name: "Diamond", emoji: "💎", unlocked: false, requiredXP: 2000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-econome-green-50 via-white to-econome-yellow-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <CashMascot
              size="large"
              message={`Great job, ${userStats.name}! You're making awesome progress!`}
            />
          </div>
          <h1 className="text-4xl font-bold text-econome-green-800 mb-4">
            Your Profile
          </h1>
          <p className="text-xl text-gray-600">
            Track your progress and customize your experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-econome-green-400 to-econome-green-600 rounded-full flex items-center justify-center text-2xl">
                      😎
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-econome-green-800">
                        {userStats.name}
                      </CardTitle>
                      <CardDescription>
                        Level {userStats.level} • Joined {userStats.joinDate}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-econome-green-600">
                      {userStats.totalXP}
                    </div>
                    <div className="text-sm text-gray-600">Total XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-econome-blue-600">
                      {userStats.streakDays}
                    </div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-econome-yellow-600">
                      {badges.filter((b) => b.earned).length}
                    </div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {userStats.level}
                    </div>
                    <div className="text-sm text-gray-600">Level</div>
                  </div>
                </div>

                {/* Level Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Level {userStats.level}</span>
                    <span>
                      {userStats.totalXP % 250} / {userStats.xpToNextLevel} XP
                      to next level
                    </span>
                  </div>
                  <Progress
                    value={
                      ((userStats.totalXP % 250) / userStats.xpToNextLevel) *
                      100
                    }
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-econome-blue-600" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Gamepad2 className="w-5 h-5 text-econome-green-600" />
                      <span className="font-semibold">Game Levels</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completed</span>
                      <span>
                        {userStats.completedLevels} / {userStats.totalLevels}
                      </span>
                    </div>
                    <Progress
                      value={
                        (userStats.completedLevels / userStats.totalLevels) *
                        100
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-econome-blue-600" />
                      <span className="font-semibold">Flashcards</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Learned</span>
                      <span>
                        {userStats.learnedCards} / {userStats.totalCards}
                      </span>
                    </div>
                    <Progress
                      value={
                        (userStats.learnedCards / userStats.totalCards) * 100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-econome-yellow-600" />
                  Badges
                </CardTitle>
                <CardDescription>
                  Earn badges by completing levels and learning milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        badge.earned
                          ? "border-econome-yellow-200 bg-econome-yellow-50"
                          : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h3 className="font-semibold text-sm mb-1">
                        {badge.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {badge.description}
                      </p>
                      {badge.earned ? (
                        <Badge className="bg-econome-yellow-500 text-white">
                          Earned
                        </Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-econome-green-500 rounded-full flex items-center justify-center">
                          {activity.type === "level" && (
                            <Gamepad2 className="w-4 h-4 text-white" />
                          )}
                          {activity.type === "flashcard" && (
                            <BookOpen className="w-4 h-4 text-white" />
                          )}
                          {activity.type === "badge" && (
                            <Trophy className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-600">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-econome-green-100 text-econome-green-700"
                      >
                        +{activity.xp} XP
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Avatar Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-econome-green-600" />
                  Avatar
                </CardTitle>
                <CardDescription>
                  Customize your avatar with unlocked options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar.id}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        avatar.unlocked
                          ? "border-econome-green-200 hover:border-econome-green-400 bg-white"
                          : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                      }`}
                      disabled={!avatar.unlocked}
                    >
                      <div className="text-2xl mb-1">{avatar.emoji}</div>
                      <div className="text-xs font-medium">{avatar.name}</div>
                      {!avatar.unlocked && (
                        <div className="text-xs text-gray-500 mt-1">
                          {avatar.requiredXP} XP
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-econome-blue-600" />
                  Next Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Complete Budget Basics</span>
                  <Badge variant="outline">50 XP</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Learn 5 more flashcards</span>
                  <Badge variant="outline">25 XP</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Maintain 10-day streak</span>
                  <Badge variant="outline">100 XP</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-econome-yellow-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Best Streak:</span>
                  <span className="font-semibold">7 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Study Time:</span>
                  <span className="font-semibold">2h 15m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Favorite Topic:</span>
                  <span className="font-semibold">Budgeting</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
