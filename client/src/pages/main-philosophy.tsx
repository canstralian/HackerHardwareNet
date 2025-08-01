import { useState } from 'react';
import Sidebar from '@/components/sidebar';

const MainPhilosophyPage = () => {
  const [activeSection, setActiveSection] = useState('manifesto');

  const sections = [
    { id: 'manifesto', title: 'The Manifesto', icon: 'fa-scroll' },
    { id: 'convergence', title: 'Convergence Theory', icon: 'fa-project-diagram' },
    { id: 'libraries', title: 'The Libraries', icon: 'fa-cubes' },
    { id: 'philosophy', title: 'Wu-Wei & Code', icon: 'fa-yin-yang' }
  ];

  const libraries = [
    {
      name: 'HackerHardware',
      role: 'main()',
      description: 'The roof, the rallying point, the brand, the ethos. Where everything converges.',
      color: '#00ff9d'
    },
    {
      name: '.comHunters',
      role: 'namespace_acquisition()',
      description: 'Digital real estate R&D—finding and refining namespace gold.',
      color: '#ff6b9d'
    },
    {
      name: 'JGRIP',
      role: 'mental_os()',
      description: 'A personal framework, a mental OS. The invisible scaffolding behind systems.',
      color: '#00c8ff'
    },
    {
      name: 'Field Kits',
      role: 'hardware_interface()',
      description: 'Hands-on hardware for pentesting, prototyping, and surviving IRL.',
      color: '#ffa500'
    },
    {
      name: 'AI Dev',
      role: 'frontier_work()',
      description: 'Prompting, scripting, model-crafting. The ghost in the machine.',
      color: '#9b59b6'
    },
    {
      name: 'Content Brain',
      role: 'knowledge_synthesis()',
      description: 'Writing, documenting, making sense of chaos with clarity.',
      color: '#e74c3c'
    },
    {
      name: 'Branding Side',
      role: 'identity_design()',
      description: 'Identity design. Where function meets form and gets a name.',
      color: '#2ecc71'
    }
  ];

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-16 lg:pb-12">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-hacker-accent mb-4">
              <i className="fas fa-terminal text-lg"></i>
              <span className="text-sm uppercase tracking-wider font-mono">System Philosophy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-hacker-accent font-mono">main()</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              "Every system needs a starting point. For C, it's main(). For me, it's this."
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-hacker-accent text-hacker-primary'
                    : 'bg-hacker-secondary text-gray-300 hover:bg-gray-700'
                }`}
              >
                <i className={`fas ${section.icon} mr-2`}></i>
                {section.title}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="max-w-4xl mx-auto">
            {activeSection === 'manifesto' && (
              <div className="space-y-8">
                <div className="bg-hacker-primary rounded-xl border border-gray-700 overflow-hidden">
                  <div className="bg-gray-900 px-6 py-3 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-hacker-accent font-mono">Why this, why now?</h2>
                  </div>
                  <div className="p-8">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-lg leading-relaxed mb-6">
                        For years, my work has been <strong className="text-hacker-accent">digital shrapnel</strong>—fragments of projects, 
                        ideas, and identities scattered across domains, repos, and notebooks. No center of gravity. Each piece had 
                        its own orbit, its own velocity, but none of it converged.
                      </p>
                      <p className="text-lg leading-relaxed mb-6">
                        The pain wasn't inefficiency. It was <strong className="text-red-400">incoherence</strong>.
                      </p>
                      <p className="text-lg leading-relaxed mb-6">
                        <em>A story told in whispers is no story at all.</em>
                      </p>
                      <p className="text-lg leading-relaxed mb-6">
                        HackerHardware is the remedy. It's not just a name—it's the clearest signal from the noise. 
                        It describes the real impulse behind everything I've done: building systems at the edge of 
                        software and circuitry. <strong className="text-hacker-accent">Thinking like a hacker. Shipping like a builder.</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-hacker-primary to-hacker-secondary rounded-xl p-8 border border-hacker-accent">
                  <blockquote className="text-center">
                    <p className="text-xl italic mb-4 text-gray-300">
                      "No busco el Tao. Pero a veces, el Tao me encuentra.<br />
                      Todo fluye, nada se fuerza.<br />
                      Actúo sin actuar.<br />
                      Cuando no lo pienso, lo hago."
                    </p>
                    <cite className="text-hacker-accent font-mono">— The Wu-Wei Principle</cite>
                  </blockquote>
                </div>
              </div>
            )}

            {activeSection === 'convergence' && (
              <div className="space-y-8">
                <div className="bg-hacker-primary rounded-xl border border-gray-700 p-8">
                  <h2 className="text-3xl font-bold mb-6">The System Architecture</h2>
                  <p className="text-lg leading-relaxed mb-6">
                    When you give your chaos a calling function, the functions start calling each other. 
                    What once felt like leaping between unfinished universes now feels like tuning modules 
                    in a shared operating system.
                  </p>
                  
                  <div className="bg-black bg-opacity-50 rounded-lg border border-gray-700 p-6 font-mono">
                    <div className="text-hacker-accent mb-2">// The convergence pattern</div>
                    <div className="text-purple-400">class</div>
                    <div className="text-blue-400 ml-4">ConvergenceSystem</div>
                    <div className="text-gray-300"> {"{"}</div>
                    <div className="text-gray-400 ml-4">// Each library operates independently</div>
                    <div className="text-gray-300 ml-4">private modules = new Map();</div>
                    <br />
                    <div className="text-purple-400 ml-4">public</div>
                    <div className="text-blue-400 ml-4">main</div>
                    <div className="text-gray-300">() {"{"}</div>
                    <div className="text-gray-400 ml-8">// But achieves more together</div>
                    <div className="text-gray-300 ml-8">return this.modules.sync();</div>
                    <div className="text-gray-300 ml-4">{"}"}</div>
                    <div className="text-gray-300">{"}"}</div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'libraries' && (
              <div className="space-y-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">What flows into HackerHardware</h2>
                  <p className="text-lg text-gray-300">
                    Each of these is a library. HackerHardware is the main() that calls them.
                  </p>
                </div>

                <div className="grid gap-6">
                  {libraries.map((library, index) => (
                    <div key={index} className="bg-hacker-primary rounded-xl border border-gray-700 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-black flex-shrink-0"
                            style={{ backgroundColor: library.color }}
                          >
                            {library.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{library.name}</h3>
                              <code className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded font-mono">
                                {library.role}
                              </code>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{library.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'philosophy' && (
              <div className="space-y-8">
                <div className="bg-hacker-primary rounded-xl border border-gray-700 p-8">
                  <h2 className="text-3xl font-bold mb-6">The Kernel Philosophy</h2>
                  <div className="space-y-6">
                    <div className="border-l-4 border-hacker-accent pl-6">
                      <h3 className="text-xl font-bold mb-2 text-hacker-accent">Minimum viable complexity</h3>
                      <p className="text-gray-300">Simple enough to understand, complex enough to solve real problems.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-400 pl-6">
                      <h3 className="text-xl font-bold mb-2 text-blue-400">Wu-wei (non-forcing)</h3>
                      <p className="text-gray-300">Finding the path of least resistance that still accomplishes the goal.</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-400 pl-6">
                      <h3 className="text-xl font-bold mb-2 text-purple-400">Modular with purpose</h3>
                      <p className="text-gray-300">Parts that work independently but achieve more together.</p>
                    </div>
                    
                    <div className="border-l-4 border-orange-400 pl-6">
                      <h3 className="text-xl font-bold mb-2 text-orange-400">Permeable boundaries</h3>
                      <p className="text-gray-300">Systems that can communicate without losing their identity.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-hacker-secondary rounded-xl p-8 border border-gray-700">
                  <blockquote className="text-center">
                    <p className="text-2xl italic mb-6 text-gray-300">
                      "This isn't just how I build—it's how I think.<br />
                      The code reflects the coder."
                    </p>
                    <p className="text-hacker-accent font-mono text-lg">
                      This is main()—both the entry point and the destination.
                    </p>
                  </blockquote>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPhilosophyPage;