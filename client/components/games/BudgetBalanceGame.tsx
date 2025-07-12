import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import CashMascot from "@/components/CashMascot";

interface BudgetCategory {
  name: string;
  budgeted: number;
  recommended: number;
  type: "need" | "want" | "savings";
}

const BudgetBalanceGame = () => {
  const [income, setIncome] = useState(2000);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { name: "Rent", budgeted: 0, recommended: 800, type: "need" },
    { name: "Food", budgeted: 0, recommended: 300, type: "need" },
    { name: "Transportation", budgeted: 0, recommended: 200, type: "need" },
    { name: "Entertainment", budgeted: 0, recommended: 200, type: "want" },
    { name: "Clothes", budgeted: 0, recommended: 100, type: "want" },
    { name: "Dining Out", budgeted: 0, recommended: 100, type: "want" },
    { name: "Emergency Fund", budgeted: 0, recommended: 200, type: "savings" },
    { name: "Retirement", budgeted: 0, recommended: 100, type: "savings" },
  ]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const totalBudgeted = categories.reduce(
    (sum, category) => sum + category.budgeted,
    0,
  );
  const remaining = income - totalBudgeted;

  const updateCategory = (index: number, value: number) => {
    const newCategories = [...categories];
    newCategories[index].budgeted = Math.max(0, value);
    setCategories(newCategories);
  };

  const calculateScore = () => {
    let points = 0;
    const tolerance = 0.1; // 10% tolerance

    categories.forEach((category) => {
      const difference = Math.abs(category.budgeted - category.recommended);
      const percentDiff = difference / category.recommended;
      if (percentDiff <= tolerance) {
        points += 100;
      } else if (percentDiff <= 0.2) {
        points += 50;
      }
    });

    // Bonus for balanced budget
    if (Math.abs(remaining) <= 50) {
      points += 200;
    }

    return Math.min(points, 1000);
  };

  const submitBudget = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setGameCompleted(true);
  };

  const resetGame = () => {
    setCategories(categories.map((cat) => ({ ...cat, budgeted: 0 })));
    setGameCompleted(false);
    setScore(0);
  };

  if (gameCompleted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-econome-green-200">
          <CardHeader className="text-center">
            <div className="mb-4">
              <CashMascot
                size="large"
                message={
                  score >= 800
                    ? "Excellent budgeting! You're a natural!"
                    : score >= 600
                      ? "Good job! With practice, you'll master budgeting!"
                      : "Keep practicing! Budgeting gets easier with time."
                }
                mood={score >= 600 ? "excited" : "encouraging"}
              />
            </div>
            <CardTitle className="text-3xl text-econome-green-800">
              Budget Complete! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-4xl font-bold text-econome-green-600 mb-2">
                {score}/1000 Points
              </div>
              <Progress value={(score / 1000) * 100} className="h-4 mb-4" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Your Budget Breakdown</h3>
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm mb-1"
                  >
                    <span>{category.name}:</span>
                    <span>${category.budgeted}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-semibold">
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span
                      className={
                        remaining >= 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      ${remaining}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Feedback</h3>
                <div className="text-left space-y-2 text-sm">
                  {score >= 800 && (
                    <p className="text-green-600">
                      🎯 Perfect! Your budget follows the 50/30/20 rule closely.
                    </p>
                  )}
                  {score >= 600 && score < 800 && (
                    <p className="text-blue-600">
                      👍 Good work! Small adjustments could improve your budget.
                    </p>
                  )}
                  {score < 600 && (
                    <p className="text-orange-600">
                      💡 Keep practicing! Focus on needs first, then wants and
                      savings.
                    </p>
                  )}
                  {Math.abs(remaining) > 50 && (
                    <p className="text-red-600">
                      ⚠️ Try to balance your budget - you're{" "}
                      {remaining > 0 ? "under" : "over"} by $
                      {Math.abs(remaining)}.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame} variant="outline">
                Try Again
              </Button>
              <Button
                onClick={() => window.close()}
                className="bg-econome-green-500 hover:bg-econome-green-600"
              >
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-econome-green-200">
        <CardHeader>
          <CardTitle className="text-2xl text-econome-green-800 text-center">
            🏦 Budget Balance Challenge
          </CardTitle>
          <div className="text-center">
            <CashMascot
              size="medium"
              message="Help create a balanced budget! Allocate your monthly income across different categories."
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Budget Input */}
            <div>
              <div className="mb-6">
                <h3 className="font-semibold mb-4">
                  Monthly Income: ${income.toLocaleString()}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Budgeted:</span>
                    <span>${totalBudgeted.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Remaining:</span>
                    <span
                      className={
                        remaining >= 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      ${remaining.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((totalBudgeted / income) * 100, 100)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-medium">{category.name}</label>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          category.type === "need"
                            ? "bg-red-100 text-red-700"
                            : category.type === "want"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {category.type}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        value={category.budgeted}
                        onChange={(e) =>
                          updateCategory(index, parseInt(e.target.value) || 0)
                        }
                        placeholder="$0"
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-500 min-w-0">
                        Suggested: ${category.recommended}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips and Guidelines */}
            <div>
              <h3 className="font-semibold mb-4">💡 Budgeting Tips</h3>
              <div className="space-y-4">
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-red-800 mb-2">
                      Needs (50% of income)
                    </h4>
                    <p className="text-sm text-red-700">
                      Essential expenses like rent, food, and transportation
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Wants (30% of income)
                    </h4>
                    <p className="text-sm text-blue-700">
                      Entertainment, dining out, and non-essential items
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Savings (20% of income)
                    </h4>
                    <p className="text-sm text-green-700">
                      Emergency fund, retirement, and other savings goals
                    </p>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Button
                    onClick={submitBudget}
                    disabled={totalBudgeted === 0}
                    className="w-full bg-econome-green-500 hover:bg-econome-green-600"
                  >
                    Submit Budget
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetBalanceGame;
