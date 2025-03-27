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
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-12">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <HeroSection />

          {/* Learning Paths Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Learning Paths</h2>
              <Link href="/learning-paths" className="text-[#00FF00] text-sm hover:underline">View All <i className="fas fa-arrow-right ml-1"></i></Link>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Popular Hardware</h2>
              <Link href="/hardware-library" className="text-[#00FF00] text-sm hover:underline">View All <i className="fas fa-arrow-right ml-1"></i></Link>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Featured Tutorial</h2>
              <Link href="/tutorials" className="text-[#00FF00] text-sm hover:underline">More Tutorials <i className="fas fa-arrow-right ml-1"></i></Link>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Security Tools</h2>
              <Link href="/tools" className="text-[#00FF00] text-sm hover:underline">View All <i className="fas fa-arrow-right ml-1"></i></Link>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Hardware Compatibility</h2>
              <Link href="/hardware-compatibility" className="text-[#00FF00] text-sm hover:underline">Full Compatibility Matrix <i className="fas fa-arrow-right ml-1"></i></Link>
            </div>
            
            <HardwareCompatibility compatibilityData={HARDWARE_COMPATIBILITY} />
          </section>

          {/* Community Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-mono font-bold"><span className="text-[#00FF00]">#</span> Community Projects</h2>
              <Link href="/projects" className="text-[#00FF00] text-sm hover:underline">View All <i className="fas fa-arrow-right ml-1"></i></Link>
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
        </div>
      </main>
    </div>
  );
};

export default Home;
