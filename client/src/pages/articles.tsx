import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, Search, Tag, ChevronRight } from "lucide-react";
import type { Article } from "@shared/schema";

const ArticlesPage = () => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch all articles
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
    onSuccess: (data: Article[]) => {
      console.log('Loaded articles:', data);
    },
  });

  // Filter articles based on search query and active tab
  const filteredArticles = articles?.filter(article => {
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeTab === "all" || article.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from articles
  const categories = articles ? 
    ["all", ...Array.from(new Set(articles.map(article => article.category)))] : 
    ["all"];

  // Navigate to article detail
  const handleViewArticle = (id: number) => {
    setLocation(`/article/${id}`);
  };

  return (
    <div className="container py-8">
      {/* Cyberpunk-inspired header section */}
      <div className="relative overflow-hidden rounded-lg mb-10 border border-[#00FF00]/30 bg-gradient-to-r from-black to-gray-900">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 border border-[#00FF00]/50 rounded-lg opacity-50"></div>
        <div className="absolute -inset-0.5 bg-[#00FF00]/5 blur-md rounded-lg"></div>
        
        {/* Digital noise pattern (optional) */}
        <div className="absolute inset-0 bg-noise-pattern opacity-5 mix-blend-overlay"></div>
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="max-w-3xl">
            <div className="inline-block px-2 py-1 text-xs tracking-wider text-[#00FF00] border border-[#00FF00]/30 mb-4 bg-black/50 uppercase">
              knowledge base
            </div>
            <h1 className="text-3xl md:text-5xl font-mono font-bold mb-4 text-white">
              <span className="text-[#00FF00]">Articles</span> & Tutorials
            </h1>
            <p className="text-gray-300 md:text-lg mb-6 max-w-2xl">
              Explore in-depth guides, technical breakdowns, and tutorials on cybersecurity, 
              hardware hacking, and ethical exploration using single board computers.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-[#00FF00] text-black hover:bg-[#00FF00]/90">
                <Link href="/learning-paths">Explore Learning Paths</Link>
              </Button>
              <Button variant="outline" className="border-[#00FF00]/50 text-[#00FF00] hover:bg-[#00FF00]/10" asChild>
                <Link href="#categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Latest Articles</h2>
          <p className="text-gray-400">
            Find the latest insights and tutorials from our cybersecurity experts
          </p>
        </div>
        <div className="relative w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10 w-full md:w-72 border-[#00FF00]/30 focus:border-[#00FF00] focus:ring-[#00FF00]/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6 flex flex-wrap h-auto bg-transparent space-x-2">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="capitalize px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-gray-700 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4 w-5/6"></div>
                    <div className="flex gap-2">
                      <div className="h-5 bg-gray-700 rounded w-16"></div>
                      <div className="h-5 bg-gray-700 rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredArticles?.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles?.map(article => (
                <Card 
                  key={article.id} 
                  className="overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => handleViewArticle(article.id)}
                >
                  {article.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
                    <p className="text-gray-400 mb-4 line-clamp-3">{article.preview}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                        >
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full">
                          +{article.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary p-0">
                      Read <ChevronRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-gray-900 rounded-lg p-8 mt-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Want to learn more?</h2>
            <p className="mb-6 text-gray-400">
              Check out our comprehensive courses and tutorials designed to help you master
              cybersecurity, hardware hacking, and ethical exploration using single board computers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/learning-paths">Browse Courses</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/hardware-library">Hardware Library</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            {/* Place for an illustration or image */}
            <div className="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="text-primary text-6xl">🚀</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;