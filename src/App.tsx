
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Courses from "./pages/Courses";
import Overview from "./pages/courses/Overview";
import CreateCourse from "./pages/courses/CreateCourse";
import Broadcasts from "./pages/Broadcasts";
import Communities from "./pages/Communities";
import Analytics from "./pages/Analytics";
import Leads from "./pages/Leads";
import EditCourse from "./pages/courses/EditCourse";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { useProtectedRoute } from "./hooks/auth/use-protected-route";
import Bundles from "./pages/courses/Bundles";
import Categories from "./pages/courses/Categories";
import Assignments from "./pages/courses/Assignments";
import Coupons from "./pages/courses/Coupons";
import People from "./pages/courses/People";
import MediaLibrary from "./pages/courses/MediaLibrary";
import Reports from "./pages/courses/Reports";

// Lead pages
import AllLeads from "./pages/leads/AllLeads";
import LeadForms from "./pages/leads/LeadForms";
import LeadSources from "./pages/leads/LeadSources";
import LeadTags from "./pages/leads/LeadTags";

// Broadcast pages
import AllBroadcasts from "./pages/broadcasts/AllBroadcasts";
import Subscribers from "./pages/broadcasts/Subscribers";
import BroadcastAnalytics from "./pages/broadcasts/BroadcastAnalytics";
import BroadcastSettings from "./pages/broadcasts/BroadcastSettings";

// Community pages
import AllCommunities from "./pages/communities/AllCommunities";
import Discussions from "./pages/communities/Discussions";
import Members from "./pages/communities/Members";
import Manage from "./pages/communities/Manage";
import CommunitySettings from "./pages/communities/CommunitySettings";

// Analytics pages
import AnalyticsOverview from "./pages/analytics/Overview";
import Traffic from "./pages/analytics/Traffic";
import Conversions from "./pages/analytics/Conversions";

function App() {
  const ProtectedRoute = useProtectedRoute();

  return (
    <Router>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  
                  {/* Courses routes */}
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/overview" element={<Overview />} />
                  <Route path="/courses/create" element={<CreateCourse />} />
                  <Route path="/courses/edit/:id" element={<EditCourse />} />
                  <Route path="/courses/bundles" element={<Bundles />} />
                  <Route path="/courses/categories" element={<Categories />} />
                  <Route path="/courses/assignments" element={<Assignments />} />
                  <Route path="/courses/coupons" element={<Coupons />} />
                  <Route path="/courses/people" element={<People />} />
                  <Route path="/courses/media" element={<MediaLibrary />} />
                  <Route path="/courses/reports" element={<Reports />} />
                  
                  {/* Leads routes */}
                  <Route path="/leads" element={<Leads />} />
                  <Route path="/leads/all" element={<AllLeads />} />
                  <Route path="/leads/forms" element={<LeadForms />} />
                  <Route path="/leads/sources" element={<LeadSources />} />
                  <Route path="/leads/tags" element={<LeadTags />} />
                  
                  {/* Broadcasts routes */}
                  <Route path="/broadcasts" element={<Broadcasts />} />
                  <Route path="/broadcasts/all" element={<AllBroadcasts />} />
                  <Route path="/broadcasts/subscribers" element={<Subscribers />} />
                  <Route path="/broadcasts/analytics" element={<BroadcastAnalytics />} />
                  <Route path="/broadcasts/settings" element={<BroadcastSettings />} />
                  
                  {/* Communities routes */}
                  <Route path="/communities" element={<Communities />} />
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
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
