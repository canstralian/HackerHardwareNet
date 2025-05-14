import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const TermsOfService = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="text-[#00FF00] hover:text-[#00FF00]/80 hover:bg-[#00FF00]/10 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8 text-white"><span className="text-[#00FF00]">#</span> Terms of Service</h1>
      
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Introduction</h2>
          <p>
            Welcome to Hacker Hardware. These Terms of Service ("Terms") govern your access to and use of hackerhardware.net, 
            including any content, functionality, and services offered on or through the website.
          </p>
          <p className="mt-2">
            By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, 
            you must not access or use our website.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Acceptable Use</h2>
          <h3 className="text-lg font-semibold mt-4 mb-2">Lawful Purposes Only</h3>
          <p>
            You may use our website only for lawful purposes and in accordance with these Terms. You agree not to use our website:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
            <li>To exploit vulnerabilities in systems you don't own or don't have permission to test</li>
            <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
            <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
            <li>To engage in any other conduct that could damage, disable, overburden, or impair the website</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Responsible Security Research</h3>
          <p>
            While we encourage security research and the use of our educational content, you must ensure that:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>You have legal authorization to access and test the systems and networks you work with</li>
            <li>You use the knowledge and tools responsibly and ethically</li>
            <li>You respect the privacy and property of others</li>
            <li>You comply with all applicable laws and regulations</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Intellectual Property Rights</h2>
          <p>
            The website and its entire contents, features, and functionality are owned by Hacker Hardware and are protected 
            by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p className="mt-2">
            You are granted a limited license to access and use the website for your personal, non-commercial use. 
            You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
            republish, download, store, or transmit any of the material on our website without our express written permission.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">User Contributions</h2>
          <p>
            Our website may contain message boards, chat rooms, personal profiles, forums, or other interactive features 
            that allow users to post, submit, publish, display, or transmit content. Any content you post to the website 
            will be considered non-confidential and non-proprietary.
          </p>
          <p className="mt-2">
            By providing any user contribution on the website, you grant us a non-exclusive, royalty-free, perpetual, 
            irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create 
            derivative works from, distribute, perform, and display such content.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Prohibited Content</h2>
          <p>
            You may not post or transmit content that:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
            <li>Promotes illegal activities or infringes upon any third party's intellectual property rights</li>
            <li>Contains malicious code, viruses, or other harmful components</li>
            <li>Discloses unauthorized exploitation techniques for critical infrastructure</li>
            <li>Includes personal, sensitive, or confidential information about others without permission</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites that are not owned or controlled by Hacker Hardware. 
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices 
            of any third-party websites or services.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Account Security</h2>
          <p>
            If you create an account on our website, you are responsible for maintaining the confidentiality of your account 
            and password and for restricting access to your computer. You agree to accept responsibility for all activities 
            that occur under your account.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Hacker Hardware shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, 
            arising out of or in connection with your use of the website.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Disclaimer of Warranties</h2>
          <p>
            The website is provided on an "AS IS" and "AS AVAILABLE" basis, without any warranties of any kind, either express or implied. 
            We disclaim all warranties, including but not limited to, implied warranties of merchantability, fitness for a particular purpose, 
            and non-infringement.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Changes to the Terms of Service</h2>
          <p>
            We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately 
            when we post them. Your continued use of the website following the posting of revised Terms means that you accept 
            and agree to the changes.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States, 
            without regard to its conflict of law provisions.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mt-2 font-mono">
            legal@hackerhardware.net
          </p>
        </section>
        
        <section className="border-t border-gray-700 pt-4">
          <p className="text-sm">Last Updated: May 14, 2025</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;