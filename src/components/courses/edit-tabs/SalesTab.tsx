
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  FileText 
} from "lucide-react";
import {
  RevenueMetrics,
  RevenueChart,
  PaymentProcessing,
  TransactionHistory,
  CustomerInsights,
  GeographicDistribution,
  DevicePlatform,
  CustomerSegmentation
} from "@/components/courses/sales";

interface SalesTabProps {
  courseId: string;
}

const SalesTab: React.FC<SalesTabProps> = ({ courseId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Sales & Analytics</h3>
          
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="mb-4 grid grid-cols-4 md:w-auto w-full">
              <TabsTrigger value="revenue" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden md:inline">Revenue</span>
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Customers</span>
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden md:inline">Marketing</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden md:inline">Reports</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="border rounded-md p-4">
              <RevenueMetrics />
              <RevenueChart />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PaymentProcessing />
                <TransactionHistory />
              </div>
            </TabsContent>

            <TabsContent value="customers" className="border rounded-md p-4">
              <div className="space-y-4">
                <CustomerInsights />
                <GeographicDistribution />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DevicePlatform />
                  <CustomerSegmentation />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="marketing" className="border rounded-md p-4">
              <p className="text-muted-foreground">Marketing performance content coming soon</p>
            </TabsContent>

            <TabsContent value="reports" className="border rounded-md p-4">
              <p className="text-muted-foreground">Reports & exports content coming soon</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesTab;
