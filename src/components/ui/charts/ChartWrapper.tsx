
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export type ChartType = 'bar' | 'line' | 'pie' | 'doughnut';

interface ChartWrapperProps {
  type: ChartType;
  data: ChartData<any>;
  options?: ChartOptions<any>;
  height?: number;
  className?: string;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  type,
  data,
  options,
  height = 300,
  className
}) => {
  const defaultOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className={`w-full h-[${height}px] ${className || ''}`}>
      {type === 'bar' && <Bar data={data} options={mergedOptions} />}
      {type === 'line' && <Line data={data} options={mergedOptions} />}
      {type === 'pie' && <Pie data={data} options={mergedOptions} />}
      {type === 'doughnut' && <Doughnut data={data} options={mergedOptions} />}
    </div>
  );
};

export default ChartWrapper;
