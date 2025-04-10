import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { LucideIcon } from 'lucide-react';

// Define types for achievements
interface Achievement {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
  points: number;
  requirement: Record<string, any>;
  badgeUrl: string | null;
  tier: string;
  createdAt: string;
}

interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  progress: number;
  isComplete: boolean;
  unlockedAt: string | null;
  notified: boolean;
}

// Helper function to get icon component from string name
const getIconByName = (name: string): LucideIcon | null => {
  // @ts-ignore - Icons has dynamic keys
  return Icons[name] || null;
};

// Helper function to get color for tier
const getTierColor = (tier: string): string => {
  switch (tier.toLowerCase()) {
    case 'bronze':
      return 'bg-amber-700';
    case 'silver':
      return 'bg-slate-400';
    case 'gold':
      return 'bg-yellow-400';
    case 'platinum':
      return 'bg-cyan-200';
    default:
      return 'bg-slate-600';
  }
};

const AchievementCard = ({ achievement, userAchievement }: { achievement: Achievement, userAchievement?: UserAchievement }) => {
  const IconComponent = getIconByName(achievement.icon);
  const progress = userAchievement?.progress || 0;
  const isComplete = userAchievement?.isComplete || false;
  const tierColor = getTierColor(achievement.tier);
  
  // Format the requirement text
  let requirementText = 'Complete specific tasks';
  if (achievement.requirement.type === 'completeTutorials') {
    requirementText = `Complete ${achievement.requirement.count} tutorials`;
  } else if (achievement.requirement.type === 'completeTutorialsInCategory') {
    requirementText = `Complete ${achievement.requirement.count} ${achievement.requirement.category} tutorials`;
  } else if (achievement.requirement.type === 'achieveReputation') {
    requirementText = `Earn ${achievement.requirement.points} reputation points`;
  }
  
  return (
    <Card className={cn(
      "border-2 transition-all duration-300",
      isComplete ? "border-green-500 shadow-md shadow-green-200" : "border-gray-200"
    )}>
      <CardHeader className="relative pb-2">
        <div className="absolute top-3 right-3">
          <Badge className={cn("font-semibold", tierColor)}>
            {achievement.tier.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
          <div>
            <CardTitle className="text-lg">{achievement.name}</CardTitle>
            <CardDescription>{achievement.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground mb-2">{requirementText}</div>
        <div className="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="mt-1" />
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold">{achievement.points}</span> points
        </div>
        {isComplete && (
          <Badge variant="outline" className="border-green-500 text-green-600">
            <Icons.checkCircle className="mr-1 h-3 w-3" />
            Unlocked
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

const AchievementsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Fetch all achievements
  const { data: achievements = [], isLoading: isLoadingAchievements } = useQuery({
    queryKey: ['/api/achievements'],
  });
  
  // Get categories from achievements
  const categories = achievements.length > 0 
    ? ['all', ...new Set(achievements.map((a: Achievement) => a.category))]
    : ['all'];
  
  // Fetch current user's achievements (assuming user ID 1 for demo)
  const { data: userAchievements = [], isLoading: isLoadingUserAchievements } = useQuery({
    queryKey: ['/api/users/1/achievements'],
  });
  
  // Map user achievements by achievement ID for quick lookup
  const userAchievementMap = userAchievements.reduce((map: Record<number, UserAchievement>, ua: UserAchievement) => {
    map[ua.achievementId] = ua;
    return map;
  }, {});
  
  // Filter achievements by category
  const filteredAchievements = activeCategory === 'all'
    ? achievements
    : achievements.filter((a: Achievement) => a.category === activeCategory);
  
  // Group achievements by tier
  const tierOrder = ['platinum', 'gold', 'silver', 'bronze'];
  const achievementsByTier = tierOrder.map(tier => ({
    tier,
    achievements: filteredAchievements.filter((a: Achievement) => a.tier === tier)
  })).filter(group => group.achievements.length > 0);
  
  // Calculate stats
  const totalAchievements = achievements.length;
  const unlockedAchievements = userAchievements.filter((ua: UserAchievement) => ua.isComplete).length;
  const totalPoints = achievements.reduce((sum: number, a: Achievement) => sum + a.points, 0);
  const earnedPoints = achievements
    .filter((a: Achievement) => userAchievementMap[a.id]?.isComplete)
    .reduce((sum: number, a: Achievement) => sum + a.points, 0);
  
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-2">Achievements</h1>
      <p className="text-muted-foreground mb-6">
        Complete tasks and tutorials to earn achievements and build your hacker reputation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{unlockedAchievements} / {totalAchievements}</div>
            <Progress 
              value={(unlockedAchievements / Math.max(1, totalAchievements)) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Points Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{earnedPoints} / {totalPoints}</div>
            <Progress 
              value={(earnedPoints / Math.max(1, totalPoints)) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {earnedPoints >= 300 ? 'Expert' : 
               earnedPoints >= 200 ? 'Advanced' : 
               earnedPoints >= 100 ? 'Intermediate' : 'Beginner'}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {earnedPoints >= 300 ? 'You\'ve mastered the art of hacking!' : 
               earnedPoints >= 200 ? 'You\'re well on your way to mastery.' : 
               earnedPoints >= 100 ? 'You\'re making good progress.' : 'Just getting started.'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Achievement Collection</h2>
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <TabsContent value={activeCategory} className="mt-0">
          {isLoadingAchievements || isLoadingUserAchievements ? (
            <div className="py-10 text-center">
              <Icons.spinner className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">Loading achievements...</p>
            </div>
          ) : (
            <>
              {achievementsByTier.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-muted-foreground">No achievements found for this category.</p>
                </div>
              ) : (
                achievementsByTier.map(tierGroup => (
                  <div key={tierGroup.tier} className="mb-8">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-medium capitalize">{tierGroup.tier} Tier</h3>
                      <Separator className="ml-4 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tierGroup.achievements.map((achievement: Achievement) => (
                        <AchievementCard 
                          key={achievement.id} 
                          achievement={achievement} 
                          userAchievement={userAchievementMap[achievement.id]} 
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementsPage;