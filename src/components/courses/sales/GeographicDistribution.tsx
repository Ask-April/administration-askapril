
import React from "react";

interface GeographicDistributionProps {
  // Add any props here if needed
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = () => {
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Geographic Distribution</h4>
      <div className="h-64 bg-muted rounded-md flex items-center justify-center">
        <p className="text-muted-foreground">Geographic map visualization coming soon</p>
      </div>
    </div>
  );
};

export default GeographicDistribution;
