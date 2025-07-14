import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, RotateCcw, Trophy } from "lucide-react";

interface ConnectionsGameProps {
  onComplete?: (score: number) => void;
}

interface Word {
  text: string;
  category: string;
  difficulty: number;
}

interface Category {
  name: string;
  difficulty: number;
  color: string;
  bgColor: string;
  description: string;
}

const CATEGORIES: Category[] = [
  {
    name: "Banking Services",
    difficulty: 1,
    color: "text-green-800",
    bgColor: "bg-green-100",
    description: "Basic bank account features",
  },
  {
    name: "Investment Types",
    difficulty: 2,
    color: "text-blue-800",
    bgColor: "bg-blue-100",
    description: "Different ways to invest money",
  },
  {
    name: "Credit Terms",
    difficulty: 3,
    color: "text-yellow-800",
    bgColor: "bg-yellow-100",
    description: "Credit and loan terminology",
  },
  {
    name: "Financial Ratios",
    difficulty: 4,
    color: "text-red-800",
    bgColor: "bg-red-100",
    description: "Key financial metrics",
  },
];

const WORDS: Word[] = [
  // Banking Services (Green - Easiest)
  { text: "CHECKING", category: "Banking Services", difficulty: 1 },
  { text: "SAVINGS", category: "Banking Services", difficulty: 1 },
  { text: "DEPOSIT", category: "Banking Services", difficulty: 1 },
  { text: "WITHDRAWAL", category: "Banking Services", difficulty: 1 },

  // Investment Types (Blue - Medium)
  { text: "STOCKS", category: "Investment Types", difficulty: 2 },
  { text: "BONDS", category: "Investment Types", difficulty: 2 },
  { text: "MUTUAL FUNDS", category: "Investment Types", difficulty: 2 },
  { text: "ETF", category: "Investment Types", difficulty: 2 },

  // Credit Terms (Yellow - Hard)
  { text: "APR", category: "Credit Terms", difficulty: 3 },
  { text: "PRINCIPAL", category: "Credit Terms", difficulty: 3 },
  { text: "COLLATERAL", category: "Credit Terms", difficulty: 3 },
  { text: "GRACE PERIOD", category: "Credit Terms", difficulty: 3 },

  // Financial Ratios (Red - Hardest)
  { text: "DEBT-TO-INCOME", category: "Financial Ratios", difficulty: 4 },
  { text: "PRICE-EARNINGS", category: "Financial Ratios", difficulty: 4 },
  { text: "CURRENT RATIO", category: "Financial Ratios", difficulty: 4 },
  { text: "ROI", category: "Financial Ratios", difficulty: 4 },
];

