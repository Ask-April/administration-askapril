
import React from "react";
import { SalesMetricCard } from "@/components/courses/overview";

interface CustomerInsightsProps {
  // Add any props here if needed
}

const CustomerInsights: React.FC<CustomerInsightsProps> = () => {
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Customer Insights</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SalesMetricCard
          title="Total Customers"
          value="527"
          trend="+24"
          period="this month"
        />
        <SalesMetricCard
          title="Returning Customers"
          value="36%"
          trend="+2.1%"
          period="vs. last month"
        />
        <SalesMetricCard
          title="Avg. Lifetime Value"
          value="$215"
          trend="+$12"
          period="vs. last month"
        />
      </div>
      
      <div className="h-64 bg-muted rounded-md flex items-center justify-center">
        <p className="text-muted-foreground">Customer demographics visualization coming soon</p>
      </div>
    </div>
  );
};

export default CustomerInsights;
