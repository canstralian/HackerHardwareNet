import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import LearningPaths from "@/pages/learning-paths";
import HardwareLibrary from "@/pages/hardware-library";
import Tools from "@/pages/tools";
import Tutorial from "@/pages/tutorial";
import Resources from "@/pages/resources";
import Achievements from "@/pages/achievements";
import CompatibilityChecker from "@/pages/compatibility-checker";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Checkout from "@/pages/checkout";
import OLEDArticlePage from "@/pages/oled-article";
import ArticlesPage from "@/pages/articles";
import ArticleDetail from "@/pages/article-detail";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Challenges from "@/pages/challenges";
import ChallengeDetail from "@/pages/challenge-detail";
import MCP from "@/pages/MCP";
import MainPhilosophy from "@/pages/main-philosophy";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ChatWidget from "@/components/ChatWidget";
import { MobileNav } from '@/components/mobile-nav'; // Adding mobile navigation component

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MobileNav /> {/* Adding the mobile navigation */}
      <div className="flex flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/learning-paths" component={LearningPaths} />
          <Route path="/hardware-library" component={HardwareLibrary} />
          <Route path="/tools" component={Tools} />
          <Route path="/resources" component={Resources} />
          <Route path="/achievements" component={Achievements} />
          <Route path="/compatibility-checker" component={CompatibilityChecker} />
          <Route path="/tutorial/:id" component={Tutorial} />
          <Route path="/oled-article" component={OLEDArticlePage} />
          <Route path="/articles" component={ArticlesPage} />
          <Route path="/article/:id" component={ArticleDetail} />
          <Route path="/challenges" component={Challenges} />
          <Route path="/challenges/:id" component={ChallengeDetail} />
          <Route path="/mcp" component={MCP} />
          <Route path="/main" component={MainPhilosophy} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <ChatWidget />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;