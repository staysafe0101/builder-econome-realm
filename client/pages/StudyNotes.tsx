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
import { getAllStudyNotes } from "@/data/studyNotes";
import {
  Search,
  Download,
  BookOpen,
  PiggyBank,
  CreditCard,
  TrendingUp,
  Shield,
  Calculator,
  Building,
  Star,
  Filter,
} from "lucide-react";

export default function StudyNotes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const studyNotes = getAllStudyNotes();

  const categories = [
    "All",
    ...Array.from(new Set(studyNotes.map((note) => note.category))),
  ];
  const difficulties = [
    "All",
    ...Array.from(new Set(studyNotes.map((note) => note.difficulty))),
  ];

  const filteredNotes = studyNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "All" || note.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleDownload = (noteTitle: string) => {
    // In a real app, this would generate and download a PDF
    alert(`Downloading "${noteTitle}" study guide...`);
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      PiggyBank,
      CreditCard,
      TrendingUp,
      Shield,
      Calculator,
      Building,
      BookOpen,
    };
    return icons[iconName] || BookOpen;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-econome-green-50 via-white to-econome-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <CashMascot
              size="large"
              message="Ready to study? These colorful notes make learning finance super easy!"
              animated={true}
              mood="encouraging"
              showCoins={true}
            />
          </div>
          <h1 className="text-4xl font-bold text-econome-green-800 mb-4">
            Study Notes
          </h1>
          <p className="text-xl text-gray-600">
            Concise, colorful notes for every financial topic - Now with 50
            comprehensive sets!
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search study notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category} {category !== "All" && "📚"}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty} {difficulty !== "All" && "⭐"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Study Notes Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            const IconComponent = getIconComponent(note.icon);

            return (
              <Card
                key={note.id}
                className={`border-2 border-${note.color}-200 hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <CardHeader
                  className={`bg-gradient-to-r from-${note.color}-400 to-${note.color}-600 text-white`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary" className="bg-white/20">
                            {note.category}
                          </Badge>
                          <Badge variant="secondary" className="bg-white/20">
                            {note.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-3 mb-6">
                    {note.content.map((item, index) => (
                      <div
                        key={index}
                        className="text-sm leading-relaxed p-3 bg-gray-50 rounded-lg"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{note.downloadSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>{note.estimatedReadTime}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDownload(note.title)}
                      className={`bg-${note.color}-500 hover:bg-${note.color}-600 text-white`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <CashMascot
                size="medium"
                message="No notes match your search. Try different keywords!"
                mood="thinking"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No study notes found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Study Tips Section */}
        <Card className="mt-12 border-econome-yellow-200 bg-gradient-to-r from-econome-yellow-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-econome-yellow-800">
              <Star className="w-6 h-6" />
              Cash's Study Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-econome-green-800">
                  📖 Effective Study Methods
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Read notes out loud to remember better</li>
                  <li>• Create flashcards for key terms</li>
                  <li>• Teach concepts to friends or family</li>
                  <li>• Take breaks every 25-30 minutes</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-econome-blue-800">
                  🎯 Practice Tips
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Apply concepts to real-life situations</li>
                  <li>• Use the interactive games after reading</li>
                  <li>• Join study groups or online forums</li>
                  <li>• Track your progress with our tools</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
