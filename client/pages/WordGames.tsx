import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WordSearchGame from "@/components/games/WordSearchGame";
import ConnectionsGame from "@/components/games/ConnectionsGame";
import GoldCashAdventureGame from "@/components/games/GoldCashAdventureGame";
import CashMascot from "@/components/CashMascot";
import { Search, Link, Trophy, Clock, Users } from "lucide-react";

export default function WordGames() {
  const [wordSearchScore, setWordSearchScore] = useState<number | null>(null);
  const [connectionsScore, setConnectionsScore] = useState<number | null>(null);
  const [adventureScore, setAdventureScore] = useState<number | null>(null);
  const [mascotMessage, setMascotMessage] = useState("");

  const handleWordSearchComplete = (score: number) => {
    setWordSearchScore(score);
    setMascotMessage("Great job finding all those financial terms! 🎉");
  };

  const handleConnectionsComplete = (score: number) => {
    setConnectionsScore(score);
    if (score > 0) {
      setMascotMessage(
        "Excellent connections! You really know your financial categories! 💪",
      );
    } else {
      setMascotMessage(
        "Don't worry, connections can be tricky! Try again and you'll get it! 🤗",
      );
    }
  };

  const handleAdventureComplete = (score: number) => {
    setAdventureScore(score);
    setMascotMessage(
      "Amazing teamwork! Gold Guy and Cash Girl make a perfect financial team! 🎉",
    );
  };

  const getTotalScore = () => {
    return (
      (wordSearchScore || 0) + (connectionsScore || 0) + (adventureScore || 0)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CashMascot
              size="large"
              mood="happy"
              animated={true}
              message={mascotMessage}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-econome-green-800 mb-4">
            Games Hub
          </h1>
          <p className="text-xl text-econome-green-600 mb-6">
            Test your financial skills with word challenges and adventure games!
          </p>

          {/* Score Summary */}
          <div className="flex justify-center gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-2 text-econome-green-700">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">
                  Total Score: {getTotalScore()}
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Game Tabs */}
        <Tabs defaultValue="wordsearch" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="wordsearch" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Word Search
            </TabsTrigger>
            <TabsTrigger
              value="connections"
              className="flex items-center gap-2"
            >
              <Link className="w-4 h-4" />
              Connections
            </TabsTrigger>
            <TabsTrigger value="adventure" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Adventure
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wordsearch" className="space-y-6">
            {/* Word Search Info */}
            <Card className="border-2 border-econome-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-econome-green-800">
                  <Search className="w-5 h-5" />
                  Word Search Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-econome-green-700 mb-2">
                      How to Play:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Find 16 financial terms hidden in the grid</li>
                      <li>• Words can be horizontal, vertical, or diagonal</li>
                      <li>• Click and drag to select words</li>
                      <li>• Faster completion = higher score!</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-econome-green-700 mb-2">
                      Scoring:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Base score: 1000 points</li>
                      <li>• -5 points per second</li>
                      <li>• Minimum score: 100 points</li>
                      {wordSearchScore && (
                        <li className="font-semibold text-econome-green-600">
                          • Your best: {wordSearchScore} points
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Word Search Game */}
            <WordSearchGame onComplete={handleWordSearchComplete} />
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            {/* Connections Info */}
            <Card className="border-2 border-econome-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-econome-green-800">
                  <Link className="w-5 h-5" />
                  Financial Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-econome-green-700 mb-2">
                      How to Play:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Find 4 groups of 4 related financial terms</li>
                      <li>• Select exactly 4 words and submit your guess</li>
                      <li>• You have 4 mistakes before game over</li>
                      <li>• Categories range from easy to very difficult</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-econome-green-700 mb-2">
                      Difficulty Levels:
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-200 rounded"></div>
                        <span>Easy - Banking basics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-200 rounded"></div>
                        <span>Medium - Investment types</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                        <span>Hard - Credit terms</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-200 rounded"></div>
                        <span>Expert - Financial ratios</span>
                      </li>
                    </ul>
                    {connectionsScore !== null && (
                      <p className="font-semibold text-econome-green-600 mt-2">
                        Your best: {connectionsScore} points
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connections Game */}
            <ConnectionsGame onComplete={handleConnectionsComplete} />
          </TabsContent>

          <TabsContent value="adventure" className="space-y-6">
            {/* Adventure Info */}
            <Card className="border-2 border-econome-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-econome-green-800">
                  <Users className="w-5 h-5" />
                  Gold Guy & Cash Girl Adventure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-econome-green-700 mb-2">
                      How to Play:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        • Control Gold Guy (WASD) and Cash Girl (Arrow Keys)
                      </li>
                      <li>• Use each character's unique abilities</li>
                      <li>• Solve puzzles requiring teamwork</li>
                      <li>• Balance wealth types to progress</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-econome-green-700 mb-2">
                      Characters:
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <span>🟡</span>
                        <span>Gold Guy - Heavy, activates weight switches</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>💚</span>
                        <span>Cash Girl - Light, floats and glides</span>
                      </li>
                    </ul>
                    {adventureScore !== null && (
                      <p className="font-semibold text-econome-green-600 mt-2">
                        Your best: {adventureScore} points
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Adventure Game */}
            <GoldCashAdventureGame onComplete={handleAdventureComplete} />
          </TabsContent>
        </Tabs>

        {/* Achievement Section */}
        {(wordSearchScore || connectionsScore || adventureScore) && (
          <Card className="mt-8 bg-gradient-to-r from-econome-green-50 to-econome-yellow-50 border-2 border-econome-green-200">
            <CardHeader>
              <CardTitle className="text-center text-econome-green-800">
                🏆 Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {wordSearchScore && (
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <Search className="w-8 h-8 mx-auto text-econome-green-600 mb-2" />
                    <h3 className="font-semibold text-econome-green-800 mb-1">
                      Word Search Master
                    </h3>
                    <p className="text-2xl font-bold text-econome-green-600">
                      {wordSearchScore}
                    </p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                )}
                {connectionsScore !== null && (
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <Link className="w-8 h-8 mx-auto text-econome-green-600 mb-2" />
                    <h3 className="font-semibold text-econome-green-800 mb-1">
                      Connection Expert
                    </h3>
                    <p className="text-2xl font-bold text-econome-green-600">
                      {connectionsScore}
                    </p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                )}
                {adventureScore !== null && (
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <Users className="w-8 h-8 mx-auto text-econome-green-600 mb-2" />
                    <h3 className="font-semibold text-econome-green-800 mb-1">
                      Adventure Hero
                    </h3>
                    <p className="text-2xl font-bold text-econome-green-600">
                      {adventureScore}
                    </p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                )}
              </div>

              <div className="text-center mt-4 p-4 bg-econome-green-100 rounded-lg">
                <h3 className="font-bold text-econome-green-800 mb-2">
                  Total Score
                </h3>
                <p className="text-3xl font-bold text-econome-green-600">
                  {getTotalScore()}
                </p>
                <p className="text-sm text-econome-green-600 mt-1">
                  Keep playing to improve your financial vocabulary!
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
