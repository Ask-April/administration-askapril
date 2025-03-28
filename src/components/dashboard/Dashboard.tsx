
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import StatCards from "@/components/dashboard/StatCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import CourseProgressContainer from "@/components/dashboard/CourseProgressContainer";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TopPerformingCourses from "@/components/dashboard/TopPerformingCourses";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <PageTransition>
      <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your learning platform.
          </p>
        </div>
        
        <StatCards />
        
        <div className="grid gap-4 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-full lg:col-span-8">
            <DashboardTabs />
          </div>
          
          <div className="col-span-full lg:col-span-4">
            <CourseProgressContainer />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RecentActivity />
          <TopPerformingCourses />
          <QuickActions />
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
