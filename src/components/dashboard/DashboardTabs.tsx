
import React from "react";
import { Card } from "@/components/ui/card";
import OverviewChart from "./OverviewChart";

const DashboardTabs = () => {
  return (
    <Card className="h-full">
      <div className="h-full">
        <OverviewChart />
      </div>
    </Card>
  );
};

export default DashboardTabs;