export default function ConnectionsGame({ onComplete }: ConnectionsGameProps) {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [solvedCategories, setSolvedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [mistakes, setMistakes] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lastGuess, setLastGuess] = useState<string[]>([]);
  const [oneAway, setOneAway] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (solvedCategories.size === 4) {
      setGameComplete(true);
      const score = Math.max(1000 - mistakes * 100, 100);
      onComplete?.(score);
    }
  }, [solvedCategories.size, mistakes, onComplete]);

  const initializeGame = () => {
    setWords(shuffleArray([...WORDS]));
    setSelectedWords(new Set());
    setSolvedCategories(new Set());
    setMistakes(0);
    setGameComplete(false);
    setShowHint(false);
    setLastGuess([]);
    setOneAway(false);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffleWords = () => {
    setWords(shuffleArray([...words]));
  };

  const toggleWordSelection = (word: string) => {
    const newSelection = new Set(selectedWords);

    if (newSelection.has(word)) {
      newSelection.delete(word);
    } else if (newSelection.size < 4) {
      newSelection.add(word);
    }

    setSelectedWords(newSelection);
  };

  const submitGuess = () => {
    if (selectedWords.size !== 4) return;

    const selectedArray = Array.from(selectedWords);
    const selectedWordObjects = words.filter((w) =>
      selectedArray.includes(w.text),
    );

    // Check if all selected words belong to the same category
    const categories = new Set(selectedWordObjects.map((w) => w.category));

    if (categories.size === 1) {
      // Correct guess!
      const category = selectedWordObjects[0].category;
      setSolvedCategories((prev) => new Set([...prev, category]));

      // Remove solved words from the game
      setWords((prev) => prev.filter((w) => w.category !== category));
      setSelectedWords(new Set());
      setOneAway(false);
    } else {
      // Wrong guess
      setMistakes((prev) => prev + 1);
      setLastGuess(selectedArray);

      // Check if they're one away from a correct answer
      const categoryGroups = CATEGORIES.map((cat) =>
        WORDS.filter((w) => w.category === cat.name).map((w) => w.text),
      );

      const isOneAway = categoryGroups.some((group) => {
        const intersection = selectedArray.filter((word) =>
          group.includes(word),
        );
        return intersection.length === 3;
      });

      setOneAway(isOneAway);
      setSelectedWords(new Set());

      if (mistakes >= 3) {
        setGameComplete(true);
        onComplete?.(0);
      }
    }
  };

  const deselectAll = () => {
    setSelectedWords(new Set());
  };

  const getWordButtonClass = (word: Word) => {
    const isSelected = selectedWords.has(word.text);
    const isSolved = solvedCategories.has(word.category);

    if (isSolved) {
      const category = CATEGORIES.find((c) => c.name === word.category);
      return `${category?.bgColor} ${category?.color} border-2 border-current`;
    }

    if (isSelected) {
      return "bg-econome-green-200 text-econome-green-800 border-2 border-econome-green-400";
    }

    return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-300";
  };

  const getMistakeDisplay = () => {
    const dots = Array(4)
      .fill(null)
      .map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i < mistakes ? "bg-red-500" : "bg-gray-300"
          }`}
        />
      ));
    return dots;
  };

  const getHintForNextCategory = () => {
    const unsolvedCategories = CATEGORIES.filter(
      (c) => !solvedCategories.has(c.name),
    );
    if (unsolvedCategories.length === 0) return null;

    // Return the easiest unsolved category
    return unsolvedCategories.sort((a, b) => a.difficulty - b.difficulty)[0];
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-econome-green-800">
          <span>Financial Connections</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {solvedCategories.size}/4
            </div>
            <div className="flex gap-1">{getMistakeDisplay()}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Instructions */}
          <p className="text-sm text-gray-600 text-center">
            Find groups of 4 financial terms that share something in common!
          </p>

          {/* Solved Categories Display */}
          {Array.from(solvedCategories).map((categoryName) => {
            const category = CATEGORIES.find((c) => c.name === categoryName);
            const categoryWords = WORDS.filter(
              (w) => w.category === categoryName,
            );

            return (
              <div
                key={categoryName}
                className={`p-3 rounded-lg ${category?.bgColor} ${category?.color} border-2 border-current`}
              >
                <div className="font-bold text-sm mb-1">
                  {categoryName.toUpperCase()}
                </div>
                <div className="text-xs opacity-80 mb-2">
                  {category?.description}
                </div>
                <div className="text-sm font-medium">
                  {categoryWords.map((w) => w.text).join(", ")}
                </div>
              </div>
            );
          })}

          {/* Game Grid */}
          {!gameComplete && words.length > 0 && (
            <>
              <div className="grid grid-cols-4 gap-2">
                {words.map((word, index) => (
                  <Button
                    key={`${word.text}-${index}`}
                    variant="outline"
                    className={`h-16 text-xs font-medium transition-all ${getWordButtonClass(word)}`}
                    onClick={() => toggleWordSelection(word.text)}
                    disabled={solvedCategories.has(word.category)}
                  >
                    {word.text}
                  </Button>
                ))}
              </div>

              {/* Game Controls */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={shuffleWords}>
                    <Shuffle className="w-4 h-4 mr-1" />
                    Shuffle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deselectAll}
                    disabled={selectedWords.size === 0}
                  >
                    Deselect All
                  </Button>
                </div>

                <Button
                  onClick={submitGuess}
                  disabled={selectedWords.size !== 4}
                  className="bg-econome-green-500 hover:bg-econome-green-600"
                >
                  Submit
                </Button>
              </div>

              {/* Feedback Messages */}
              {oneAway && (
                <div className="text-center p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
                  One away! Try again.
                </div>
              )}

              {mistakes >= 2 && !showHint && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(true)}
                  >
                    Need a hint?
                  </Button>
                </div>
              )}

              {showHint && (
                <div className="text-center p-3 bg-blue-50 text-blue-800 rounded text-sm">
                  <strong>Hint:</strong> Look for "
                  {getHintForNextCategory()?.description}"
                </div>
              )}
            </>
          )}

          {/* Game Complete */}
          {gameComplete && (
            <div className="text-center p-6 bg-econome-green-50 rounded-lg">
              {solvedCategories.size === 4 ? (
                <>
                  <h3 className="text-xl font-bold text-econome-green-800 mb-2">
                    🎉 Congratulations!
                  </h3>
                  <p className="text-econome-green-600 mb-2">
                    You solved all categories with {mistakes} mistake
                    {mistakes !== 1 ? "s" : ""}!
                  </p>
                  <p className="text-lg font-bold text-econome-green-800">
                    Score: {Math.max(1000 - mistakes * 100, 100)}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-red-800 mb-2">
                    Game Over
                  </h3>
                  <p className="text-red-600 mb-2">
                    Too many mistakes! Better luck next time.
                  </p>
                </>
              )}

              <Button
                onClick={initializeGame}
                className="mt-4 bg-econome-green-500 hover:bg-econome-green-600"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
