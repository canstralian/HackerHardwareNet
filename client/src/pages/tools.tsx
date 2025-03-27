import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import ToolCard from '@/components/tool-card';
import { SECURITY_TOOL_ITEMS, SECURITY_TOOLS } from '@/lib/constants';

const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = selectedCategory === 'all' 
    ? SECURITY_TOOL_ITEMS 
    : SECURITY_TOOL_ITEMS.filter(tool => tool.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase())));

  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-[#1A1A1A] rounded-lg p-6 lg:p-10 mb-10 border border-[#00FF00]/20 relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-[#00FF00]"></div>
            <h1 className="text-3xl font-mono font-bold mb-4">Security Tools</h1>
            <p className="text-gray-300 mb-6">
              Explore our comprehensive collection of cybersecurity tools optimized for single board computers and microcontrollers. Find detailed documentation, usage examples, and hardware compatibility information.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedCategory('all')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-[#00FF00] text-[#0D0D0D]' : 'bg-[#1A1A1A] text-white border border-[#00FF00]/30 hover:bg-[#00FF00]/10'}`}
              >
                All Tools
              </button>
              {SECURITY_TOOLS.map(tool => (
                <button 
                  key={tool.id}
                  onClick={() => setSelectedCategory(tool.id)} 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === tool.id ? 'bg-[#00FF00] text-[#0D0D0D]' : 'bg-[#1A1A1A] text-white border border-[#00FF00]/30 hover:bg-[#00FF00]/10'}`}
                >
                  <i className={`fas ${tool.icon} mr-2`}></i>
                  {tool.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.id}
                id={tool.id}
                name={tool.name}
                description={tool.description}
                icon={tool.icon}
                tags={tool.tags}
                tagColor={tool.tagColor}
                command={tool.command}
                docLink={tool.docLink}
              />
            ))}
          </div>
          
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-tools text-4xl text-gray-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">No tools found</h3>
              <p className="text-gray-400">Try selecting a different category or check back later for new tools.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Tools;
