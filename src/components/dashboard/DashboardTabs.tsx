
import React from "react";
import { Card } from "@/components/ui/card";
import OverviewChart from "./OverviewChart";

const DashboardTabs = () => {
  return (
    <Card className="h-full">
      <OverviewChart />
    </Card>
  );
};

export default DashboardTabs;
