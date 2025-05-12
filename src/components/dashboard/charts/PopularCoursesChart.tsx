
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CoursePopularityData } from "@/hooks/charts/useOverviewCharts";
import { Loader2 } from "lucide-react";

interface PopularCoursesChartProps {
  data: CoursePopularityData[];
  isLoading: boolean;
  error: Error | null;
}

const PopularCoursesChart: React.FC<PopularCoursesChartProps> = ({ data, isLoading, error }) => {
  // Chart loading state
  const renderLoading = () => (
    <div className="flex h-[300px] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );

  // Chart error state
  const renderError = (message: string) => (
    <div className="flex h-[300px] flex-col items-center justify-center text-center">
      <p className="text-muted-foreground">Error loading data</p>
      <p className="text-sm text-destructive">{message}</p>
    </div>
  );

  if (isLoading) return renderLoading();
  if (error) return renderError((error as Error).message);

  return (
    <div className="h-full">
      <h3 className="text-md font-medium mb-2 text-center">Top Courses by Enrollment</h3>
      <div className="h-[calc(100%-30px)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
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
  );
};

export default PopularCoursesChart;
