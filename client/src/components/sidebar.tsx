import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { HARDWARE_PLATFORMS, SECURITY_TOOLS, RESOURCES } from '@/lib/constants';
import { Cpu, Wrench, BookOpen, CheckSquare, X, Menu, Share2 } from 'lucide-react';

const MobileCategoryNavLink = ({ 
  href, 
  icon, 
  label, 
  isActive, 
  onClick 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void 
}) => (
  <Link 
    href={href}
    className={`
      flex items-center justify-center flex-col gap-1 w-20 py-2.5 rounded-md text-center
      transition-all duration-200
      ${isActive ? 'text-[#00FF00] bg-[#00FF00]/10 border border-[#00FF00]/30' : 'text-gray-400 border border-transparent'}
      hover:text-[#00FF00] hover:bg-[#00FF00]/5
    `}
    onClick={onClick}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </Link>
);

const Sidebar = () => {
  const [location] = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Close sidebar when location changes
    setIsMobileSidebarOpen(false);
    setShowMobileCategories(false);
  }, [location]);

  // Handle showing mobile category menu
  const toggleMobileCategories = () => {
    setShowMobileCategories(prev => !prev);
    if (isMobileSidebarOpen) setIsMobileSidebarOpen(false);
  };

  // Handle mobile sidebar toggle
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
    if (showMobileCategories) setShowMobileCategories(false);
  };

  // Determine active category from location
  useEffect(() => {
    if (location.includes('hardware')) {
      setActiveCategory('hardware');
    } else if (location.includes('tools')) {
      setActiveCategory('tools');
    } else if (location.includes('resources')) {
      setActiveCategory('resources');
    } else if (location.includes('utility')) {
      setActiveCategory('utility');
    }
  }, [location]);

  // Enhanced mobile navigation with better accessibility
  const MobileNav = () => (
    <nav className="lg:hidden fixed bottom-6 left-0 right-0 z-40 flex justify-center" role="navigation" aria-label="Mobile navigation">
      <div className="bg-[#1A1A1A]/90 backdrop-blur-sm rounded-full shadow-lg border border-[#00FF00]/20 p-1.5 flex gap-2">
        <button
          onClick={toggleMobileCategories}
          className={`${showMobileCategories ? 'bg-[#00FF00]/20 text-[#00FF00]' : 'bg-transparent text-gray-400'} 
            rounded-full p-2.5 flex items-center justify-center hover:text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]`}
          aria-label="Browse categories"
          aria-expanded={showMobileCategories}
          aria-controls="mobile-categories"
        >
          <Cpu size={20} />
        </button>
        
        <button
          onClick={toggleMobileSidebar}
          className={`${isMobileSidebarOpen ? 'bg-[#00FF00]/20 text-[#00FF00]' : 'bg-transparent text-gray-400'} 
            rounded-full p-2.5 flex items-center justify-center hover:text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]`}
          aria-label={isMobileSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileSidebarOpen}
          aria-controls="mobile-sidebar"
        >
          {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'HackerHardware.net',
                text: 'Check out this cybersecurity hardware platform',
                url: window.location.href
              });
            }
          }}
          className="bg-transparent text-gray-400 rounded-full p-2.5 flex items-center justify-center hover:text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
          aria-label="Share current page"
        >
          <Share2 size={20} />
        </button>
      </div>
    </nav>
  );

  // Mobile category menu
  const MobileCategoryMenu = () => (
    <div className={`lg:hidden fixed bottom-24 left-4 right-4 z-40 bg-[#1A1A1A] rounded-lg shadow-xl border border-[#00FF00]/20 transition-all duration-300 transform ${showMobileCategories ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
      <div className="p-4">
        <h3 className="text-sm font-bold mb-4 text-center text-white">Browse Categories</h3>
        
        <div className="flex flex-wrap justify-center gap-2">
          <MobileCategoryNavLink 
            href="/hardware-library" 
            icon={<Cpu size={18} className="text-inherit" />} 
            label="Hardware" 
            isActive={activeCategory === 'hardware'}
            onClick={() => setShowMobileCategories(false)} 
          />
          
          <MobileCategoryNavLink 
            href="/tools" 
            icon={<Wrench size={18} className="text-inherit" />} 
            label="Tools" 
            isActive={activeCategory === 'tools'}
            onClick={() => setShowMobileCategories(false)} 
          />
          
          <MobileCategoryNavLink 
            href="/resources" 
            icon={<BookOpen size={18} className="text-inherit" />} 
            label="Resources" 
            isActive={activeCategory === 'resources'}
            onClick={() => setShowMobileCategories(false)} 
          />
          
          <MobileCategoryNavLink 
            href="/compatibility-checker" 
            icon={<CheckSquare size={18} className="text-inherit" />} 
            label="Utilities" 
            isActive={activeCategory === 'utility'}
            onClick={() => setShowMobileCategories(false)} 
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 bg-[#1A1A1A] border-r border-[#00FF00]/30 overflow-y-auto" aria-label="Sidebar navigation">
        <div className="p-5 sticky top-0">
          <h2 className="text-lg font-mono font-bold mb-5 text-white flex items-center gap-2" id="sidebar-heading">
            <span className="w-1 h-5 bg-[#00FF00] rounded-full inline-block mr-1" aria-hidden="true"></span>
            Categories
          </h2>
          
          <nav className="space-y-6" aria-labelledby="sidebar-heading">
            {/* Hardware Platforms Section */}
            <div className="space-y-1">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2" id="hardware-platforms-heading">
                <Cpu size={14} className="text-[#00FF00]" />
                <span>Hardware Platforms</span>
              </h3>
              <ul className="space-y-1" aria-labelledby="hardware-platforms-heading">
                {HARDWARE_PLATFORMS.map((platform) => (
                  <li key={platform.id}>
                    <Link 
                      href={`/hardware-library?platform=${platform.id}`}
                      className={`
                        nav-link flex items-center w-full px-3 py-2.5 rounded-md text-white 
                        border-l-2 transition-all duration-200
                        ${location.includes(platform.id) 
                          ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00] font-medium shadow-[0_0_8px_rgba(0,255,0,0.15)]' 
                          : 'border-transparent'} 
                        hover:bg-[#00FF00]/10 hover:border-[#00FF00] hover:shadow-[0_0_8px_rgba(0,255,0,0.15)] hover:translate-x-0.5
                        focus:outline-none focus:ring-2 focus:ring-[#00FF00]/30
                      `}
                      aria-current={location.includes(platform.id) ? 'page' : undefined}
                    >
                      <i className={`fas ${platform.icon} mr-2.5 text-[#00FF00]/80 w-5 text-center`} aria-hidden="true"></i>
                      <span>{platform.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Tools Section */}
            <div className="space-y-1">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2" id="security-tools-heading">
                <Wrench size={14} className="text-[#00FF00]" />
                <span>Security Tools</span>
              </h3>
              <ul className="space-y-1" aria-labelledby="security-tools-heading">
                {SECURITY_TOOLS.map((tool) => (
                  <li key={tool.id}>
                    <Link 
                      href={`/tools?category=${tool.id}`}
                      className={`
                        nav-link flex items-center w-full px-3 py-2.5 rounded-md text-white 
                        border-l-2 transition-all duration-200
                        ${location.includes(tool.id) 
                          ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00] font-medium shadow-[0_0_8px_rgba(0,255,0,0.15)]' 
                          : 'border-transparent'} 
                        hover:bg-[#00FF00]/10 hover:border-[#00FF00] hover:shadow-[0_0_8px_rgba(0,255,0,0.15)] hover:translate-x-0.5
                        focus:outline-none focus:ring-2 focus:ring-[#00FF00]/30
                      `}
                      aria-current={location.includes(tool.id) ? 'page' : undefined}
                    >
                      <i className={`fas ${tool.icon} mr-2.5 text-[#00FF00]/80 w-5 text-center`} aria-hidden="true"></i>
                      <span>{tool.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Section */}
            <div className="space-y-1">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2" id="resources-heading">
                <BookOpen size={14} className="text-[#00FF00]" />
                <span>Resources</span>
              </h3>
              <ul className="space-y-1" aria-labelledby="resources-heading">
                {RESOURCES.map((resource) => (
                  <li key={resource.id}>
                    <Link 
                      href={`/resources?type=${resource.id}`}
                      className={`
                        nav-link flex items-center w-full px-3 py-2.5 rounded-md text-white 
                        border-l-2 transition-all duration-200
                        ${location.includes(resource.id) 
                          ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00] font-medium shadow-[0_0_8px_rgba(0,255,0,0.15)]' 
                          : 'border-transparent'} 
                        hover:bg-[#00FF00]/10 hover:border-[#00FF00] hover:shadow-[0_0_8px_rgba(0,255,0,0.15)] hover:translate-x-0.5
                        focus:outline-none focus:ring-2 focus:ring-[#00FF00]/30
                      `}
                      aria-current={location.includes(resource.id) ? 'page' : undefined}
                    >
                      <i className={`fas ${resource.icon} mr-2.5 text-[#00FF00]/80 w-5 text-center`} aria-hidden="true"></i>
                      <span>{resource.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Utility Tools Section */}
            <div className="space-y-1">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2" id="utility-tools-heading">
                <CheckSquare size={14} className="text-[#00FF00]" />
                <span>Utility Tools</span>
              </h3>
              <ul className="space-y-1" aria-labelledby="utility-tools-heading">
                <li>
                  <Link 
                    href="/compatibility-checker"
                    className={`
                      nav-link flex items-center w-full px-3 py-2.5 rounded-md text-white 
                      border-l-2 transition-all duration-200
                      ${location.includes('compatibility-checker') 
                        ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00] font-medium shadow-[0_0_8px_rgba(0,255,0,0.15)]' 
                        : 'border-transparent'} 
                      hover:bg-[#00FF00]/10 hover:border-[#00FF00] hover:shadow-[0_0_8px_rgba(0,255,0,0.15)] hover:translate-x-0.5
                      focus:outline-none focus:ring-2 focus:ring-[#00FF00]/30
                    `}
                    aria-current={location.includes('compatibility-checker') ? 'page' : undefined}
                  >
                    <i className="fas fa-check-circle mr-2.5 text-[#00FF00]/80 w-5 text-center" aria-hidden="true"></i>
                    <span>Compatibility Checker</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Social Share Section */}
            <div className="pt-4 mt-4 border-t border-[#00FF00]/10">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <Share2 size={14} className="text-[#00FF00]" />
                <span>Share</span>
              </h3>
              <div className="flex gap-2">
                <a href="#" className="p-2 rounded bg-[#1A1A1A] border border-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00]/10 transition-all text-sm">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="p-2 rounded bg-[#1A1A1A] border border-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00]/10 transition-all text-sm">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="p-2 rounded bg-[#1A1A1A] border border-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00]/10 transition-all text-sm">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </aside>
      
      {/* Mobile Category Menu */}
      <MobileCategoryMenu />
      
      {/* Mobile Sidebar Toggle */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30 transition-opacity ${isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileSidebarOpen(false)}
      ></div>
      
      <aside 
        className={`lg:hidden fixed right-0 top-0 bottom-0 w-72 bg-[#1A1A1A] border-l border-[#00FF00]/30 overflow-y-auto z-40 transition-transform duration-300 ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} 
        aria-label="Mobile sidebar navigation"
      >
        <div className="flex justify-between items-center p-4 border-b border-[#00FF00]/20">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-[#00FF00] rounded-full inline-block mr-1" aria-hidden="true"></span>
            Categories
          </h2>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="text-gray-400 hover:text-[#00FF00] p-1"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Brand tagline in mobile sidebar */}
        <div className="p-4 mb-2 bg-[#141414] border-b border-[#00FF00]/10">
          <p className="text-xs font-mono text-[#00FF00] font-bold">
            Empower. Explore. Exploit.
          </p>
          <p className="text-xs text-gray-400">Hardware Hacking for the Modern Defender</p>
        </div>
        
        <nav className="p-4 space-y-6">
          {/* Copied from desktop sidebar but simplified */}
          <div className="space-y-1">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu size={14} className="text-[#00FF00]" />
              <span>Hardware Platforms</span>
            </h3>
            <ul className="space-y-1">
              {HARDWARE_PLATFORMS.map((platform) => (
                <li key={platform.id}>
                  <Link 
                    href={`/hardware-library?platform=${platform.id}`}
                    className={`
                      flex items-center w-full px-3 py-2.5 rounded-md text-white 
                      border-l-2 transition-all duration-200
                      ${location.includes(platform.id) ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00]' : 'border-transparent'} 
                    `}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <i className={`fas ${platform.icon} mr-2.5 text-[#00FF00]/80 w-5 text-center`} aria-hidden="true"></i>
                    <span>{platform.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Other sections similarly simplified */}
          <div className="space-y-1">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <Wrench size={14} className="text-[#00FF00]" />
              <span>Tools</span>
            </h3>
            <ul className="space-y-1">
              {SECURITY_TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link 
                    href={`/tools?category=${tool.id}`}
                    className={`
                      flex items-center w-full px-3 py-2.5 rounded-md text-white 
                      border-l-2 transition-all duration-200
                      ${location.includes(tool.id) ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00]' : 'border-transparent'} 
                    `}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <i className={`fas ${tool.icon} mr-2.5 text-[#00FF00]/80 w-5 text-center`} aria-hidden="true"></i>
                    <span>{tool.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
      
      {/* Floating Mobile Nav */}
      <MobileNav />
    </>
  );
};

export default Sidebar;
