
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Index";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

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
          <AnimatePresence mode="wait">
            <Routes>
              {/* Landing page as the entry point */}
              <Route path="/" element={<Landing />} />
              
              {/* Dashboard route */}
              <Route path="/dashboard" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              
              {/* Courses routes */}
              <Route path="/courses" element={
                <Layout>
                  <Courses />
                </Layout>
              } />
              <Route path="/courses/overview" element={
                <Layout>
                  <Overview />
                </Layout>
              } />
              <Route path="/courses/create" element={
                <Layout>
                  <CreateCourse />
                </Layout>
              } />
              <Route path="/courses/bundles" element={
                <Layout>
                  <Bundles />
                </Layout>
              } />
              <Route path="/courses/categories" element={
                <Layout>
                  <Categories />
                </Layout>
              } />
              <Route path="/courses/assignments" element={
                <Layout>
                  <Assignments />
                </Layout>
              } />
              <Route path="/courses/coupons" element={
                <Layout>
                  <Coupons />
                </Layout>
              } />
              <Route path="/courses/people" element={
                <Layout>
                  <People />
                </Layout>
              } />
              <Route path="/courses/media" element={
                <Layout>
                  <MediaLibrary />
                </Layout>
              } />
              <Route path="/courses/reports" element={
                <Layout>
                  <Reports />
                </Layout>
              } />
              
              {/* Students route */}
              <Route path="/students" element={
                <Layout>
                  <Students />
                </Layout>
              } />
              
              {/* Leads routes */}
              <Route path="/leads/all" element={
                <Layout>
                  <AllLeads />
                </Layout>
              } />
              <Route path="/leads/funnels" element={
                <Layout>
                  <Funnels />
                </Layout>
              } />
              
              {/* Broadcasts routes */}
              <Route path="/broadcasts/all" element={
                <Layout>
                  <AllBroadcasts />
                </Layout>
              } />
              <Route path="/broadcasts/subscribers" element={
                <Layout>
                  <Subscribers />
                </Layout>
              } />
              <Route path="/broadcasts/analytics" element={
                <Layout>
                  <BroadcastAnalytics />
                </Layout>
              } />
              
              {/* Communities routes */}
              <Route path="/communities/all" element={
                <Layout>
                  <AllCommunities />
                </Layout>
              } />
              <Route path="/communities/discussions" element={
                <Layout>
                  <Discussions />
                </Layout>
              } />
              <Route path="/communities/members" element={
                <Layout>
                  <Members />
                </Layout>
              } />
              <Route path="/communities/manage" element={
                <Layout>
                  <Manage />
                </Layout>
              } />
              <Route path="/communities/settings" element={
                <Layout>
                  <CommunitySettings />
                </Layout>
              } />
              
              {/* Analytics routes */}
              <Route path="/analytics" element={
                <Layout>
                  <Analytics />
                </Layout>
              } />
              <Route path="/analytics/overview" element={
                <Layout>
                  <AnalyticsOverview />
                </Layout>
              } />
              <Route path="/analytics/traffic" element={
                <Layout>
                  <Traffic />
                </Layout>
              } />
              <Route path="/analytics/conversions" element={
                <Layout>
                  <Conversions />
                </Layout>
              } />
              
              {/* Catch-all and redirection */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
