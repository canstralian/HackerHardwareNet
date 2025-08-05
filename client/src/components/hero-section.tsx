import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Settings, Cpu, BookOpen } from "lucide-react";

const TypewriterEffect = () => {
  const typewriterTexts = [
    'Convergence',
    'Systems Thinking',
    'Wu-Wei Flow',
    'main() Function'
  ];
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typewriterTexts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }

      // Handle direction change and text switching
      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, currentTextIndex, isDeleting, displayText]);

  return <span className="text-hacker-accent cursor">{displayText}</span>;
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Hackbox Mini v1
              </h1>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed">
                The Field Lab for<br />
                AI-Powered Red Teamers
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-xl"
                asChild
              >
                <Link href="/checkout">
                  <Cpu className="mr-2 h-5 w-5" />
                  Preorder for $297
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 px-8 py-4 text-lg transition-all duration-300"
                asChild
              >
                <Link href="/register">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Join Beta List
                </Link>
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 gap-4 pt-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Portable + Modular</h3>
                  <p className="text-gray-300">Dual Pi 5 in Rackmate with managed switch</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600/30 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-green-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">AI + Purple Team Built-In</h3>
                  <p className="text-gray-300">PromptCraft injection labs built into OS image</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600/30 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Built by Hackers for Hackers</h3>
                  <p className="text-gray-300">R&D lab ethos made physical</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className="relative lg:pl-8">
            <div className="relative">
              {/* Product Image Container matching the attached design */}
              <div className="w-full h-96 flex items-center justify-center">
                <div className="relative">
                  {/* Main Device Body */}
                  <div className="w-80 h-48 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-2xl border border-gray-600 relative">
                    {/* Front Panel */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-b-lg">
                      {/* Network Ports */}
                      <div className="flex items-center justify-center h-full space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full opacity-60"></div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-40"></div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>

                    {/* Side Ventilation */}
                    <div className="absolute right-2 top-4 w-8 h-8 border border-gray-600 rounded bg-gray-700"></div>

                    {/* Top Antennas */}
                    <div className="absolute -top-8 left-8 w-2 h-16 bg-gray-700 rounded-full"></div>
                    <div className="absolute -top-8 right-8 w-2 h-16 bg-gray-700 rounded-full"></div>
                  </div>

                  {/* WiFi Router on Top */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded shadow-lg">
                    <div className="absolute -top-2 left-2 w-1 h-6 bg-gray-600 rounded-full"></div>
                    <div className="absolute -top-2 right-2 w-1 h-6 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;