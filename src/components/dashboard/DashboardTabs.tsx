
import React from "react";
import { Card } from "@/components/ui/card";
import OverviewChart from "./OverviewChart";

const DashboardTabs = () => {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden">
        <OverviewChart />
      </div>
    </Card>
  );
};

export default DashboardTabs;
