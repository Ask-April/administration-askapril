
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, BarChart, LineChart, PieChart, Users } from "lucide-react";

const Overview = () => {
  const stats = [
    { 
      title: "Total Students", 
      value: "4,385", 
      change: "+12%",
      trend: "up",
      icon: <Users className="h-4 w-4" />
    },
    { 
      title: "Course Enrollments", 
      value: "12,456", 
      change: "+24%",
      trend: "up",
      icon: <BarChart className="h-4 w-4" />
    },
    { 
      title: "Completion Rate", 
      value: "68%", 
      change: "-3%",
      trend: "down",
      icon: <PieChart className="h-4 w-4" />
    },
    { 
      title: "Average Rating", 
      value: "4.7/5", 
      change: "+0.2",
      trend: "up",
      icon: <LineChart className="h-4 w-4" />
    },
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Analytics Overview</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="bg-primary/10 p-2 rounded-full">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`flex items-center gap-1 text-xs mt-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{stat.change} from last month</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>Students and course enrollments over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Growth trend chart</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Monthly revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Revenue chart</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Course Distribution</CardTitle>
              <CardDescription>Enrollments by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Category distribution chart</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>Student age and location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Demographics chart</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Usage</CardTitle>
              <CardDescription>Platform access by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Device usage chart</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Overview;
