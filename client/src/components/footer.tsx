import { Link } from 'wouter';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter",
    });
    
    setEmail('');
  };

  return (
    <footer className="bg-[#1A1A1A] border-t border-[#00FF00]/30 py-8">
      <div className="container mx-auto px-4">
        {/* Brand Tagline Banner */}
        <div className="mb-8 p-4 bg-[#0D0D0D] rounded-md border border-[#00FF00]/20 text-center">
          <h2 className="font-mono text-[#00FF00] font-bold text-lg md:text-xl mb-1">
            Empower. Explore. Exploit.
          </h2>
          <p className="text-gray-400 text-sm">Hardware Hacking for the Modern Defender</p>
        </div>
        
        {/* Social Media Connection Section */}
        <div className="mb-8 p-4 rounded-md border border-[#00FF00]/20 bg-[#181818]">
          <h3 className="text-center font-bold mb-4">Connect With Us</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="flex flex-col items-center p-3 rounded-md border border-[#00FF00]/20 bg-[#1A1A1A] hover:bg-[#00FF00]/10 transition-all hover:-translate-y-1 duration-200 w-16 sm:w-20">
              <i className="fab fa-github text-[#00FF00] text-2xl mb-1"></i>
              <span className="text-xs text-gray-400">GitHub</span>
            </a>
            <a href="#" className="flex flex-col items-center p-3 rounded-md border border-[#00FF00]/20 bg-[#1A1A1A] hover:bg-[#00FF00]/10 transition-all hover:-translate-y-1 duration-200 w-16 sm:w-20">
              <i className="fab fa-twitter text-[#00FF00] text-2xl mb-1"></i>
              <span className="text-xs text-gray-400">Twitter</span>
            </a>
            <a href="#" className="flex flex-col items-center p-3 rounded-md border border-[#00FF00]/20 bg-[#1A1A1A] hover:bg-[#00FF00]/10 transition-all hover:-translate-y-1 duration-200 w-16 sm:w-20">
              <i className="fab fa-discord text-[#00FF00] text-2xl mb-1"></i>
              <span className="text-xs text-gray-400">Discord</span>
            </a>
            <a href="#" className="flex flex-col items-center p-3 rounded-md border border-[#00FF00]/20 bg-[#1A1A1A] hover:bg-[#00FF00]/10 transition-all hover:-translate-y-1 duration-200 w-16 sm:w-20">
              <i className="fab fa-youtube text-[#00FF00] text-2xl mb-1"></i>
              <span className="text-xs text-gray-400">YouTube</span>
            </a>
            <a href="#" className="flex flex-col items-center p-3 rounded-md border border-[#00FF00]/20 bg-[#1A1A1A] hover:bg-[#00FF00]/10 transition-all hover:-translate-y-1 duration-200 w-16 sm:w-20">
              <i className="fab fa-reddit text-[#00FF00] text-2xl mb-1"></i>
              <span className="text-xs text-gray-400">Reddit</span>
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-[#00FF00] text-xl">
                <i className="fas fa-microchip"></i>
              </div>
              <h2 className="text-xl font-mono font-bold">
                <span className="text-[#00FF00]">Hackerhardware</span><span className="text-[#00FF00]">.net</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-4">Educational platform for cybersecurity and ethical hacking with hardware.</p>
            
            {/* Share Buttons */}
            <div className="flex items-center mt-3">
              <span className="text-xs text-gray-500 mr-2">Share:</span>
              <div className="flex space-x-2">
                <button onClick={() => navigator.clipboard.writeText(window.location.href).then(() => toast({ title: "Link copied!" }))} 
                  className="bg-[#1A1A1A] p-1.5 rounded-md border border-[#00FF00]/20 hover:bg-[#00FF00]/10 transition-colors">
                  <i className="fas fa-link text-[#00FF00] text-xs"></i>
                </button>
                <a href="#" className="bg-[#1A1A1A] p-1.5 rounded-md border border-[#00FF00]/20 hover:bg-[#00FF00]/10 transition-colors">
                  <i className="fab fa-twitter text-[#00FF00] text-xs"></i>
                </a>
                <a href="#" className="bg-[#1A1A1A] p-1.5 rounded-md border border-[#00FF00]/20 hover:bg-[#00FF00]/10 transition-colors">
                  <i className="fab fa-facebook-f text-[#00FF00] text-xs"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/learning-paths" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Learning Paths</Link></li>
              <li><Link href="/hardware-library" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Hardware Guides</Link></li>
              <li><Link href="/tools" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Tool Documentation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Community Projects</Link></li>
              <li><Link href="/hardware-library" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Hardware Database</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Forums</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Discord Server</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Contribute</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Report Bugs</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Code of Conduct</Link></li>
            </ul>
            
            <h3 className="text-lg font-bold mt-6 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Privacy Policy</Link></li>
              <li><a href="/sitemap.xml" target="_blank" className="text-gray-400 hover:text-[#00FF00] transition-colors flex items-center gap-1"><i className="fas fa-chevron-right text-xs text-[#00FF00]"></i> Sitemap</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm">Join our newsletter for the latest tutorials and projects.</p>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-[#0D0D0D] border border-[#1A1A1A] focus:border-[#00FF00] outline-none rounded-l px-4 py-2 w-full text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                />
                <button 
                  type="submit" 
                  className="bg-[#00FF00] text-[#0D0D0D] px-4 py-2 rounded-r font-bold hover:bg-[#00FF00]/90 transition-colors"
                  aria-label="Submit email for newsletter"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">We respect your privacy and will never share your data.</p>
            </form>
          </div>
        </div>
        
        <div className="border-t border-[#00FF00]/20 mt-8 pt-6 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} hackerhardware.net. All content for educational purposes only.</p>
          <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/terms-of-service" className="hover:text-[#00FF00] transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-[#00FF00] transition-colors">Privacy Policy</Link>
            <a href="/sitemap.xml" target="_blank" className="hover:text-[#00FF00] transition-colors">Sitemap</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
