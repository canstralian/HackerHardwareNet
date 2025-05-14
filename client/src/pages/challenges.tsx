import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState, useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Filter,
  SlidersHorizontal,
  Search,
  X,
  ArrowDownAZ,
  ArrowUpAZ,
  Eye,
  ThumbsUp,
  Calendar,
  Loader2,
  Plus,
} from "lucide-react";
import PageHeader from "@/components/page-header";

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

// Define sort options
type SortOption = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showActiveFilters, setShowActiveFilters] = useState(false);

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

  // Extract unique tags from all challenges
  const allTags = useMemo(() => {
    if (!challenges) return [];
    const tagSet = new Set<string>();
    challenges.forEach((challenge) => {
      challenge.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [challenges]);

  // Sort options with icons
  const sortOptions: SortOption[] = [
    { label: "Newest First", value: "newest", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { label: "Oldest First", value: "oldest", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { label: "Most Views", value: "views", icon: <Eye className="h-4 w-4 mr-2" /> },
    { label: "Most Likes", value: "likes", icon: <ThumbsUp className="h-4 w-4 mr-2" /> },
    { label: "Title A-Z", value: "titleAsc", icon: <ArrowDownAZ className="h-4 w-4 mr-2" /> },
    { label: "Title Z-A", value: "titleDesc", icon: <ArrowUpAZ className="h-4 w-4 mr-2" /> },
  ];

  // Check if any filters are applied
  const hasActiveFilters = useMemo(() => {
    return (
      difficultyFilter !== "all" ||
      categoryFilter !== "all" ||
      searchTerm !== "" ||
      selectedTags.length > 0
    );
  }, [difficultyFilter, categoryFilter, searchTerm, selectedTags]);

  // Update UI when filters change
  useEffect(() => {
    setShowActiveFilters(hasActiveFilters);
  }, [hasActiveFilters]);

  // Reset all filters
  const clearFilters = () => {
    setDifficultyFilter("all");
    setCategoryFilter("all");
    setSearchTerm("");
    setSelectedTags([]);
    setSortOption("newest");
  };

  // Handle tag selection/deselection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Filter challenges based on all criteria
  const filterChallenges = (challenges: SecurityChallenge[] | undefined) => {
    if (!challenges) return [];

    let filtered = challenges.filter((challenge) => {
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
        
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => challenge.tags.includes(tag));

      return matchesSearch && matchesDifficulty && matchesCategory && matchesTags;
    });

    // Sort the filtered challenges
    return sortChallenges(filtered);
  };

  // Sort challenges based on selected option
  const sortChallenges = (challenges: SecurityChallenge[]) => {
    switch (sortOption) {
      case "newest":
        return [...challenges].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return [...challenges].sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "views":
        return [...challenges].sort((a, b) => (b.views || 0) - (a.views || 0));
      case "likes":
        return [...challenges].sort((a, b) => (b.likes || 0) - (a.likes || 0));
      case "titleAsc":
        return [...challenges].sort((a, b) => a.title.localeCompare(b.title));
      case "titleDesc":
        return [...challenges].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return challenges;
    }
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

      {/* Search and Main Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-end relative">
        <div className="flex-1 relative">
          <div className="absolute top-0 bottom-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-0 bottom-0 flex items-center justify-center"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        
        {/* Filter Button on Mobile */}
        <div className="md:hidden w-full">
          <Button 
            variant="outline" 
            className="w-full justify-between" 
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <span className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {selectedTags.length + 
                   (difficultyFilter !== "all" ? 1 : 0) + 
                   (categoryFilter !== "all" ? 1 : 0)}
                </Badge>
              )}
            </span>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Desktop Filters */}
        <div className="hidden md:flex gap-3">
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-[160px]">
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
          
          <Select
            value={difficultyFilter}
            onValueChange={setDifficultyFilter}
          >
            <SelectTrigger className="w-[160px]">
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
          
          {/* Tag Filter Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[160px] justify-between">
                Tags
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <div className="p-4 max-h-[300px] overflow-y-auto">
                {allTags.length === 0 ? (
                  <div className="text-center py-2 text-muted-foreground">
                    No tags available
                  </div>
                ) : (
                  <div className="space-y-2">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tag-${tag}`} 
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        <Label 
                          htmlFor={`tag-${tag}`}
                          className="text-sm cursor-pointer w-full"
                        >
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {selectedTags.length > 0 && (
                <div className="border-t p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear selections
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[160px] justify-between">
                <span className="flex items-center">
                  {sortOptions.find(option => option.value === sortOption)?.icon}
                  <span className="ml-1">Sort</span>
                </span>
                <SlidersHorizontal className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  className={`flex items-center cursor-pointer ${sortOption === option.value ? 'bg-accent' : ''}`}
                  onClick={() => setSortOption(option.value)}
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              onClick={clearFilters}
              className="gap-1 text-muted-foreground hover:text-foreground"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button variant="default" asChild>
          <Link href="/challenges/create" className="flex items-center">
            <Plus className="mr-1 h-4 w-4" /> Create
          </Link>
        </Button>
      </div>
      
      {/* Mobile Filter Panel */}
      {filtersOpen && (
        <div className="md:hidden mb-6 p-4 border rounded-lg bg-card space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="mobile-category">Category</Label>
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger id="mobile-category">
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
            
            <div className="space-y-2">
              <Label htmlFor="mobile-difficulty">Difficulty</Label>
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger id="mobile-difficulty">
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobile-sort">Sort by</Label>
            <Select
              value={sortOption}
              onValueChange={setSortOption}
            >
              <SelectTrigger id="mobile-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      {option.icon}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="border rounded-md p-2 max-h-[150px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {allTags.length === 0 ? (
                  <div className="col-span-2 text-center py-2 text-muted-foreground">
                    No tags available
                  </div>
                ) : (
                  allTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mobile-tag-${tag}`} 
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => toggleTag(tag)}
                      />
                      <Label 
                        htmlFor={`mobile-tag-${tag}`}
                        className="text-sm cursor-pointer w-full truncate"
                      >
                        {tag}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button 
              variant="outline" 
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              Clear all
            </Button>
            <Button 
              variant="default" 
              onClick={() => setFiltersOpen(false)}
            >
              Apply filters
            </Button>
          </div>
        </div>
      )}
      
      {/* Active Filters Display */}
      {showActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categoryFilter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setCategoryFilter("all")} 
              />
            </Badge>
          )}
          
          {difficultyFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Difficulty: {difficultyFilter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setDifficultyFilter("all")} 
              />
            </Badge>
          )}
          
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleTag(tag)} 
              />
            </Badge>
          ))}
          
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchTerm.length > 15 ? `${searchTerm.substring(0, 15)}...` : searchTerm}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSearchTerm("")} 
              />
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-6 text-xs text-muted-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

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
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              )}
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
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              )}
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