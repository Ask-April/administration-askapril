
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CompletionData } from "@/hooks/charts/useOverviewCharts";
import { Loader2 } from "lucide-react";

interface CompletionChartProps {
  data: CompletionData[];
  isLoading: boolean;
  error: Error | null;
}

const CompletionChart: React.FC<CompletionChartProps> = ({ data, isLoading, error }) => {
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
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" name="Course Completions" fill="#FF8042" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CompletionChart;
