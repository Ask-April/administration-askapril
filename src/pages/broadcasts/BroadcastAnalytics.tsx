
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";

const BroadcastAnalytics = () => {
  const stats = [
    { title: "Total Sent", value: "126,432", change: "+8% from last month" },
    { title: "Average Open Rate", value: "42.7%", change: "+3.2% from last month" },
    { title: "Average Click Rate", value: "15.3%", change: "+1.8% from last month" },
    { title: "Unsubscribe Rate", value: "0.8%", change: "-0.2% from last month" },
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Broadcast Analytics</h1>

        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Email performance chart</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <PieChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Subscriber Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Subscriber growth chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="campaigns" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Campaign performance chart</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Conversion Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Conversion rates chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <PieChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email Client Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Email client distribution chart</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Click Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Click distribution chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default BroadcastAnalytics;
