import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import LearningPathCard from '@/components/learning-path-card';
import { LEARNING_PATHS } from '@/lib/constants';

const LearningPaths = () => {
  const [filter, setFilter] = useState('all');

  const filteredPaths = filter === 'all' 
    ? LEARNING_PATHS 
    : LEARNING_PATHS.filter(path => path.badge.toLowerCase() === filter.toLowerCase());

  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-[#1A1A1A] rounded-lg p-6 lg:p-10 mb-10 border border-[#00FF00]/20 relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-[#00FF00]"></div>
            <h1 className="text-3xl font-mono font-bold mb-4">Learning Paths</h1>
            <p className="text-gray-300 mb-6">
              Explore our curated learning paths to master specific cybersecurity skills using single board computers and microcontrollers. Each path is designed to take you from beginner to advanced through hands-on projects and practical exercises.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setFilter('all')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-[#00FF00] text-[#0D0D0D]' : 'bg-[#1A1A1A] text-white border border-[#00FF00]/30 hover:bg-[#00FF00]/10'}`}
              >
                All Paths
              </button>
              <button 
                onClick={() => setFilter('beginner')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'beginner' ? 'bg-[#00FF00] text-[#0D0D0D]' : 'bg-[#1A1A1A] text-white border border-[#00FF00]/30 hover:bg-[#00FF00]/10'}`}
              >
                Beginner
              </button>
              <button 
                onClick={() => setFilter('intermediate')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'intermediate' ? 'bg-[#00C8FF] text-[#0D0D0D]' : 'bg-[#1A1A1A] text-white border border-[#00FF00]/30 hover:bg-[#00FF00]/10'}`}
              >
                Intermediate
              </button>
              <button 
                onClick={() => setFilter('advanced')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'advanced' ? 'bg-[#FF3E3E] text-[#0D0D0D]' : 'bg-[#1A1A1A] text-white border border-[#00FF00]/30 hover:bg-[#00FF00]/10'}`}
              >
                Advanced
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {filteredPaths.map((path) => (
              <LearningPathCard 
                key={path.id}
                id={path.id}
                title={path.title}
                description={path.description}
                icon={path.icon}
                badge={path.badge}
                badgeColor={path.badgeColor}
                duration={path.duration}
                modules={path.modules}
                color={path.color}
              />
            ))}
          </div>
          
          {filteredPaths.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-4xl text-gray-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">No learning paths found</h3>
              <p className="text-gray-400">Try adjusting your filter or check back later for new content.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LearningPaths;
