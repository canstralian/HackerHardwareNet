import { Link, useLocation } from 'wouter';
import { HARDWARE_PLATFORMS, SECURITY_TOOLS, RESOURCES } from '@/lib/constants';
import { Cpu, Wrench, BookOpen, CheckSquare } from 'lucide-react';

const Sidebar = () => {
  const [location] = useLocation();

  return (
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
                      ${location.includes(platform.id) ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00]' : 'border-transparent'} 
                      hover:bg-[#00FF00]/10 hover:border-[#00FF00] focus:outline-none focus:ring-2 focus:ring-[#00FF00]/30
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
                      ${location.includes(tool.id) ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00]' : 'border-transparent'} 
                      hover:bg-[#00FF00]/10 hover:border-[#00FF00] focus:outline-none focus:ring-2 focus:ring-[#00FF00]/30
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
                      ${location.includes(resource.id) ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00]' : 'border-transparent'} 
                      hover:bg-[#00FF00]/10 hover:border-[#00FF00] focus:outline-none focus:ring-2 focus:ring-[#00FF00]/30
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
                    ${location.includes('compatibility-checker') ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00]' : 'border-transparent'} 
                    hover:bg-[#00FF00]/10 hover:border-[#00FF00] focus:outline-none focus:ring-2 focus:ring-[#00FF00]/30
                  `}
                  aria-current={location.includes('compatibility-checker') ? 'page' : undefined}
                >
                  <i className="fas fa-check-circle mr-2.5 text-[#00FF00]/80 w-5 text-center" aria-hidden="true"></i>
                  <span>Compatibility Checker</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
