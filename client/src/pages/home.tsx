import Sidebar from '@/components/sidebar';
import HeroSection from '@/components/hero-section';
import LearningPathCard from '@/components/learning-path-card';
import HardwareCard from '@/components/hardware-card';
import TutorialFeature from '@/components/tutorial-feature';
import ToolCard from '@/components/tool-card';
import HardwareCompatibility from '@/components/hardware-compatibility';
import ProjectCard from '@/components/project-card';
import PhilosophySection from '@/components/philosophy-section';
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

          {/* Hardware Categories Section */}
          <section className="py-16 bg-hacker-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Hardware Categories</h2>
                <p className="max-w-2xl mx-auto text-gray-400">Specialized tools for every aspect of cybersecurity and penetration testing</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-hacker-primary rounded-xl overflow-hidden border border-gray-800 hover:border-hacker-accent transition-all">
                  <div className="p-6">
                    <div className="w-16 h-16 rounded-full bg-hacker-accent bg-opacity-20 flex items-center justify-center mb-6">
                      <i className="fas fa-laptop-code text-hacker-accent text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Penetration Testing</h3>
                    <p className="text-gray-400 mb-4">Tools for network security assessment and vulnerability scanning</p>
                    <Link href="/hardware-library" className="text-hacker-accent font-medium flex items-center">
                      Explore <i className="fas fa-arrow-right ml-2 text-sm"></i>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-hacker-primary rounded-xl overflow-hidden border border-gray-800 hover:border-hacker-accent transition-all">
                  <div className="p-6">
                    <div className="w-16 h-16 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mb-6">
                      <i className="fas fa-wifi text-blue-500 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Wireless Hacking</h3>
                    <p className="text-gray-400 mb-4">Antennas, adapters, and tools for wireless security testing</p>
                    <Link href="/hardware-library" className="text-hacker-accent font-medium flex items-center">
                      Explore <i className="fas fa-arrow-right ml-2 text-sm"></i>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-hacker-primary rounded-xl overflow-hidden border border-gray-800 hover:border-hacker-accent transition-all">
                  <div className="p-6">
                    <div className="w-16 h-16 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mb-6">
                      <i className="fas fa-microchip text-purple-500 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Embedded Systems</h3>
                    <p className="text-gray-400 mb-4">Development boards, programmers, and debugging tools</p>
                    <Link href="/hardware-library" className="text-hacker-accent font-medium flex items-center">
                      Explore <i className="fas fa-arrow-right ml-2 text-sm"></i>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-hacker-primary rounded-xl overflow-hidden border border-gray-800 hover:border-hacker-accent transition-all">
                  <div className="p-6">
                    <div className="w-16 h-16 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mb-6">
                      <i className="fas fa-shield-alt text-green-500 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Physical Security</h3>
                    <p className="text-gray-400 mb-4">Lockpicking tools, RFID devices, and access control systems</p>
                    <Link href="/hardware-library" className="text-hacker-accent font-medium flex items-center">
                      Explore <i className="fas fa-arrow-right ml-2 text-sm"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Featured Hardware</h2>
                  <p className="text-gray-400">Top-rated tools by cybersecurity professionals</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link href="/hardware-library" className="px-6 py-2 border border-hacker-accent text-hacker-accent rounded-full hover:bg-hacker-accent hover:text-hacker-primary transition-colors">
                    View All Products
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {HARDWARE_ITEMS.slice(0, 4).map((item) => (
                  <div key={item.id} className="product-card bg-hacker-secondary rounded-xl overflow-hidden border border-gray-800 transition-all duration-300">
                    <div className="relative">
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        HOT
                      </div>
                      <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                      <div className="flex items-center mb-3">
                        <div className="flex text-amber-400">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                        </div>
                        <span className="text-sm ml-2">(128)</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Link href={item.detailLink} className="text-hacker-accent hover:text-hacker-accent/80 font-medium">
                          View Details →
                        </Link>
                        <div className="flex gap-1">
                          {item.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-xs px-2 py-1 bg-opacity-20 rounded" style={{backgroundColor: item.tagColor}}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <PhilosophySection />

          {/* Newsletter & Blog Section */}
          <section className="py-16 bg-gradient-to-r from-hacker-primary to-hacker-secondary">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-gray-400 mb-8">Get the latest cybersecurity news, tutorials, and hardware reviews</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-3 rounded-lg bg-hacker-secondary border border-gray-700 flex-1"
                  />
                  <button className="px-6 py-3 bg-hacker-accent text-hacker-primary font-bold rounded-lg hover:bg-opacity-90 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Join thousands of cybersecurity professionals who trust our platform</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-hacker-secondary rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-hacker-accent flex items-center justify-center">
                      <i className="fas fa-user text-hacker-primary"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">Alex Rodriguez</h4>
                      <p className="text-sm text-gray-400">Penetration Tester</p>
                    </div>
                  </div>
                  <p className="text-gray-300">"The hardware quality is exceptional. Perfect for professional penetration testing work."</p>
                  <div className="flex text-amber-400 mt-4">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                
                <div className="bg-hacker-secondary rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">Sarah Chen</h4>
                      <p className="text-sm text-gray-400">Security Researcher</p>
                    </div>
                  </div>
                  <p className="text-gray-300">"Great learning platform with detailed tutorials. Helped me advance my cybersecurity skills significantly."</p>
                  <div className="flex text-amber-400 mt-4">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                
                <div className="bg-hacker-secondary rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">Marcus Johnson</h4>
                      <p className="text-sm text-gray-400">Ethical Hacker</p>
                    </div>
                  </div>
                  <p className="text-gray-300">"Fast shipping and excellent customer support. The community is very knowledgeable and helpful."</p>
                  <div className="flex text-amber-400 mt-4">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
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
