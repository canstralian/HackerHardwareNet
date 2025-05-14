import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ThumbsUp,
  ChevronLeft,
  Flame,
  Eye,
  MessageSquare,
  CheckSquare,
  Loader2,
  AlertTriangle,
  Award,
} from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define types
type SecurityChallenge = {
  id: number;
  title: string;
  description: string;
  scenario: string;
  difficulty: string;
  category: string;
  authorId: number;
  image?: string | null;
  hardwareIds?: number[] | null;
  tools?: string[] | null;
  tags: string[];
  status: string;
  isActive: boolean;
  views: number;
  likes: number;
  attempts: number;
  solutions: number;
  createdAt: string;
  points: number;
};

type ChallengeSolution = {
  id: number;
  challengeId: number;
  authorId: number;
  content: string;
  approach: string;
  toolsUsed: string[];
  isApproved: boolean;
  codeSnippets?: Record<string, string> | null;
  attachments?: string[] | null;
  createdAt: string;
  votes: number;
};

type ChallengeComment = {
  id: number;
  challengeId: number;
  authorId: number;
  content: string;
  createdAt: string;
};

type User = {
  id: number;
  username: string;
  avatarUrl?: string | null;
};

type UserChallengeProgress = {
  id: number;
  userId: number;
  challengeId: number;
  status: string;
  attempts: number;
  notes?: string | null;
  bookmarked: boolean;
  startedAt: string;
  completedAt?: string | null;
};

