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
import Header from "@/components/header";
import Footer from "@/components/footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/learning-paths" component={LearningPaths} />
          <Route path="/hardware-library" component={HardwareLibrary} />
          <Route path="/tools" component={Tools} />
          <Route path="/resources" component={Resources} />
          <Route path="/tutorial/:id" component={Tutorial} />
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
