import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Trophy, Users, Key, Target } from "lucide-react";

// Custom CSS animations
const gameStyles = `
  @keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }

  @keyframes sway {
    0%, 100% { transform: translateX(0px) rotate(0deg); }
    50% { transform: translateX(1px) rotate(2deg); }
  }

  @keyframes blink {
    0%, 90% { transform: scaleY(1); }
    95% { transform: scaleY(0.1); }
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-wiggle {
    animation: wiggle 2s ease-in-out infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-sway {
    animation: sway 4s ease-in-out infinite;
  }

  .animate-blink {
    animation: blink 3s infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 4s linear infinite;
  }
`;

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

  const renderGoldGuy = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative transform-gpu animate-bounce">
        {/* Gold Guy Body */}
        <div className="relative">
          {/* Main body - gold sphere */}
          <div
            className="w-6 h-6 rounded-full shadow-lg transform-gpu animate-pulse"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #FFD700, #FFA500, #B8860B)",
              boxShadow:
                "0 2px 8px rgba(255, 215, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* Gold shine effect */}
            <div
              className="absolute top-1 left-1 w-2 h-2 rounded-full opacity-70 animate-ping"
              style={{
                background: "radial-gradient(circle, #FFFF99, transparent)",
              }}
            />
          </div>

          {/* Arms */}
          <div className="absolute -left-1 top-2 w-2 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transform rotate-12 animate-wiggle"></div>
          <div className="absolute -right-1 top-2 w-2 h-1 bg-gradient-to-l from-yellow-400 to-yellow-600 rounded-full transform -rotate-12 animate-wiggle"></div>

          {/* Legs */}
          <div className="absolute left-1 top-5 w-1 h-2 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
          <div className="absolute right-1 top-5 w-1 h-2 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>

          {/* Eyes */}
          <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-black rounded-full animate-blink"></div>
          <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-black rounded-full animate-blink"></div>

          {/* Crown/hat (showing wealth) */}
          <div
            className="absolute -top-2 left-1 w-4 h-2 rounded-t-full transform-gpu animate-float"
            style={{
              background: "linear-gradient(45deg, #FFD700, #FFA500)",
              boxShadow: "0 0 4px rgba(255, 215, 0, 0.8)",
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderCashGirl = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative transform-gpu animate-float">
        {/* Cash Girl Body */}
        <div className="relative">
          {/* Main body - cash bill shape */}
          <div
            className="w-6 h-4 rounded shadow-lg transform-gpu animate-pulse"
            style={{
              background: "linear-gradient(135deg, #90EE90, #32CD32, #228B22)",
              boxShadow:
                "0 2px 6px rgba(50, 205, 50, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Cash pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Arms - floating paper strips */}
          <div className="absolute -left-1 top-1 w-2 h-0.5 bg-gradient-to-r from-green-300 to-green-500 rounded transform rotate-6 animate-wiggle"></div>
          <div className="absolute -right-1 top-1 w-2 h-0.5 bg-gradient-to-l from-green-300 to-green-500 rounded transform -rotate-6 animate-wiggle"></div>

          {/* Legs - paper strips */}
          <div className="absolute left-1 top-3 w-1 h-1.5 bg-gradient-to-b from-green-300 to-green-500 rounded animate-sway"></div>
          <div className="absolute right-1 top-3 w-1 h-1.5 bg-gradient-to-b from-green-300 to-green-500 rounded animate-sway"></div>

          {/* Eyes */}
          <div className="absolute top-1 left-1.5 w-0.5 h-0.5 bg-white rounded-full animate-blink"></div>
          <div className="absolute top-1 right-1.5 w-0.5 h-0.5 bg-white rounded-full animate-blink"></div>

          {/* Money symbol on head */}
          <div
            className="absolute -top-1.5 left-2 text-xs font-bold text-green-800 animate-bounce"
            style={{ fontSize: "8px" }}
          >
            $
          </div>

          {/* Floating effect particles */}
          <div className="absolute -top-1 -left-1 w-1 h-1 bg-green-200 rounded-full opacity-60 animate-ping"></div>
          <div
            className="absolute -top-1 -right-1 w-1 h-1 bg-green-200 rounded-full opacity-60 animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>
    </div>
  );

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
          setMessage("Gold Guy collected a gold bar! 🥇");
        } else if (cell === "CK" && character === "cash") {
          newState.cashKeys += 1;
          setMessage("Cash Girl collected a cash bill! 💵");
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
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute scale-75">{renderGoldGuy()}</div>
          <div className="absolute scale-75 translate-x-1">
            {renderCashGirl()}
          </div>
        </div>
      );
    }
    if (isGoldGuy) {
      return renderGoldGuy();
    }
    if (isCashGirl) {
      return renderCashGirl();
    }

    switch (cell) {
      case "W":
        return (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-gray-600 opacity-30"></div>
          </div>
        );
      case "GW":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={`w-5 h-3 rounded transform-gpu transition-all duration-300 ${
                gameState.goldWeightActivated[0]
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse shadow-lg"
                  : "bg-gradient-to-br from-gray-400 to-gray-600"
              }`}
              style={{
                boxShadow: gameState.goldWeightActivated[0]
                  ? "0 0 8px rgba(255, 215, 0, 0.8)"
                  : "none",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-20 rounded"></div>
            </div>
          </div>
        );
      case "CP":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={`w-4 h-4 rounded-full transform-gpu transition-all duration-300 ${
                gameState.cashPressureActivated[0]
                  ? "bg-gradient-to-br from-green-300 to-green-500 animate-ping shadow-lg"
                  : "bg-gradient-to-br from-gray-300 to-gray-500"
              }`}
              style={{
                boxShadow: gameState.cashPressureActivated[0]
                  ? "0 0 6px rgba(50, 205, 50, 0.8)"
                  : "none",
              }}
            >
              {gameState.cashPressureActivated[0] && (
                <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-pulse"></div>
              )}
            </div>
          </div>
        );
      case "F":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-4 h-5 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-t-full animate-bounce">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-t-full animate-wiggle"></div>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-800 rounded-full"></div>
            </div>
          </div>
        );
      case "L":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-5 h-3 bg-gradient-to-t from-red-800 via-orange-600 to-yellow-500 rounded-t-lg animate-pulse">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-t-lg animate-wiggle"></div>
              </div>
              <div className="absolute -bottom-1 inset-x-0 h-1 bg-red-900 rounded-b"></div>
            </div>
          </div>
        );
      case "WWW":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-blue-300 to-blue-500">
            <div className="absolute top-0 left-0 w-2 h-1 bg-blue-200 rounded-full animate-ping"></div>
            <div className="absolute top-1 right-0 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-1 w-1 h-1 bg-blue-100 rounded-full animate-bounce"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-20"></div>
          </div>
        );
      case "GK":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative transform-gpu animate-spin-slow">
              <div
                className="w-5 h-2 rounded-sm bg-gradient-to-br from-yellow-200 to-yellow-600 shadow-lg"
                style={{ boxShadow: "0 0 8px rgba(255, 215, 0, 0.9)" }}
              >
                {/* Gold bar text */}
                <div
                  className="absolute inset-0 flex items-center justify-center text-xs font-bold text-yellow-900"
                  style={{ fontSize: "6px" }}
                >
                  AU
                </div>
                {/* Shine effects */}
                <div className="absolute top-0 left-1 w-1 h-0.5 bg-yellow-100 rounded opacity-80"></div>
                <div className="absolute bottom-0 right-1 w-1 h-0.5 bg-yellow-800 rounded opacity-60"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white opacity-40 rounded-sm"></div>
            </div>
          </div>
        );
      case "CK":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative transform-gpu animate-float">
              <div
                className="w-5 h-3 rounded bg-gradient-to-br from-green-200 to-green-400 shadow-lg"
                style={{ boxShadow: "0 0 4px rgba(50, 205, 50, 0.6)" }}
              >
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-green-700 rounded-full"></div>
                  <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-green-700 rounded-full"></div>
                  <div className="absolute center-0.5 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-800">
                    $
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "T":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded transform rotate-45 animate-pulse shadow-lg">
                <div className="absolute top-1 left-1 w-2 h-0.5 bg-yellow-700 rounded"></div>
                <div className="absolute top-1.5 left-1 w-2 h-0.5 bg-yellow-700 rounded"></div>
                <div className="absolute top-2 left-1 w-2 h-0.5 bg-yellow-700 rounded"></div>
              </div>
            </div>
          </div>
        );
      case "R":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-800 to-black rounded-full shadow-inner animate-pulse">
              <div className="absolute inset-1 bg-gradient-to-br from-purple-900 to-black rounded-full"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-purple-600 rounded-full opacity-50"></div>
            </div>
          </div>
        );
      case "B":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-5 h-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded shadow-lg">
                <div className="absolute top-0 inset-x-0 h-1 bg-blue-400 rounded-t"></div>
                <div className="absolute top-1 left-1 w-1 h-1 bg-blue-300 rounded"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-blue-300 rounded"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded"></div>
              </div>
            </div>
          </div>
        );
      case "EG":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-4 h-5 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-t shadow-lg animate-pulse">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-700 rounded-full"></div>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-yellow-600"></div>
              </div>
            </div>
          </div>
        );
      case "EC":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-4 h-5 bg-gradient-to-br from-green-200 to-green-400 rounded-t shadow-lg animate-pulse">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-700 rounded-full"></div>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-green-600"></div>
              </div>
            </div>
          </div>
        );
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
    <>
      <style>{gameStyles}</style>
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
                <span>🥇 {gameState.goldKeys}</span>
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
                  <h4 className="font-semibold">⚡ 3D Gold Guy (WASD):</h4>
                  <ul className="text-gray-600">
                    <li>• Shiny golden sphere with crown</li>
                    <li>• Heavy - activates weight switches</li>
                    <li>• Can stand on lava 🌋</li>
                    <li>• Sinks in water 🌊</li>
                    <li>• Collects spinning gold bars</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">
                    ⚡ 3D Cash Girl (Arrow Keys):
                  </h4>
                  <ul className="text-gray-600">
                    <li>• Animated green bill with $ symbol</li>
                    <li>• Light - activates pressure plates</li>
                    <li>• Floats on water 🌊</li>
                    <li>• Burns in fire/lava 🔥</li>
                    <li>• Collects floating cash bills</li>
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
              <div>💨 Pressure plate | 🥇 Gold bar</div>
              <div>💵 Cash bill | 🚪 Exit door</div>
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
                  Final Score: {Math.max(1000 - gameState.moves * 10, 100)}{" "}
                  points
                </p>
                <p className="text-sm text-econome-green-600 mt-1">
                  Total moves: {gameState.moves}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