export default function ChallengeDetailPage() {
  const [, params] = useRoute<{ id: string }>("/challenges/:id");
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [comment, setComment] = useState("");
  const [notesInput, setNotesInput] = useState("");

  const challengeId = params?.id ? parseInt(params.id) : 0;

  // Fetch challenge details
  const {
    data: challenge,
    isLoading: challengeLoading,
    error: challengeError,
  } = useQuery<SecurityChallenge>({
    queryKey: [`/api/challenges/${challengeId}`],
    enabled: !!challengeId,
  });

  // Fetch challenge solutions
  const {
    data: solutions,
    isLoading: solutionsLoading,
    error: solutionsError,
  } = useQuery<ChallengeSolution[]>({
    queryKey: [`/api/challenges/${challengeId}/solutions`],
    enabled: !!challengeId,
  });

  // Fetch challenge comments
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useQuery<ChallengeComment[]>({
    queryKey: [`/api/challenges/${challengeId}/comments`],
    enabled: !!challengeId,
  });

  // Fetch user progress if authenticated
  const {
    data: progress,
    isLoading: progressLoading,
  } = useQuery<UserChallengeProgress>({
    queryKey: [`/api/users/${user?.id}/challenges`, challengeId],
    enabled: !!challengeId && !!user?.id && isAuthenticated,
  });

  // Like challenge mutation
  const likeMutation = useMutation({
    mutationFn: () => {
      return apiRequest(`/api/challenges/${challengeId}/like`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/challenges/${challengeId}`] });
      toast({
        title: "Challenge liked!",
        description: "Thanks for showing your appreciation.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to like the challenge. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Add comment mutation
  const commentMutation = useMutation({
    mutationFn: (content: string) => {
      return apiRequest(`/api/challenges/${challengeId}/comments`, {
        method: "POST",
        data: { content },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/challenges/${challengeId}/comments`] });
      setComment("");
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update progress mutation
  const progressMutation = useMutation({
    mutationFn: (data: { status: string; notes?: string; bookmarked?: boolean }) => {
      return apiRequest(`/api/challenges/${challengeId}/progress`, {
        method: "POST",
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${user?.id}/challenges`, challengeId] });
      toast({
        title: "Progress updated",
        description: "Your progress has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update progress. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle like button click
  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to like this challenge.",
        variant: "destructive",
      });
      return;
    }

    likeMutation.mutate();
  };

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to comment.",
        variant: "destructive",
      });
      return;
    }

    commentMutation.mutate(comment);
  };

  // Handle progress update
  const handleProgressUpdate = (status: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to track your progress.",
        variant: "destructive",
      });
      return;
    }

    progressMutation.mutate({
      status,
      notes: notesInput || undefined,
    });
  };

  // Handle notes submission
  const handleNotesSubmit = () => {
    if (!isAuthenticated) return;
    progressMutation.mutate({
      status: progress?.status || "started",
      notes: notesInput,
    });
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark this challenge.",
        variant: "destructive",
      });
      return;
    }

    progressMutation.mutate({
      status: progress?.status || "started",
      bookmarked: !(progress?.bookmarked || false),
    });
  };

  // Loading state
  if (challengeLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Loading challenge...</p>
      </div>
    );
  }

  // Error state
  if (challengeError || !challenge) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Challenge not found</h2>
        <p className="text-muted-foreground mb-6">
          The challenge you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/challenges">Back to challenges</Link>
        </Button>
      </div>
    );
  }

  // Calculate difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-500";
      case "intermediate":
        return "bg-blue-500";
      case "advanced":
        return "bg-orange-500";
      case "expert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/challenges" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to challenges
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Challenge header */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline">{challenge.category}</Badge>
              <Badge className={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
              {challenge.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {challenge.views} views
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {challenge.likes} likes
              </div>
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-1" />
                {challenge.attempts} attempts
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-1" />
                {challenge.solutions} solutions
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {challenge.points} points
              </div>
              <div>
                Posted on{" "}
                {format(new Date(challenge.createdAt), "MMM d, yyyy")}
              </div>
            </div>
          </div>

          {/* Challenge content tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-10"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="solutions">
                Solutions ({solutions?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="discussion">
                Discussion ({comments?.length || 0})
              </TabsTrigger>
            </TabsList>

            {/* Overview tab */}
            <TabsContent value="overview">
              <div className="space-y-6">
                {challenge.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>{challenge.description}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Scenario</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>{challenge.scenario}</p>
                  </div>
                </div>

                {challenge.tools && challenge.tools.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Recommended Tools
                    </h2>
                    <ul className="list-disc pl-5 space-y-1">
                      {challenge.tools.map((tool, index) => (
                        <li key={index}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    variant="default"
                    className="mr-3"
                    onClick={handleLike}
                    disabled={likeMutation.isPending}
                  >
                    {likeMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <ThumbsUp className="h-4 w-4 mr-2" />
                    )}
                    Like
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleBookmarkToggle}
                    disabled={progressMutation.isPending}
                  >
                    {progress?.bookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Solutions tab */}
            <TabsContent value="solutions">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Solutions ({solutions?.length || 0})
                  </h2>
                  <Button asChild>
                    <Link href={`/challenges/${challengeId}/submit-solution`}>
                      Submit Solution
                    </Link>
                  </Button>
                </div>

                {solutionsLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="ml-2">Loading solutions...</span>
                  </div>
                ) : solutionsError || !solutions || solutions.length === 0 ? (
                  <div className="text-center py-16 border rounded-lg bg-card">
                    <h3 className="text-xl font-semibold mb-2">
                      No solutions yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Be the first to submit a solution to this challenge!
                    </p>
                    <Button asChild>
                      <Link href={`/challenges/${challengeId}/submit-solution`}>
                        Submit Solution
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {solutions.map((solution) => (
                      <Card key={solution.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback>
                                  {solution.authorId}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">
                                  Solution by User #{solution.authorId}
                                </CardTitle>
                                <CardDescription>
                                  {format(
                                    new Date(solution.createdAt),
                                    "MMM d, yyyy"
                                  )}
                                </CardDescription>
                              </div>
                            </div>
                            <Badge
                              variant={
                                solution.isApproved ? "default" : "outline"
                              }
                            >
                              {solution.isApproved
                                ? "Approved"
                                : "Pending Review"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible>
                            <AccordionItem value="approach">
                              <AccordionTrigger>Approach</AccordionTrigger>
                              <AccordionContent>
                                {solution.approach}
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="solution">
                              <AccordionTrigger>Solution</AccordionTrigger>
                              <AccordionContent>
                                {solution.content}
                              </AccordionContent>
                            </AccordionItem>
                            {solution.toolsUsed.length > 0 && (
                              <AccordionItem value="tools">
                                <AccordionTrigger>Tools Used</AccordionTrigger>
                                <AccordionContent>
                                  <ul className="list-disc pl-5">
                                    {solution.toolsUsed.map((tool, index) => (
                                      <li key={index}>{tool}</li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            )}
                            {solution.codeSnippets &&
                              Object.keys(solution.codeSnippets).length > 0 && (
                                <AccordionItem value="code">
                                  <AccordionTrigger>
                                    Code Snippets
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    {Object.entries(solution.codeSnippets).map(
                                      ([name, code], index) => (
                                        <div key={index} className="mb-4">
                                          <h4 className="font-medium mb-1">
                                            {name}
                                          </h4>
                                          <pre className="bg-muted p-3 rounded overflow-x-auto">
                                            <code>{code}</code>
                                          </pre>
                                        </div>
                                      )
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              )}
                          </Accordion>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {solution.votes} votes
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Discussion tab */}
            <TabsContent value="discussion">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Discussion ({comments?.length || 0})
                </h2>

                {isAuthenticated ? (
                  <div className="mb-8">
                    <form onSubmit={handleCommentSubmit}>
                      <Textarea
                        placeholder="Add to the discussion..."
                        className="mb-3 min-h-32"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        type="submit"
                        disabled={
                          !comment.trim() || commentMutation.isPending
                        }
                      >
                        {commentMutation.isPending ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <MessageSquare className="h-4 w-4 mr-2" />
                        )}
                        Post Comment
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-card rounded-lg p-6 mb-8 text-center">
                    <p className="mb-4">
                      Please log in to participate in the discussion.
                    </p>
                    <Button asChild>
                      <Link href="/login">Log In</Link>
                    </Button>
                  </div>
                )}

                {commentsLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <span className="ml-2">Loading comments...</span>
                  </div>
                ) : commentsError || !comments || comments.length === 0 ? (
                  <div className="text-center py-10 border rounded-lg bg-card">
                    <h3 className="text-lg font-semibold mb-2">
                      No comments yet
                    </h3>
                    <p className="text-muted-foreground">
                      Be the first to start the discussion!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border-b border-border pb-6 last:border-0"
                      >
                        <div className="flex items-center mb-3">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>
                              {comment.authorId}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              User #{comment.authorId}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(
                                new Date(comment.createdAt),
                                "MMM d, yyyy 'at' h:mm a"
                              )}
                            </p>
                          </div>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div>
          {/* Progress tracking card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
              <CardDescription>
                Keep track of your progress on this challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAuthenticated ? (
                <>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Status</p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={
                          progress?.status === "started" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleProgressUpdate("started")}
                        disabled={progressMutation.isPending}
                      >
                        Started
                      </Button>
                      <Button
                        variant={
                          progress?.status === "in-progress"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleProgressUpdate("in-progress")}
                        disabled={progressMutation.isPending}
                      >
                        In Progress
                      </Button>
                      <Button
                        variant={
                          progress?.status === "completed"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleProgressUpdate("completed")}
                        disabled={progressMutation.isPending}
                      >
                        Completed
                      </Button>
                      <Button
                        variant={
                          progress?.status === "abandoned"
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleProgressUpdate("abandoned")}
                        disabled={progressMutation.isPending}
                      >
                        Abandoned
                      </Button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">
                      Your Notes (Private)
                    </p>
                    <Textarea
                      placeholder="Add your notes about this challenge..."
                      className="mb-2"
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                    />
                    <Button
                      size="sm"
                      onClick={handleNotesSubmit}
                      disabled={
                        progressMutation.isPending ||
                        notesInput === progress?.notes
                      }
                    >
                      {progressMutation.isPending ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : null}
                      Save Notes
                    </Button>
                  </div>

                  {progress && (
                    <div className="text-sm text-muted-foreground">
                      <div className="flex justify-between mb-1">
                        <span>Started</span>
                        <span>
                          {format(
                            new Date(progress.startedAt),
                            "MMM d, yyyy"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Attempts</span>
                        <span>{progress.attempts}</span>
                      </div>
                      {progress.completedAt && (
                        <div className="flex justify-between">
                          <span>Completed</span>
                          <span>
                            {format(
                              new Date(progress.completedAt),
                              "MMM d, yyyy"
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="mb-4 text-muted-foreground">
                    Log in to track your progress on this challenge
                  </p>
                  <Button asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related challenges card */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-4">
                Related challenges will appear here
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}