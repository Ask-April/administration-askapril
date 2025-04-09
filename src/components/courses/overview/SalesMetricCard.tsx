
import React from "react";

interface SalesMetricCardProps {
  title: string;
  value?: string;
  trend?: string;
  period?: string;
  reviews?: number;
  benchmark?: string;
  industry?: string;
  highest?: string;
  lowest?: string;
  nextMonth?: string;
  nextQuarter?: string;
  confidence?: string;
}

const SalesMetricCard: React.FC<SalesMetricCardProps> = ({
  title,
  value,
  trend,
  period,
  reviews,
  benchmark,
  industry,
  highest,
  lowest,
  nextMonth,
  nextQuarter,
  confidence
}) => {
  return <div className="bg-card border rounded-md p-4">
      <h5 className="text-sm font-medium text-muted-foreground">{title}</h5>
      {value && <p className="text-xl font-bold mt-1">{value}</p>}
      <div className="mt-2 space-y-1">
        {trend && <p className="text-sm text-emerald-600">{trend} {period && `(${period})`}</p>}
        {reviews && <p className="text-sm text-muted-foreground">{reviews} reviews</p>}
        {benchmark && <p className="text-sm text-muted-foreground">Benchmark: {benchmark}</p>}
        {industry && <p className="text-sm text-muted-foreground">Industry avg: {industry}</p>}
        {highest && <p className="text-sm text-muted-foreground">Highest: {highest}</p>}
        {lowest && <p className="text-sm text-muted-foreground">Lowest: {lowest}</p>}
        {nextMonth && <p className="text-sm text-muted-foreground">Next month: {nextMonth}</p>}
        {nextQuarter && <p className="text-sm text-muted-foreground">Next quarter: {nextQuarter}</p>}
        {confidence && <p className="text-sm text-muted-foreground">Confidence: {confidence}</p>}
      </div>
    </div>;
};

export default SalesMetricCard;
