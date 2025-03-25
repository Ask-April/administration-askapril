
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our new components
import GeneralSettings from "./components/GeneralSettings";
import ModerationSettings from "./components/ModerationSettings";
import NotificationSettings from "./components/NotificationSettings";
import MembershipSettings from "./components/MembershipSettings";
import ReportsView from "./components/ReportsView";

const Manage = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Manage Communities</h1>
        
        <Tabs defaultValue="general" className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <GeneralSettings />
          </TabsContent>
          
          <TabsContent value="moderation" className="mt-6">
            <ModerationSettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="membership" className="mt-6">
            <MembershipSettings />
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <ReportsView />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Manage;
