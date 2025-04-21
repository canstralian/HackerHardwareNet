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
              {article.views > 0 && (
                <div className="flex items-center gap-1">
                  <span>{article.views} views</span>
                </div>
              )}
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

          {/* Article sidebar - could contain e-learning product links */}
          <div className="mb-12 p-6 border border-primary/20 rounded-lg bg-black/30">
            <h3 className="text-xl font-bold mb-4">Want to dive deeper?</h3>
            <p className="mb-4">
              Check out our hands-on learning materials to build your practical skills in the topics covered by this article.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/learning-paths">Browse Courses</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/hardware-library">Hardware Library</Link>
              </Button>
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