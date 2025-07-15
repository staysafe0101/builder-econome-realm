import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CashMascot from "@/components/CashMascot";
import {
  Heart,
  Target,
  Users,
  Mail,
  Phone,
  MapPin,
  Send,
  Lightbulb,
  Gamepad2,
  BookOpen,
  Trophy,
} from "lucide-react";

export default function About() {
  const mission = {
    title: "Making Finance Fun for Teens",
    description:
      "At Econome, we believe financial literacy shouldn't be boring. We're on a mission to transform how teenagers learn about money through engaging games, interactive flashcards, and our friendly mascot Cash who guides every step of the journey.",
    values: [
      {
        icon: Lightbulb,
        title: "Learn by Doing",
        description:
          "We believe the best way to learn is through hands-on experience and interactive gameplay.",
      },
      {
        icon: Gamepad2,
        title: "Make it Fun",
        description:
          "Financial education doesn't have to be dry. We gamify learning to keep teens engaged.",
      },
      {
        icon: Users,
        title: "Accessible to All",
        description:
          "Every teenager deserves access to quality financial education, regardless of background.",
      },
      {
        icon: Trophy,
        title: "Real Results",
        description:
          "We focus on practical skills that teens can apply in their daily lives and future careers.",
      },
    ],
  };

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former financial advisor passionate about youth education",
      avatar: "👩‍💼",
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Education",
      bio: "15+ years of experience in financial literacy programs",
      avatar: "👨‍🏫",
    },
    {
      name: "Jamie Kim",
      role: "Lead Developer",
      bio: "Specialist in educational technology and gamification",
      avatar: "👩‍💻",
    },
  ];

  const stats = [
    { label: "Students Learning", value: "50,000+", icon: Users },
    { label: "Levels Completed", value: "1M+", icon: Trophy },
    { label: "Flashcards Mastered", value: "5M+", icon: BookOpen },
    { label: "Success Rate", value: "95%", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-econome-green-50 via-white to-econome-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <CashMascot
              size="large"
              message="Welcome to our story! We're here to make finance fun and accessible for everyone."
            />
          </div>
          <h1 className="text-4xl font-bold text-econome-green-800 mb-4">
            About Econome
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering the next generation with financial literacy through
            engaging games and interactive learning
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="border-econome-green-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-econome-green-800 mb-4">
                Our Mission
              </CardTitle>
              <CardDescription className="text-lg max-w-4xl mx-auto">
                {mission.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {mission.values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-econome-green-400 to-econome-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-econome-green-800 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <Card className="border-econome-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-econome-green-800">
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Your last name" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What's this about?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more..."
                      rows={4}
                    />
                  </div>

                  <Button className="w-full bg-econome-green-500 hover:bg-econome-green-600 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-econome-green-500 to-econome-blue-500 rounded-2xl p-8 text-white">
            <div className="mb-4">
              <CashMascot size="medium" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of teens mastering money skills with Econome
            </p>
            <Button className="bg-white text-econome-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Get Started Today
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
