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

// Enhanced Hardware Compatibility for Pentesting
export interface PentestHardware {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  features: string[];
  performance: {
    cpuPerformance: number;
    memory: number;
    portability: number;
    batteryLife: number;
    wirelessCapability: number;
  };
}

export interface PentestTask {
  id: string;
  name: string;
  icon: string;
  description: string;
  recommendedHardware: string[];
  compatibilityNotes: {
    [key: string]: {
      rating: number;
      notes: string;
    };
  };
  requiredAccessories?: string[];
}

export const PENTEST_HARDWARE: PentestHardware[] = [
  {
    id: 'raspberry-pi-4',
    name: 'Raspberry Pi 4 (8GB)',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    description: 'Powerful single-board computer with quad-core CPU and excellent connectivity options.',
    price: '$75-$95',
    features: [
      'Quad-core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz',
      '8GB LPDDR4-3200 SDRAM',
      '2.4 GHz and 5.0 GHz IEEE 802.11ac wireless',
      'Bluetooth 5.0, BLE',
      'Gigabit Ethernet',
      '2 × USB 3.0 and 2 × USB 2.0 ports'
    ],
    performance: {
      cpuPerformance: 8,
      memory: 9,
      portability: 6,
      batteryLife: 4,
      wirelessCapability: 8
    }
  },
  {
    id: 'pi-zero-w',
    name: 'Raspberry Pi Zero W',
    image: 'https://images.unsplash.com/photo-1590741538536-7691a9f0dbba?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    description: 'Ultra-compact, low-power Raspberry Pi perfect for covert deployments.',
    price: '$15-$25',
    features: [
      'Single-core CPU @ 1GHz',
      '512MB RAM',
      '2.4GHz 802.11n wireless LAN',
      'Bluetooth 4.1',
      'Mini HDMI port',
      'Micro USB OTG port'
    ],
    performance: {
      cpuPerformance: 3,
      memory: 3,
      portability: 10,
      batteryLife: 8,
      wirelessCapability: 6
    }
  },
  {
    id: 'esp32',
    name: 'ESP32 DevKit',
    image: 'https://images.unsplash.com/photo-1649859398021-afbfe80e83b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    description: 'Low-cost Wi-Fi & Bluetooth combo chip with high integration and low-power capabilities.',
    price: '$5-$15',
    features: [
      'Dual-core Tensilica Xtensa LX6 microprocessor',
      '520 KB SRAM',
      '2.4 GHz Wi-Fi + Bluetooth/BLE',
      'Ultra-low power consumption',
      '36+ GPIOs',
      'Hardware acceleration for cryptography'
    ],
    performance: {
      cpuPerformance: 4,
      memory: 2,
      portability: 9,
      batteryLife: 9,
      wirelessCapability: 7
    }
  },
  {
    id: 'arduino-nano',
    name: 'Arduino Nano',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    description: 'Compact microcontroller perfect for USB-based attacks and hardware interaction.',
    price: '$5-$20',
    features: [
      'ATmega328P microcontroller',
      '16 MHz clock speed',
      '32 KB Flash memory',
      '2 KB SRAM',
      'USB connectivity',
      'Small form factor (18mm × 45mm)'
    ],
    performance: {
      cpuPerformance: 2,
      memory: 1,
      portability: 10,
      batteryLife: 10,
      wirelessCapability: 0
    }
  },
  {
    id: 'rtl-sdr',
    name: 'RTL-SDR',
    image: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    description: 'Software-defined radio receiver for signal analysis and wireless security testing.',
    price: '$25-$40',
    features: [
      'RTL2832U chipset',
      'Frequency range: 500 kHz to 1.75 GHz',
      'USB 2.0 interface',
      'Tuner options: R820T2 or E4000',
      'Sample rate up to 3.2 MS/s',
      'Requires host computer for processing'
    ],
    performance: {
      cpuPerformance: 0, // Depends on host
      memory: 0, // Depends on host
      portability: 7,
      batteryLife: 0, // Powered by host
      wirelessCapability: 9
    }
  },
  {
    id: 'wifi-pineapple',
    name: 'WiFi Pineapple Mark VII',
    image: 'https://images.unsplash.com/photo-1551703599-2a4d0dc6b260?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    description: 'Purpose-built rogue access point for advanced wireless penetration testing.',
    price: '$180-$220',
    features: [
      'Dual-band (2.4 & 5GHz) wireless radio',
      'Mediatek MT7612E chipset',
      'Modular design with expansion support',
      'WAN/LAN interface with Gigabit Ethernet',
      'Intuitive dashboard and API',
      'Compact field-deployment design'
    ],
    performance: {
      cpuPerformance: 6,
      memory: 6,
      portability: 7,
      batteryLife: 6,
      wirelessCapability: 10
    }
  },
  {
    id: 'proxmark3',
    name: 'Proxmark3 RDV4',
    image: 'https://images.unsplash.com/photo-1580437078244-4a758db2634b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    description: 'RFID swiss-army knife perfect for testing and cloning a wide range of RFID technologies.',
    price: '$350-$400',
    features: [
      'ARM processor with 512KB ROM',
      'Support for LF (125-134kHz) and HF (13.56MHz) RFID',
      'USB or Bluetooth connectivity',
      'Field-proven RFID attack capabilities',
      'Swappable antennas',
      'Built-in lithium-ion battery'
    ],
    performance: {
      cpuPerformance: 5,
      memory: 4,
      portability: 8,
      batteryLife: 7,
      wirelessCapability: 4
    }
  }
];

