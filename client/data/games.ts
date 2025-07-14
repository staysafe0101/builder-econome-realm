export interface Game {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xpReward: number;
  estimatedTime: string;
  icon: string;
  color: string;
  unlocked: boolean;
  completed: boolean;
  component: string; // Component name to render
}

export const games: Game[] = [
  {
    id: 1,
    title: "Budget Balance Challenge",
    description: "Create a monthly budget for different income scenarios",
    category: "Budgeting",
    difficulty: "Easy",
    xpReward: 50,
    estimatedTime: "10 min",
    icon: "PiggyBank",
    color: "econome-green",
    unlocked: true,
    completed: false,
    component: "BudgetBalanceGame",
  },
  {
    id: 2,
    title: "Credit Score Simulator",
    description: "Make decisions and see how they affect your credit score",
    category: "Credit",
    difficulty: "Medium",
    xpReward: 75,
    estimatedTime: "15 min",
    icon: "CreditCard",
    color: "econome-blue",
    unlocked: true,
    completed: false,
    component: "CreditScoreGame",
  },
  {
    id: 3,
    title: "Investment Adventure",
    description: "Build a diversified portfolio and watch it grow",
    category: "Investing",
    difficulty: "Hard",
    xpReward: 100,
    estimatedTime: "20 min",
    icon: "TrendingUp",
    color: "econome-yellow",
    unlocked: false,
    completed: false,
    component: "InvestmentGame",
  },
  {
    id: 4,
    title: "Shopping Smart Quiz",
    description: "Test your consumer skills with real shopping scenarios",
    category: "Consumer Skills",
    difficulty: "Easy",
    xpReward: 40,
    estimatedTime: "8 min",
    icon: "ShoppingCart",
    color: "econome-green",
    unlocked: true,
    completed: false,
    component: "ShoppingQuizGame",
  },
  {
    id: 5,
    title: "Emergency Fund Race",
    description: "Build your emergency fund while facing unexpected expenses",
    category: "Savings",
    difficulty: "Medium",
    xpReward: 60,
    estimatedTime: "12 min",
    icon: "Shield",
    color: "econome-blue",
    unlocked: true,
    completed: false,
    component: "EmergencyFundGame",
  },
  {
    id: 6,
    title: "Loan Calculator Master",
    description: "Learn how interest rates and terms affect loan payments",
    category: "Loans",
    difficulty: "Medium",
    xpReward: 70,
    estimatedTime: "15 min",
    icon: "Calculator",
    color: "econome-yellow",
    unlocked: true,
    completed: false,
    component: "LoanCalculatorGame",
  },
  {
    id: 7,
    title: "Tax Filing Challenge",
    description: "Complete a simple tax return and maximize your refund",
    category: "Taxes",
    difficulty: "Hard",
    xpReward: 90,
    estimatedTime: "18 min",
    icon: "FileText",
    color: "econome-green",
    unlocked: false,
    completed: false,
    component: "TaxFilingGame",
  },
  {
    id: 8,
    title: "Banking Basics Quest",
    description: "Navigate different banking scenarios and make smart choices",
    category: "Banking",
    difficulty: "Easy",
    xpReward: 45,
    estimatedTime: "10 min",
    icon: "Building",
    color: "econome-blue",
    unlocked: true,
    completed: false,
    component: "BankingQuestGame",
  },
  {
    id: 9,
    title: "Gold Guy & Cash Girl Adventure",
    description:
      "Cooperative puzzle game balancing wealth types to solve levels",
    category: "Teamwork",
    difficulty: "Medium",
    xpReward: 150,
    estimatedTime: "25 min",
    icon: "Users",
    color: "econome-yellow",
    unlocked: true,
    completed: false,
    component: "GoldCashAdventureGame",
  },
];

export const getUnlockedGames = (): Game[] => {
  return games.filter((game) => game.unlocked);
};

export const getGameById = (id: number): Game | undefined => {
  return games.find((game) => game.id === id);
};
