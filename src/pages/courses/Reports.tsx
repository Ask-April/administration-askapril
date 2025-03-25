
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Course Reports</h1>
        
        <Tabs defaultValue="enrollment" className="mb-6">
          <TabsList>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="completion">Completion</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrollment" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Enrollment Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Enrollment trend chart</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <PieChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Enrollment by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Category distribution chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="completion" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Completion Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Completion rate chart</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Average Completion Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Completion time chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Revenue Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Revenue trend chart</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <PieChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Revenue by Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Course revenue distribution chart</p>
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

export default Reports;
