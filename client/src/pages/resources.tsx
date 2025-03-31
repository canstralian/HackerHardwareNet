import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Sidebar from '@/components/sidebar';
import { RESOURCES } from '@/lib/constants';
import { Article1Content, Article2Content } from '@/components/article-templates';

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
    }
  ]
};

const Resources = () => {
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>('documentation');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  useEffect(() => {
    // Get type from URL query parameter
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type && Object.keys(MOCK_ARTICLES).includes(type)) {
      setActiveCategory(type);
    }
  }, [location]);

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
                {MOCK_ARTICLES[activeCategory]?.map((article) => (
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
                ))}
              </div>
            </>
          ) : (
            // Article view
            <div className="article-container">
              <button 
                className="mb-6 flex items-center text-[#00FF00] hover:underline"
                onClick={() => setSelectedArticle(null)}
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to {categoryName}
              </button>
              
              {selectedArticle === 'article-1' && <Article1Content />}
              {selectedArticle === 'article-2' && <Article2Content />}
              
              {selectedArticle !== 'article-1' && selectedArticle !== 'article-2' && (
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