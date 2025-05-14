import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const PrivacyPolicy = () => {
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
      
      <h1 className="text-3xl font-bold mb-8 text-white"><span className="text-[#00FF00]">#</span> Privacy Policy</h1>
      
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Introduction</h2>
          <p>
            At Hacker Hardware, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
            at hackerhardware.net and use our services.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Information We Collect</h2>
          <h3 className="text-lg font-semibold mt-4 mb-2">Personal Information</h3>
          <p>
            When you create an account, make a purchase, or interact with our services, we may collect information including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Name and contact information (email address, physical address, phone number)</li>
            <li>Account credentials (username and password)</li>
            <li>Purchase and order history</li>
            <li>Payment information (stored securely through our payment processors)</li>
            <li>Communications with our support team</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain information about your device, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Dates and times of your visits</li>
            <li>Pages you visit and features you use</li>
            <li>Referring websites</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">How We Use Your Information</h2>
          <p>
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Providing, maintaining, and improving our services</li>
            <li>Processing transactions and sending transaction notifications</li>
            <li>Creating and managing your account</li>
            <li>Responding to your requests and inquiries</li>
            <li>Sending administrative information</li>
            <li>Sending marketing communications (with your consent)</li>
            <li>Preventing fraudulent activities</li>
            <li>Analyzing usage patterns to improve user experience</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. 
            Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct 
            your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Data Sharing and Disclosure</h2>
          <p>
            We may share your personal information with:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Service providers who assist us in operating our website and providing services</li>
            <li>Business partners with your consent</li>
            <li>Law enforcement or government officials when required by law</li>
            <li>Potential buyers in the event of a merger, acquisition, or sale of assets</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission 
            over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal data, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access to your personal data</li>
            <li>Correction of inaccurate or incomplete data</li>
            <li>Deletion of your personal data</li>
            <li>Restriction of processing of your personal data</li>
            <li>Data portability</li>
            <li>Objection to processing of your personal data</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 16 years of age, and we do not knowingly collect personal 
            information from children. If you become aware that a child has provided us with personal information, 
            please contact us.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2 font-mono">
            privacy@hackerhardware.net
          </p>
        </section>
        
        <section className="border-t border-gray-700 pt-4">
          <p className="text-sm">Last Updated: May 14, 2025</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;