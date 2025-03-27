// Color Constants
export const COLORS = {
  hackerGreen: '#00FF00',
  darkGrey: '#1A1A1A',
  nearBlack: '#0D0D0D',
  alertRed: '#FF3E3E',
  infoBlue: '#00C8FF',
};

// Platform Categories
export const HARDWARE_PLATFORMS = [
  { 
    id: 'raspberry-pi', 
    name: 'Raspberry Pi', 
    icon: 'fa-raspberry-pi',
    description: 'Single-board computers perfect for network security testing and monitoring.'
  },
  { 
    id: 'arduino', 
    name: 'Arduino', 
    icon: 'fa-microchip',
    description: 'Microcontroller boards ideal for USB attack platforms and keystroke injection.'
  },
  { 
    id: 'esp32', 
    name: 'ESP32/8266', 
    icon: 'fa-wifi',
    description: 'WiFi-capable microcontrollers for wireless deauthentication and Bluetooth attacks.'
  },
  { 
    id: 'sdr', 
    name: 'SDR Platforms', 
    icon: 'fa-broadcast-tower',
    description: 'Software-defined radio for signal analysis and wireless protocol investigation.'
  }
];

// Security Tools Categories
export const SECURITY_TOOLS = [
  {
    id: 'network-analysis',
    name: 'Network Analysis',
    icon: 'fa-network-wired'
  },
  {
    id: 'password-cracking',
    name: 'Password Cracking',
    icon: 'fa-key'
  },
  {
    id: 'vulnerability-scanning',
    name: 'Vulnerability Scanning',
    icon: 'fa-bug'
  },
  {
    id: 'penetration-testing',
    name: 'Penetration Testing',
    icon: 'fa-shield-alt'
  }
];

// Resources Categories
export const RESOURCES = [
  {
    id: 'documentation',
    name: 'Documentation',
    icon: 'fa-book'
  },
  {
    id: 'hardware-specs',
    name: 'Hardware Specs',
    icon: 'fa-cogs'
  },
  {
    id: 'project-ideas',
    name: 'Project Ideas',
    icon: 'fa-project-diagram'
  }
];

// Learning Paths
export const LEARNING_PATHS = [
  {
    id: 'wireless-network-hacking',
    title: 'Wireless Network Hacking',
    description: 'Learn to identify, exploit, and secure wireless networks using Raspberry Pi and specialized tools.',
    icon: 'fa-wifi',
    badge: 'BEGINNER',
    badgeColor: '#00FF00',
    duration: '10 hours',
    modules: 8,
    color: '#00FF00'
  },
  {
    id: 'rfid-security',
    title: 'RFID Security & Exploitation',
    description: 'Master RFID card cloning, reading, and security assessment using Arduino-based tools.',
    icon: 'fa-shield-alt',
    badge: 'INTERMEDIATE',
    badgeColor: '#00C8FF',
    duration: '15 hours',
    modules: 12,
    color: '#00C8FF'
  },
  {
    id: 'hardware-backdoor',
    title: 'Hardware Backdoor Development',
    description: 'Learn to create and implement hardware-based attack vectors using ESP32 and custom firmware.',
    icon: 'fa-microchip',
    badge: 'ADVANCED',
    badgeColor: '#FF3E3E',
    duration: '20 hours',
    modules: 15,
    color: '#FF3E3E'
  }
];

// Popular Hardware
export const HARDWARE_ITEMS = [
  {
    id: 'raspberry-pi-4',
    name: 'Raspberry Pi 4',
    description: 'Powerful single-board computer perfect for network security testing and monitoring.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    tags: ['Networking', 'Linux', 'WiFi'],
    tagColor: '#00FF00',
    detailLink: '/hardware/raspberry-pi-4'
  },
  {
    id: 'arduino-nano',
    name: 'Arduino Nano',
    description: 'Compact microcontroller ideal for USB attack platforms and keystroke injection.',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    tags: ['USB', 'Social Engineering'],
    tagColor: '#00C8FF',
    detailLink: '/hardware/arduino-nano'
  },
  {
    id: 'esp32',
    name: 'ESP32',
    description: 'WiFi-capable microcontroller for wireless deauthentication and Bluetooth attacks.',
    image: 'https://images.unsplash.com/photo-1649859398021-afbfe80e83b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    tags: ['WiFi', 'Bluetooth'],
    tagColor: '#00FF00',
    detailLink: '/hardware/esp32'
  },
  {
    id: 'rtl-sdr',
    name: 'RTL-SDR',
    description: 'Software-defined radio for signal analysis and wireless protocol investigation.',
    image: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    tags: ['Radio', 'Signal Analysis'],
    tagColor: '#FF3E3E',
    detailLink: '/hardware/rtl-sdr'
  }
];

