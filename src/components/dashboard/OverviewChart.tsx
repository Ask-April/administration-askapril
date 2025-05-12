
import React, { useState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useOverviewCharts } from "@/hooks/useOverviewCharts";
import { Loader2 } from "lucide-react";

// Chart color constants
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const OverviewChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"6m" | "1y" | "all">("6m");
  const {
    enrollmentData,
    isEnrollmentLoading,
    enrollmentError,
    revenueData,
    isRevenueLoading,
    revenueError,
    completionData,
    isCompletionLoading,
    completionError,
    popularCoursesData,
    isPopularCoursesLoading,
    popularCoursesError
  } = useOverviewCharts();

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Chart loading state
  const renderLoading = () => <div className="flex h-[300px] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>;

  // Chart error state
  const renderError = (message: string) => <div className="flex h-[300px] flex-col items-center justify-center text-center">
      <p className="text-muted-foreground">Error loading data</p>
      <p className="text-sm text-destructive">{message}</p>
    </div>;

  return (
    <div className="flex flex-col h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>
              Student enrollment and revenue trends
            </CardDescription>
          </div>
          <div className="mt-3 sm:mt-0">
            <Tabs value={timeRange} onValueChange={value => setTimeRange(value as "6m" | "1y" | "all")} className="w-[250px]">
              <TabsList>
                <TabsTrigger value="6m">6 Months</TabsTrigger>
                <TabsTrigger value="1y">1 Year</TabsTrigger>
                <TabsTrigger value="all">All Time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <Tabs defaultValue="enrollment" className="h-full">
          <TabsList className="mb-4">
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="completion">Course Completion</TabsTrigger>
            <TabsTrigger value="popularity">Course Popularity</TabsTrigger>
          </TabsList>
          
          <div className="h-[400px]">
            <TabsContent value="enrollment" className="h-full mt-0">
              {isEnrollmentLoading ? renderLoading() : enrollmentError ? renderError((enrollmentError as Error).message) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="count" name="New Enrollments" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
            
            <TabsContent value="revenue" className="h-full mt-0">
              {isRevenueLoading ? renderLoading() : revenueError ? renderError((revenueError as Error).message) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={value => formatCurrency(value)} />
                    <Tooltip formatter={value => formatCurrency(value as number)} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" name="Revenue" stroke="#00C49F" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
            
            <TabsContent value="completion" className="h-full mt-0">
              {isCompletionLoading ? renderLoading() : completionError ? renderError((completionError as Error).message) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={completionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Course Completions" fill="#FF8042" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
            
            <TabsContent value="popularity" className="h-full mt-0">
              {isPopularCoursesLoading ? renderLoading() : popularCoursesError ? renderError((popularCoursesError as Error).message) : (
                <div className="h-full">
                  <h3 className="text-md font-medium mb-2 text-center">Top Courses by Enrollment</h3>
                  <div className="h-[calc(100%-30px)]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={popularCoursesData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={150} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="students" fill="#0088FE" name="Students" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </div>
  );
};

export default OverviewChart;
