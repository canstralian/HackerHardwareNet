import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  Settings, 
  ShoppingCart, 
  BookOpen,
  LogOut,
  Award
} from "lucide-react";

export default function DashboardPage() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch current user information
  const { data: authData, isLoading, error } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please login to access the dashboard",
      });
      navigate("/login");
    }
  }, [error, navigate, toast]);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await apiRequest("/api/auth/logout", {
        method: "POST"
      });

      if (response.ok) {
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account",
        });
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Logout failed",
          description: "An error occurred while logging out",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout error",
        description: "An unexpected error occurred",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-12 w-[250px]" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {authData?.firstName || "User"}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs 
          defaultValue="profile" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Award className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>View and update your profile details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
                      <p className="text-lg">{authData?.username || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p className="text-lg">{authData?.email || "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">First Name</h3>
                      <p className="text-lg">{authData?.firstName || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Last Name</h3>
                      <p className="text-lg">{authData?.lastName || "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Edit Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Manage your enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  You are not enrolled in any courses yet.
                </p>
                <div className="flex justify-center">
                  <Button>Browse Courses</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Achievements</CardTitle>
                <CardDescription>View your earned achievements and badges</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  You have not earned any achievements yet.
                </p>
                <div className="flex justify-center">
                  <Button>View All Achievements</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your previous orders and purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  You have not made any purchases yet.
                </p>
                <div className="flex justify-center">
                  <Button>Browse Shop</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Security</h3>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Email Preferences</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="emailNotifications" />
                      <label htmlFor="emailNotifications">Receive email notifications</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="marketingEmails" />
                      <label htmlFor="marketingEmails">Receive marketing emails</label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}