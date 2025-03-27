import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import Sidebar from '@/components/sidebar';
import { FEATURED_TUTORIAL } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

// This component shows a mock tutorial content
// In a real app, this would fetch the tutorial data from the API
const Tutorial = () => {
  const [_, params] = useRoute('/tutorial/:id');
  const { toast } = useToast();
  const [tutorial, setTutorial] = useState(FEATURED_TUTORIAL);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const loadTutorial = () => {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      setTimeout(() => {
        if (params && params.id === FEATURED_TUTORIAL.id) {
          setTutorial(FEATURED_TUTORIAL);
          setIsLoading(false);
        } else {
          toast({
            title: "Tutorial not found",
            description: "The requested tutorial could not be found.",
            variant: "destructive"
          });
          setIsLoading(false);
        }
      }, 500);
    };

    loadTutorial();
  }, [params, toast]);

  if (isLoading) {
    return (
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-12">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-10 bg-[#1A1A1A] rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-[#1A1A1A] rounded w-1/4 mb-8"></div>
              <div className="h-64 bg-[#1A1A1A] rounded mb-6"></div>
              <div className="h-4 bg-[#1A1A1A] rounded w-full mb-2"></div>
              <div className="h-4 bg-[#1A1A1A] rounded w-full mb-2"></div>
              <div className="h-4 bg-[#1A1A1A] rounded w-3/4 mb-6"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href="/" className="text-[#00FF00] hover:underline mb-4 flex items-center">
              <i className="fas fa-arrow-left mr-2"></i> Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h1 className="text-3xl font-mono font-bold">{tutorial.title}</h1>
              <div className="flex items-center mt-2 md:mt-0">
                <span 
                  className="text-xs font-mono px-2 py-1 rounded mr-2" 
                  style={{ backgroundColor: `${tutorial.badgeColor}10`, color: tutorial.badgeColor }}
                >
                  {tutorial.badge}
                </span>
                <span className="text-xs text-gray-400">Updated {tutorial.updatedDate}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center text-sm text-gray-400 mb-4">
              <div className="flex items-center mr-4">
                <i className="fas fa-clock mr-1"></i>
                <span>{tutorial.duration}</span>
              </div>
              <div className="flex items-center mr-4">
                <i className="fas fa-signal mr-1"></i>
                <span>{tutorial.level}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-microchip mr-1"></i>
                <span>{tutorial.platform}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <img 
              src={tutorial.image} 
              alt={tutorial.title} 
              className="w-full rounded-lg mb-6"
              loading="lazy"
            />
            
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              {tutorial.description}
            </p>
            
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#00FF00]/20 mb-6">
              <h3 className="font-mono text-[#00FF00] text-lg mb-4">What you'll learn:</h3>
              <ul className="space-y-2">
                {tutorial.learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check-circle text-[#00FF00] mt-1 mr-2"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-mono font-bold mb-4"><span className="text-[#00FF00]">#</span> Introduction</h2>
              <p className="text-gray-300 mb-4">
                In this tutorial, we'll learn how to set up a rogue access point using a Raspberry Pi. This is a common technique used in security testing to demonstrate the risks of unsecured WiFi networks and man-in-the-middle attacks.
              </p>
              <p className="text-gray-300 mb-4">
                <strong className="text-[#FF3E3E]">IMPORTANT:</strong> This tutorial is for educational purposes only. Always obtain proper authorization before testing on any networks. Unauthorized access to computer networks is illegal and unethical.
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-mono font-bold mb-4"><span className="text-[#00FF00]">#</span> Prerequisites</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <i className="fas fa-angle-right text-[#00FF00] mt-1 mr-2"></i>
                  <span>Raspberry Pi 4 (2GB RAM or higher)</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-angle-right text-[#00FF00] mt-1 mr-2"></i>
                  <span>External WiFi adapter with monitor mode support (e.g., Alfa AWUS036ACH)</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-angle-right text-[#00FF00] mt-1 mr-2"></i>
                  <span>Kali Linux installed on the Raspberry Pi</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-angle-right text-[#00FF00] mt-1 mr-2"></i>
                  <span>Basic knowledge of networking and Linux commands</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-mono font-bold mb-4"><span className="text-[#00FF00]">#</span> Step 1: Configure Wireless Interfaces</h2>
              <p className="text-gray-300 mb-4">
                First, we need to configure our wireless interfaces. One interface will be used to create the access point, and the other will maintain an internet connection.
              </p>
              
              <div className="mb-4">
                <div className="terminal-header flex items-center">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF3E3E]"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-[#00FF00]"></div>
                  </div>
                  <span className="text-xs text-gray-400 ml-3">Terminal</span>
                </div>
                <div className="terminal-body text-sm">
                  <div><span className="text-[#00FF00]">$</span> <span className="text-gray-300">sudo apt update && sudo apt install -y hostapd dnsmasq</span></div>
                  <div><span className="text-[#00FF00]">$</span> <span className="text-gray-300">sudo systemctl stop hostapd dnsmasq</span></div>
                  <div><span className="text-[#00FF00]">$</span> <span className="text-gray-300">sudo ifconfig wlan1 up</span></div>
                </div>
              </div>
            </div>
            
            {/* The tutorial continues - Sample content shown */}
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#00FF00]/20 mb-6">
              <h3 className="font-mono text-[#00FF00] text-lg mb-4">Next Steps:</h3>
              <p className="text-gray-300">
                This is just the beginning of the tutorial. In a complete implementation, we would continue with the following sections:
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start">
                  <i className="fas fa-lock-open text-[#00FF00] mt-1 mr-2"></i>
                  <span>Setting up DHCP and DNS spoofing</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-route text-[#00FF00] mt-1 mr-2"></i>
                  <span>Configuring network routing and IP forwarding</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-shield-alt text-[#00FF00] mt-1 mr-2"></i>
                  <span>Implementing transparent SSL proxying</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-search text-[#00FF00] mt-1 mr-2"></i>
                  <span>Analyzing captured network traffic</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1A1A1A]/50 rounded-lg p-6 border border-[#00FF00]/10">
              <div className="flex items-center mb-4">
                <i className="fas fa-lightbulb text-[#00FF00] mr-3 text-xl"></i>
                <h3 className="font-mono text-lg">Continue Learning</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Ready to continue your learning journey? Check out our related tutorials and resources below.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="#" className="block p-4 bg-[#0D0D0D] rounded-lg border border-[#00FF00]/10 hover:border-[#00FF00]/30 transition-colors">
                  <h4 className="text-white font-bold mb-1">WiFi Deauthentication Attacks</h4>
                  <p className="text-gray-400 text-sm">Learn how to detect and defend against WiFi disconnection attacks.</p>
                </Link>
                <Link href="#" className="block p-4 bg-[#0D0D0D] rounded-lg border border-[#00FF00]/10 hover:border-[#00FF00]/30 transition-colors">
                  <h4 className="text-white font-bold mb-1">Building a Network Traffic Monitor</h4>
                  <p className="text-gray-400 text-sm">Create your own network monitoring system with Raspberry Pi.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tutorial;
