
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  action 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;
