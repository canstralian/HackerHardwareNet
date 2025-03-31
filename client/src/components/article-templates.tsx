import React from 'react';

export const Article1Content: React.FC = () => {
  return (
    <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-4">Getting Started with Raspberry Pi for Cybersecurity</h1>
      
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 rounded-full bg-[#00FF00]/20 mr-3"></div>
        <div>
          <p className="font-medium">Sarah Johnson</p>
          <p className="text-sm text-gray-400">March 25, 2023 • 12 min read</p>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-4">
          The Raspberry Pi is a powerful and affordable single-board computer that has become a staple in the cybersecurity toolkit. 
          From penetration testing to network monitoring, this versatile device can be adapted for various security applications.
          In this guide, we'll walk through the basics of setting up your Raspberry Pi specifically for cybersecurity tasks.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">What You'll Need</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
          <li>Raspberry Pi 4 (8GB RAM recommended)</li>
          <li>MicroSD card (32GB or larger)</li>
          <li>Power supply</li>
          <li>HDMI cable and display (for initial setup)</li>
          <li>USB keyboard and mouse</li>
          <li>Optional: Wi-Fi adapter with monitor mode support</li>
          <li>Optional: USB to Ethernet adapter for dual network interfaces</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Initial Setup</h2>
        <h3 className="text-xl font-bold mt-6 mb-3">Step 1: Operating System Selection</h3>
        <p className="text-gray-300 mb-4">
          While Raspbian is the official operating system for Raspberry Pi, for cybersecurity purposes, you might want to consider specialized
          distributions like Kali Linux ARM or Parrot OS ARM. These come pre-loaded with penetration testing and security tools.
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># Download Kali Linux ARM image</p>
          <p className="text-[#00FF00]">wget https://kali.download/arm-images/kali-2023.1/kali-linux-2023.1-raspberry-pi-arm64.img.xz</p>
          <p className="text-gray-300 mt-2"># Extract the image</p>
          <p className="text-[#00FF00]">xz -d kali-linux-2023.1-raspberry-pi-arm64.img.xz</p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Step 2: Flashing the OS</h3>
        <p className="text-gray-300 mb-4">
          You'll need to flash the OS image to your MicroSD card. Tools like Balena Etcher or Raspberry Pi Imager make this process straightforward.
        </p>
        
        <p className="text-gray-300 mb-4">
          After writing the image to your SD card, insert it into your Raspberry Pi, connect the peripherals, and power it up.
          Follow the on-screen instructions to complete the initial setup.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Essential Configurations for Security</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Setting Up SSH Access</h3>
        <p className="text-gray-300 mb-4">
          For remote access, you'll want to configure SSH. However, it's important to secure it properly to prevent unauthorized access.
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># Install SSH if not already installed</p>
          <p className="text-[#00FF00]">sudo apt update && sudo apt install -y openssh-server</p>
          <p className="text-gray-300 mt-2"># Edit SSH configuration for security</p>
          <p className="text-[#00FF00]">sudo nano /etc/ssh/sshd_config</p>
          <p className="text-gray-300 mt-2"># Make these changes:</p>
          <p className="text-[#00FF00]">PermitRootLogin no</p>
          <p className="text-[#00FF00]">PasswordAuthentication no</p>
          <p className="text-[#00FF00]">UsePAM yes</p>
          <p className="text-gray-300 mt-2"># Restart SSH service</p>
          <p className="text-[#00FF00]">sudo systemctl restart ssh</p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Setting Up Key-Based Authentication</h3>
        <p className="text-gray-300 mb-4">
          Using key-based authentication provides better security than passwords. Generate SSH keys on your client machine:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># On your client machine (not the Pi)</p>
          <p className="text-[#00FF00]">ssh-keygen -t ed25519 -C "your_email@example.com"</p>
          <p className="text-gray-300 mt-2"># Copy the key to your Pi</p>
          <p className="text-[#00FF00]">ssh-copy-id pi@raspberry_pi_ip_address</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Installing Cybersecurity Tools</h2>
        
        <p className="text-gray-300 mb-4">
          If you're using Kali Linux, many tools are pre-installed. Here are some additional tools you might want to install:
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Network Analysis Tools</h3>
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">sudo apt install -y nmap wireshark tshark tcpdump</p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Wireless Networking Tools</h3>
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">sudo apt install -y aircrack-ng kismet wifite</p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Vulnerability Scanning</h3>
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">sudo apt install -y nikto openvas</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Setting Up a Wireless Monitor Mode Interface</h2>
        
        <p className="text-gray-300 mb-4">
          For many wireless security tasks, you'll need your wireless adapter to support monitor mode:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># Check your wireless interfaces</p>
          <p className="text-[#00FF00]">iwconfig</p>
          <p className="text-gray-300 mt-2"># Put adapter in monitor mode (replace wlan0 with your interface)</p>
          <p className="text-[#00FF00]">sudo airmon-ng start wlan0</p>
          <p className="text-gray-300 mt-2"># Verify monitor mode is active</p>
          <p className="text-[#00FF00]">iwconfig</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Basic Security Projects</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">1. Network Scanner</h3>
        <p className="text-gray-300 mb-4">
          Set up a simple network scanner to identify devices on your network:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">sudo nmap -sn 192.168.1.0/24</p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">2. WiFi Traffic Monitor</h3>
        <p className="text-gray-300 mb-4">
          Set up Kismet to monitor wireless traffic in your area:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">sudo kismet -c wlan0mon</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
        
        <p className="text-gray-300 mb-4">
          Your Raspberry Pi is now set up as a basic cybersecurity platform! This guide covers just the fundamentals to get you started.
          As you become more comfortable with these tools, you can explore more advanced projects like:
        </p>
        
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
          <li>Setting up a network intrusion detection system (IDS) with Snort</li>
          <li>Creating a VPN gateway</li>
          <li>Building a MITM (Man in the Middle) testing platform</li>
          <li>Setting up a honeypot to study attack patterns</li>
        </ul>
        
        <p className="text-gray-300 mb-4">
          Remember that these tools should only be used in environments you own or have explicit permission to test.
          Unauthorized penetration testing is illegal and unethical.
        </p>
        
        <div className="border-t border-[#00FF00]/20 mt-8 pt-6">
          <h3 className="text-xl font-bold mb-4">Related Resources</h3>
          <ul className="list-disc pl-6 space-y-2 text-[#00FF00]">
            <li><a href="#" className="hover:underline">Advanced Raspberry Pi Network Security</a></li>
            <li><a href="#" className="hover:underline">Building a WiFi Pineapple Alternative</a></li>
            <li><a href="#" className="hover:underline">Hardware Specifications: Raspberry Pi 4</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Article2Content: React.FC = () => {
  return (
    <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-4">Advanced Network Traffic Analysis with Wireshark</h1>
      
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 rounded-full bg-[#00FF00]/20 mr-3"></div>
        <div>
          <p className="font-medium">Michael Chen</p>
          <p className="text-sm text-gray-400">February 10, 2023 • 15 min read</p>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-4">
          Wireshark is a powerful network protocol analyzer that allows you to inspect traffic at a microscopic level.
          When paired with single-board computers like the Raspberry Pi, it becomes an invaluable tool for security
          professionals to monitor networks, identify suspicious activity, and analyze potential security threats.
        </p>
        
        <p className="text-gray-300 mb-4">
          This guide will walk you through setting up and using Wireshark for advanced network analysis on your
          Raspberry Pi or similar single-board computer. We'll cover techniques to detect common security issues
          and anomalies that might indicate a compromise.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Setting Up Wireshark on Raspberry Pi</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Installation</h3>
        <p className="text-gray-300 mb-4">
          First, let's install Wireshark and ensure your user can capture packets without root privileges:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># Update your package lists</p>
          <p className="text-[#00FF00]">sudo apt update</p>
          <p className="text-gray-300 mt-2"># Install Wireshark</p>
          <p className="text-[#00FF00]">sudo apt install -y wireshark</p>
          <p className="text-gray-300 mt-2"># During installation, select 'Yes' when asked if non-superusers should be able to capture packets</p>
          <p className="text-gray-300 mt-2"># Add your user to the wireshark group</p>
          <p className="text-[#00FF00]">sudo usermod -a -G wireshark $USER</p>
          <p className="text-gray-300 mt-2"># Apply the changes</p>
          <p className="text-[#00FF00]">newgrp wireshark</p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Configuring Network Interfaces</h3>
        <p className="text-gray-300 mb-4">
          For effective traffic analysis, you'll want to position your Raspberry Pi strategically in the network.
          There are several configurations to consider:
        </p>
        
        <h4 className="text-lg font-bold mt-4 mb-2">1. Basic Monitoring (Capturing Your Own Traffic)</h4>
        <p className="text-gray-300 mb-4">
          This is the simplest setup where you capture traffic to and from your Pi. Start Wireshark and select 
          your primary network interface (usually eth0 for wired or wlan0 for wireless).
        </p>
        
        <h4 className="text-lg font-bold mt-4 mb-2">2. Network Tap Configuration</h4>
        <p className="text-gray-300 mb-4">
          To capture traffic between other devices, you can set up the Pi as a network tap:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># Enable IP forwarding</p>
          <p className="text-[#00FF00]">sudo sysctl -w net.ipv4.ip_forward=1</p>
          <p className="text-gray-300 mt-2"># Make it persistent</p>
          <p className="text-[#00FF00]">echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf</p>
          <p className="text-gray-300 mt-2"># Set up NAT (assuming eth0 is WAN and eth1 is LAN)</p>
          <p className="text-[#00FF00]">sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</p>
          <p className="text-[#00FF00]">sudo iptables -A FORWARD -i eth0 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT</p>
          <p className="text-[#00FF00]">sudo iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT</p>
        </div>
        
        <h4 className="text-lg font-bold mt-4 mb-2">3. Mirror Port on Switch</h4>
        <p className="text-gray-300 mb-4">
          If you have a managed switch, you can configure a mirror/span port to send a copy of all traffic to your Pi.
          This is the most passive and undetectable monitoring option.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Traffic Capture Techniques</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Using Display Filters</h3>
        <p className="text-gray-300 mb-4">
          Wireshark's display filters are powerful for isolating specific traffic patterns. Here are some useful filters:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#0D0D0D] p-4 rounded-md font-mono text-sm">
            <p className="text-gray-300 mb-2"># HTTP traffic</p>
            <p className="text-[#00FF00]">http</p>
          </div>
          <div className="bg-[#0D0D0D] p-4 rounded-md font-mono text-sm">
            <p className="text-gray-300 mb-2"># DNS queries</p>
            <p className="text-[#00FF00]">dns</p>
          </div>
          <div className="bg-[#0D0D0D] p-4 rounded-md font-mono text-sm">
            <p className="text-gray-300 mb-2"># SSH traffic</p>
            <p className="text-[#00FF00]">ssh</p>
          </div>
          <div className="bg-[#0D0D0D] p-4 rounded-md font-mono text-sm">
            <p className="text-gray-300 mb-2"># Traffic to/from specific IP</p>
            <p className="text-[#00FF00]">ip.addr == 192.168.1.100</p>
          </div>
          <div className="bg-[#0D0D0D] p-4 rounded-md font-mono text-sm">
            <p className="text-gray-300 mb-2"># Suspicious TLS versions</p>
            <p className="text-[#00FF00]">tls.handshake.version {`<`} 0x0303</p>
          </div>
          <div className="bg-[#0D0D0D] p-4 rounded-md font-mono text-sm">
            <p className="text-gray-300 mb-2"># SMB traffic (often exploited)</p>
            <p className="text-[#00FF00]">smb || smb2</p>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Capturing Packets from Command Line</h3>
        <p className="text-gray-300 mb-4">
          Sometimes you'll want to capture packets from the command line, especially for headless setups:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># Capture packets on interface eth0 and save to file</p>
          <p className="text-[#00FF00]">sudo tshark -i eth0 -w capture.pcap</p>
          <p className="text-gray-300 mt-2"># Capture only HTTP traffic</p>
          <p className="text-[#00FF00]">sudo tshark -i eth0 -f "port 80" -w http_only.pcap</p>
          <p className="text-gray-300 mt-2"># Capture with specific buffer size (useful for long-term captures)</p>
          <p className="text-[#00FF00]">sudo tshark -i eth0 -b filesize:1024 -a files:10 -w capture.pcap</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Detecting Common Security Issues</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-3">1. Identifying Cleartext Passwords</h3>
        <p className="text-gray-300 mb-4">
          Use these filters to spot passwords being transmitted in cleartext:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">http.request.method == "POST" && http contains "password"</p>
          <p className="text-[#00FF00]">ftp</p>
          <p className="text-[#00FF00]">telnet</p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">2. Detecting Port Scans</h3>
        <p className="text-gray-300 mb-4">
          Port scanning activity can be identified by looking for patterns of SYN packets to multiple ports:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">tcp.flags.syn == 1 && tcp.flags.ack == 0</p>
        </div>
        
        <p className="text-gray-300 mb-4">
          Look for a single source IP connecting to multiple destination ports in rapid succession.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">3. DNS Anomalies</h3>
        <p className="text-gray-300 mb-4">
          DNS tunneling and data exfiltration often use unusually long DNS queries:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">dns && dns.qry.name.len {`>`} 50</p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">4. ARP Spoofing Detection</h3>
        <p className="text-gray-300 mb-4">
          ARP spoofing can be detected by looking for duplicated ARP responses:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">arp.duplicate-address-detected || arp.duplicate-address-frame</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Automated Analysis with Tshark Scripts</h2>
        
        <p className="text-gray-300 mb-4">
          For long-term monitoring, you can create scripts to automate analysis. Here's a simple example that
          looks for unusual HTTP user agents:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300">#!/bin/bash</p>
          <p className="text-gray-300"># Save as detect_unusual_agents.sh and make executable with chmod +x</p>
          <p className="text-gray-300"># Extract unusual user agents from a capture file</p>
          <p className="text-[#00FF00]">tshark -r "$1" -Y "http.user_agent" -T fields -e http.user_agent | sort | uniq -c | sort -nr | head -20</p>
        </div>
        
        <p className="text-gray-300 mb-4">
          Run it on your capture file:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-[#00FF00]">./detect_unusual_agents.sh capture.pcap</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Setting Up Continuous Monitoring</h2>
        
        <p className="text-gray-300 mb-4">
          For long-term network monitoring, you can create a service that runs tshark in the background and rotates capture files:
        </p>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># Create a service file</p>
          <p className="text-[#00FF00]">sudo nano /etc/systemd/system/network-monitor.service</p>
          <p className="text-gray-300 mt-2"># Add these contents:</p>
          <p className="text-[#00FF00]">[Unit]</p>
          <p className="text-[#00FF00]">Description=Network traffic monitoring</p>
          <p className="text-[#00FF00]">After=network.target</p>
          <p className="text-[#00FF00]"></p>
          <p className="text-[#00FF00]">[Service]</p>
          <p className="text-[#00FF00]">Type=simple</p>
          <p className="text-[#00FF00]">ExecStart=/usr/bin/tshark -i eth0 -b filesize:51200 -b files:10 -w /path/to/captures/network.pcap</p>
          <p className="text-[#00FF00]">Restart=always</p>
          <p className="text-[#00FF00]"></p>
          <p className="text-[#00FF00]">[Install]</p>
          <p className="text-[#00FF00]">WantedBy=multi-user.target</p>
          <p className="text-gray-300 mt-2"># Enable and start the service</p>
          <p className="text-[#00FF00]">sudo systemctl enable network-monitor.service</p>
          <p className="text-[#00FF00]">sudo systemctl start network-monitor.service</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Analysis of Encrypted Traffic</h2>
        
        <p className="text-gray-300 mb-4">
          While you can't decrypt most encrypted traffic without keys, you can still get valuable insights:
        </p>
        
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
          <li>TLS handshake analysis to identify SSL/TLS versions and cipher suites</li>
          <li>Certificate validation and checking for known malicious certificates</li>
          <li>Flow analysis (sizes and timing of packets can reveal information about the content)</li>
          <li>SNI (Server Name Indication) examination</li>
        </ul>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># Filter for SSL/TLS versions</p>
          <p className="text-[#00FF00]">tls.handshake.version</p>
          <p className="text-gray-300 mt-2"># Extract Server Name Indication</p>
          <p className="text-[#00FF00]">tls.handshake.extensions_server_name</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Case Study: Detecting Data Exfiltration</h2>
        
        <p className="text-gray-300 mb-4">
          Data exfiltration often shows distinct patterns in network traffic. Here's how to detect it:
        </p>
        
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-300">
          <li>Look for large uploads to unusual destinations</li>
          <li>Check for DNS queries with encoded data (unusually long queries)</li>
          <li>Monitor for connections during unusual hours</li>
          <li>Identify periodic, automated connections</li>
        </ol>
        
        <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
          <p className="text-gray-300"># Filter for large TCP packets going outbound</p>
          <p className="text-[#00FF00]">tcp.len {`>`} 1000 && ip.src == 192.168.1.0/24 && !(ip.dst == 192.168.1.0/24)</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
        
        <p className="text-gray-300 mb-4">
          Wireshark and tshark on single-board computers provide powerful, cost-effective tools for network security monitoring.
          By strategically placing these devices in your network and using the filtering techniques described above, you can
          detect many common security issues before they become major problems.
        </p>
        
        <p className="text-gray-300 mb-4">
          Remember that network analysis should be performed only on networks you own or have explicit permission to monitor.
          Unauthorized monitoring is both illegal and unethical.
        </p>
        
        <div className="border-t border-[#00FF00]/20 mt-8 pt-6">
          <h3 className="text-xl font-bold mb-4">Related Resources</h3>
          <ul className="list-disc pl-6 space-y-2 text-[#00FF00]">
            <li><a href="#" className="hover:underline">Setting Up a Raspberry Pi Network IDS</a></li>
            <li><a href="#" className="hover:underline">Wireless Traffic Monitoring with a Pi Zero</a></li>
            <li><a href="#" className="hover:underline">Creating Custom Wireshark Dissectors</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};