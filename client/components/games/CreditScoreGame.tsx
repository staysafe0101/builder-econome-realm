import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CashMascot from "@/components/CashMascot";

interface CreditAction {
  id: number;
  description: string;
  choices: Array<{
    text: string;
    impact: number;
    explanation: string;
  }>;
}

const CreditScoreGame = () => {
  const [creditScore, setCreditScore] = useState(650);
  const [currentAction, setCurrentAction] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [actionHistory, setActionHistory] = useState<
    Array<{
      action: string;
      choice: string;
      impact: number;
      explanation: string;
    }>
  >([]);

  const actions: CreditAction[] = [
    {
      id: 1,
      description:
        "Your first credit card bill arrives with a $500 balance. The minimum payment is $25. What do you do?",
      choices: [
        {
          text: "Pay only the minimum ($25)",
          impact: -5,
          explanation:
            "Paying minimums keeps you current but high balances hurt your utilization ratio.",
        },
        {
          text: "Pay the full balance ($500)",
          impact: +25,
          explanation:
            "Excellent! Paying in full avoids interest and shows responsible credit use.",
        },
        {
          text: "Pay $250 (half the balance)",
          impact: +10,
          explanation:
            "Good effort! Paying more than minimum helps, but full payment is ideal.",
        },
      ],
    },
    {
      id: 2,
      description:
        "You want to buy a new laptop and need $1,200. Your credit limit is $2,000. What's your plan?",
      choices: [
        {
          text: "Put it all on credit card",
          impact: -15,
          explanation:
            "This would use 60% of your credit limit - high utilization hurts your score.",
        },
        {
          text: "Save up and pay cash",
          impact: +5,
          explanation:
            "Smart! Paying cash avoids debt and keeps your credit utilization low.",
        },
        {
          text: "Put $400 on card, save for the rest",
          impact: +15,
          explanation:
            "Great compromise! Low credit utilization while building your credit history.",
        },
      ],
    },
    {
      id: 3,
      description:
        "You're offered a store credit card with 10% off today's purchase. You already have 2 credit cards.",
      choices: [
        {
          text: "Sign up for the discount",
          impact: -10,
          explanation:
            "Too many credit inquiries and accounts can lower your score temporarily.",
        },
        {
          text: "Politely decline",
          impact: +10,
          explanation:
            "Smart! Avoiding unnecessary credit accounts helps maintain a healthy credit profile.",
        },
        {
          text: "Ask about the terms first",
          impact: +5,
          explanation:
            "Good to research, but you probably don't need another card right now.",
        },
      ],
    },
    {
      id: 4,
      description:
        "Your friend asks you to cosign for their car loan because they have bad credit.",
      choices: [
        {
          text: "Agree to help your friend",
          impact: -20,
          explanation:
            "Risky! Cosigning makes you responsible for their debt if they can't pay.",
        },
        {
          text: "Decline and explain the risks",
          impact: +10,
          explanation:
            "Wise choice! Protecting your credit is important for your financial future.",
        },
        {
          text: "Suggest they improve their credit first",
          impact: +15,
          explanation:
            "Excellent advice! This helps your friend while protecting your credit.",
        },
      ],
    },
    {
      id: 5,
      description:
        "You notice an error on your credit report - a late payment that you actually made on time.",
      choices: [
        {
          text: "Ignore it, it's just one mistake",
          impact: -5,
          explanation:
            "Errors can significantly impact your score. Always dispute inaccuracies!",
        },
        {
          text: "Dispute the error with credit bureaus",
          impact: +20,
          explanation:
            "Perfect! Disputing errors is crucial for maintaining an accurate credit report.",
        },
        {
          text: "Call the company that reported it",
          impact: +10,
          explanation:
            "Good start, but you should also dispute with credit bureaus directly.",
        },
      ],
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-green-600";
    if (score >= 740) return "text-blue-600";
    if (score >= 670) return "text-yellow-600";
    if (score >= 580) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreRating = (score: number) => {
    if (score >= 800) return "Excellent";
    if (score >= 740) return "Very Good";
    if (score >= 670) return "Good";
    if (score >= 580) return "Fair";
    return "Poor";
  };

  const handleChoice = (
    choiceIndex: number,
    impact: number,
    explanation: string,
  ) => {
    const choice = actions[currentAction].choices[choiceIndex];
    const newScore = Math.max(300, Math.min(850, creditScore + impact));

    setActionHistory([
      ...actionHistory,
      {
        action: actions[currentAction].description,
        choice: choice.text,
        impact,
        explanation,
      },
    ]);

    setCreditScore(newScore);

    if (currentAction < actions.length - 1) {
      setCurrentAction(currentAction + 1);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCreditScore(650);
    setCurrentAction(0);
    setGameCompleted(false);
    setActionHistory([]);
  };

  if (gameCompleted) {
    const finalScore = creditScore;
    const initialScore = 650;
    const improvement = finalScore - initialScore;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-econome-blue-200">
          <CardHeader className="text-center">
            <div className="mb-4">
              <CashMascot
                size="large"
                message={
                  improvement > 50
                    ? "Fantastic! You made excellent credit decisions!"
                    : improvement > 0
                      ? "Good job! Your credit score improved!"
                      : improvement > -30
                        ? "Not bad! Keep learning about credit management."
                        : "Keep practicing! Credit decisions have big impacts."
                }
                mood={improvement > 30 ? "excited" : "encouraging"}
              />
            </div>
            <CardTitle className="text-3xl text-econome-blue-800">
              Credit Journey Complete! 📊
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div
                className={`text-6xl font-bold mb-2 ${getScoreColor(finalScore)}`}
              >
                {finalScore}
              </div>
              <div className="text-xl text-gray-600 mb-4">
                {getScoreRating(finalScore)} Credit Score
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span>Starting Score: {initialScore}</span>
                <span
                  className={
                    improvement >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {improvement >= 0 ? "+" : ""}
                  {improvement} points
                </span>
              </div>
              <Progress
                value={((finalScore - 300) / (850 - 300)) * 100}
                className="h-6 mb-6"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-4">Your Decisions</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {actionHistory.map((action, index) => (
                    <div key={index} className="p-3 border rounded-lg text-sm">
                      <div className="font-medium mb-1">{action.choice}</div>
                      <div
                        className={
                          action.impact >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {action.impact >= 0 ? "+" : ""}
                        {action.impact} points
                      </div>
                      <div className="text-gray-600 text-xs mt-1">
                        {action.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Credit Score Ranges</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>800-850:</span>
                    <span className="text-green-600 font-medium">
                      Excellent
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>740-799:</span>
                    <span className="text-blue-600 font-medium">Very Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>670-739:</span>
                    <span className="text-yellow-600 font-medium">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>580-669:</span>
                    <span className="text-orange-600 font-medium">Fair</span>
                  </div>
                  <div className="flex justify-between">
                    <span>300-579:</span>
                    <span className="text-red-600 font-medium">Poor</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Key Takeaways
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Pay balances in full when possible</li>
                    <li>• Keep credit utilization below 30%</li>
                    <li>• Avoid unnecessary credit applications</li>
                    <li>• Monitor your credit report regularly</li>
                    <li>• Never cosign unless you can afford the payments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame} variant="outline">
                Play Again
              </Button>
              <Button
                onClick={() => window.close()}
                className="bg-econome-blue-500 hover:bg-econome-blue-600"
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
      <Card className="border-econome-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl text-econome-blue-800 text-center">
            📊 Credit Score Simulator
          </CardTitle>
          <div className="text-center">
            <CashMascot
              size="medium"
              message="Make smart financial decisions and watch your credit score change!"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div
              className={`text-5xl font-bold mb-2 ${getScoreColor(creditScore)}`}
            >
              {creditScore}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {getScoreRating(creditScore)} Credit Score
            </div>
            <Progress
              value={((creditScore - 300) / (850 - 300)) * 100}
              className="h-4 max-w-md mx-auto"
            />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Scenario {currentAction + 1} of {actions.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                {actions[currentAction].description}
              </p>

              <div className="grid gap-4">
                {actions[currentAction].choices.map((choice, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-left h-auto p-4 justify-start"
                    onClick={() =>
                      handleChoice(index, choice.impact, choice.explanation)
                    }
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {actionHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Previous Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {actionHistory.slice(-3).map((action, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="flex-1">{action.choice}</span>
                      <span
                        className={
                          action.impact >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {action.impact >= 0 ? "+" : ""}
                        {action.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditScoreGame;
