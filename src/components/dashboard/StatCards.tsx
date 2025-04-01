
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import { BarChart3, BookOpen, GraduationCap, Users } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { EmptyState } from "@/components/ui/loading-states";

const StatCards = () => {
  const { data, isError, error } = useDashboardStats();

  if (isError) {
    console.error("Error loading dashboard stats:", error);
    return (
      <EmptyState 
        title="Unable to load stats" 
        description="There was an error loading your dashboard statistics. Please try again later."
        icon={BarChart3}
      />
    );
  }

  if (!data) {
    // This should never show since we're using Suspense
    return null;
  }

  // Format the revenue as USD
  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(data.totalRevenue);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Students"
        value={data.totalStudents.toString()}
        icon={Users}
        trend="up"
        trendValue="12%"
      />
      <StatCard
        title="Active Courses"
        value={data.totalCourses.toString()}
        icon={BookOpen}
        trend="up"
        trendValue="4%"
      />
      <StatCard
        title="Course Completions"
        value={data.totalCompletions.toString()}
        icon={GraduationCap}
        trend="up"
        trendValue="18%"
      />
      <StatCard
        title="Total Revenue"
        value={formattedRevenue}
        icon={BarChart3}
        trend="up"
        trendValue="24%"
      />
    </div>
  );
};

export default StatCards;
