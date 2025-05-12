
import React, { useState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOverviewCharts } from "@/hooks/charts/useOverviewCharts";
import { EnrollmentChart, RevenueChart, CompletionChart, PopularCoursesChart } from "./charts";

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
          
          <div className="h-[350px]">
            <TabsContent value="enrollment" className="h-full mt-0">
              <EnrollmentChart 
                data={enrollmentData} 
                isLoading={isEnrollmentLoading} 
                error={enrollmentError as Error | null} 
              />
            </TabsContent>
            
            <TabsContent value="revenue" className="h-full mt-0">
              <RevenueChart 
                data={revenueData} 
                isLoading={isRevenueLoading} 
                error={revenueError as Error | null} 
              />
            </TabsContent>
            
            <TabsContent value="completion" className="h-full mt-0">
              <CompletionChart 
                data={completionData} 
                isLoading={isCompletionLoading} 
                error={completionError as Error | null} 
              />
            </TabsContent>
            
            <TabsContent value="popularity" className="h-full mt-0">
              <PopularCoursesChart 
                data={popularCoursesData} 
                isLoading={isPopularCoursesLoading} 
                error={popularCoursesError as Error | null} 
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </div>
  );
};

export default OverviewChart;
