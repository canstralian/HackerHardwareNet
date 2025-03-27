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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-[#00FF00] text-xl">
                <i className="fas fa-microchip"></i>
              </div>
              <h2 className="text-xl font-mono font-bold">
                <span className="text-[#00FF00]">Hacker</span>Board<span className="text-[#00FF00]">_</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-4">Educational platform for cybersecurity and ethical hacking with hardware.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/learning-paths" className="text-gray-400 hover:text-[#00FF00] transition-colors">Learning Paths</Link></li>
              <li><Link href="/hardware-library" className="text-gray-400 hover:text-[#00FF00] transition-colors">Hardware Guides</Link></li>
              <li><Link href="/tools" className="text-gray-400 hover:text-[#00FF00] transition-colors">Tool Documentation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">Community Projects</Link></li>
              <li><Link href="/hardware-library" className="text-gray-400 hover:text-[#00FF00] transition-colors">Hardware Database</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">Forums</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">Discord Server</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">Contribute</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">Report Bugs</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#00FF00] transition-colors">Code of Conduct</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Join our newsletter for the latest tutorials and projects.</p>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-[#0D0D0D] border border-[#1A1A1A] focus:border-[#00FF00] outline-none rounded-l px-4 py-2 w-full text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-[#00FF00] text-[#0D0D0D] px-4 py-2 rounded-r font-bold hover:bg-[#00FF00]/90 transition-colors"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-[#00FF00]/20 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} HackerBoard Academy. All content for educational purposes only.</p>
          <p className="mt-2">
            <Link href="#" className="hover:text-[#00FF00] transition-colors">Terms</Link> &bull;
            <Link href="#" className="hover:text-[#00FF00] transition-colors ml-2">Privacy</Link> &bull;
            <Link href="#" className="hover:text-[#00FF00] transition-colors ml-2">Cookies</Link> &bull;
            <Link href="#" className="hover:text-[#00FF00] transition-colors ml-2">Legal</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
