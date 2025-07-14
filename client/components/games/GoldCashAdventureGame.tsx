import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Trophy, Users, Key, Target } from "lucide-react";

interface GoldCashAdventureGameProps {
  onComplete?: (score: number) => void;
}

interface Position {
  x: number;
  y: number;
}

interface GameState {
  goldGuy: Position;
  cashGirl: Position;
  goldKeys: number;
  cashKeys: number;
  level: number;
  moves: number;
  gameComplete: boolean;
  selectedCharacter: "gold" | "cash";
  goldWeightActivated: boolean[];
  cashPressureActivated: boolean[];
}

const LEVELS = [
  {
    id: 1,
    name: "First Steps",
    description: "Learn the basics of Gold Guy and Cash Girl",
    grid: [
      ["W", "W", "W", "W", "W", "W", "W", "W"],
      ["W", "G", ".", ".", ".", ".", "C", "W"],
      ["W", ".", "GW", ".", ".", "CP", ".", "W"],
      ["W", ".", ".", "F", "L", ".", ".", "W"],
      ["W", "GK", ".", ".", ".", ".", "CK", "W"],
      ["W", ".", ".", "T", "R", ".", ".", "W"],
      ["W", "EG", ".", ".", ".", ".", "EC", "W"],
      ["W", "W", "W", "W", "W", "W", "W", "W"],
    ],
    goldWeights: 1,
    cashPressures: 1,
  },
  {
    id: 2,
    name: "Weight & Float",
    description: "Use Gold Guy's weight and Cash Girl's floating ability",
    grid: [
      ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
      ["W", "G", ".", "GW", ".", ".", ".", "C", ".", "W"],
      ["W", ".", ".", ".", ".", "WWW", ".", ".", ".", "W"],
      ["W", ".", "F", ".", ".", "WWW", ".", ".", "L", "W"],
      ["W", ".", ".", ".", ".", "WWW", ".", "CP", ".", "W"],
      ["W", "GK", ".", ".", ".", ".", ".", ".", "CK", "W"],
      ["W", ".", ".", "R", ".", "B", ".", "T", ".", "W"],
      ["W", "EG", ".", ".", ".", ".", ".", ".", "EC", "W"],
      ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ],
    goldWeights: 1,
    cashPressures: 1,
  },
];

// Cell type meanings:
// W = Wall, G = Gold Guy start, C = Cash Girl start
// GW = Gold Weight Switch, CP = Cash Pressure Plate
// F = Fire (burns Cash Girl), L = Lava (Gold Guy can stand on)
// GK = Gold Key, CK = Cash Key
// T = Tax Trap, R = Robber Pit, B = Bank Vault
// EG = Gold Guy Exit, EC = Cash Girl Exit
// . = Empty space, WWW = Water

