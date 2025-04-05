
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChartWrapper from "@/components/ui/charts/ChartWrapper";

const OverviewChart = () => {
  // Sample data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Enrollments',
        data: [30, 45, 57, 48, 65, 73],
        backgroundColor: 'rgba(155, 135, 245, 0.2)',
        borderColor: 'rgba(155, 135, 245, 1)',
        borderWidth: 2,
      },
      {
        label: 'Revenue ($00)',
        data: [12, 19, 27, 29, 38, 41],
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Student Enrollment & Revenue',
      },
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>
          Student enrollment and revenue trends
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <ChartWrapper 
          type="bar" 
          data={chartData} 
          options={chartOptions} 
          height={250} 
        />
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
