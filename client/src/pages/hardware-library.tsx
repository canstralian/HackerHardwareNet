import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import HardwareCard from '@/components/hardware-card';
import HardwareCompatibility from '@/components/hardware-compatibility';
import { HARDWARE_ITEMS, HARDWARE_COMPATIBILITY, HARDWARE_PLATFORMS } from '@/lib/constants';

const HardwareLibrary = () => {
  const [activeTab, setActiveTab] = useState('hardware');

  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-[#1A1A1A] rounded-lg p-6 lg:p-10 mb-10 border border-[#00FF00]/20 relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-[#00FF00]"></div>
            <h1 className="text-3xl font-mono font-bold mb-4">Hardware Library</h1>
            <p className="text-gray-300 mb-6">
              Explore our collection of single board computers and microcontrollers for cybersecurity projects. Learn about their specifications, capabilities, and how they can be used for penetration testing and security research.
            </p>
            
            <div className="flex border-b border-[#00FF00]/20">
              <button 
                onClick={() => setActiveTab('hardware')}
                className={`px-4 py-2 font-medium ${activeTab === 'hardware' ? 'text-[#00FF00] border-b-2 border-[#00FF00]' : 'text-gray-400 hover:text-white'}`}
              >
                Hardware
              </button>
              <button 
                onClick={() => setActiveTab('compatibility')}
                className={`px-4 py-2 font-medium ${activeTab === 'compatibility' ? 'text-[#00FF00] border-b-2 border-[#00FF00]' : 'text-gray-400 hover:text-white'}`}
              >
                Compatibility Matrix
              </button>
            </div>
          </div>
          
          {activeTab === 'hardware' && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-mono font-bold mb-6"><span className="text-[#00FF00]">#</span> Hardware Platforms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {HARDWARE_PLATFORMS.map((platform) => (
                    <div key={platform.id} className="bg-[#1A1A1A] rounded-lg p-6 border border-[#00FF00]/20">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-[#00FF00]/10 rounded-full flex items-center justify-center text-[#00FF00] mr-3">
                          <i className={`fas ${platform.icon}`}></i>
                        </div>
                        <h3 className="text-xl font-bold">{platform.name}</h3>
                      </div>
                      <p className="text-gray-400 mb-4">{platform.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-mono font-bold mb-6"><span className="text-[#00FF00]">#</span> Popular Hardware</h2>
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
              </div>
            </>
          )}
          
          {activeTab === 'compatibility' && (
            <div>
              <h2 className="text-2xl font-mono font-bold mb-6"><span className="text-[#00FF00]">#</span> Hardware Compatibility Matrix</h2>
              <p className="text-gray-300 mb-4">
                This matrix shows which cybersecurity techniques are compatible with different hardware platforms. Use this as a guide when planning your projects or selecting hardware for specific security tasks.
              </p>
              <HardwareCompatibility compatibilityData={HARDWARE_COMPATIBILITY} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HardwareLibrary;