// Security Tools
export const SECURITY_TOOL_ITEMS = [
  {
    id: 'aircrack-ng',
    name: 'Aircrack-ng',
    description: 'Complete suite for WiFi network security assessment, including packet capture and cracking tools.',
    icon: 'fa-wifi',
    tags: ['WiFi', 'WPA/WPA2'],
    tagColor: '#00FF00',
    command: 'sudo airmon-ng start wlan0\nsudo airodump-ng wlan0mon',
    docLink: '/tools/aircrack-ng'
  },
  {
    id: 'kismet',
    name: 'Kismet',
    description: 'Wireless network detector, sniffer, and IDS system using a Raspberry Pi as a remote sensor.',
    icon: 'fa-eye',
    tags: ['Monitoring', 'IDS'],
    tagColor: '#00C8FF',
    command: 'sudo kismet -c wlan0\n# Access dashboard at http://localhost:2501',
    docLink: '/tools/kismet'
  }
];

// Hardware Compatibility Matrix
export const HARDWARE_COMPATIBILITY = [
  {
    hardware: 'Raspberry Pi 4',
    networkAttack: true,
    rfidCloning: true,
    keylogger: true,
    sdr: true,
    wifiHacking: true
  },
  {
    hardware: 'Arduino Nano',
    networkAttack: false,
    rfidCloning: true,
    keylogger: true,
    sdr: false,
    wifiHacking: false
  },
  {
    hardware: 'ESP32',
    networkAttack: true,
    rfidCloning: false,
    keylogger: true,
    sdr: false,
    wifiHacking: true
  },
  {
    hardware: 'RTL-SDR',
    networkAttack: false,
    rfidCloning: false,
    keylogger: false,
    sdr: true,
    wifiHacking: true
  },
  {
    hardware: 'Pi Zero W',
    networkAttack: true,
    rfidCloning: true,
    keylogger: true,
    sdr: false,
    wifiHacking: true
  }
];

// Community Projects
export const COMMUNITY_PROJECTS = [
  {
    id: 'pi-pineapple',
    title: 'Pi-Pineapple',
    description: 'A DIY WiFi Pineapple alternative built with Raspberry Pi and custom scripts.',
    image: 'https://images.unsplash.com/photo-1580324481967-8f14f489d203?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    tag: 'WiFi',
    tagColor: '#00FF00',
    author: {
      username: '@h4x0r_1337',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    stars: 156
  },
  {
    id: 'proximity-clone',
    title: 'ProximityClone',
    description: 'Arduino-based RFID cloning device with custom 3D-printed enclosure.',
    image: 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    tag: 'RFID',
    tagColor: '#00C8FF',
    author: {
      username: '@security_jen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    stars: 89
  },
  {
    id: 'net-sentinel',
    title: 'NetSentinel',
    description: 'ESP32-based network intrusion detection system with mobile notifications.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    tag: 'IDS',
    tagColor: '#FF3E3E',
    author: {
      username: '@net_ninja',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    stars: 203
  }
];

// Featured Tutorial
export const FEATURED_TUTORIAL = {
  id: 'rogue-access-point',
  title: 'Building a Rogue Access Point with Raspberry Pi',
  description: 'Learn how to set up a WiFi honeypot for network security testing and demonstration of man-in-the-middle attacks using a Raspberry Pi.',
  image: 'https://images.unsplash.com/photo-1580712446147-0ef08402a81b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  badge: 'ADVANCED',
  badgeColor: '#FF3E3E',
  updatedDate: '2 days ago',
  learningPoints: [
    'Configure wireless interfaces in monitor mode',
    'Set up DHCP and DNS spoofing',
    'Implement transparent SSL proxying',
    'Analyze captured network traffic'
  ],
  duration: '2.5 hours',
  level: 'Advanced',
  platform: 'Raspberry Pi'
};
