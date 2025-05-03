
import React from "react";
import { Card } from "@/components/ui/card";
import OverviewChart from "./OverviewChart";

const DashboardTabs = () => {
  return (
    <Card className="h-full">
      <div className="h-full p-4">
        <OverviewChart />
      </div>
    </Card>
  );
};

export default DashboardTabs;
