import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CashMascot from "@/components/CashMascot";
import { Send, RotateCcw, Lightbulb, HelpCircle } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  mood?: "happy" | "excited" | "thinking" | "encouraging";
}

const ChatWithCash = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! I'm Cash, your friendly financial guide! 🦢💰 I'm here to help you learn about money, budgeting, saving, investing, and anything else related to personal finance. What would you like to chat about today?",
      isUser: false,
      timestamp: new Date(),
      mood: "excited",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const financialResponses = {
    budget: [
      "Great question! Budgeting is like creating a game plan for your money! 🎮 Think of it as deciding how many 'coins' to spend on different things each month. The popular 50/30/20 rule says: 50% for needs (rent, food), 30% for wants (fun stuff!), and 20% for savings. Want me to help you create your first budget?",
      "Budgeting doesn't have to be boring! 📊 Start by tracking where your money goes for a week - you might be surprised! Apps like Mint or even a simple notebook work great. Remember: a budget isn't about restricting yourself, it's about making sure your money goes where you want it to go!",
    ],
    credit: [
      "Credit is like borrowing money with a promise to pay it back later! 💳 Your credit score (300-850) is like your financial report card - higher is better! Payment history is the biggest factor (35% of your score), so always pay on time. Keep your credit utilization below 30% and you'll be golden!",
      "Think of credit like this: if your money was pizza slices, credit lets you eat pizza now and pay for it later! 🍕 But be careful - if you don't pay it back, it gets expensive with interest. Building good credit early is like leveling up in a video game - it unlocks better opportunities later!",
    ],
    investing: [
      "Investing is putting your money to work so it can grow over time! 🌱💰 It's like planting money seeds that grow into money trees! Start with index funds - they're like buying a small piece of many companies at once. The key is time - even $25/month starting at 16 becomes huge by retirement!",
      "Investing might sound scary, but it's actually pretty cool! 📈 Think of it like collecting trading cards - you buy them hoping they'll be worth more later. Stocks go up and down (that's normal!), but historically, they've grown about 10% per year over long periods. Start small and learn as you go!",
    ],
    saving: [
      "Saving is like storing power-ups for your future self! ⚡ Start with an emergency fund - even $500 can be a lifesaver. Here's a fun trick: try the 52-week challenge! Save $1 the first week, $2 the second week, and so on. You'll have $1,378 by the end of the year! ����",
      "Saving money is awesome because it gives you options! 💪 High-yield savings accounts are like regular savings but with a turbo boost for earning interest. Apps like Qapital round up your purchases and save the change automatically. Every dollar you save today is worth more tomorrow!",
    ],
    emergency: [
      "An emergency fund is your financial superhero cape! 🦸‍♂️ It protects you when unexpected expenses try to mess up your budget. Start with $500, then work toward 3-6 months of expenses. Keep it in a separate savings account so you're not tempted to spend it on wants. Trust me, future you will thank present you!",
      "Emergency funds are like insurance for your peace of mind! 🛡️ Life loves to throw curveballs - car repairs, medical bills, job loss. Having money set aside means these become minor inconveniences instead of major crises. Aim for $1,000 first, then build from there!",
    ],
    job: [
      "Getting your first job is so exciting! 🎉 Here are some money tips: Set up direct deposit (it's safer than cash), understand your pay stub (gross vs net pay), and start saving immediately - even $25 from each paycheck adds up! Don't forget to fill out your W-4 form correctly for taxes.",
      "First job = first step to financial independence! 💼 Open a checking and savings account if you haven't already. Pay yourself first by saving a percentage before spending on anything else. And remember - learning about money now will pay off for your entire life!",
    ],
    college: [
      "College planning is smart thinking! 🎓 Look into 529 education savings plans - they grow tax-free for education expenses. Fill out the FAFSA for financial aid, and research scholarships early. Community college for the first two years can save thousands! Remember: student loans are real money you'll have to pay back.",
      "College is an investment in yourself! 📚 Consider the return on investment - will your chosen career pay enough to justify the cost? Look for work-study programs, apply for grants and scholarships, and live frugally. Your future self will appreciate not having massive student loan debt!",
    ],
    car: [
      "Buying a car is a big financial decision! 🚗 Remember the total cost includes insurance, gas, maintenance, and repairs - not just the purchase price. Consider used cars (they can be great deals!), get pre-approved for financing to know your budget, and always negotiate the total price, not just monthly payments.",
      "Cars are depreciating assets - they lose value over time! 📉 Buy reliable, not flashy. Research reliability ratings, get a pre-purchase inspection, and remember that a $500 car payment for 5 years = $30,000! Sometimes a good used car is way smarter than a new one.",
    ],
    taxes: [
      "Taxes aren't as scary as they seem! 📋 If you're working, you might need to file a tax return. The good news? If you earn under $12,950, you probably won't owe federal taxes! Keep your W-2 forms, and consider using free filing software. Getting a refund means you overpaid - it's your money coming back!",
      "Tax time can actually be exciting if you get a refund! 💰 But here's a pro tip: instead of getting a big refund, adjust your withholding so you get more money in each paycheck and invest the difference. Why give the government a free loan? You could be earning interest on that money!",
    ],
    default: [
      "That's a great question! I love helping teens master money skills! 🦢💡 I can chat about budgeting, saving, investing, credit, student loans, first jobs, buying cars, taxes, and so much more! What specific area of personal finance interests you most?",
      "I'm here to make finance fun and easy to understand! 🎉 Whether you want to know about building credit, starting an emergency fund, or planning for college, I've got you covered. What money topic is on your mind today?",
      "Money questions are my favorite! ��� I can help with everything from opening your first bank account to understanding compound interest. Don't worry - I'll explain everything in a way that makes sense. What would you like to learn about?",
    ],
  };

  const quickQuestions = [
    "How do I start budgeting?",
    "What's a credit score?",
    "How much should I save?",
    "What's compound interest?",
    "How do student loans work?",
    "Should I invest as a teen?",
  ];

  const getResponse = (userMessage: string): { text: string; mood: string } => {
    const message = userMessage.toLowerCase();
    let responseArray = financialResponses.default;
    let mood = "happy";

    if (message.includes("budget") || message.includes("budgeting")) {
      responseArray = financialResponses.budget;
      mood = "encouraging";
    } else if (message.includes("credit") || message.includes("score")) {
      responseArray = financialResponses.credit;
      mood = "thinking";
    } else if (
      message.includes("invest") ||
      message.includes("stock") ||
      message.includes("compound")
    ) {
      responseArray = financialResponses.investing;
      mood = "excited";
    } else if (
      message.includes("save") ||
      message.includes("saving") ||
      message.includes("savings")
    ) {
      responseArray = financialResponses.saving;
      mood = "encouraging";
    } else if (message.includes("emergency") || message.includes("fund")) {
      responseArray = financialResponses.emergency;
      mood = "encouraging";
    } else if (message.includes("job") || message.includes("work")) {
      responseArray = financialResponses.job;
      mood = "excited";
    } else if (
      message.includes("college") ||
      message.includes("student") ||
      message.includes("loan")
    ) {
      responseArray = financialResponses.college;
      mood = "thinking";
    } else if (message.includes("car") || message.includes("auto")) {
      responseArray = financialResponses.car;
      mood = "thinking";
    } else if (message.includes("tax") || message.includes("w-2")) {
      responseArray = financialResponses.taxes;
      mood = "encouraging";
    }

    const response =
      responseArray[Math.floor(Math.random() * responseArray.length)];
    return { text: response, mood };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const { text, mood } = getResponse(inputValue);
        const aiResponse: Message = {
          id: Date.now() + 1,
          text,
          isUser: false,
          timestamp: new Date(),
          mood: mood as "happy" | "excited" | "thinking" | "encouraging",
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Fresh start! I'm ready to chat about anything finance-related! What's on your mind? 🦢✨",
        isUser: false,
        timestamp: new Date(),
        mood: "excited",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-econome-green-50 via-white to-econome-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <CashMascot
              size="large"
              message="Let's have an amazing financial conversation! Ask me anything!"
              animated={true}
              mood="excited"
              showCoins={true}
            />
          </div>
          <h1 className="text-4xl font-bold text-econome-green-800 mb-4">
            Chat with Cash
          </h1>
          <p className="text-xl text-gray-600">
            Your friendly AI financial advisor is here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-econome-green-800">
                  <Lightbulb className="w-5 h-5" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left h-auto p-3 text-sm"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-econome-blue-800">
                  <HelpCircle className="w-5 h-5" />
                  Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-econome-green-50 rounded-lg">
                    <p className="font-medium text-econome-green-800 mb-1">
                      💡 Be Specific
                    </p>
                    <p className="text-econome-green-700">
                      Ask detailed questions for better advice!
                    </p>
                  </div>
                  <div className="p-3 bg-econome-blue-50 rounded-lg">
                    <p className="font-medium text-econome-blue-800 mb-1">
                      🎯 Real Scenarios
                    </p>
                    <p className="text-econome-blue-700">
                      Share your actual financial situations for personalized
                      help.
                    </p>
                  </div>
                  <div className="p-3 bg-econome-yellow-50 rounded-lg">
                    <p className="font-medium text-econome-yellow-800 mb-1">
                      📚 Keep Learning
                    </p>
                    <p className="text-econome-yellow-700">
                      Don't hesitate to ask follow-up questions!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="bg-gradient-to-r from-econome-green-400 to-econome-blue-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CashMascot size="small" animated={true} mood="happy" />
                    <div>
                      <CardTitle className="text-lg">Cash the Goose</CardTitle>
                      <p className="text-sm opacity-90">
                        Your AI Financial Guide
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="text-white hover:bg-white/20 h-8 px-3"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl ${
                        message.isUser
                          ? "bg-econome-green-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {!message.isUser && (
                        <div className="flex items-center gap-2 mb-2">
                          <CashMascot
                            size="small"
                            animated={true}
                            mood={message.mood || "happy"}
                          />
                          <span className="text-xs font-medium text-econome-green-600">
                            Cash
                          </span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none max-w-[85%]">
                      <div className="flex items-center gap-2 mb-2">
                        <CashMascot
                          size="small"
                          animated={true}
                          mood="thinking"
                        />
                        <span className="text-xs font-medium text-econome-green-600">
                          Cash is thinking...
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-econome-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-econome-green-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-econome-green-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Cash about budgeting, saving, investing, credit, or any money topic..."
                    className="flex-1 h-12 text-base"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-econome-green-500 hover:bg-econome-green-600 text-white px-6 h-12"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            💡 Remember: This is educational information. For personalized
            financial advice, consider speaking with a financial advisor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWithCash;
