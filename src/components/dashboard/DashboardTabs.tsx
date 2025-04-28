import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewChart from "./OverviewChart";
const DashboardTabs = () => {
  return <Tabs defaultValue="overview" className="h-full w-full">
      
      <TabsContent value="overview" className="h-[400px] mt-4">
        <OverviewChart />
      </TabsContent>
      <TabsContent value="analytics" className="h-[400px]">
        {/* Analytics content would go here */}
      </TabsContent>
      <TabsContent value="reports" className="h-[400px]">
        {/* Reports content would go here */}
      </TabsContent>
    </Tabs>;
};
export default DashboardTabs;