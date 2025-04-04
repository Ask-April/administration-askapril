
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
import { Button } from "@/components/ui/button";

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <SalesMetricCard
                  title="Total Revenue"
                  value="$24,325"
                  trend="+12%"
                  period="vs. last month"
                />
                <SalesMetricCard
                  title="Avg. Order Value"
                  value="$89.50"
                  trend="+3.2%"
                  period="vs. last month"
                />
                <SalesMetricCard
                  title="Refund Rate"
                  value="2.3%"
                  trend="-0.5%"
                  period="vs. last month"
                />
              </div>
              
              <div className="border rounded-md p-4 mb-4">
                <h4 className="font-medium mb-4">Revenue Breakdown</h4>
                <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Revenue chart visualization coming soon</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">Payment Processing</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Stripe</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">PayPal</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Credit Card (Direct)</span>
                      <span className="text-sm font-medium">7%</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">Transaction History</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Recent transactions will appear here
                  </p>
                  <Button variant="outline">View All Transactions</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customers" className="border rounded-md p-4">
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">Customer Insights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <SalesMetricCard
                      title="Total Customers"
                      value="527"
                      trend="+24"
                      period="this month"
                    />
                    <SalesMetricCard
                      title="Returning Customers"
                      value="36%"
                      trend="+2.1%"
                      period="vs. last month"
                    />
                    <SalesMetricCard
                      title="Avg. Lifetime Value"
                      value="$215"
                      trend="+$12"
                      period="vs. last month"
                    />
                  </div>
                  
                  <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Customer demographics visualization coming soon</p>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">Geographic Distribution</h4>
                  <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Geographic map visualization coming soon</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-4">Device & Platform</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Desktop</span>
                        <span className="text-sm font-medium">64%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Mobile</span>
                        <span className="text-sm font-medium">29%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Tablet</span>
                        <span className="text-sm font-medium">7%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-4">Customer Segmentation</h4>
                    <Button>View Customer Segments</Button>
                  </div>
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

interface SalesMetricCardProps {
  title: string;
  value: string;
  trend: string;
  period: string;
}

const SalesMetricCard: React.FC<SalesMetricCardProps> = ({ 
  title, 
  value, 
  trend, 
  period 
}) => {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="border rounded-md p-4">
      <h5 className="text-sm font-medium text-muted-foreground">{title}</h5>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className={`text-sm mt-1 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
        {trend} <span className="text-muted-foreground">{period}</span>
      </p>
    </div>
  );
};

export default SalesTab;
