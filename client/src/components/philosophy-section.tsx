import { useState } from 'react';

const PhilosophySection = () => {
  const [activePhilosophy, setActivePhilosophy] = useState(0);

  const philosophies = [
    {
      title: "Systems Thinking",
      subtitle: "main() function",
      description: "Where scattered circuits converge into coherent systems. Every component has its purpose, every function its call.",
      icon: "fa-project-diagram",
      quote: "This is the workshop. This is the main() function.",
      code: "main() {"
    },
    {
      title: "Wu-Wei Approach", 
      subtitle: "非强迫性设计",
      description: "Finding the path of least resistance that still accomplishes the goal. True mastery flows without forcing.",
      icon: "fa-yin-yang",
      quote: "No busco el Tao. Pero a veces, el Tao me encuentra.",
      code: "if (!force) { flow(); }"
    },
    {
      title: "Modular Architecture",
      subtitle: "Convergent Libraries",
      description: "Each tool, tutorial, and technique operates independently but achieves more when connected through the unified system.",
      icon: "fa-cubes",
      quote: "Each of these is a library. HackerHardware is the main() that calls them.",
      code: "#include <all_libraries.h>"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-hacker-secondary to-hacker-primary relative overflow-hidden">
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="circuit-bg w-full h-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-hacker-accent mb-4">
            <i className="fas fa-terminal text-lg"></i>
            <span className="text-sm uppercase tracking-wider font-mono">The Philosophy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Beyond <span className="text-hacker-accent font-mono">exit(0)</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            HackerHardware isn't just a platform—it's the convergence point where chaos becomes coherence, 
            where scattered fragments compile into something greater.
          </p>
        </div>

        {/* Philosophy Tabs */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Tab Navigation */}
            <div className="lg:w-1/3">
              <div className="space-y-4">
                {philosophies.map((philosophy, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePhilosophy(index)}
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                      activePhilosophy === index
                        ? 'bg-hacker-accent bg-opacity-20 border-hacker-accent'
                        : 'bg-hacker-primary border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        activePhilosophy === index ? 'bg-hacker-accent text-hacker-primary' : 'bg-gray-700'
                      }`}>
                        <i className={`fas ${philosophy.icon} text-lg`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{philosophy.title}</h3>
                        <p className="text-sm text-gray-400 font-mono">{philosophy.subtitle}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-2/3">
              <div className="bg-hacker-primary rounded-xl border border-gray-700 overflow-hidden">
                {/* Code Header */}
                <div className="bg-gray-900 px-6 py-3 border-b border-gray-700 flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-gray-400 font-mono">hackerhardware.philosophy</span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-6">
                    <code className="text-hacker-accent font-mono text-lg bg-gray-900 px-3 py-1 rounded">
                      {philosophies[activePhilosophy].code}
                    </code>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{philosophies[activePhilosophy].title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {philosophies[activePhilosophy].description}
                  </p>
                  
                  <blockquote className="border-l-4 border-hacker-accent pl-6 italic text-gray-400 bg-gray-900 bg-opacity-50 p-4 rounded-r-lg">
                    "{philosophies[activePhilosophy].quote}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-hacker-primary border border-hacker-accent rounded-full px-8 py-4">
            <i className="fas fa-code text-hacker-accent text-xl"></i>
            <span className="text-lg">Ready to compile your own system?</span>
            <i className="fas fa-arrow-right text-hacker-accent"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;