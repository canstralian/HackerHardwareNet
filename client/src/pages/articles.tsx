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
    <div className="container py-4 sm:py-6 lg:py-8 px-4 sm:px-6">
      {/* Enhanced header section with better accessibility */}
      <header className="relative overflow-hidden rounded-lg mb-6 sm:mb-8 md:mb-10 border border-[#00FF00]/30 bg-gradient-to-r from-black to-gray-900" role="banner">
        <div className="absolute inset-0 bg-black opacity-60" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10" aria-hidden="true"></div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 border border-[#00FF00]/50 rounded-lg opacity-50" aria-hidden="true"></div>
        <div className="absolute -inset-0.5 bg-[#00FF00]/5 blur-md rounded-lg" aria-hidden="true"></div>

        <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="max-w-3xl">
            <div className="inline-block px-2 py-1 text-xs tracking-wider text-[#00FF00] border border-[#00FF00]/30 mb-3 sm:mb-4 bg-black/50 uppercase" role="banner">
              knowledge base
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-3 sm:mb-4 text-white leading-tight">
              <span className="text-[#00FF00]">Articles</span> & Tutorials
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl leading-relaxed">
              Explore in-depth guides, technical breakdowns, and tutorials on cybersecurity, 
              hardware hacking, and ethical exploration using single board computers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4" role="group" aria-label="Main navigation actions">
              <Button asChild className="bg-[#00FF00] text-black hover:bg-[#00FF00]/90 min-h-[44px] text-sm sm:text-base focus:ring-2 focus:ring-[#00FF00] focus:ring-offset-2">
                <Link href="/learning-paths" aria-describedby="learning-paths-desc">
                  Explore Learning Paths
                </Link>
              </Button>
              <Button variant="outline" className="border-[#00FF00]/50 text-[#00FF00] hover:bg-[#00FF00]/10 min-h-[44px] text-sm sm:text-base focus:ring-2 focus:ring-[#00FF00] focus:ring-offset-2" asChild>
                <Link href="#categories" aria-describedby="categories-desc">
                  Browse Categories
                </Link>
              </Button>
            </div>
            <div id="learning-paths-desc" className="sr-only">Navigate to structured learning paths for cybersecurity education</div>
            <div id="categories-desc" className="sr-only">Browse articles by topic categories</div>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Latest Articles</h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Find the latest insights and tutorials from our cybersecurity experts
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10 w-full border-[#00FF00]/30 focus:border-[#00FF00] focus:ring-[#00FF00]/20 min-h-[44px] text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6 sm:mb-8">
        <div className="overflow-x-auto -mx-4 px-4 mb-6">
          <TabsList className="mb-0 flex h-auto bg-transparent space-x-2 min-w-max">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="capitalize px-3 sm:px-4 py-2 text-sm sm:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap min-h-[44px]"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-label="Loading articles">
              {Array(6).fill(0).map((_, index) => (
                <Card key={index} className="animate-pulse" aria-hidden="true">
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
              <div className="sr-only">Loading articles...</div>
            </div>
          ) : filteredArticles?.length === 0 ? (
            <div className="text-center py-16" role="status">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="border-[#00FF00]/50 text-[#00FF00] hover:bg-[#00FF00]/10"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredArticles?.map(article => (
                <Card 
                  key={article.id} 
                  className="overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-300 cursor-pointer
                    focus-within:ring-2 focus-within:ring-[#00FF00] focus-within:ring-offset-2 focus-within:ring-offset-black
                    hover:shadow-lg hover:shadow-[#00FF00]/10 group"
                  role="article"
                  tabIndex={0}
                  onClick={() => handleViewArticle(article.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleViewArticle(article.id);
                    }
                  }}
                  aria-label={`Read article: ${article.title}`}
                >
                  {article.imageUrl && (
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={`Cover image for ${article.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2 leading-tight text-white group-hover:text-[#00FF00] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-400 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base leading-relaxed">
                      {article.preview}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4" role="list" aria-label="Article tags">
                      {article.tags.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          role="listitem"
                        >
                          <Tag size={10} className="mr-1" aria-hidden="true" />
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full" role="listitem">
                          +{article.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6 pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-400" role="group" aria-label="Article metadata">
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" aria-hidden="true" />
                        <time dateTime={article.publishedAt}>
                          <span className="hidden sm:inline">{new Date(article.publishedAt).toLocaleDateString()}</span>
                          <span className="sm:hidden">{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </time>
                      </div>
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" aria-hidden="true" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary p-0 self-end sm:self-auto min-h-[44px] sm:min-h-auto
                        focus:ring-2 focus:ring-[#00FF00] focus:ring-offset-2 focus:ring-offset-black"
                      aria-label={`Read ${article.title}`}
                    >
                      Read <ChevronRight size={16} className="ml-1" aria-hidden="true" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-gray-900 rounded-lg p-4 sm:p-6 lg:p-8 mt-8 sm:mt-10 lg:mt-12">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Want to learn more?</h2>
            <p className="mb-4 sm:mb-6 text-gray-400 text-sm sm:text-base leading-relaxed">
              Check out our comprehensive courses and tutorials designed to help you master
              cybersecurity, hardware hacking, and ethical exploration using single board computers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button asChild className="min-h-[44px] text-sm sm:text-base">
                <Link href="/learning-paths">Browse Courses</Link>
              </Button>
              <Button variant="outline" asChild className="min-h-[44px] text-sm sm:text-base">
                <Link href="/hardware-library">Hardware Library</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            {/* Place for an illustration or image */}
            <div className="w-48 h-48 lg:w-64 lg:h-64 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="text-primary text-4xl lg:text-6xl">🚀</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;