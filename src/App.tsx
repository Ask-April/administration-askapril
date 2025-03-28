import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Index";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

// Course pages
import Overview from "./pages/courses/Overview";
import CreateCourse from "./pages/courses/CreateCourse";
import Bundles from "./pages/courses/Bundles";
import Categories from "./pages/courses/Categories";
import Assignments from "./pages/courses/Assignments";
import Coupons from "./pages/courses/Coupons";
import People from "./pages/courses/People";
import MediaLibrary from "./pages/courses/MediaLibrary";
import Reports from "./pages/courses/Reports";

// Leads pages
import AllLeads from "./pages/leads/AllLeads";
import Funnels from "./pages/leads/Funnels";

// Broadcasts pages
import AllBroadcasts from "./pages/broadcasts/AllBroadcasts";
import Subscribers from "./pages/broadcasts/Subscribers";
import BroadcastAnalytics from "./pages/broadcasts/BroadcastAnalytics";

// Communities pages
import AllCommunities from "./pages/communities/AllCommunities";
import Discussions from "./pages/communities/Discussions";
import Members from "./pages/communities/Members";
import Manage from "./pages/communities/Manage";
import CommunitySettings from "./pages/communities/CommunitySettings";

// Analytics pages
import AnalyticsOverview from "./pages/analytics/Overview";
import Traffic from "./pages/analytics/Traffic";
import Conversions from "./pages/analytics/Conversions";

const App = () => {
  // Use useState to create the QueryClient instance to ensure it's only created once
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                
                {/* Courses routes */}
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/overview" element={<Overview />} />
                <Route path="/courses/create" element={<CreateCourse />} />
                <Route path="/courses/bundles" element={<Bundles />} />
                <Route path="/courses/categories" element={<Categories />} />
                <Route path="/courses/assignments" element={<Assignments />} />
                <Route path="/courses/coupons" element={<Coupons />} />
                <Route path="/courses/people" element={<People />} />
                <Route path="/courses/media" element={<MediaLibrary />} />
                <Route path="/courses/reports" element={<Reports />} />
                
                {/* Students route */}
                <Route path="/students" element={<Students />} />
                
                {/* Leads routes */}
                <Route path="/leads/all" element={<AllLeads />} />
                <Route path="/leads/funnels" element={<Funnels />} />
                
                {/* Broadcasts routes */}
                <Route path="/broadcasts/all" element={<AllBroadcasts />} />
                <Route path="/broadcasts/subscribers" element={<Subscribers />} />
                <Route path="/broadcasts/analytics" element={<BroadcastAnalytics />} />
                
                {/* Communities routes */}
                <Route path="/communities/all" element={<AllCommunities />} />
                <Route path="/communities/discussions" element={<Discussions />} />
                <Route path="/communities/members" element={<Members />} />
                <Route path="/communities/manage" element={<Manage />} />
                <Route path="/communities/settings" element={<CommunitySettings />} />
                
                {/* Analytics routes */}
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/analytics/overview" element={<AnalyticsOverview />} />
                <Route path="/analytics/traffic" element={<Traffic />} />
                <Route path="/analytics/conversions" element={<Conversions />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
