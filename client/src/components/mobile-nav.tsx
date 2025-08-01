
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Home, BookOpen, Cpu, Wrench, Trophy } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/learning-paths', icon: BookOpen, label: 'Learn' },
    { href: '/hardware-library', icon: Cpu, label: 'Hardware' },
    { href: '/tools', icon: Wrench, label: 'Tools' },
    { href: '/challenges', icon: Trophy, label: 'Challenges' },
  ];

  const isActive = (path: string) => location === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-hacker-secondary border border-gray-700 rounded-lg text-hacker-accent"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu */}
      <nav className={`
        md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-45 transform transition-transform duration-300 ease-in-out
        bg-hacker-primary border-l border-gray-800
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="pt-20 pb-6 px-6">
          <div className="space-y-2">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-4 p-4 rounded-lg transition-all duration-200 min-h-touch-lg
                  ${isActive(href) 
                    ? 'bg-hacker-accent/10 text-hacker-accent border border-hacker-accent/30' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-hacker-accent'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-hacker-primary border-t border-gray-800 pb-safe-bottom">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 4).map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                flex flex-col items-center gap-1 py-2 px-3 rounded-lg min-h-touch transition-all duration-200
                ${isActive(href) 
                  ? 'text-hacker-accent' 
                  : 'text-gray-400 hover:text-hacker-accent'
                }
              `}
            >
              <Icon size={18} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
