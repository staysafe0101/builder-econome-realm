import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Trophy, RotateCcw } from "lucide-react";

interface WordSearchGameProps {
  onComplete?: (score: number) => void;
}

const WORDS = [
  "BUDGET",
  "SAVINGS",
  "CREDIT",
  "DEBIT",
  "INVEST",
  "LOAN",
  "INCOME",
  "EXPENSE",
  "INTEREST",
  "BANK",
  "ASSET",
  "DEBT",
  "EQUITY",
  "STOCK",
  "BOND",
  "TAX",
];

const GRID_SIZE = 15;

interface Position {
  row: number;
  col: number;
}

interface WordPlacement {
  word: string;
  positions: Position[];
  direction: string;
}

interface Cell {
  letter: string;
  isSelected: boolean;
  isPartOfWord: boolean;
  wordId?: number;
}

export default function WordSearchGame({ onComplete }: WordSearchGameProps) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [currentSelection, setCurrentSelection] = useState<Position[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [wordPlacements, setWordPlacements] = useState<WordPlacement[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Timer
  useEffect(() => {
    if (!gameComplete) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameComplete]);

  // Check for game completion
  useEffect(() => {
    if (foundWords.size === WORDS.length && !gameComplete) {
      setGameComplete(true);
      const finalScore = Math.max(1000 - timeElapsed * 5, 100);
      setScore(finalScore);
      onComplete?.(finalScore);
    }
  }, [foundWords.size, gameComplete, timeElapsed, onComplete]);

  const initializeGame = () => {
    // Create empty grid
    const newGrid: Cell[][] = Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => ({
            letter: "",
            isSelected: false,
            isPartOfWord: false,
            wordId: undefined,
          })),
      );

    const placements: WordPlacement[] = [];
    const directions = [
      { dr: 0, dc: 1 }, // horizontal
      { dr: 1, dc: 0 }, // vertical
      { dr: 1, dc: 1 }, // diagonal down-right
      { dr: 1, dc: -1 }, // diagonal down-left
    ];

    // Place words in grid
    WORDS.forEach((word, wordIndex) => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 100) {
        const direction =
          directions[Math.floor(Math.random() * directions.length)];
        const maxRow = GRID_SIZE - Math.abs(direction.dr) * word.length;
        const maxCol = GRID_SIZE - Math.abs(direction.dc) * word.length;

        if (maxRow > 0 && maxCol > 0) {
          const startRow = Math.floor(Math.random() * maxRow);
          const startCol = Math.floor(Math.random() * maxCol);

          // Check if word can be placed
          let canPlace = true;
          const positions: Position[] = [];

          for (let i = 0; i < word.length; i++) {
            const row = startRow + direction.dr * i;
            const col = startCol + direction.dc * i;

            // Boundary check
            if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) {
              canPlace = false;
              break;
            }

            positions.push({ row, col });

            if (
              newGrid[row] &&
              newGrid[row][col] &&
              newGrid[row][col].letter !== "" &&
              newGrid[row][col].letter !== word[i]
            ) {
              canPlace = false;
              break;
            }
          }

          if (canPlace) {
            // Place the word
            positions.forEach((pos, i) => {
              newGrid[pos.row][pos.col] = {
                ...newGrid[pos.row][pos.col],
                letter: word[i],
                isPartOfWord: true,
                wordId: wordIndex,
              };
            });

            placements.push({
              word,
              positions,
              direction: `${direction.dr},${direction.dc}`,
            });
            placed = true;
          }
        }
        attempts++;
      }
    });

    // Fill empty cells with random letters
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (newGrid[row][col].letter === "") {
          newGrid[row][col].letter =
            letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    setGrid(newGrid);
    setWordPlacements(placements);
    setFoundWords(new Set());
    setCurrentSelection([]);
    setTimeElapsed(0);
    setGameComplete(false);
    setScore(0);
  };

  const handleCellMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setCurrentSelection([{ row, col }]);
    updateGridSelection([{ row, col }]);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (isSelecting && grid[row] && grid[row][col]) {
      const newSelection = [...currentSelection, { row, col }];
      setCurrentSelection(newSelection);
      updateGridSelection(newSelection);
    }
  };

  const handleMouseUp = () => {
    if (currentSelection.length > 1) {
      checkForWord();
    }
    setIsSelecting(false);
    clearSelection();
  };

  const updateGridSelection = (selection: Position[]) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) =>
        row.map((cell) => ({ ...cell, isSelected: false })),
      );

      selection.forEach((pos) => {
        if (newGrid[pos.row] && newGrid[pos.row][pos.col]) {
          newGrid[pos.row][pos.col].isSelected = true;
        }
      });

      return newGrid;
    });
  };

  const clearSelection = () => {
    setCurrentSelection([]);
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((cell) => ({ ...cell, isSelected: false })),
      ),
    );
  };

  const checkForWord = () => {
    const selectedWord = currentSelection
      .map((pos) => grid[pos.row]?.[pos.col]?.letter || "")
      .join("");

    const reversedWord = selectedWord.split("").reverse().join("");

    if (WORDS.includes(selectedWord) && !foundWords.has(selectedWord)) {
      setFoundWords((prev) => new Set([...prev, selectedWord]));
      markWordAsFound(selectedWord);
    } else if (WORDS.includes(reversedWord) && !foundWords.has(reversedWord)) {
      setFoundWords((prev) => new Set([...prev, reversedWord]));
      markWordAsFound(reversedWord);
    }
  };

  const markWordAsFound = (word: string) => {
    const placement = wordPlacements.find((p) => p.word === word);
    if (placement) {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        placement.positions.forEach((pos) => {
          newGrid[pos.row][pos.col] = {
            ...newGrid[pos.row][pos.col],
            isPartOfWord: true,
          };
        });
        return newGrid;
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-econome-green-800">
          <span>Financial Word Search</span>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTime(timeElapsed)}
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {foundWords.size}/{WORDS.length}
            </div>
            {gameComplete && (
              <div className="text-econome-green-600 font-bold">
                Score: {score}
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Game Grid */}
          <div className="flex-1">
            <div
              className="grid gap-1 select-none cursor-pointer mb-4"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
              onMouseLeave={() => {
                if (isSelecting) {
                  setIsSelecting(false);
                  clearSelection();
                }
              }}
              onMouseUp={handleMouseUp}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      w-6 h-6 flex items-center justify-center text-xs font-bold border cursor-pointer transition-colors
                      ${cell?.isSelected ? "bg-econome-green-200 border-econome-green-400" : ""}
                      ${
                        cell?.isPartOfWord &&
                        foundWords.has(
                          WORDS.find((w) =>
                            wordPlacements.find(
                              (p) =>
                                p.word === w &&
                                p.positions.some(
                                  (pos) =>
                                    pos.row === rowIndex &&
                                    pos.col === colIndex,
                                ),
                            ),
                          ) || "",
                        )
                          ? "bg-econome-green-100 border-econome-green-300"
                          : "bg-white border-gray-300"
                      }
                      hover:bg-econome-green-50
                    `}
                    onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                    onMouseEnter={() =>
                      handleCellMouseEnter(rowIndex, colIndex)
                    }
                  >
                    {cell?.letter || ""}
                  </div>
                )),
              )}
            </div>

            <Button
              onClick={initializeGame}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Game
            </Button>
          </div>

          {/* Word List */}
          <div className="lg:w-48">
            <h3 className="text-lg font-semibold text-econome-green-800 mb-4">
              Find These Words:
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {WORDS.map((word) => (
                <div
                  key={word}
                  className={`
                    p-2 rounded text-sm font-medium transition-colors
                    ${
                      foundWords.has(word)
                        ? "bg-econome-green-100 text-econome-green-800 line-through"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  {word}
                </div>
              ))}
            </div>

            {gameComplete && (
              <div className="mt-6 p-4 bg-econome-green-50 rounded-lg text-center">
                <h4 className="text-lg font-bold text-econome-green-800 mb-2">
                  🎉 Congratulations!
                </h4>
                <p className="text-sm text-econome-green-600">
                  You found all words in {formatTime(timeElapsed)}!
                </p>
                <p className="text-lg font-bold text-econome-green-800 mt-2">
                  Final Score: {score}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
