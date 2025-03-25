
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

// Mock data for analytics
const revenueData = [
  { month: "Jan", revenue: 3000, students: 120 },
  { month: "Feb", revenue: 3500, students: 145 },
  { month: "Mar", revenue: 4200, students: 168 },
  { month: "Apr", revenue: 4800, students: 192 },
  { month: "May", revenue: 5500, students: 220 },
  { month: "Jun", revenue: 6300, students: 252 },
  { month: "Jul", revenue: 7100, students: 284 },
  { month: "Aug", revenue: 7800, students: 312 },
  { month: "Sep", revenue: 8500, students: 340 },
  { month: "Oct", revenue: 9200, students: 368 },
  { month: "Nov", revenue: 9900, students: 396 },
  { month: "Dec", revenue: 10600, students: 424 },
];

const courseEngagementData = [
  { name: "JavaScript Fundamentals", students: 932, completion: 78 },
  { name: "Introduction to Web Design", students: 487, completion: 64 },
  { name: "Advanced React Development", students: 654, completion: 52 },
  { name: "UX Design Principles", students: 321, completion: 87 },
  { name: "Python for Data Science", students: 876, completion: 71 },
];

const pieData = [
  { name: "Development", value: 45 },
  { name: "Design", value: 25 },
  { name: "Marketing", value: 20 },
  { name: "Data Science", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Analytics = () => {
  return (
    <PageTransition>
      <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Measure and analyze your learning platform's performance
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
          <Tabs defaultValue="overview" className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="w-full sm:w-auto flex gap-2">
            <Select defaultValue="90days">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">$48,294</CardTitle>
              <CardDescription>Total Revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">↑ 24%</span> from previous period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">2,834</CardTitle>
              <CardDescription>Total Students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">↑ 12%</span> from previous period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">76%</CardTitle>
              <CardDescription>Course Completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">↑ 8%</span> from previous period
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-full md:col-span-1">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue and enrollment trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="students" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full md:col-span-1">
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Course breakdown by category</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course Engagement</CardTitle>
            <CardDescription>Course performance metrics across your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseEngagementData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  barSize={40}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" name="Enrolled Students" fill="#8884d8" />
                  <Bar dataKey="completion" name="Completion Rate (%)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Analytics;
