
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { RevenueData } from "@/hooks/charts/useOverviewCharts";
import { Loader2 } from "lucide-react";

interface RevenueChartProps {
  data: RevenueData[];
  isLoading: boolean;
  error: Error | null;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, isLoading, error }) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

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
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={value => formatCurrency(value)} />
        <Tooltip formatter={value => formatCurrency(value as number)} />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          name="Revenue"
          stroke="#00C49F"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
