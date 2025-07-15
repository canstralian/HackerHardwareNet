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
    <header role="banner" className="sticky top-0 z-50 bg-[#1A1A1A] border-b border-[#00FF00]/30 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-[#00FF00] text-2xl" aria-hidden="true">
            <i className="fas fa-microchip"></i>
          </div>
          <Link href="/">
            <h1 className="text-2xl font-mono font-bold">
              <span className="text-[#00FF00]">Hackerhardware</span><span className="text-[#00FF00]">.net</span>
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`
                flex items-center gap-1.5
                ${location === link.href ? 'text-[#00FF00]' : 'text-white'} 
                hover:text-[#00FF00] transition-colors font-medium
                px-2 py-1.5 rounded
                hover:bg-[#00FF00]/5 focus:outline-none focus:ring-2 focus:ring-[#00FF00]/30
              `}
              aria-current={location === link.href ? 'page' : undefined}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <SearchBar />
          </div>
          <button 
            className="md:hidden text-white text-xl p-2 hover:bg-[#00FF00]/10 rounded-md transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} />
          </button>
          
          {authLoading ? (
            // Loading state
            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#00FF00]/30 animate-pulse" aria-label="Loading authentication status"></div>
          ) : authStatus?.isAuthenticated ? (
            // Authenticated user
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard" 
                className="hidden md:flex items-center space-x-1 text-[#00FF00] hover:bg-[#00FF00]/10 px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#00FF00]/50"
                aria-label="Go to dashboard"
              >
                <User size={18} className="mr-1" />
                <span>Dashboard</span>
              </Link>
            </div>
          ) : (
            // Unauthenticated user
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="hidden md:flex items-center space-x-1 text-[#00FF00] hover:bg-[#00FF00]/10 px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#00FF00]/50"
                aria-label="Log in to your account"
              >
                <LogIn size={18} className="mr-1" />
                <span>Login</span>
              </Link>
              <Link 
                href="/register" 
                className="hidden md:flex items-center bg-[#00FF00] text-black hover:bg-[#00FF00]/90 px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#00FF00]/50"
                aria-label="Create an account"
              >
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-[#1A1A1A] border-t border-[#00FF00]/20 shadow-lg"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <div className="relative mb-2">
              <SearchBar />
            </div>
            
            {navigationLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`
                  flex items-center gap-2
                  ${location === link.href ? 'text-[#00FF00] bg-[#00FF00]/10' : 'text-white'} 
                  py-2.5 px-3 rounded-md
                  border-l-2 ${location === link.href ? 'border-[#00FF00]' : 'border-transparent'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={location === link.href ? 'page' : undefined}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            
            {authStatus?.isAuthenticated ? (
              // Authenticated user
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-[#00FF00] py-2.5 px-3 rounded-md border-l-2 border-transparent mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>Dashboard</span>
              </Link>
            ) : (
              // Unauthenticated user
              <div className="flex flex-col gap-2 pt-2 mt-2">
                <Link 
                  href="/login" 
                  className="flex items-center gap-2 text-[#00FF00] py-2.5 px-3 rounded-md border-l-2 border-transparent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link 
                  href="/register" 
                  className="flex items-center justify-center bg-[#00FF00] text-black hover:bg-[#00FF00]/90 py-2.5 px-3 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;