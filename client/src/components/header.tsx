import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Fetch authentication status
  const { data: authStatus, isLoading: authLoading } = useQuery({
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

  return (
    <header className="bg-[#1A1A1A] border-b border-[#00FF00]/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-[#00FF00] text-2xl">
            <i className="fas fa-microchip"></i>
          </div>
          <h1 className="text-2xl font-mono font-bold">
            <span className="text-[#00FF00]">Hackerhardware</span><span className="text-[#00FF00]">.net</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`${location === '/' ? 'text-[#00FF00]' : 'text-white'} hover:text-[#00FF00] transition-colors font-medium`}>
            Home
          </Link>
          <Link href="/learning-paths" className={`${location === '/learning-paths' ? 'text-[#00FF00]' : 'text-white'} hover:text-[#00FF00] transition-colors font-medium`}>
            Learning Paths
          </Link>
          <Link href="/hardware-library" className={`${location === '/hardware-library' ? 'text-[#00FF00]' : 'text-white'} hover:text-[#00FF00] transition-colors font-medium`}>
            Hardware Library
          </Link>
          <Link href="/tools" className={`${location === '/tools' ? 'text-[#00FF00]' : 'text-white'} hover:text-[#00FF00] transition-colors font-medium`}>
            Tools
          </Link>
          <Link href="/achievements" className={`${location === '/achievements' ? 'text-[#00FF00]' : 'text-white'} hover:text-[#00FF00] transition-colors font-medium`}>
            Achievements
          </Link>
          <Link href="#" className="text-white hover:text-[#00FF00] transition-colors font-medium">
            About
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <SearchBar />
          </div>
          <button 
            className="md:hidden text-white text-xl"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          
          {authLoading ? (
            // Loading state
            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#00FF00]/30 animate-pulse"></div>
          ) : authStatus?.isAuthenticated ? (
            // Authenticated user
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="hidden md:flex items-center space-x-1 text-[#00FF00] hover:bg-[#00FF00]/10 px-4 py-2 rounded-md transition-colors">
                <User size={18} className="mr-1" />
                <span>Dashboard</span>
              </Link>
            </div>
          ) : (
            // Unauthenticated user
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden md:flex items-center space-x-1 text-[#00FF00] hover:bg-[#00FF00]/10 px-4 py-2 rounded-md transition-colors">
                <LogIn size={18} className="mr-1" />
                <span>Login</span>
              </Link>
              <Link href="/register" className="hidden md:flex items-center bg-[#00FF00] text-black hover:bg-[#00FF00]/90 px-4 py-2 rounded-md transition-colors">
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-[#00FF00]/20">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="relative">
              <SearchBar />
            </div>
            <Link href="/" className={`${location === '/' ? 'text-[#00FF00]' : 'text-white'} py-2 border-b border-[#1A1A1A]/50`}>
              Home
            </Link>
            <Link href="/learning-paths" className={`${location === '/learning-paths' ? 'text-[#00FF00]' : 'text-white'} py-2 border-b border-[#1A1A1A]/50`}>
              Learning Paths
            </Link>
            <Link href="/hardware-library" className={`${location === '/hardware-library' ? 'text-[#00FF00]' : 'text-white'} py-2 border-b border-[#1A1A1A]/50`}>
              Hardware Library
            </Link>
            <Link href="/tools" className={`${location === '/tools' ? 'text-[#00FF00]' : 'text-white'} py-2 border-b border-[#1A1A1A]/50`}>
              Tools
            </Link>
            <Link href="/achievements" className={`${location === '/achievements' ? 'text-[#00FF00]' : 'text-white'} py-2 border-b border-[#1A1A1A]/50`}>
              Achievements
            </Link>
            <Link href="#" className="text-white py-2 border-b border-[#1A1A1A]/50">
              About
            </Link>
            
            {authStatus?.isAuthenticated ? (
              // Authenticated user
              <Link href="/dashboard" className="flex items-center space-x-1 text-[#00FF00] py-2">
                <User size={18} className="mr-1" />
                <span>Dashboard</span>
              </Link>
            ) : (
              // Unauthenticated user
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login" className="flex items-center space-x-1 text-[#00FF00] py-2">
                  <LogIn size={18} className="mr-1" />
                  <span>Login</span>
                </Link>
                <Link href="/register" className="flex items-center justify-center bg-[#00FF00] text-black hover:bg-[#00FF00]/90 py-2 rounded-md transition-colors">
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