
import React from "react";

interface RevenueChartProps {
  // Add any props here if needed
}

const RevenueChart: React.FC<RevenueChartProps> = () => {
  return (
    <div className="border rounded-md p-4 mb-4">
      <h4 className="font-medium mb-4">Revenue Breakdown</h4>
      <div className="h-64 bg-muted rounded-md flex items-center justify-center">
        <p className="text-muted-foreground">Revenue chart visualization coming soon</p>
      </div>
    </div>
  );
};

export default RevenueChart;
