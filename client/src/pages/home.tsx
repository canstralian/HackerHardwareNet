import Sidebar from '@/components/sidebar';
import HeroSection from '@/components/hero-section';
import LearningPathCard from '@/components/learning-path-card';
import HardwareCard from '@/components/hardware-card';
import TutorialFeature from '@/components/tutorial-feature';
import ToolCard from '@/components/tool-card';
import HardwareCompatibility from '@/components/hardware-compatibility';
import ProjectCard from '@/components/project-card';
import { Link } from 'wouter';
import { 
  LEARNING_PATHS, 
  HARDWARE_ITEMS, 
  FEATURED_TUTORIAL, 
  SECURITY_TOOL_ITEMS, 
  HARDWARE_COMPATIBILITY,
  COMMUNITY_PROJECTS
} from '@/lib/constants';

const Home = () => {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-16 lg:pb-12"> {/* Extra padding at the bottom for mobile nav */}
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Hero Section */}
          <HeroSection />

          {/* Learning Paths Section */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Learning Paths</h2>
              <Link href="/learning-paths" className="flex items-center gap-1 text-[#00FF00] text-sm font-semibold px-3 py-1.5 rounded-md border border-[#00FF00]/40 hover:bg-[#00FF00]/10 hover:border-[#00FF00] transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start">
                View All 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEARNING_PATHS.map((path) => (
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
          </section>

          {/* Popular Hardware Section */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Popular Hardware</h2>
              <Link href="/hardware-library" className="flex items-center gap-1 text-[#00FF00] text-sm font-semibold px-3 py-1.5 rounded-md border border-[#00FF00]/40 hover:bg-[#00FF00]/10 hover:border-[#00FF00] transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start">
                View All 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {HARDWARE_ITEMS.map((item) => (
                <HardwareCard 
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  tags={item.tags}
                  tagColor={item.tagColor}
                  detailLink={item.detailLink}
                />
              ))}
            </div>
          </section>

          {/* Featured Tutorial */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Featured Tutorial</h2>
              <Link href="/tutorials" className="flex items-center gap-1 text-[#00FF00] text-sm font-semibold px-3 py-1.5 rounded-md border border-[#00FF00]/40 hover:bg-[#00FF00]/10 hover:border-[#00FF00] transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start">
                More Tutorials 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
            
            <TutorialFeature 
              id={FEATURED_TUTORIAL.id}
              title={FEATURED_TUTORIAL.title}
              description={FEATURED_TUTORIAL.description}
              image={FEATURED_TUTORIAL.image}
              badge={FEATURED_TUTORIAL.badge}
              badgeColor={FEATURED_TUTORIAL.badgeColor}
              updatedDate={FEATURED_TUTORIAL.updatedDate}
              learningPoints={FEATURED_TUTORIAL.learningPoints}
              duration={FEATURED_TUTORIAL.duration}
              level={FEATURED_TUTORIAL.level}
              platform={FEATURED_TUTORIAL.platform}
            />
          </section>

          {/* Documentation and Tools */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Security Tools</h2>
              <Link href="/tools" className="flex items-center gap-1 text-[#00FF00] text-sm font-semibold px-3 py-1.5 rounded-md border border-[#00FF00]/40 hover:bg-[#00FF00]/10 hover:border-[#00FF00] transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start">
                View All 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SECURITY_TOOL_ITEMS.map((tool) => (
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
          </section>

          {/* Hardware Compatibility */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Hardware Compatibility</h2>
              <Link href="/hardware-compatibility" className="flex items-center gap-1 text-[#00FF00] text-sm font-semibold px-3 py-1.5 rounded-md border border-[#00FF00]/40 hover:bg-[#00FF00]/10 hover:border-[#00FF00] transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start">
                Full Compatibility Matrix
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
            
            <HardwareCompatibility compatibilityData={HARDWARE_COMPATIBILITY} />
          </section>

          {/* Community Section */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Community Projects</h2>
              <Link href="/projects" className="flex items-center gap-1 text-[#00FF00] text-sm font-semibold px-3 py-1.5 rounded-md border border-[#00FF00]/40 hover:bg-[#00FF00]/10 hover:border-[#00FF00] transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start">
                View All 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMMUNITY_PROJECTS.map((project) => (
                <ProjectCard 
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tag={project.tag}
                  tagColor={project.tagColor}
                  author={project.author}
                  stars={project.stars}
                />
              ))}
            </div>
          </section>
        {/* Articles Section */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Latest Articles</h2>
              <Link href="/resources" className="flex items-center gap-1 text-[#00FF00] text-sm font-semibold px-3 py-1.5 rounded-md border border-[#00FF00]/40 hover:bg-[#00FF00]/10 hover:border-[#00FF00] transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start">
                View All 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Getting Started with Raspberry Pi for Cybersecurity</h3>
                <p className="text-gray-300 mb-4">A comprehensive guide to setting up your Raspberry Pi as a cybersecurity tool for beginners.</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    <span>Sarah Johnson</span>
                    <span className="mx-2">•</span>
                    <span>March 25, 2023</span>
                  </div>
                  <span className="text-sm bg-[#1A1A1A] border border-[#00FF00]/30 px-2 py-1 rounded text-[#00FF00]">12 min read</span>
                </div>
              </div>

              <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Advanced Network Traffic Analysis with Wireshark</h3>
                <p className="text-gray-300 mb-4">Learn how to use Wireshark on single board computers to detect and analyze suspicious network traffic.</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    <span>Michael Chen</span>
                    <span className="mx-2">•</span>
                    <span>February 10, 2023</span>
                  </div>
                  <span className="text-sm bg-[#1A1A1A] border border-[#00FF00]/30 px-2 py-1 rounded text-[#00FF00]">15 min read</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
