import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CashMascot from "@/components/CashMascot";
import { getAllFlashcardSets } from "@/data/flashcards";
import {
  Search,
  Shuffle,
  Star,
  Check,
  RotateCcw,
  Calendar,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export default function Flashcards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = [
    {
      id: 1,
      term: "Budget",
      definition:
        "A plan for how to spend and save money over a specific period of time",
      category: "Basics",
      learned: false,
    },
    {
      id: 2,
      term: "Credit Score",
      definition:
        "A number (300-850) that represents how likely you are to pay back borrowed money",
      category: "Credit",
      learned: true,
    },
    {
      id: 3,
      term: "Interest",
      definition:
        "Money charged by lenders or paid by banks for borrowing or saving money",
      category: "Basics",
      learned: false,
    },
    {
      id: 4,
      term: "Investment",
      definition:
        "Using money to buy something that you expect will earn more money over time",
      category: "Investing",
      learned: false,
    },
    {
      id: 5,
      term: "Emergency Fund",
      definition:
        "Money saved specifically for unexpected expenses or financial emergencies",
      category: "Savings",
      learned: true,
    },
  ];

  const wordOfTheDay = {
    term: "Compound Interest",
    definition:
      "Interest calculated on the initial amount plus all previously earned interest",
    example:
      "If you save $100 with 5% annual compound interest, after one year you'll have $105, and the next year you'll earn interest on $105, not just $100!",
  };

  const filteredCards = flashcards.filter((card) =>
    card.term.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleLearned = (cardId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggling learned status for card ${cardId}`);
  };

  const shuffleCards = () => {
    setCurrentCard(Math.floor(Math.random() * filteredCards.length));
    setShowAnswer(false);
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % filteredCards.length);
    setShowAnswer(false);
  };

  const card = filteredCards[currentCard];

  return (
    <div className="min-h-screen bg-gradient-to-br from-econome-blue-50 via-white to-econome-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <CashMascot
              size="large"
              message="Ready to learn some finance terms? Let's make it fun!"
            />
          </div>
          <h1 className="text-4xl font-bold text-econome-blue-800 mb-4">
            Flashcards
          </h1>
          <p className="text-xl text-gray-600">
            Master financial terms with interactive learning
          </p>
        </div>

        {/* Word of the Day */}
        <Card className="mb-8 border-econome-yellow-200 bg-gradient-to-r from-econome-yellow-50 to-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-econome-yellow-600" />
              <CardTitle className="text-econome-yellow-800">
                Word of the Day
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-econome-yellow-900 mb-2">
              {wordOfTheDay.term}
            </h3>
            <p className="text-gray-700 mb-3">{wordOfTheDay.definition}</p>
            <div className="bg-econome-yellow-100 p-3 rounded-lg">
              <p className="text-sm text-econome-yellow-800">
                <strong>Example:</strong> {wordOfTheDay.example}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Flashcard Area */}
          <div className="lg:col-span-2">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search flashcards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={shuffleCards}
                  className="border-econome-blue-300 text-econome-blue-600 hover:bg-econome-blue-50"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Shuffle
                </Button>
                <Button
                  variant="outline"
                  onClick={nextCard}
                  className="border-econome-green-300 text-econome-green-600 hover:bg-econome-green-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Next
                </Button>
              </div>
            </div>

            {/* Main Flashcard */}
            {card && (
              <Card className="h-80 cursor-pointer border-2 border-econome-blue-200 hover:shadow-lg transition-all duration-200">
                <CardContent
                  className="h-full flex flex-col justify-center items-center text-center p-8"
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  {!showAnswer ? (
                    <>
                      <h2 className="text-3xl font-bold text-econome-blue-800 mb-4">
                        {card.term}
                      </h2>
                      <p className="text-gray-600">
                        Click to reveal definition
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-econome-blue-700 mb-4">
                        {card.term}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {card.definition}
                      </p>
                      <p className="text-sm text-gray-500 mt-4">
                        Click to see term again
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Card Actions */}
            {card && (
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant={card.learned ? "default" : "outline"}
                  onClick={() => toggleLearned(card.id)}
                  className={
                    card.learned
                      ? "bg-econome-green-500 hover:bg-econome-green-600 text-white"
                      : "border-econome-green-300 text-econome-green-600 hover:bg-econome-green-50"
                  }
                >
                  <Check className="w-4 h-4 mr-2" />
                  {card.learned ? "Learned" : "Mark as Learned"}
                </Button>
              </div>
            )}

            {/* Progress Indicator */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Card {currentCard + 1} of {filteredCards.length}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-econome-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentCard + 1) / filteredCards.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-econome-blue-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Cards:</span>
                  <span className="font-semibold">{flashcards.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Learned:</span>
                  <span className="font-semibold text-econome-green-600">
                    {flashcards.filter((c) => c.learned).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span className="font-semibold text-econome-blue-600">
                    {flashcards.filter((c) => !c.learned).length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-econome-green-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Basics", "Credit", "Investing", "Savings"].map(
                    (category) => (
                      <div key={category} className="flex justify-between">
                        <Badge
                          variant="secondary"
                          className="bg-econome-green-100 text-econome-green-700"
                        >
                          {category}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {
                            flashcards.filter((c) => c.category === category)
                              .length
                          }
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips from Cash */}
            <Card className="border-econome-yellow-200">
              <CardHeader>
                <CardTitle className="text-econome-yellow-800">
                  💡 Cash's Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Try to review flashcards daily! Even 5 minutes a day can help
                  you master financial terms quickly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
