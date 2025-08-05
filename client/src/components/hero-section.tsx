import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

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

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-hacker-primary via-hacker-secondary to-hacker-primary py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-20"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-[#00FF00] to-white bg-clip-text text-transparent leading-tight">
              HACKBOX MINI v1
            </h1>
            <h2 className="text-2xl md:text-3xl text-[#00FF00] font-semibold">
              The Field Lab for AI-Powered Red Teamers
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Built by the creator of PiFlash and CyberESP32 — now shipping in beta tiers
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-[#00FF00] hover:bg-[#00FF00]/80 text-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
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
            className="border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:text-black px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link href="/register">
              <BookOpen className="mr-2 h-5 w-5" />
              Join Beta List
            </Link>
          </Button>
        </div>

        {/* Code snippet preview */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-black bg-opacity-50 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gray-900 px-4 py-2 border-b border-gray-700 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 font-mono">convergence.c</span>
            </div>
            <div className="p-4 font-mono text-sm">
              <div className="text-blue-400">#include</div>
              <div className="text-gray-300 ml-4">{"<hackerhardware.h>"}</div>
              <div className="text-gray-300 ml-4">{"<systems_thinking.h>"}</div>
              <div className="text-gray-300 ml-4">{"<wu_wei.h>"}</div>
              <br />
              <div className="text-purple-400">int</div>
              <div className="text-hacker-accent ml-4">main</div>
              <div className="text-gray-300">{"() {"}</div>
              <div className="text-gray-400 ml-8">// Where scattered fragments compile</div>
              <div className="text-gray-300 ml-8">return convergence();</div>
              <div className="text-gray-300">{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;