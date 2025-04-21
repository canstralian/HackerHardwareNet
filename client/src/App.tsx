import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
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
import Header from "@/components/header";
import Footer from "@/components/footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
