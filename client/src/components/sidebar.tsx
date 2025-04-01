import { Link, useLocation } from 'wouter';
import { HARDWARE_PLATFORMS, SECURITY_TOOLS, RESOURCES } from '@/lib/constants';

const Sidebar = () => {
  const [location] = useLocation();

  return (
    <aside className="hidden lg:block w-64 bg-[#1A1A1A] border-r border-[#00FF00]/30 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-mono font-bold mb-4">Categories</h2>
        <div className="space-y-1">
          <h3 className="text-gray-400 text-xs uppercase tracking-wider mt-4 mb-2">Hardware Platforms</h3>
          {HARDWARE_PLATFORMS.map((platform) => (
            <Link 
              key={platform.id}
              href={`/hardware-library?platform=${platform.id}`}
              className={`nav-link block px-3 py-2 rounded-md text-white border-l-2 ${location.includes(platform.id) ? 'border-[#00FF00] bg-[#00FF00]/10' : 'border-transparent'} hover:bg-[#00FF00]/10 hover:border-[#00FF00]`}
            >
              <i className={`fas ${platform.icon} mr-2 text-[#00FF00]/80`}></i>
              {platform.name}
            </Link>
          ))}

          <h3 className="text-gray-400 text-xs uppercase tracking-wider mt-4 mb-2">Security Tools</h3>
          {SECURITY_TOOLS.map((tool) => (
            <Link 
              key={tool.id}
              href={`/tools?category=${tool.id}`}
              className={`nav-link block px-3 py-2 rounded-md text-white border-l-2 ${location.includes(tool.id) ? 'border-[#00FF00] bg-[#00FF00]/10' : 'border-transparent'} hover:bg-[#00FF00]/10 hover:border-[#00FF00]`}
            >
              <i className={`fas ${tool.icon} mr-2 text-[#00FF00]/80`}></i>
              {tool.name}
            </Link>
          ))}

          <h3 className="text-gray-400 text-xs uppercase tracking-wider mt-4 mb-2">Resources</h3>
          {RESOURCES.map((resource) => (
            <Link 
              key={resource.id}
              href={`/resources?type=${resource.id}`}
              className={`nav-link block px-3 py-2 rounded-md text-white border-l-2 ${location.includes(resource.id) ? 'border-[#00FF00] bg-[#00FF00]/10' : 'border-transparent'} hover:bg-[#00FF00]/10 hover:border-[#00FF00]`}
            >
              <i className={`fas ${resource.icon} mr-2 text-[#00FF00]/80`}></i>
              {resource.name}
            </Link>
          ))}
          
          <h3 className="text-gray-400 text-xs uppercase tracking-wider mt-4 mb-2">Tools</h3>
          <Link 
            href="/compatibility-checker"
            className={`nav-link block px-3 py-2 rounded-md text-white border-l-2 ${location.includes('compatibility-checker') ? 'border-[#00FF00] bg-[#00FF00]/10' : 'border-transparent'} hover:bg-[#00FF00]/10 hover:border-[#00FF00]`}
          >
            <i className="fas fa-check-circle mr-2 text-[#00FF00]/80"></i>
            Compatibility Checker
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
