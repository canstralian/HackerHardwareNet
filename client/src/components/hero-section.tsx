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

  return <span className="text-[#00FF00] cursor">{displayText}</span>;
};

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#1A1A1A] to-[#141414] rounded-lg p-4 sm:p-6 lg:p-10 mb-6 sm:mb-10 border border-[#00FF00]/20 overflow-hidden backdrop-blur-sm">
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#00FF00] via-[#00C8FF] to-[#FF3E3E]"></div>
      
      {/* Brand Tagline Banner - Visible on all screen sizes */}
      <div className="mb-6 py-2 px-4 bg-[#00FF00]/10 border-l-4 border-[#00FF00] rounded-r-md">
        <p className="font-mono text-[#00FF00] font-bold text-sm sm:text-base">
          <span className="animate-pulse inline-block w-2 h-2 bg-[#00FF00] rounded-full mr-2"></span>
          Empower. Explore. Exploit. — Hardware Hacking for the Modern Defender
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="lg:w-2/3">
          <h1 className="text-3xl lg:text-4xl font-mono font-bold mb-4">
            Learn <TypewriterEffect />
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-6">
            Master cybersecurity skills with hands-on hardware projects and practical tutorials. Learn penetration testing using single board computers and microcontrollers.
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link href="/learning-paths" className="bg-[#00FF00] text-[#0D0D0D] px-4 sm:px-5 py-2 rounded-md font-bold hover:bg-[#00FF00]/90 transition-colors flex items-center gap-1">
              <span>Start Learning</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
            <Link href="/hardware-library" className="border border-[#00FF00]/50 text-[#00FF00] px-4 sm:px-5 py-2 rounded-md font-bold hover:bg-[#00FF00]/10 transition-colors">
              Explore Hardware
            </Link>
          </div>
          
          {/* Social sharing buttons */}
          <div className="mt-6 pt-4 border-t border-[#00FF00]/10 flex items-center gap-1">
            <span className="text-gray-400 text-xs sm:text-sm mr-2">Share:</span>
            <a href="#" className="p-2 rounded-full bg-[#1A1A1A] border border-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00]/10 transition-all">
              <i className="fab fa-twitter text-sm"></i>
            </a>
            <a href="#" className="p-2 rounded-full bg-[#1A1A1A] border border-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00]/10 transition-all">
              <i className="fab fa-facebook-f text-sm"></i>
            </a>
            <a href="#" className="p-2 rounded-full bg-[#1A1A1A] border border-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00]/10 transition-all">
              <i className="fab fa-linkedin-in text-sm"></i>
            </a>
            <a href="#" className="p-2 rounded-full bg-[#1A1A1A] border border-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00]/10 transition-all">
              <i className="fab fa-reddit text-sm"></i>
            </a>
          </div>
        </div>
        
        <div className="lg:w-1/3 mt-6 lg:mt-0 flex justify-center">
          <img 
            srcSet="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80 400w,
                    https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80 600w"
            sizes="(max-width: 768px) 100vw, 33vw"
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80" 
            alt="Circuit board with Raspberry Pi"
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#00FF00]/30 shadow-[#00FF00]/10"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;