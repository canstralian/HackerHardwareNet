import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Sidebar from '@/components/sidebar';
import { RESOURCES } from '@/lib/constants';
import { Article1Content, Article2Content } from '@/components/article-templates';
import { useQuery } from '@tanstack/react-query';

// Interface for database article type
interface Article {
  id: number;
  title: string;
  content: string;
  preview: string;
  category: string;
  imageUrl: string;
  authorId: number | null;
  publishedAt: string;
  readTime: string;
  tags: string[];
  relatedArticleIds: number[] | null;
  views: number;
}

// Legacy interface for mock data
interface ArticlePreview {
  id: string;
  title: string;
  category: string;
  preview: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

const MOCK_ARTICLES: { [key: string]: ArticlePreview[] } = {
  'documentation': [
    {
      id: 'article-1',
      title: 'Getting Started with Raspberry Pi for Cybersecurity',
      category: 'documentation',
      preview: 'A comprehensive guide to setting up your Raspberry Pi as a cybersecurity tool for beginners.',
      author: 'Sarah Johnson',
      date: 'March 25, 2023',
      readTime: '12 min read',
      tags: ['Raspberry Pi', 'Beginners', 'Setup']
    },
    {
      id: 'article-2',
      title: 'Advanced Network Traffic Analysis with Wireshark',
      category: 'documentation',
      preview: 'Learn how to use Wireshark on single board computers to detect and analyze suspicious network traffic.',
      author: 'Michael Chen',
      date: 'February 10, 2023',
      readTime: '15 min read',
      tags: ['Network Analysis', 'Wireshark', 'Advanced']
    }
  ],
  'hardware-specs': [
    {
      id: 'oled-article',
      title: 'Running a 0.96" OLED Display on Your Orange Pi Zero 2W and Raspberry Pi Zero 2W',
      category: 'hardware-specs',
      preview: 'Learn how to connect and program a 0.96" OLED display with the SSD1306 driver on both Orange Pi and Raspberry Pi boards.',
      author: 'HackerBoard Team',
      date: 'April 14, 2025',
      readTime: '15 min read',
      tags: ['Orange Pi', 'Raspberry Pi', 'OLED', 'I2C', 'Python']
    },
    {
      id: 'specs-pi4',
      title: 'Raspberry Pi 4 Technical Specifications',
      category: 'hardware-specs',
      preview: 'Detailed hardware specifications and performance benchmarks for the Raspberry Pi 4 Model B.',
      author: 'Alex Rodriguez',
      date: 'January 5, 2023',
      readTime: '8 min read',
      tags: ['Raspberry Pi', 'Hardware', 'Specifications']
    },
    {
      id: 'specs-arduino',
      title: 'Arduino Boards Comparison for Security Projects',
      category: 'hardware-specs',
      preview: 'A comparative analysis of different Arduino boards and their suitability for various security projects.',
      author: 'Emily Wong',
      date: 'December 18, 2022',
      readTime: '10 min read',
      tags: ['Arduino', 'Comparison', 'Security']
    }
  ],
  'project-ideas': [
    {
      id: 'project-wardrive',
      title: 'Building a Wardriving Setup with Raspberry Pi',
      category: 'project-ideas',
      preview: 'Step-by-step guide to creating a portable wardriving setup for WiFi mapping and security analysis.',
      author: 'David Smith',
      date: 'March 15, 2023',
      readTime: '20 min read',
      tags: ['Wardriving', 'WiFi', 'Project']
    },
    {
      id: 'project-keylogger',
      title: 'Creating a Hardware Keylogger with Arduino',
      category: 'project-ideas',
      preview: 'Learn how to build a USB hardware keylogger for testing physical security vulnerabilities.',
      author: 'Lisa Hammond',
      date: 'February 28, 2023',
      readTime: '18 min read',
      tags: ['Keylogger', 'Arduino', 'USB Security']
    },
    {
      id: 'security-analysis',
      title: 'Security and Performance Analysis of HackerHardware.net',
      category: 'project-ideas',
      preview: 'A comprehensive assessment of the security posture and performance of the HackerHardware.net platform.',
      author: 'Security Team',
      date: 'April 2, 2025',
      readTime: '10 min read',
      tags: ['Security Analysis', 'Performance', 'Web Security']
    }
  ]
};

const Resources = () => {
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>('documentation');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  // Fetch all articles
  const { data: articles, isLoading: isLoadingArticles } = useQuery<Article[]>({ 
    queryKey: ['/api/articles'],
    enabled: !selectedArticleId, // Only fetch all articles when not viewing a single article
  });

  // Fetch single article with ID when viewing a specific article
  const { data: article, isLoading: isLoadingArticle } = useQuery<Article>({ 
    queryKey: ['/api/articles', selectedArticleId], 
    queryFn: () => 
      fetch(`/api/articles/${selectedArticleId}`).then(res => res.json()),
    enabled: !!selectedArticleId, // Only fetch when selectedArticleId is not null
  });

  useEffect(() => {
    // Get type from URL query parameter
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type && Object.keys(MOCK_ARTICLES).includes(type)) {
      setActiveCategory(type);
    }
  }, [location]);

  // Handle article selection
  const handleArticleSelect = (articleId: number) => {
    setSelectedArticleId(articleId);
    setSelectedArticle(`article-${articleId}`); // For legacy compatibility
  };

  // Go back to article listing
  const handleBackToListing = () => {
    setSelectedArticleId(null);
    setSelectedArticle(null);
  };

