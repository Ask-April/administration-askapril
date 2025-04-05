import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Dashboard from "@/pages/Dashboard";
import CoursesOverview from "@/pages/courses/CoursesOverview";
import Courses from "@/pages/Courses";
import EditCourse from "@/pages/courses/EditCourse";
import Bundles from "@/pages/courses/Bundles";
import Categories from "@/pages/courses/Categories";
import People from "@/pages/courses/People";
import Reports from "@/pages/courses/Reports";
import Assignments from "@/pages/courses/Assignments";
import Coupons from "@/pages/courses/Coupons";
import MediaLibrary from "@/pages/courses/MediaLibrary";
import NotFound from "@/pages/NotFound";
import CreateCourse from "./pages/courses/CreateCourse";

const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Router>
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Courses routes */}
              <Route path="/courses/overview" element={<CoursesOverview />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/create" element={<CreateCourse />} />
              <Route path="/courses/edit/:id" element={<EditCourse />} />
              <Route path="/courses/bundles" element={<Bundles />} />
              <Route path="/courses/categories" element={<Categories />} />
              <Route path="/courses/people" element={<People />} />
              <Route path="/courses/reports" element={<Reports />} />
              <Route path="/courses/assignments" element={<Assignments />} />
              <Route path="/courses/coupons" element={<Coupons />} />
              <Route path="/courses/media" element={<MediaLibrary />} />
              
              {/* Other routes */}
              <Route path="/settings" element={<div>Settings</div>} />
              <Route path="/profile" element={<div>Profile</div>} />
              <Route path="/notifications" element={<div>Notifications</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
