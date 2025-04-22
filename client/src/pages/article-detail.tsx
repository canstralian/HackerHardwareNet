import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useRoute, useLocation } from 'wouter';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { queryClient } from '@/lib/queryClient';
import type { Article } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';

// You may need to install react-markdown with
// npm install react-markdown

const ArticleDetail = () => {
  const [match, params] = useRoute('/article/:id');
  const [, setLocation] = useLocation();
  const id = params?.id ? parseInt(params.id) : null;

  // Fetch the article details
  const { data: article, isLoading, isError } = useQuery<Article>({ 
    queryKey: ['/api/articles', id],
    queryFn: () => fetch(`/api/articles/${id}`).then(res => res.json()),
    enabled: !!id,
  });

  // Fetch related articles based on tags
  const { data: allArticles } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  // Find related articles based on shared tags
  const relatedArticles = allArticles
    ?.filter(a => 
      a.id !== id && 
      a.tags.some(tag => article?.tags.includes(tag))
    )
    .slice(0, 3);

  // If the article isn't found, redirect to articles page
  useEffect(() => {
    if (isError) {
      setLocation('/articles');
    }
  }, [isError, setLocation]);

  if (!match) return null;

  return (
    <div className="container max-w-4xl py-8">
      {/* Back button */}
      <Link href="/articles" className="inline-block mb-6">
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Back to Articles</span>
        </Button>
      </Link>

      {isLoading ? (
        <div>
          <Skeleton className="h-12 w-3/4 mb-4" />
          <div className="flex gap-4 mb-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex gap-2 mb-8">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-64 w-full mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : article ? (
        <>
          {/* Article header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">
              {article.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>By {article.authorId ? `Author #${article.authorId}` : 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{article.views || 0} views</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, index) => (
                <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                  <Tag size={12} className="mr-1" />
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="prose prose-lg prose-invert max-w-none mb-12">
            {/* If using Markdown content */}
            <ReactMarkdown>
              {article.content}
            </ReactMarkdown>

            {/* If not using Markdown, render content directly */}
            {/* <div dangerouslySetInnerHTML={{ __html: article.content }} /> */}
          </div>

          {/* Related Products Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Hands-On Learning Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Course Card Example */}
              <Card className="overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors">
                <div className="bg-gradient-to-r from-primary/20 to-primary/5 h-2"></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <div className="w-8 h-8 flex items-center justify-center text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Wireless Security Course</h3>
                      <p className="text-muted-foreground text-sm">4 modules • Beginner friendly</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm">Learn how to secure wireless networks and detect vulnerabilities using practical exercises with Raspberry Pi.</p>
                  <Button asChild className="w-full">
                    <Link href="/learning-paths">Enroll Now</Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Hardware Kit Card Example */}
              <Card className="overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors">
                <div className="bg-gradient-to-r from-primary/20 to-primary/5 h-2"></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <div className="w-8 h-8 flex items-center justify-center text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 19v-3"></path><path d="M10 19v-3"></path><path d="M14 19v-3"></path><path d="M18 19v-3"></path>
                          <path d="M8 11V9"></path><path d="M16 11V9"></path><path d="M12 11V9"></path><path d="M2 9v10h20V9"></path>
                          <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Hardware Hacking Kit</h3>
                      <p className="text-muted-foreground text-sm">All-in-one kit • Includes tutorials</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm">Get all the hardware components needed to follow along with our security tutorials, including Orange Pi Zero 2W.</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/hardware-library">Shop Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Browse More Section */}
            <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-black/30 flex justify-between items-center">
              <div>
                <h3 className="font-bold">Discover our complete catalog</h3>
                <p className="text-sm text-muted-foreground">Courses, tools, and hardware kits for all skill levels</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learning-paths">Learning Paths</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/hardware-library">Browse Hardware</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedArticles.map(relatedArticle => (
                  <Link key={relatedArticle.id} href={`/article/${relatedArticle.id}`}>
                    <Card className="cursor-pointer hover:border-primary/50 transition-colors h-full">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{relatedArticle.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedArticle.preview}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          <span>{new Date(relatedArticle.publishedAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <Clock size={12} />
                          <span>{relatedArticle.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author info */}
          <Card className="bg-gray-900 border border-gray-800">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">About the Author</h3>
              <p className="text-sm text-gray-400">
                Our team consists of hardware enthusiasts, cybersecurity experts, and 
                developers passionate about single-board computers and their applications in security 
                research and education.
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Article not found</h2>
          <p className="text-gray-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/articles">Browse All Articles</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;