export default function GoldCashAdventureGame({
  onComplete,
}: GoldCashAdventureGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    goldGuy: { x: 1, y: 1 },
    cashGirl: { x: 6, y: 1 },
    goldKeys: 0,
    cashKeys: 0,
    level: 0,
    moves: 0,
    gameComplete: false,
    selectedCharacter: "gold",
    goldWeightActivated: [false],
    cashPressureActivated: [false],
  });

  const [animationClass, setAnimationClass] = useState("");
  const [message, setMessage] = useState(
    "Use WASD for Gold Guy, Arrow Keys for Cash Girl!",
  );

  const currentLevel = LEVELS[gameState.level];

  useEffect(() => {
    initializeLevel();
  }, [gameState.level]);

  const initializeLevel = () => {
    const level = LEVELS[gameState.level];
    if (!level) return;

    // Find starting positions
    const goldStart = findCellPosition(level.grid, "G");
    const cashStart = findCellPosition(level.grid, "C");

    setGameState((prev) => ({
      ...prev,
      goldGuy: goldStart || { x: 1, y: 1 },
      cashGirl: cashStart || { x: 6, y: 1 },
      goldKeys: 0,
      cashKeys: 0,
      moves: 0,
      gameComplete: false,
      goldWeightActivated: new Array(level.goldWeights).fill(false),
      cashPressureActivated: new Array(level.cashPressures).fill(false),
    }));

    setMessage(`Level ${level.id}: ${level.description}`);
  };

  const findCellPosition = (
    grid: string[][],
    cellType: string,
  ): Position | null => {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === cellType) {
          return { x, y };
        }
      }
    }
    return null;
  };

  const isValidMove = (
    character: "gold" | "cash",
    newPos: Position,
  ): boolean => {
    const { x, y } = newPos;
    const grid = currentLevel.grid;

    // Check boundaries
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
      return false;
    }

    const cell = grid[y][x];

    // Basic wall check
    if (cell === "W") return false;

    // Character-specific rules
    if (character === "gold") {
      // Gold Guy can't go through fragile areas (represented as tight spaces)
      if (cell === "TIGHT") return false;
      // Gold Guy sinks in water
      if (cell === "WWW") return false;
      // But can stand on lava
      if (cell === "L") return true;
    }

    if (character === "cash") {
      // Cash Girl gets burned by fire
      if (cell === "F") return false;
      // But can float on water
      if (cell === "WWW") return true;
      // Gets burned by lava
      if (cell === "L") return false;
    }

    return true;
  };

  const moveCharacter = useCallback(
    (character: "gold" | "cash", direction: string) => {
      setGameState((prev) => {
        const currentPos = character === "gold" ? prev.goldGuy : prev.cashGirl;
        let newPos = { ...currentPos };

        // Calculate new position
        switch (direction) {
          case "ArrowUp":
          case "w":
            newPos.y -= 1;
            break;
          case "ArrowDown":
          case "s":
            newPos.y += 1;
            break;
          case "ArrowLeft":
          case "a":
            newPos.x -= 1;
            break;
          case "ArrowRight":
          case "d":
            newPos.x += 1;
            break;
          default:
            return prev;
        }

        // Check if move is valid
        if (!isValidMove(character, newPos)) {
          setMessage(
            character === "gold"
              ? "Gold Guy is too heavy for that path!"
              : "Cash Girl can't go through fire!",
          );
          return prev;
        }

        // Update character position
        const newState = {
          ...prev,
          moves: prev.moves + 1,
          [character === "gold" ? "goldGuy" : "cashGirl"]: newPos,
        };

        // Check for interactions
        const cell = currentLevel.grid[newPos.y][newPos.x];

        // Collect keys
        if (cell === "GK" && character === "gold") {
          newState.goldKeys += 1;
          setMessage("Gold Guy collected a golden key! 🔑");
        } else if (cell === "CK" && character === "cash") {
          newState.cashKeys += 1;
          setMessage("Cash Girl collected a cash key! 💵");
        }

        // Activate switches/plates
        if (cell === "GW" && character === "gold") {
          newState.goldWeightActivated[0] = true;
          setMessage("Gold Guy's weight activated the switch! ⚖️");
        } else if (cell === "CP" && character === "cash") {
          newState.cashPressureActivated[0] = true;
          setMessage("Cash Girl activated the pressure plate! 💨");
        }

        // Check for traps
        if (cell === "T") {
          setMessage("Watch out for tax traps! 📊");
        } else if (cell === "R") {
          setMessage("Robber pit ahead! Be careful! 🕳️");
        }

        // Check win condition
        const goldAtExit =
          currentLevel.grid[newState.goldGuy.y][newState.goldGuy.x] === "EG";
        const cashAtExit =
          currentLevel.grid[newState.cashGirl.y][newState.cashGirl.x] === "EC";

        if (goldAtExit && cashAtExit) {
          if (newState.level < LEVELS.length - 1) {
            setMessage("Level complete! Moving to next level...");
            newState.level += 1;
            setTimeout(() => {
              setGameState((s) => ({ ...s, level: s.level + 1 }));
            }, 1500);
          } else {
            newState.gameComplete = true;
            setMessage("Congratulations! You completed all levels! 🎉");
            onComplete?.(Math.max(1000 - newState.moves * 10, 100));
          }
        }

        return newState;
      });
    },
    [currentLevel, onComplete],
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();

      // Gold Guy controls (WASD)
      if (["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
        moveCharacter("gold", e.key.toLowerCase());
        setGameState((prev) => ({ ...prev, selectedCharacter: "gold" }));
      }

      // Cash Girl controls (Arrow keys)
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        moveCharacter("cash", e.key);
        setGameState((prev) => ({ ...prev, selectedCharacter: "cash" }));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [moveCharacter]);

  const resetGame = () => {
    setGameState({
      goldGuy: { x: 1, y: 1 },
      cashGirl: { x: 6, y: 1 },
      goldKeys: 0,
      cashKeys: 0,
      level: 0,
      moves: 0,
      gameComplete: false,
      selectedCharacter: "gold",
      goldWeightActivated: [false],
      cashPressureActivated: [false],
    });
  };

  const getCellDisplay = (cell: string, x: number, y: number) => {
    const isGoldGuy = gameState.goldGuy.x === x && gameState.goldGuy.y === y;
    const isCashGirl = gameState.cashGirl.x === x && gameState.cashGirl.y === y;

    if (isGoldGuy && isCashGirl) {
      return <span className="text-lg">👫</span>;
    }
    if (isGoldGuy) {
      return <span className="text-lg animate-bounce">🟡</span>;
    }
    if (isCashGirl) {
      return <span className="text-lg animate-pulse">💚</span>;
    }

    switch (cell) {
      case "W":
        return <div className="w-full h-full bg-gray-800"></div>;
      case "GW":
        return (
          <span
            className={`text-xs ${gameState.goldWeightActivated[0] ? "text-yellow-600" : "text-gray-400"}`}
          >
            ⚖️
          </span>
        );
      case "CP":
        return (
          <span
            className={`text-xs ${gameState.cashPressureActivated[0] ? "text-green-600" : "text-gray-400"}`}
          >
            💨
          </span>
        );
      case "F":
        return <span className="text-xs">🔥</span>;
      case "L":
        return <span className="text-xs">🌋</span>;
      case "WWW":
        return <span className="text-xs">🌊</span>;
      case "GK":
        return <span className="text-xs">🔑</span>;
      case "CK":
        return <span className="text-xs">💵</span>;
      case "T":
        return <span className="text-xs">📊</span>;
      case "R":
        return <span className="text-xs">🕳️</span>;
      case "B":
        return <span className="text-xs">🏦</span>;
      case "EG":
        return <span className="text-xs">🚪</span>;
      case "EC":
        return <span className="text-xs">🚪</span>;
      default:
        return null;
    }
  };

  const getCellBackground = (cell: string) => {
    switch (cell) {
      case "W":
        return "bg-gray-800";
      case "F":
        return "bg-red-200";
      case "L":
        return "bg-orange-300";
      case "WWW":
        return "bg-blue-200";
      case "T":
        return "bg-yellow-200";
      case "R":
        return "bg-purple-200";
      case "B":
        return "bg-blue-800";
      case "EG":
      case "EC":
        return "bg-green-200";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-econome-green-800">
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gold Guy & Cash Girl Adventure
          </span>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              Level {gameState.level + 1}
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Moves: {gameState.moves}
            </div>
            <div className="flex items-center gap-2">
              <span>🔑 {gameState.goldKeys}</span>
              <span>💵 {gameState.cashKeys}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Instructions */}
          <div className="bg-econome-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-econome-green-800 mb-2">
              {currentLevel?.name}
            </h3>
            <p className="text-sm text-econome-green-600 mb-2">{message}</p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-semibold">🟡 Gold Guy (WASD):</h4>
                <ul className="text-gray-600">
                  <li>• Heavy - activates weight switches</li>
                  <li>• Can stand on lava 🌋</li>
                  <li>• Sinks in water 🌊</li>
                  <li>• Collects golden keys 🔑</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">💚 Cash Girl (Arrow Keys):</h4>
                <ul className="text-gray-600">
                  <li>• Light - activates pressure plates</li>
                  <li>• Floats on water 🌊</li>
                  <li>• Burns in fire/lava 🔥</li>
                  <li>• Collects cash keys 💵</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Game Grid */}
          <div className="flex justify-center">
            <div
              className="grid gap-1 border-2 border-econome-green-300 p-2 bg-white rounded-lg"
              style={{
                gridTemplateColumns: `repeat(${currentLevel?.grid[0]?.length || 8}, 1fr)`,
              }}
            >
              {currentLevel?.grid.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`
                      w-8 h-8 flex items-center justify-center text-xs font-bold border
                      ${getCellBackground(cell)}
                      transition-all duration-200
                    `}
                  >
                    {getCellDisplay(cell, x, y)}
                  </div>
                )),
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Selected:{" "}
              {gameState.selectedCharacter === "gold"
                ? "🟡 Gold Guy"
                : "💚 Cash Girl"}
            </div>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Game
            </Button>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-4 gap-2 text-xs bg-gray-50 p-3 rounded">
            <div>🔥 Fire trap | 🌋 Lava</div>
            <div>🌊 Water | ⚖️ Weight switch</div>
            <div>💨 Pressure plate | 🔑 Gold key</div>
            <div>💵 Cash key | 🚪 Exit door</div>
          </div>

          {/* Game Complete */}
          {gameState.gameComplete && (
            <div className="text-center p-6 bg-econome-green-50 rounded-lg">
              <h3 className="text-xl font-bold text-econome-green-800 mb-2">
                🎉 Adventure Complete!
              </h3>
              <p className="text-econome-green-600 mb-2">
                Gold Guy and Cash Girl worked together perfectly!
              </p>
              <p className="text-lg font-bold text-econome-green-800">
                Final Score: {Math.max(1000 - gameState.moves * 10, 100)} points
              </p>
              <p className="text-sm text-econome-green-600 mt-1">
                Total moves: {gameState.moves}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