export const PENTEST_TASKS: PentestTask[] = [
  {
    id: 'wifi-audit',
    name: 'WiFi Network Auditing',
    icon: 'fa-wifi',
    description: 'Assess WiFi networks for vulnerabilities including WEP/WPA/WPA2 weaknesses, rogue APs, and deauthentication attacks.',
    recommendedHardware: ['raspberry-pi-4', 'wifi-pineapple', 'pi-zero-w'],
    compatibilityNotes: {
      'raspberry-pi-4': {
        rating: 9,
        notes: 'Excellent performance with external WiFi adapter. Can run Aircrack-ng, Kismet, and Wireshark simultaneously.'
      },
      'pi-zero-w': {
        rating: 7,
        notes: 'Good for portable deployments but limited by processing power for real-time cracking.'
      },
      'esp32': {
        rating: 5,
        notes: 'Limited to deauthentication attacks and basic reconnaissance, but very power efficient.'
      },
      'arduino-nano': {
        rating: 1,
        notes: 'Not suitable without WiFi capabilities.'
      },
      'rtl-sdr': {
        rating: 6,
        notes: 'Good for passive WiFi monitoring but requires host computer for analysis.'
      },
      'wifi-pineapple': {
        rating: 10,
        notes: 'Purpose-built for WiFi auditing with excellent module support and dual-band operation.'
      },
      'proxmark3': {
        rating: 0,
        notes: 'Not designed for WiFi tasks.'
      }
    },
    requiredAccessories: ['Monitor-mode compatible WiFi adapter', 'High-gain antennas', 'Portable power']
  },
  {
    id: 'rfid-analysis',
    name: 'RFID Security Testing',
    icon: 'fa-id-card',
    description: 'Test, clone, and analyze RFID/NFC cards and systems for security vulnerabilities.',
    recommendedHardware: ['proxmark3', 'arduino-nano', 'raspberry-pi-4'],
    compatibilityNotes: {
      'raspberry-pi-4': {
        rating: 7,
        notes: 'Good with suitable RFID reader modules. Can run analysis software and databases.'
      },
      'pi-zero-w': {
        rating: 6,
        notes: 'Adequate for field deployment with limited processing capabilities.'
      },
      'esp32': {
        rating: 3,
        notes: 'Can be used for basic RFID reading with appropriate hardware, but limited analysis.'
      },
      'arduino-nano': {
        rating: 8,
        notes: 'Excellent for building custom RFID readers/emulators with MFRC522 module.'
      },
      'rtl-sdr': {
        rating: 1,
        notes: 'Not designed for RFID frequencies without significant modification.'
      },
      'wifi-pineapple': {
        rating: 0,
        notes: 'Not applicable for RFID work.'
      },
      'proxmark3': {
        rating: 10,
        notes: 'Purpose-built for RFID security assessment with comprehensive tag support.'
      }
    },
    requiredAccessories: ['RFID/NFC reader modules', 'Sample tags for testing']
  },
  {
    id: 'network-pentest',
    name: 'Network Penetration Testing',
    icon: 'fa-network-wired',
    description: 'Conduct comprehensive network security assessments including scanning, enumeration, and exploitation.',
    recommendedHardware: ['raspberry-pi-4', 'pi-zero-w'],
    compatibilityNotes: {
      'raspberry-pi-4': {
        rating: 9,
        notes: 'Excellent platform for running Metasploit, Nmap, and other network testing tools.'
      },
      'pi-zero-w': {
        rating: 6,
        notes: 'Suitable for basic tests and deployment scenarios requiring stealth, limited by processing power.'
      },
      'esp32': {
        rating: 3,
        notes: 'Limited to basic network scanning with custom firmware.'
      },
      'arduino-nano': {
        rating: 1,
        notes: 'Very limited network capabilities, not recommended.'
      },
      'rtl-sdr': {
        rating: 0,
        notes: 'Not applicable for traditional network pentesting.'
      },
      'wifi-pineapple': {
        rating: 7,
        notes: 'Good for wireless network testing with some general network assessment capabilities.'
      },
      'proxmark3': {
        rating: 0,
        notes: 'Not designed for network penetration testing.'
      }
    },
    requiredAccessories: ['Ethernet adapters', 'USB hubs', 'Additional storage']
  },
  {
    id: 'hardware-implants',
    name: 'Hardware Implants & Dropboxes',
    icon: 'fa-microchip',
    description: 'Create covert hardware devices for physical penetration testing and data exfiltration.',
    recommendedHardware: ['pi-zero-w', 'esp32', 'arduino-nano'],
    compatibilityNotes: {
      'raspberry-pi-4': {
        rating: 5,
        notes: 'Powerful but larger size makes it less suitable for covert deployment.'
      },
      'pi-zero-w': {
        rating: 10,
        notes: 'Perfect balance of capability and small form factor for implants.'
      },
      'esp32': {
        rating: 9,
        notes: 'Excellent for wireless implants with low power requirements.'
      },
      'arduino-nano': {
        rating: 8,
        notes: 'Ideal for USB-based implants like keyboard emulators.'
      },
      'rtl-sdr': {
        rating: 3,
        notes: 'Limited use as a standalone implant, but can be part of a signal intelligence solution.'
      },
      'wifi-pineapple': {
        rating: 4,
        notes: 'Too recognizable and power-hungry for most covert deployments.'
      },
      'proxmark3': {
        rating: 3,
        notes: 'Specialized for RFID, not general implant usage.'
      }
    },
    requiredAccessories: ['Compact enclosures', 'Battery packs', 'Custom PCBs']
  },
  {
    id: 'sdr-signals',
    name: 'SDR Signal Analysis',
    icon: 'fa-broadcast-tower',
    description: 'Analyze and decode RF signals for security testing of wireless protocols and devices.',
    recommendedHardware: ['rtl-sdr', 'raspberry-pi-4'],
    compatibilityNotes: {
      'raspberry-pi-4': {
        rating: 7,
        notes: 'Good host platform for SDR software, though some complex demodulation may be CPU-intensive.'
      },
      'pi-zero-w': {
        rating: 3,
        notes: 'Can act as a remote SDR server, but limited processing power for analysis.'
      },
      'esp32': {
        rating: 2,
        notes: 'Very limited SDR capabilities, but can be used for specific frequency monitoring.'
      },
      'arduino-nano': {
        rating: 1,
        notes: 'Extremely limited for SDR applications.'
      },
      'rtl-sdr': {
        rating: 10,
        notes: 'Purpose-built for SDR with excellent frequency coverage for the price.'
      },
      'wifi-pineapple': {
        rating: 2,
        notes: 'Not designed for general SDR applications.'
      },
      'proxmark3': {
        rating: 4,
        notes: 'Specialized for RFID frequencies, not general SDR usage.'
      }
    },
    requiredAccessories: ['Antennas tuned to frequencies of interest', 'RF filters', 'Low-noise amplifiers']
  },
  {
    id: 'social-engineering',
    name: 'Social Engineering Attacks',
    icon: 'fa-user-secret',
    description: 'Execute technical aspects of social engineering including phishing, evil twin, and USB drop attacks.',
    recommendedHardware: ['raspberry-pi-4', 'wifi-pineapple', 'arduino-nano'],
    compatibilityNotes: {
      'raspberry-pi-4': {
        rating: 9,
        notes: 'Excellent for hosting phishing servers, fake portals, and credential harvesting.'
      },
      'pi-zero-w': {
        rating: 8,
        notes: 'Perfect for USB "drop" attacks when configured as HID devices.'
      },
      'esp32': {
        rating: 6,
        notes: 'Good for wireless-based social engineering with custom firmware.'
      },
      'arduino-nano': {
        rating: 8,
        notes: 'Excellent for USB HID attacks like keystroke injection.'
      },
      'rtl-sdr': {
        rating: 2,
        notes: 'Limited use in social engineering scenarios.'
      },
      'wifi-pineapple': {
        rating: 10,
        notes: 'Purpose-built for evil twin and captive portal attacks.'
      },
      'proxmark3': {
        rating: 5,
        notes: 'Useful for cloning access cards in physical social engineering.'
      }
    },
    requiredAccessories: ['Rubber Ducky', 'Customized enclosures', 'Mobile power']
  },
  {
    id: 'password-attacks',
    name: 'Password Cracking & Analysis',
    icon: 'fa-key',
    description: 'Perform password recovery, hash cracking, and credential security analysis.',
    recommendedHardware: ['raspberry-pi-4'],
    compatibilityNotes: {
      'raspberry-pi-4': {
        rating: 7,
        notes: 'Good for hashcat with OpenCL support, though limited compared to desktop GPUs.'
      },
      'pi-zero-w': {
        rating: 3,
        notes: 'Very limited cracking capabilities due to processing constraints.'
      },
      'esp32': {
        rating: 2,
        notes: 'Can run basic dictionary attacks but very slow.'
      },
      'arduino-nano': {
        rating: 1,
        notes: 'Not suitable for password cracking.'
      },
      'rtl-sdr': {
        rating: 0,
        notes: 'Not applicable for password attacks.'
      },
      'wifi-pineapple': {
        rating: 4,
        notes: 'Can capture handshakes but limited cracking capability.'
      },
      'proxmark3': {
        rating: 6,
        notes: 'Specialized for RFID key recovery, not general password cracking.'
      }
    },
    requiredAccessories: ['External storage for wordlists', 'Cooling solutions', 'Possible GPU acceleration']
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
