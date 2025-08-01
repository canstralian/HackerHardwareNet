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
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-4">
            <code className="text-hacker-accent font-mono text-lg bg-black bg-opacity-30 px-3 py-1 rounded">
              &gt; ./hackerhardware --init
            </code>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-hacker-text leading-tight">
            Where Chaos Becomes <br />
            <TypewriterEffect />
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-hacker-text mb-6 sm:mb-8 leading-relaxed px-2 max-w-4xl mx-auto">
            The junction box where scattered circuits connect. A single binary compiled from many source files. 
            <br className="hidden md:block" />
            <span className="text-hacker-accent font-medium">This is the workshop. This is the main() function.</span>
          </p>

          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-6 text-sm text-gray-400 font-mono">
              <span className="flex items-center gap-2">
                <i className="fas fa-circle text-hacker-accent text-xs"></i>
                Hardware + Software
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-circle text-blue-400 text-xs"></i>
                Systems Thinking
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-circle text-purple-400 text-xs"></i>
                Wu-Wei Philosophy
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <Link href="/learning-paths" className="w-full sm:w-auto">
              <Button className="button-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 glow w-full sm:w-auto min-h-[48px] font-mono">
                <i className="fas fa-play mr-2"></i>
                Execute main()
              </Button>
            </Link>

            <Link href="/hardware-library" className="w-full sm:w-auto">
              <Button className="button-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-h-[48px] font-mono">
                <i className="fas fa-cubes mr-2"></i>
                Browse Libraries
              </Button>
            </Link>
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
      </div>
    </section>
  );
};

export default HeroSection;