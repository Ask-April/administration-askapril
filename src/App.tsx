
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
                  <Route path="/broadcasts" element={<Broadcasts />} />
                  <Route path="/communities" element={<Communities />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/leads" element={<Leads />} />
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
