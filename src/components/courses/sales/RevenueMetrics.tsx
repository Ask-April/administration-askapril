
import React from "react";
import { SalesMetricCard } from "@/components/courses/overview";

interface RevenueMetricsProps {
  // Add any props here if needed
}

const RevenueMetrics: React.FC<RevenueMetricsProps> = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <SalesMetricCard
        title="Total Revenue"
        value="$24,325"
        trend="+12%"
        period="vs. last month"
      />
      <SalesMetricCard
        title="Avg. Order Value"
        value="$89.50"
        trend="+3.2%"
        period="vs. last month"
      />
      <SalesMetricCard
        title="Refund Rate"
        value="2.3%"
        trend="-0.5%"
        period="vs. last month"
      />
    </div>
  );
};

export default RevenueMetrics;
