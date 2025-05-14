import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/page-header";
import { Loader2 } from "lucide-react";

// Define challenge type
type SecurityChallenge = {
  id: number;
  title: string;
  description: string;
  scenario: string;
  difficulty: string;
  category: string;
  authorId: number;
  image?: string | null;
  tags: string[];
  status: string;
  isActive: boolean;
  views: number;
  likes: number;
  attempts: number;
  solutions: number;
  createdAt: string;
};

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all challenges
  const { data: challenges, isLoading } = useQuery<SecurityChallenge[]>({
    queryKey: ["/api/challenges"],
  });

  // Fetch popular challenges
  const { data: popularChallenges, isLoading: popularLoading } = useQuery<
    SecurityChallenge[]
  >({
    queryKey: ["/api/challenges/popular"],
  });

  // Filter challenges based on search term, difficulty, and category
  const filterChallenges = (challenges: SecurityChallenge[] | undefined) => {
    if (!challenges) return [];

    return challenges.filter((challenge) => {
      const matchesSearch =
        searchTerm === "" ||
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesDifficulty =
        difficultyFilter === "all" || challenge.difficulty === difficultyFilter;

      const matchesCategory =
        categoryFilter === "all" || challenge.category === categoryFilter;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  };

  const filteredChallenges = filterChallenges(challenges);
  const filteredPopularChallenges = filterChallenges(popularChallenges);

  // Calculate difficulty badge color
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
      <PageHeader
        title="Security Challenge Board"
        description="Test your security skills with these community-created challenges. Learn new techniques, solve realistic scenarios, and share your solutions."
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
        <div className="flex-1">
          <Input
            placeholder="Search challenges by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="iot">IoT</SelectItem>
              <SelectItem value="wireless">Wireless</SelectItem>
              <SelectItem value="forensics">Forensics</SelectItem>
              <SelectItem value="crypto">Cryptography</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <Select
            value={difficultyFilter}
            onValueChange={setDifficultyFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="default" asChild>
          <Link href="/challenges/create">Create Challenge</Link>
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Challenges</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2">Loading challenges...</span>
            </div>
          ) : filteredChallenges.length === 0 ? (
            <div className="text-center py-16 border rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
              <p className="text-muted-foreground">
                Try changing your search filters or create your own challenge.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          {popularLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2">Loading popular challenges...</span>
            </div>
          ) : filteredPopularChallenges.length === 0 ? (
            <div className="text-center py-16 border rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
              <p className="text-muted-foreground">
                Try changing your search filters or create your own challenge.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPopularChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChallengeCard({ challenge }: { challenge: SecurityChallenge }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-500 hover:bg-green-600";
      case "intermediate":
        return "bg-blue-500 hover:bg-blue-600";
      case "advanced":
        return "bg-orange-500 hover:bg-orange-600";
      case "expert":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="rounded-lg border bg-card hover:shadow-lg transition-shadow duration-300 overflow-hidden group h-full flex flex-col">
      {/* Image section */}
      <div className="h-48 bg-accent relative overflow-hidden">
        {challenge.image ? (
          <img
            src={challenge.image}
            alt={challenge.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-foreground">
            <span className="text-lg opacity-30">No image</span>
          </div>
        )}
        <Badge
          className={`absolute top-2 right-2 ${getDifficultyColor(
            challenge.difficulty
          )}`}
        >
          {challenge.difficulty}
        </Badge>
      </div>
      
      {/* Content section */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-1">
          <Badge variant="outline" className="mr-1">
            {challenge.category}
          </Badge>
          {challenge.solutions > 0 && (
            <Badge variant="secondary" className="mr-1">
              {challenge.solutions} solution{challenge.solutions === 1 ? "" : "s"}
            </Badge>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{challenge.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {challenge.description}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="mr-3">{challenge.views} views</span>
            <span>{challenge.likes} likes</span>
          </div>
          <Button variant="default" size="sm" asChild>
            <Link href={`/challenges/${challenge.id}`}>View Challenge</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}