
import React, { Suspense } from "react";
import PageTransition from "@/components/layout/PageTransition";
import StatCards from "@/components/dashboard/StatCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import CourseProgressContainer from "@/components/dashboard/CourseProgressContainer";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TopPerformingCourses from "@/components/dashboard/TopPerformingCourses";
import QuickActions from "@/components/dashboard/QuickActions";
import { 
  StatCardSkeleton, 
  ChartSkeleton, 
  CourseProgressSkeleton, 
  RecentActivitySkeleton 
} from "@/components/ui/loading-states";

// Sample data for activity feed
const sampleActivities = [
  {
    id: "1",
    type: "course",
    title: "Started React Fundamentals",
    description: "You began a new course",
    date: "2 hours ago"
  },
  {
    id: "2",
    type: "certificate",
    title: "Earned Certificate",
    description: "TypeScript Advanced Concepts",
    date: "Yesterday",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    type: "payment",
    title: "Course Purchase",
    description: "UI/UX Design Principles",
    date: "3 days ago",
    amount: "49.99"
  },
  {
    id: "4",
    type: "achievement",
    title: "Achievement Unlocked",
    description: "Completed 5 courses",
    date: "Last week",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    type: "forum",
    title: "Forum Activity",
    description: "Replied to discussion thread",
    date: "Last week"
  }
];

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
        
        <Suspense fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array(4).fill(0).map((_, i) => <StatCardSkeleton key={i} />)}
          </div>
        }>
          <StatCards />
        </Suspense>
        
        <div className="grid gap-4 md:grid-cols-8 lg:grid-cols-12 h-[500px]">
          <div className="col-span-full lg:col-span-8">
            <Suspense fallback={<ChartSkeleton />}>
              <DashboardTabs />
            </Suspense>
          </div>
          
          <div className="col-span-full lg:col-span-4 h-full">
            <Suspense fallback={<CourseProgressSkeleton />}>
              <CourseProgressContainer activities={sampleActivities} />
            </Suspense>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<RecentActivitySkeleton />}>
            <RecentActivity />
          </Suspense>
          
          <Suspense fallback={<RecentActivitySkeleton />}>
            <TopPerformingCourses />
          </Suspense>
          
          <QuickActions />
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
