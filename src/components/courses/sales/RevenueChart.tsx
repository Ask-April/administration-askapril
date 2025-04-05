
import React from "react";
import ChartWrapper from "@/components/ui/charts/ChartWrapper";

interface RevenueChartProps {
  // Add any props here if needed
}

const RevenueChart: React.FC<RevenueChartProps> = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [2100, 1950, 3400, 2800, 3650, 4200],
        backgroundColor: 'rgba(155, 135, 245, 0.2)',
        borderColor: 'rgba(155, 135, 245, 1)',
        borderWidth: 2,
        fill: true,
      }
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD' 
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      }
    }
  };

  return (
    <div className="border rounded-md p-4 mb-4">
      <h4 className="font-medium mb-4">Revenue Breakdown</h4>
      <div className="h-64">
        <ChartWrapper 
          type="line" 
          data={chartData} 
          options={chartOptions} 
          height={250} 
        />
      </div>
    </div>
  );
};

export default RevenueChart;
