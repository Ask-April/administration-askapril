
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import RevenueChart from "@/components/courses/sales/RevenueChart";
import ActivityMetricCard from "@/components/courses/overview/ActivityMetricCard";
import EngagementMetricCard from "@/components/courses/overview/EngagementMetricCard";
import SalesMetricCard from "@/components/courses/overview/SalesMetricCard";
import MetricSection from "@/components/courses/overview/MetricSection";
import { BarChart3 } from "lucide-react";

const CoursesOverview = () => {
  return (
    <PageTransition>
      <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Course Overview</h1>
          <p className="text-muted-foreground">
            Monitor your course performance and analytics
          </p>
        </div>

        {/* Metrics Section */}
        <MetricSection icon={BarChart3} title="Course Metrics" columns={3}>
          <SalesMetricCard title="Total Enrollments" value="132" trend="+12%" period="Monthly" />
          <ActivityMetricCard title="New Enrollments" last24h={5} last7d={28} last30d={86} />
          <EngagementMetricCard title="Average Time Spent" perSession="32 min" perStudent="4.2 hours" perModule="58 min" />
        </MetricSection>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          <RevenueChart />
        </div>
      </div>
    </PageTransition>
  );
};

export default CoursesOverview;
