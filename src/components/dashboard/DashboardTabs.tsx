
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewChart from "./OverviewChart";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="overview" className="h-full w-full flex flex-col">
      <TabsList className="mx-auto mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="flex-1 mt-0">
        <OverviewChart />
      </TabsContent>
      <TabsContent value="analytics" className="flex-1">
        {/* Analytics content would go here */}
      </TabsContent>
      <TabsContent value="reports" className="flex-1">
        {/* Reports content would go here */}
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
