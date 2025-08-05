
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Zap, Award } from 'lucide-react';

const HackboxValueProps = () => {
  const valueProps = [
    {
      icon: <Cpu className="h-8 w-8 text-[#00FF00]" />,
      title: "Portable + Modular",
      description: "Dual Pi 5s in a DeskPi Rackmate with managed switch for field deployments"
    },
    {
      icon: <Zap className="h-8 w-8 text-[#00FF00]" />,
      title: "AI + Purple Team Built-In",
      description: "PromptCraft injection labs pre-installed with threat scenario simulations"
    },
    {
      icon: <Award className="h-8 w-8 text-[#00FF00]" />,
      title: "Built by Hackers for Hackers",
      description: "Real hardware built from this playground's proven R&D toolkits"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why <span className="text-[#00FF00]">Hackbox Mini</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Purpose-built for security professionals who need portable, AI-enhanced red team capabilities
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-[#00FF00]/50 transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {prop.icon}
                </div>
                <CardTitle className="text-xl text-white">{prop.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center leading-relaxed">
                  {prop.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HackboxValueProps;
