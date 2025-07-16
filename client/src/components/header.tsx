import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { BookOpen, Cpu, LogIn, LogOut, Menu, Wrench, User, Zap, Award, Home as HomeIcon, Flag, Server } from 'lucide-react';

// Define authentication status type
interface AuthStatus {
  isAuthenticated?: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Fetch authentication status
  const { data: authStatus, isLoading: authLoading } = useQuery<AuthStatus>({
    queryKey: ['/api/auth/status'],
    refetchOnWindowFocus: true,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Navigation links with semantic grouping
  const navigationLinks = [
    { icon: <HomeIcon size={18} />, label: 'Home', href: '/' },
    { icon: <Zap size={18} />, label: 'Learning Paths', href: '/learning-paths' },
    { icon: <BookOpen size={18} />, label: 'Articles', href: '/articles' },
    { icon: <Cpu size={18} />, label: 'Hardware Library', href: '/hardware-library' },
    { icon: <Wrench size={18} />, label: 'Tools', href: '/tools' },
    { icon: <Flag size={18} />, label: 'Challenges', href: '/challenges' },
    { icon: <Award size={18} />, label: 'Achievements', href: '/achievements' },
    { icon: <Server size={18} />, label: 'MCP Simulator', href: '/mcp' },
  ];

  return (
    <header role="banner" className="sticky top-0 z-50 bg-hacker-secondary bg-opacity-90 backdrop-blur-sm border-b border-hacker-accent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-hacker-accent flex items-center justify-center mr-3">
            <Cpu className="text-hacker-primary text-xl" />
          </div>
          <Link href="/">
            <h1 className="text-2xl font-bold font-mono tracking-tight">
              HACKER<span className="text-hacker-accent">HARDWARE</span>
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
          {navigationLinks.slice(0, 5).map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`
                ${location === link.href ? 'text-hacker-accent' : 'text-hacker-text'} 
                hover:text-hacker-accent transition-colors
              `}
              aria-current={location === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-5">
          <div className="hidden md:block relative">
            <input 
              type="text" 
              placeholder="Search hardware..." 
              className="terminal-input px-4 py-2 rounded-full w-64 bg-hacker-secondary border border-gray-700"
            />
            <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
          </div>
          <Link 
            href="/dashboard" 
            className="hover:text-hacker-accent transition-colors"
            aria-label="Go to dashboard"
          >
            <User size={20} />
          </Link>
          <Link 
            href="/checkout" 
            className="hover:text-hacker-accent transition-colors relative"
            aria-label="View shopping cart"
          >
            <i className="fas fa-shopping-cart text-xl"></i>
            <span className="absolute -top-2 -right-2 bg-hacker-accent text-hacker-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </Link>
          <button 
            className="md:hidden text-xl"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-hacker-secondary border-t border-hacker-accent shadow-lg"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <div className="relative mb-2">
              <input 
                type="text" 
                placeholder="Search hardware..." 
                className="terminal-input w-full px-4 py-2 rounded-lg bg-hacker-primary border border-gray-700"
              />
            </div>
            
            {navigationLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`
                  flex items-center gap-2
                  ${location === link.href ? 'text-hacker-accent bg-hacker-accent/10' : 'text-hacker-text'} 
                  py-2.5 px-3 rounded-md
                  border-l-2 ${location === link.href ? 'border-hacker-accent' : 'border-transparent'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={location === link.href ? 'page' : undefined}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;