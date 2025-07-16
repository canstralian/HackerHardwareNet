import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const TypewriterEffect = () => {
  const typewriterTexts = ['Hardware Hacking', 'Penetration Testing', 'Security Research'];
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
    <section className="relative overflow-hidden circuit-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-hacker-primary to-black opacity-80"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-mono">
            <span className="typewriter">HACK THE FUTURE</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Premium hardware for cybersecurity professionals, ethical hackers, and tech enthusiasts. Unleash your potential with cutting-edge tools.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/hardware-library" className="px-8 py-3 bg-hacker-accent text-hacker-primary font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:-translate-y-1">
              Explore Products <i className="fas fa-arrow-right ml-2"></i>
            </Link>
            <Link href="/learning-paths" className="px-8 py-3 border-2 border-hacker-accent text-hacker-accent font-bold rounded-full hover:bg-hacker-accent hover:text-hacker-primary transition-all">
              View Learning Paths
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-hacker-primary to-transparent"></div>
    </section>
  );
};

export default HeroSection;