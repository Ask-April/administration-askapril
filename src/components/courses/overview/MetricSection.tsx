
import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface MetricSectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  columns?: 2 | 3;
}

const MetricSection: React.FC<MetricSectionProps> = ({
  icon: Icon,
  title,
  children,
  columns = 2
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h4 className="text-md font-medium">{title}</h4>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
        {children}
      </div>
    </div>
  );
};

export default MetricSection;