  // Group articles by category
  const articlesByCategory = articles?.reduce((acc: Record<string, Article[]>, article) => {
    const category = article.category.toLowerCase().replace(/\s+/g, '-');
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {}) || {};

  const categoryName = RESOURCES.find(r => r.id === activeCategory)?.name || 'Documentation';

  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-12">
        <div className="container mx-auto px-4 py-8">
          {!selectedArticle ? (
            // Resource category listing
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-mono font-bold mb-2">
                  <span className="text-[#00FF00]">#</span> {categoryName}
                </h1>
                <p className="text-gray-300">
                  Browse our collection of articles, guides, and resources for cybersecurity hardware enthusiasts.
                </p>
              </div>

              <div className="flex mb-6 border-b border-[#00FF00]/20">
                {RESOURCES.map((category) => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 font-medium ${activeCategory === category.id ? 'text-[#00FF00] border-b-2 border-[#00FF00]' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <i className={`fas ${category.icon} mr-2`}></i>
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {isLoadingArticles ? (
                  // Loading skeleton
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-6 animate-pulse">
                      <div className="h-7 bg-gray-700 rounded mb-3 w-3/4"></div>
                      <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-700 rounded mb-4 w-5/6"></div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-700 rounded w-1/6"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-5 bg-gray-700 rounded w-16"></div>
                        <div className="h-5 bg-gray-700 rounded w-20"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Show API articles if available, otherwise show mock data
                  (articlesByCategory[activeCategory]?.length > 0 ? 
                    articlesByCategory[activeCategory]?.map((article) => (
                      <div 
                        key={article.id} 
                        className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-6 hover:border-[#00FF00]/50 transition-colors cursor-pointer"
                        onClick={() => handleArticleSelect(article.id)}
                      >
                        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                        <p className="text-gray-300 mb-4">{article.preview}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">
                            <span>{article.authorId ? `Author #${article.authorId}` : 'Anonymous'}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <span className="text-sm bg-[#1A1A1A] border border-[#00FF00]/30 px-2 py-1 rounded text-[#00FF00]">{article.readTime}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-[#00FF00]/10 text-[#00FF00] rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )) : 
                    // Fallback to mock data
                    MOCK_ARTICLES[activeCategory]?.map((article) => (
                      <div 
                        key={article.id} 
                        className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-6 hover:border-[#00FF00]/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedArticle(article.id)}
                      >
                        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                        <p className="text-gray-300 mb-4">{article.preview}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">
                            <span>{article.author}</span>
                            <span className="mx-2">•</span>
                            <span>{article.date}</span>
                          </div>
                          <span className="text-sm bg-[#1A1A1A] border border-[#00FF00]/30 px-2 py-1 rounded text-[#00FF00]">{article.readTime}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-[#00FF00]/10 text-[#00FF00] rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )
                )}
              </div>
            </>
          ) : (
            // Article view
            <div className="article-container">
              <button 
                className="mb-6 flex items-center text-[#00FF00] hover:underline"
                onClick={() => handleBackToListing()}
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to {categoryName}
              </button>
              
              {/* Display database article if one is selected */}
              {selectedArticleId && article ? (
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-8">
                  <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#00FF00]/20 mr-3"></div>
                    <div>
                      <p className="font-medium">{article.authorId ? `Author #${article.authorId}` : 'Anonymous'}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(article.publishedAt).toLocaleDateString()} • {article.readTime}
                        {article.views > 0 && ` • ${article.views} view${article.views > 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    {/* Format Markdown content */}
                    {article.content.split('\n\n').map((paragraph, idx) => {
                      // Handle headings
                      if (paragraph.startsWith('# ')) {
                        return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>;
                      } else if (paragraph.startsWith('## ')) {
                        return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{paragraph.substring(3)}</h2>;
                      } else if (paragraph.startsWith('### ')) {
                        return <h3 key={idx} className="text-xl font-bold mt-6 mb-3">{paragraph.substring(4)}</h3>;
                      } 
                      
                      // Handle lists
                      else if (paragraph.includes('\n- ')) {
                        const [listTitle, ...items] = paragraph.split('\n- ');
                        return (
                          <div key={idx} className="my-4">
                            {listTitle && <p className="text-gray-300 mb-2">{listTitle}</p>}
                            <ul className="list-disc pl-6 space-y-1 text-gray-300">
                              {items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      
                      // Regular paragraphs
                      else {
                        return <p key={idx} className="text-gray-300 mb-4">{paragraph}</p>;
                      }
                    })}
                    
                    {/* Tags section */}
                    <div className="mt-8 pt-6 border-t border-[#00FF00]/20">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-[#00FF00]/10 text-[#00FF00] rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : isLoadingArticle ? (
                // Loading state for article
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-8 animate-pulse">
                  <div className="h-10 bg-gray-700 rounded mb-8 w-3/4"></div>
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-gray-700 mr-3"></div>
                    <div className="w-1/3">
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ) : null}
              
              {/* Legacy articles */}
              {selectedArticle === 'article-1' && <Article1Content />}
              {selectedArticle === 'article-2' && <Article2Content />}
              {selectedArticle === 'specs-pi4' && (
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-8">
                  <h1 className="text-3xl font-bold mb-4">Raspberry Pi 4 Technical Specifications</h1>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#00FF00]/20 mr-3"></div>
                    <div>
                      <p className="font-medium">Alex Rodriguez</p>
                      <p className="text-sm text-gray-400">January 5, 2023 • 8 min read</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-4">
                      The Raspberry Pi 4 Model B is the latest iteration of the popular single-board computer series,
                      offering significantly upgraded performance and capabilities compared to its predecessors. This
                      document provides a comprehensive overview of its technical specifications and performance
                      characteristics for cybersecurity applications.
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Hardware Specifications</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[#0D0D0D] p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-[#00FF00]">Processor</h3>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                          <li>Broadcom BCM2711 SoC</li>
                          <li>Quad-core Cortex-A72 (ARM v8) 64-bit</li>
                          <li>1.5GHz clock speed</li>
                          <li>VideoCore VI GPU @ 500MHz</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[#0D0D0D] p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-[#00FF00]">Memory</h3>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                          <li>1GB, 2GB, 4GB or 8GB LPDDR4-3200 SDRAM</li>
                          <li>Significant improvement over LPDDR2 in Pi 3</li>
                          <li>Dual-channel memory configuration</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[#0D0D0D] p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-[#00FF00]">Connectivity</h3>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                          <li>2.4 GHz and 5.0 GHz IEEE 802.11ac wireless</li>
                          <li>Bluetooth 5.0, BLE</li>
                          <li>Gigabit Ethernet (actual throughput ~600 Mbps)</li>
                          <li>2 × USB 3.0 ports (theoretical max 5 Gbps)</li>
                          <li>2 × USB 2.0 ports</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[#0D0D0D] p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-[#00FF00]">Display & Graphics</h3>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                          <li>2 × micro-HDMI ports (up to 4kp60 supported)</li>
                          <li>2-lane MIPI DSI display port</li>
                          <li>2-lane MIPI CSI camera port</li>
                          <li>OpenGL ES 3.0 graphics</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Performance Benchmarks</h2>
                    
                    <p className="text-gray-300 mb-4">
                      For cybersecurity applications, processing power and I/O performance are critical. Here are some
                      benchmarks specifically relevant to security tasks:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold mb-4 text-[#00FF00]">Network Security Performance</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left border-b border-[#00FF00]/20">Test</th>
                              <th className="px-4 py-2 text-left border-b border-[#00FF00]/20">Result</th>
                              <th className="px-4 py-2 text-left border-b border-[#00FF00]/20">Comparison to Pi 3</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">IDS packet processing (Suricata)</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">~85 Mbps with full rule set</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">3.2× faster</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">OpenVPN throughput</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">~105 Mbps (AES-256-GCM)</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">2.8× faster</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">WireGuard throughput</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">~280 Mbps</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">3.5× faster</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">WiFi packet capture (monitor mode)</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">Stable up to 70 Mbps</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">2.3× faster</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="bg-[#0D0D0D] p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold mb-4 text-[#00FF00]">Cryptographic Performance</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left border-b border-[#00FF00]/20">Algorithm</th>
                              <th className="px-4 py-2 text-left border-b border-[#00FF00]/20">Speed (8GB model)</th>
                              <th className="px-4 py-2 text-left border-b border-[#00FF00]/20">Comparison to Pi 3</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">AES-256-CBC (OpenSSL)</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">86 MB/s</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">4.1× faster</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">SHA-256</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">114 MB/s</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">3.8× faster</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">RSA-2048 sign</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">45 signs/s</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">2.9× faster</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">RSA-2048 verify</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">1,420 verifies/s</td>
                              <td className="px-4 py-2 border-b border-[#00FF00]/10">3.2× faster</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Power Consumption</h2>
                    
                    <p className="text-gray-300 mb-4">
                      Power consumption is important for field deployments and battery-powered security applications:
                    </p>
                    
                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full bg-[#0D0D0D] rounded-lg overflow-hidden">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-[#00FF00]">State</th>
                            <th className="px-4 py-3 text-left text-[#00FF00]">Power Draw (8GB model)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">Idle, headless</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">~2.7W</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">Light usage (SSH, basic tasks)</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">~3.4W</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">CPU stress test (all cores)</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">~6.4W</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">CPU + Ethernet + USB activity</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">~7.6W</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Maximum observed</td>
                            <td className="px-4 py-2">~8.5W</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-yellow-900/20 border border-yellow-700 p-4 rounded-lg mb-6">
                      <h3 className="text-lg font-bold mb-2 text-yellow-500">Important Note on Power Supply</h3>
                      <p className="text-gray-300">
                        The Pi 4 requires a 5.1V, 3A power supply with USB-C connector. Using inadequate power 
                        supplies can cause instability, especially when using USB peripherals like wireless adapters
                        necessary for security applications.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Thermal Considerations</h2>
                    
                    <p className="text-gray-300 mb-4">
                      The Raspberry Pi 4 runs significantly hotter than previous models due to its increased performance:
                    </p>
                    
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
                      <li>Idle temperature: ~50°C with passive cooling</li>
                      <li>Under load: can reach 80°C+ without cooling</li>
                      <li>Thermal throttling begins at 80°C</li>
                      <li>For security applications with sustained CPU usage, active cooling is <span className="text-[#00FF00] font-semibold">strongly recommended</span></li>
                    </ul>
                    
                    <p className="text-gray-300 mb-4">
                      With an appropriate heatsink and fan, temperatures can be maintained below 55°C even under full load,
                      ensuring consistent performance for intensive security applications.
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Compatibility with Security Tools</h2>
                    
                    <p className="text-gray-300 mb-4">
                      The Pi 4's ARMv8 architecture and increased resources provide excellent compatibility with most security tools:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#0D0D0D] p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2 text-[#00FF00]">Highly Compatible</h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                          <li>Kali Linux ARM</li>
                          <li>Parrot OS Security</li>
                          <li>Wireshark / tshark</li>
                          <li>Aircrack-ng suite</li>
                          <li>Metasploit Framework</li>
                          <li>Nmap</li>
                          <li>OpenVAS</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[#0D0D0D] p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2 text-[#00FF00]">Performance Limited</h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                          <li>Full Suricata IDS with large ruleset</li>
                          <li>Large Elastic Stack deployments</li>
                          <li>CPU-intensive password cracking</li>
                          <li>Multiple concurrent VMs/containers</li>
                          <li>Complex OSINT tools with web scraping</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Storage Performance</h2>
                    
                    <p className="text-gray-300 mb-4">
                      Storage speed is crucial for packet capture and log analysis:
                    </p>
                    
                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full bg-[#0D0D0D] rounded-lg overflow-hidden">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-[#00FF00]">Storage Type</th>
                            <th className="px-4 py-3 text-left text-[#00FF00]">Sequential Read</th>
                            <th className="px-4 py-3 text-left text-[#00FF00]">Sequential Write</th>
                            <th className="px-4 py-3 text-left text-[#00FF00]">Random 4K Read</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">Class 10 MicroSD</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">45 MB/s</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">10 MB/s</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">~3 MB/s</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">UHS-I MicroSD (A1)</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">90 MB/s</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">40 MB/s</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">~10 MB/s</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">USB 3.0 SSD</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">350 MB/s</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">300 MB/s</td>
                            <td className="px-4 py-2 border-b border-[#00FF00]/10">~25 MB/s</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">USB 3.0 NVMe (in enclosure)</td>
                            <td className="px-4 py-2">400 MB/s</td>
                            <td className="px-4 py-2">350 MB/s</td>
                            <td className="px-4 py-2">~35 MB/s</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-[#00FF00]/10 border border-[#00FF00]/30 p-4 rounded-lg mb-6">
                      <h3 className="text-lg font-bold mb-2 text-[#00FF00]">Recommendation for Security Applications</h3>
                      <p className="text-gray-300">
                        For security applications involving packet capture, database operations, or log analysis, 
                        using a USB 3.0 SSD is <strong>strongly recommended</strong> over SD card storage. This provides:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-1">
                        <li>Higher sustained write speeds for packet capture</li>
                        <li>Better durability under continuous write operations</li>
                        <li>Improved database performance</li>
                        <li>Reduced risk of data corruption</li>
                      </ul>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                    
                    <p className="text-gray-300 mb-4">
                      The Raspberry Pi 4, especially the 8GB model, represents a significant advancement in single-board
                      computing for cybersecurity applications. With proper cooling and USB 3.0 SSD storage, it can handle
                      most security tasks previously requiring much more expensive hardware.
                    </p>
                    
                    <p className="text-gray-300 mb-4">
                      For field deployments, portable security applications, and educational purposes, the Pi 4 offers an
                      excellent balance of performance, power efficiency, and cost-effectiveness.
                    </p>
                    
                    <div className="border-t border-[#00FF00]/20 mt-8 pt-6">
                      <h3 className="text-xl font-bold mb-4">Related Resources</h3>
                      <ul className="list-disc pl-6 space-y-2 text-[#00FF00]">
                        <li><a href="#" className="hover:underline">Optimizing Raspberry Pi 4 for Network Security Monitoring</a></li>
                        <li><a href="#" className="hover:underline">Complete Kali Linux Setup Guide for Pi 4</a></li>
                        <li><a href="#" className="hover:underline">Comparison: Pi 4 vs Other SBCs for Security Applications</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedArticle === 'project-wardrive' && (
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-8">
                  <h1 className="text-3xl font-bold mb-4">Building a Wardriving Setup with Raspberry Pi</h1>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#00FF00]/20 mr-3"></div>
                    <div>
                      <p className="font-medium">David Smith</p>
                      <p className="text-sm text-gray-400">March 15, 2023 • 20 min read</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="bg-yellow-900/20 border border-yellow-700 p-4 rounded-lg mb-6">
                      <h3 className="text-lg font-bold mb-2 text-yellow-500">Ethical Usage Disclaimer</h3>
                      <p className="text-gray-300">
                        This tutorial is provided for educational purposes only. Wardriving should only be conducted for legitimate
                        security research, education, and with proper permissions where required. Never attempt to access networks
                        without authorization. Always check local laws regarding wireless scanning in your jurisdiction.
                      </p>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      Wardriving is the practice of mapping wireless networks in a given area by traveling with scanning equipment.
                      Modern wardriving is primarily used for security research, wireless network coverage mapping, and to identify
                      vulnerable networks for subsequent authorized security testing.
                    </p>
                    
                    <p className="text-gray-300 mb-4">
                      In this tutorial, we'll build a complete, portable wardriving system using a Raspberry Pi. This setup is
                      designed to be power-efficient, reliable, and capable of running for extended periods on battery power.
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Equipment Needed</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[#0D0D0D] p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-[#00FF00]">Required Hardware</h3>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                          <li>Raspberry Pi 4 (2GB+ RAM)</li>
                          <li>32GB+ MicroSD card (Class 10 or better)</li>
                          <li>USB Wi-Fi adapter with monitor mode support
                            <ul className="list-disc pl-6 text-gray-400 mt-1">
                              <li>Recommended: Alpha AWUS036ACH or similar</li>
                            </ul>
                          </li>
                          <li>GPS receiver (USB or UART)
                            <ul className="list-disc pl-6 text-gray-400 mt-1">
                              <li>Recommended: GlobalSat BU-353S4</li>
                            </ul>
                          </li>
                          <li>Portable power bank (10,000+ mAh)</li>
                          <li>Small case or enclosure</li>
                          <li>Optional: Small LCD display (for status)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[#0D0D0D] p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-[#00FF00]">Software Requirements</h3>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                          <li>Raspberry Pi OS (Lite version recommended)</li>
                          <li>Kismet (wireless network detector)</li>
                          <li>GPSD (GPS daemon)</li>
                          <li>Aircrack-ng suite</li>
                          <li>Wireshark (optional for analysis)</li>
                          <li>Python 3 and required libraries</li>
                          <li>Optional: WiGLE upload tools</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Prepare the Raspberry Pi</h2>
                    
                    <h3 className="text-xl font-bold mt-6 mb-3">Base Operating System</h3>
                    <p className="text-gray-300 mb-4">
                      We'll start with a clean installation of Raspberry Pi OS Lite for better performance and lower power consumption:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-gray-300"># Download and flash Raspberry Pi OS Lite to your SD card using Raspberry Pi Imager</p>
                      <p className="text-gray-300 mt-2"># After flashing, create an empty file named 'ssh' in the boot partition</p>
                      <p className="text-gray-300">touch /media/your_username/boot/ssh</p>
                      <p className="text-gray-300 mt-2"># Insert the SD card into your Pi and boot it up</p>
                      <p className="text-gray-300 mt-2"># Connect via SSH (default username: pi, password: raspberry)</p>
                      <p className="text-[#00FF00]">ssh pi@raspberry.local</p>
                    </div>
                    
                    <h3 className="text-xl font-bold mt-6 mb-3">Initial Configuration</h3>
                    <p className="text-gray-300 mb-4">
                      Update the system and install essential packages:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-[#00FF00]">sudo apt update && sudo apt upgrade -y</p>
                      <p className="text-[#00FF00]">sudo apt install -y git python3-pip gpsd gpsd-clients aircrack-ng build-essential libpcap-dev libsqlite3-dev libncurses5-dev libpulse-dev</p>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Set Up Wi-Fi Adapter</h2>
                    
                    <p className="text-gray-300 mb-4">
                      Connect your USB Wi-Fi adapter. We'll need to check if it supports monitor mode:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-gray-300"># List connected USB devices</p>
                      <p className="text-[#00FF00]">lsusb</p>
                      <p className="text-gray-300 mt-2"># Check for wireless interfaces</p>
                      <p className="text-[#00FF00]">iw dev</p>
                      <p className="text-gray-300 mt-2"># Verify monitor mode support</p>
                      <p className="text-[#00FF00]">iw list | grep -A 4 "Supported interface modes"</p>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      If your adapter supports monitor mode, you should see "monitor" in the list of supported modes.
                      Now we'll test monitor mode:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-gray-300"># Kill processes that might interfere</p>
                      <p className="text-[#00FF00]">sudo airmon-ng check kill</p>
                      <p className="text-gray-300 mt-2"># Enable monitor mode (replace wlan1 with your interface)</p>
                      <p className="text-[#00FF00]">sudo airmon-ng start wlan1</p>
                      <p className="text-gray-300 mt-2"># Verify the monitor interface is created</p>
                      <p className="text-[#00FF00]">iwconfig</p>
                      <p className="text-gray-300 mt-2"># Test with a quick scan</p>
                      <p className="text-[#00FF00]">sudo airodump-ng wlan1mon</p>
                      <p className="text-gray-300 mt-2"># Press Ctrl+C to stop the scan after a few seconds</p>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Set Up GPS</h2>
                    
                    <p className="text-gray-300 mb-4">
                      Connect your GPS receiver and configure it with GPSD:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-gray-300"># Check if GPS is detected</p>
                      <p className="text-[#00FF00]">ls -l /dev/tty*</p>
                      <p className="text-gray-300 mt-2"># For USB GPS receivers, it's usually /dev/ttyUSB0 or /dev/ttyACM0</p>
                      <p className="text-gray-300 mt-2"># Configure GPSD to use your GPS device</p>
                      <p className="text-[#00FF00]">sudo systemctl stop gpsd.socket</p>
                      <p className="text-[#00FF00]">sudo systemctl disable gpsd.socket</p>
                      <p className="text-[#00FF00]">sudo dpkg-reconfigure gpsd</p>
                      <p className="text-gray-300 mt-2"># During reconfiguration, specify your GPS device (e.g., /dev/ttyUSB0)</p>
                      <p className="text-gray-300 mt-2"># Set GPSD to start automatically</p>
                      <p className="text-[#00FF00]">sudo systemctl enable gpsd</p>
                      <p className="text-[#00FF00]">sudo systemctl start gpsd</p>
                      <p className="text-gray-300 mt-2"># Test GPS functionality</p>
                      <p className="text-[#00FF00]">cgps -s</p>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      You should see GPS data after a few moments. You might need to take the device outside for a clear signal.
                      Press Ctrl+C to exit cgps.
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Install and Configure Kismet</h2>
                    
                    <p className="text-gray-300 mb-4">
                      Kismet is the primary tool we'll use for wardriving. We'll install the latest version from source:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-gray-300"># Download and install Kismet</p>
                      <p className="text-[#00FF00]">cd ~</p>
                      <p className="text-[#00FF00]">git clone https://www.kismetwireless.net/git/kismet.git</p>
                      <p className="text-[#00FF00]">cd kismet</p>
                      <p className="text-[#00FF00]">./configure</p>
                      <p className="text-[#00FF00]">make -j4</p>
                      <p className="text-[#00FF00]">sudo make install</p>
                      <p className="text-[#00FF00]">sudo ldconfig</p>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      Now let's configure Kismet for our wardriving setup:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-gray-300"># Create a Kismet configuration file</p>
                      <p className="text-[#00FF00]">sudo mkdir -p /etc/kismet/</p>
                      <p className="text-[#00FF00]">sudo nano /etc/kismet/kismet.conf</p>
                      <p className="text-gray-300 mt-2"># Add these configuration lines:</p>
                      <p className="text-[#00FF00]">server_name=WarPi</p>
                      <p className="text-[#00FF00]">server_description=Raspberry Pi Wardriving Platform</p>
                      <p className="text-[#00FF00]">gps=true</p>
                      <p className="text-[#00FF00]">log_types=kismet,wiglecsv,netxml,pcapng</p>
                      <p className="text-[#00FF00]">log_prefix=/home/pi/wardriving/</p>
                      <p className="text-[#00FF00]">log_title=Wardriving_</p>
                      <p className="text-[#00FF00]">channel_hop=true</p>
                      <p className="text-[#00FF00]">channel_hop_speed=5</p>
                      <p className="text-[#00FF00]">source=wlan1mon</p>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      Create the logs directory:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-[#00FF00]">mkdir -p ~/wardriving</p>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 5: Create Startup Script</h2>
                    
                    <p className="text-gray-300 mb-4">
                      Let's create a script to automatically start the wardriving setup when the Pi boots:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-[#00FF00]">nano ~/start_wardriving.sh</p>
                      <p className="text-gray-300 mt-2"># Add the following content:</p>
                      <p className="text-[#00FF00]">#!/bin/bash</p>
                      <p className="text-[#00FF00]"></p>
                      <p className="text-[#00FF00]"># Create a timestamp for logs</p>
                      <p className="text-[#00FF00]">TIMESTAMP=$(date +"%Y%m%d_%H%M%S")</p>
                      <p className="text-[#00FF00]">LOG_DIR="/home/pi/wardriving/logs_$TIMESTAMP"</p>
                      <p className="text-[#00FF00]">mkdir -p $LOG_DIR</p>
                      <p className="text-[#00FF00]"></p>
                      <p className="text-[#00FF00]"># Start logging</p>
                      <p className="text-[#00FF00]">echo "Starting wardriving session at $TIMESTAMP" | tee -a $LOG_DIR/session.log</p>
                      <p className="text-[#00FF00]"></p>
                      <p className="text-[#00FF00]"># Kill any processes that might interfere</p>
                      <p className="text-[#00FF00]">sudo airmon-ng check kill | tee -a $LOG_DIR/setup.log</p>
                      <p className="text-[#00FF00]"></p>
                      <p className="text-[#00FF00]"># Enable monitor mode</p>
                      <p className="text-[#00FF00]">sudo airmon-ng start wlan1 | tee -a $LOG_DIR/setup.log</p>
                      <p className="text-[#00FF00]"></p>
                      <p className="text-[#00FF00]"># Update Kismet log path for this session</p>
                      <p className="text-[#00FF00]">sed -i "s|log_prefix=.*|log_prefix=$LOG_DIR/|" /etc/kismet/kismet.conf</p>
                      <p className="text-[#00FF00]"></p>
                      <p className="text-[#00FF00]"># Start Kismet in the background</p>
                      <p className="text-[#00FF00]">sudo kismet -t WarDrive_$TIMESTAMP --daemonize</p>
                      <p className="text-[#00FF00]"></p>
                      <p className="text-[#00FF00]">echo "Wardriving setup complete, Kismet running in background" | tee -a $LOG_DIR/session.log</p>
                      <p className="text-[#00FF00]">echo "Log files will be saved to $LOG_DIR" | tee -a $LOG_DIR/session.log</p>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      Make the script executable and set it to run at startup:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-[#00FF00]">chmod +x ~/start_wardriving.sh</p>
                      <p className="text-[#00FF00]">sudo nano /etc/rc.local</p>
                      <p className="text-gray-300 mt-2"># Add this line before 'exit 0':</p>
                      <p className="text-[#00FF00]">/home/pi/start_wardriving.sh &</p>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 6: Power Management</h2>
                    
                    <p className="text-gray-300 mb-4">
                      To maximize battery life, we can implement some power-saving measures:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-gray-300"># Disable HDMI output (saves ~30mA)</p>
                      <p className="text-[#00FF00]">sudo nano /etc/rc.local</p>
                      <p className="text-gray-300 mt-2"># Add this line before the wardriving script:</p>
                      <p className="text-[#00FF00]">/usr/bin/tvservice -o</p>
                      <p className="text-gray-300 mt-2"># Disable onboard LEDs (saves a small amount of power)</p>
                      <p className="text-[#00FF00]">sudo nano /boot/config.txt</p>
                      <p className="text-gray-300 mt-2"># Add these lines:</p>
                      <p className="text-[#00FF00]">dtparam=act_led_trigger=none</p>
                      <p className="text-[#00FF00]">dtparam=act_led_activelow=on</p>
                      <p className="text-[#00FF00]">dtparam=pwr_led_trigger=none</p>
                      <p className="text-[#00FF00]">dtparam=pwr_led_activelow=on</p>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 7: Create a Shutdown Script</h2>
                    
                    <p className="text-gray-300 mb-4">
                      For clean shutdown when you're done wardriving:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-[#00FF00]">nano ~/stop_wardriving.sh</p>
                      <p className="text-gray-300 mt-2"># Add these lines:</p>
                      <p className="text-[#00FF00]">#!/bin/bash</p>
                      <p className="text-[#00FF00]">echo "Stopping Kismet..."</p>
                      <p className="text-[#00FF00]">sudo killall kismet</p>
                      <p className="text-[#00FF00]">echo "Disabling monitor mode..."</p>
                      <p className="text-[#00FF00]">sudo airmon-ng stop wlan1mon</p>
                      <p className="text-[#00FF00]">echo "Wardriving stopped"</p>
                      <p className="text-gray-300 mt-2"># Make it executable</p>
                      <p className="text-[#00FF00]">chmod +x ~/stop_wardriving.sh</p>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 8: Optional - Add Status Display</h2>
                    
                    <p className="text-gray-300 mb-4">
                      If you've added a small LCD display, you can use it to show status information:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-gray-300"># Install required packages (example for I2C display)</p>
                      <p className="text-[#00FF00]">sudo apt install -y python3-smbus i2c-tools</p>
                      <p className="text-[#00FF00]">sudo pip3 install adafruit-circuitpython-charlcd</p>
                      <p className="text-gray-300 mt-2"># Enable I2C if needed</p>
                      <p className="text-[#00FF00]">sudo raspi-config</p>
                      <p className="text-gray-300 mt-2"># Create a status display script</p>
                      <p className="text-[#00FF00]">nano ~/display_status.py</p>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      Add a Python script to update the display with network count, GPS status, etc.
                      (specific code depends on your display type)
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 9: Physical Assembly</h2>
                    
                    <p className="text-gray-300 mb-4">
                      Assemble all components in a suitable case:
                    </p>
                    
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
                      <li>Ensure the GPS antenna has a clear view of the sky</li>
                      <li>Position the Wi-Fi adapter for optimal reception (consider using a USB extension cable)</li>
                      <li>Connect the power bank to the Pi</li>
                      <li>Ensure adequate ventilation for cooling</li>
                      <li>Add cable management to prevent disconnections during movement</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 10: Usage</h2>
                    
                    <p className="text-gray-300 mb-4">
                      Your wardriving setup is now ready to use:
                    </p>
                    
                    <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-300">
                      <li>Power on the Pi and wait for it to boot (2-3 minutes)</li>
                      <li>The wardriving script will start automatically</li>
                      <li>Take the device to your vehicle (ensure the GPS has clear sky view)</li>
                      <li>Drive around the area you want to map</li>
                      <li>When finished, run the stop script or safely shut down the Pi</li>
                    </ol>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 11: Data Analysis</h2>
                    
                    <p className="text-gray-300 mb-4">
                      After your wardriving session, you can analyze the collected data:
                    </p>
                    
                    <div className="bg-[#0D0D0D] p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto">
                      <p className="text-gray-300"># Copy data to your computer</p>
                      <p className="text-[#00FF00]">scp -r pi@raspberry.local:~/wardriving/logs_* ./</p>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      You can use various tools to analyze the data:
                    </p>
                    
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
                      <li>Kismet Log Viewer: View detailed information about captured networks</li>
                      <li>WiGLE: Upload your data to contribute to wireless network mapping</li>
                      <li>QGIS: Create custom maps of wireless coverage</li>
                      <li>Custom Python scripts: Perform statistical analysis of the data</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                    
                    <p className="text-gray-300 mb-4">
                      You now have a fully functional wardriving setup based on a Raspberry Pi. This platform can be expanded
                      with additional sensors, improved antennas, or custom software to meet specific requirements.
                    </p>
                    
                    <p className="text-gray-300 mb-4">
                      Remember to only use this setup ethically and legally - wardriving should be limited to passive scanning
                      and never involve unauthorized access to networks.
                    </p>
                    
                    <div className="border-t border-[#00FF00]/20 mt-8 pt-6">
                      <h3 className="text-xl font-bold mb-4">Related Resources</h3>
                      <ul className="list-disc pl-6 space-y-2 text-[#00FF00]">
                        <li><a href="#" className="hover:underline">Advanced Kismet Configuration Options</a></li>
                        <li><a href="#" className="hover:underline">Analyzing Wireless Security with Captured Data</a></li>
                        <li><a href="#" className="hover:underline">Building a 4G-Connected Wardriving Platform</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedArticle === 'security-analysis' && (
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-8">
                  <h1 className="text-3xl font-bold mb-4">Security and Performance Analysis of HackerHardware.net</h1>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#00FF00]/20 mr-3"></div>
                    <div>
                      <p className="font-medium">Security Team</p>
                      <p className="text-sm text-gray-400">April 2, 2025 • 10 min read</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-4">
                      As of April 2, 2025, a comprehensive analysis of hackerhardware.net was conducted to assess its security posture and performance. 
                      The findings are detailed below.
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Security Vulnerabilities</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mt-6 mb-3">SSL/TLS Configuration</h3>
                      <ul className="list-disc pl-6 text-gray-300 space-y-2">
                        <li><strong>Cipher Suites and Protocol Versions:</strong> The SSL/TLS configuration was evaluated to ensure the use of strong cipher suites and up-to-date protocol versions.</li>
                        <li><strong>Vulnerabilities:</strong> The site was tested for known SSL/TLS vulnerabilities such as Heartbleed and POODLE.</li>
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mt-6 mb-3">HTTP Headers</h3>
                      <ul className="list-disc pl-6 text-gray-300 space-y-2">
                        <li><strong>Security Headers Assessment:</strong> The presence and configuration of critical security headers, including Content Security Policy (CSP), X-Frame-Options, and HTTP Strict Transport Security (HSTS), were examined.</li>
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mt-6 mb-3">Common Web Vulnerabilities (OWASP Top 10)</h3>
                      <ul className="list-disc pl-6 text-gray-300 space-y-2">
                        <li><strong>SQL Injection:</strong> The site was tested for SQL injection vulnerabilities to ensure that user inputs are properly sanitized.</li>
                        <li><strong>Cross-Site Scripting (XSS):</strong> Checks were performed to detect any XSS vulnerabilities that could allow attackers to inject malicious scripts.</li>
                        <li><strong>Cross-Site Request Forgery (CSRF):</strong> The site's resistance to CSRF attacks was evaluated to ensure that unauthorized commands cannot be transmitted from a user.</li>
                      </ul>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Performance Analysis</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mt-6 mb-3">Page Load Time</h3>
                      <ul className="list-disc pl-6 text-gray-300 space-y-2">
                        <li><strong>First Contentful Paint (FCP):</strong> Measured the time taken for the first piece of content to be rendered on the screen.</li>
                        <li><strong>Largest Contentful Paint (LCP):</strong> Assessed the time taken for the largest visible content element to load.</li>
                        <li><strong>Time to Interactive (TTI):</strong> Evaluated the time until the page becomes fully interactive.</li>
                        <li><strong>Total Blocking Time (TBT):</strong> Calculated the total time during which the main thread was blocked, preventing user interaction.</li>
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mt-6 mb-3">Resource Optimization</h3>
                      <ul className="list-disc pl-6 text-gray-300 space-y-2">
                        <li><strong>Image Optimization:</strong> Analyzed the efficiency of image formats and compression techniques used.</li>
                        <li><strong>JavaScript and CSS Minification:</strong> Checked whether JavaScript and CSS files are minified to reduce load times.</li>
                        <li><strong>Caching Strategies:</strong> Reviewed the implementation of caching mechanisms to enhance repeat visit performance.</li>
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mt-6 mb-3">Server Response Time</h3>
                      <ul className="list-disc pl-6 text-gray-300 space-y-2">
                        <li><strong>Latency Assessment:</strong> Measured the server's response time to requests to identify potential bottlenecks.</li>
                      </ul>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Recommendations</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[#0D0D0D] p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-[#00FF00]">Security Improvements</h3>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                          <li><strong>Implement Missing Security Headers:</strong> Ensure that all critical security headers are properly configured to protect against common vulnerabilities.</li>
                          <li><strong>Remediate Identified Vulnerabilities:</strong> Address any detected vulnerabilities such as SQL injection or XSS by implementing appropriate input validation and sanitization techniques.</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[#0D0D0D] p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-[#00FF00]">Performance Optimizations</h3>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                          <li><strong>Optimize Images:</strong> Utilize modern image formats and apply appropriate compression to reduce file sizes without compromising quality.</li>
                          <li><strong>Minify and Bundle Resources:</strong> Minify JavaScript and CSS files and consider bundling them to reduce the number of HTTP requests.</li>
                          <li><strong>Enhance Caching Strategies:</strong> Implement effective caching policies to improve load times for repeat visitors.</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Tools Used</h2>
                    
                    <div className="bg-[#0D0D0D] p-6 rounded-lg mb-6">
                      <ul className="list-disc pl-6 text-gray-300 space-y-2">
                        <li><strong>SSL Labs:</strong> For assessing SSL/TLS configurations and identifying related vulnerabilities.</li>
                        <li><strong>Lighthouse:</strong> To analyze web performance metrics and provide optimization suggestions.</li>
                        <li><strong>OWASP ZAP:</strong> For detecting common web application vulnerabilities such as SQL injection and XSS.</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#00FF00]/10 border border-[#00FF00]/30 p-4 rounded-lg mb-6">
                      <h3 className="text-lg font-bold mb-2 text-[#00FF00]">Conclusion</h3>
                      <p className="text-gray-300">
                        This analysis provides a snapshot of the current security and performance status of hackerhardware.net as of the specified date. 
                        Regular assessments are recommended to maintain and enhance the site's security and performance over time.
                      </p>
                    </div>
                    
                    <div className="border-t border-[#00FF00]/20 mt-8 pt-6">
                      <h3 className="text-xl font-bold mb-4">Related Resources</h3>
                      <ul className="list-disc pl-6 space-y-2 text-[#00FF00]">
                        <li><a href="#" className="hover:underline">Web Application Security Best Practices</a></li>
                        <li><a href="#" className="hover:underline">Performance Optimization Techniques for Modern Web Apps</a></li>
                        <li><a href="#" className="hover:underline">Understanding OWASP Top 10 Vulnerabilities</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedArticle !== 'article-1' && selectedArticle !== 'article-2' && selectedArticle !== 'specs-pi4' && selectedArticle !== 'project-wardrive' && selectedArticle !== 'security-analysis' && (
                <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-8">
                  <h1 className="text-3xl font-bold mb-4">
                    {MOCK_ARTICLES[activeCategory]?.find(a => a.id === selectedArticle)?.title || 'Article Not Found'}
                  </h1>
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#00FF00]/20 mr-3"></div>
                    <div>
                      <p className="font-medium">
                        {MOCK_ARTICLES[activeCategory]?.find(a => a.id === selectedArticle)?.author || 'Unknown Author'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {MOCK_ARTICLES[activeCategory]?.find(a => a.id === selectedArticle)?.date || 'Unknown Date'} • 
                        {MOCK_ARTICLES[activeCategory]?.find(a => a.id === selectedArticle)?.readTime || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-4">
                      This is a placeholder for article content. The full article would be displayed here.
                    </p>
                    <p className="text-gray-300 mb-4">
                      For detailed article content examples, please refer to the first two articles in the Documentation section.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Resources;