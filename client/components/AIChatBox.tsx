import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CashMascot from "./CashMascot";
import { Send, MessageCircle, X, Minimize2 } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatBoxProps {
  isOpen: boolean;
  onToggle: () => void;
}

const financialResponses = {
  budget: [
    "Great question! A budget is like a game plan for your money. It helps you decide how much to spend, save, and invest each month! 💰",
    "Think of budgeting like this: if your money was pizza slices, budgeting helps you decide how many slices go to fun stuff, savings, and needs! 🍕",
  ],
  credit: [
    "Credit is like borrowing money with a promise to pay it back later. Your credit score (300-850) shows how good you are at keeping those promises! 📊",
    "Building good credit is like leveling up in a video game - the higher your score, the better deals you unlock! 🎮",
  ],
  investing: [
    "Investing is putting your money to work so it can grow over time! It's like planting money seeds that grow into money trees! 🌱💰",
    "Think of investing like collecting trading cards - you buy them hoping they'll be worth more later! But remember, sometimes values can go down too. 📈",
  ],
  saving: [
    "Saving money is like storing up power-ups for your future self! Start small - even $5 a week adds up to over $250 in a year! ⚡",
    "Here's a cool trick: try the 52-week challenge! Save $1 the first week, $2 the second week, and so on. You'll have $1,378 by the end! 🎯",
  ],
  emergency: [
    "An emergency fund is your financial superhero cape! It protects you when unexpected expenses try to mess up your budget! 🦸‍♂️",
    "Aim to save $500-$1000 for emergencies. It's like having a financial safety net when life throws curveballs! ⚾",
  ],
  default: [
    "That's a great question! I'm always here to help you learn about money. Try asking me about budgeting, saving, credit, or investing! 🤔",
    "I love helping teens master money skills! Feel free to ask me anything about personal finance - I'll break it down in a fun way! 💡",
    "Money questions are my favorite! Whether it's about earning, spending, saving, or investing - I'm here to help! 🦩💰",
  ],
};

export default function AIChatBox({ isOpen, onToggle }: AIChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Cash, your friendly financial guide! Ask me anything about money, budgets, saving, investing, or credit. I'm here to help make finance fun and easy to understand! 🦩💰",
      isUser: false,
      timestamp: new Date(),
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

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes("budget") || message.includes("budgeting")) {
      return financialResponses.budget[
        Math.floor(Math.random() * financialResponses.budget.length)
      ];
    } else if (message.includes("credit") || message.includes("score")) {
      return financialResponses.credit[
        Math.floor(Math.random() * financialResponses.credit.length)
      ];
    } else if (
      message.includes("invest") ||
      message.includes("stock") ||
      message.includes("invest")
    ) {
      return financialResponses.investing[
        Math.floor(Math.random() * financialResponses.investing.length)
      ];
    } else if (message.includes("save") || message.includes("saving")) {
      return financialResponses.saving[
        Math.floor(Math.random() * financialResponses.saving.length)
      ];
    } else if (message.includes("emergency") || message.includes("fund")) {
      return financialResponses.emergency[
        Math.floor(Math.random() * financialResponses.emergency.length)
      ];
    } else {
      return financialResponses.default[
        Math.floor(Math.random() * financialResponses.default.length)
      ];
    }
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
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: getResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-econome-green-500 hover:bg-econome-green-600 text-white shadow-lg hover:shadow-xl z-50 flex items-center justify-center"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 border-2 border-econome-green-200">
      <CardHeader className="bg-gradient-to-r from-econome-green-400 to-econome-green-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CashMascot size="small" animated={true} mood="happy" />
            <div>
              <CardTitle className="text-lg">Chat with Cash</CardTitle>
              <p className="text-sm opacity-90">Your AI Money Guide</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[400px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isUser
                    ? "bg-econome-green-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
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
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                <div className="flex items-center gap-1">
                  <CashMascot size="small" animated={true} mood="thinking" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-econome-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-econome-green-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-econome-green-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Cash about money..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-econome-green-500 hover:bg-econome-green-600 text-white px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
