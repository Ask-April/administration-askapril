
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import { BarChart3, BookOpen, GraduationCap, Users } from "lucide-react";

const StatCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Students"
        value="2,834"
        icon={Users}
        trend="up"
        trendValue="12%"
      />
      <StatCard
        title="Active Courses"
        value="42"
        icon={BookOpen}
        trend="up"
        trendValue="4%"
      />
      <StatCard
        title="Course Completions"
        value="1,248"
        icon={GraduationCap}
        trend="up"
        trendValue="18%"
      />
      <StatCard
        title="Total Revenue"
        value="$48,294"
        icon={BarChart3}
        trend="up"
        trendValue="24%"
      />
    </div>
  );
};

export default StatCards;
