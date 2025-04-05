
import React from "react";
import ChartWrapper from "@/components/ui/charts/ChartWrapper";

interface GeographicDistributionProps {
  // Add any props here if needed
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = () => {
  const chartData = {
    labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
    datasets: [
      {
        data: [42, 28, 18, 7, 3, 2],
        backgroundColor: [
          '#9b87f5',
          '#0EA5E9',
          '#F97316',
          '#8B5CF6',
          '#D946EF',
          '#33C3F0',
        ],
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value * 100) / total);
            return `${label}: ${percentage}% (${value})`;
          }
        }
      }
    }
  };

  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Geographic Distribution</h4>
      <div className="h-64">
        <ChartWrapper 
          type="doughnut" 
          data={chartData} 
          options={chartOptions} 
          height={250} 
        />
      </div>
    </div>
  );
};

export default GeographicDistribution;
