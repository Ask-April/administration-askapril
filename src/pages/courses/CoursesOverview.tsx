
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { RevenueChart } from "@/components/courses/sales/RevenueChart";
import { ActivityMetricCard } from "@/components/courses/overview/ActivityMetricCard";
import { EngagementMetricCard } from "@/components/courses/overview/EngagementMetricCard";
import { SalesMetricCard } from "@/components/courses/overview/SalesMetricCard";
import { MetricSection } from "@/components/courses/overview/MetricSection";

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
        <MetricSection>
          <SalesMetricCard />
          <ActivityMetricCard />
          <EngagementMetricCard />
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
