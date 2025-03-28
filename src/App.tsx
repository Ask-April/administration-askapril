import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Overview from "./pages/courses/Overview";
import Broadcasts from "./pages/Broadcasts";
import Communities from "./pages/Communities";
import Analytics from "./pages/Analytics";
import Leads from "./pages/Leads";
import EditCourse from "./pages/courses/EditCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<div>Auth Pages</div>} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/overview" element={<Overview />} />
                <Route path="/courses/edit/:id" element={<EditCourse />} />
                <Route path="/broadcasts" element={<Broadcasts />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/leads" element={<Leads />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
