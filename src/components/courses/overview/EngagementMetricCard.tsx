
import React from "react";

interface EngagementMetricCardProps {
  title: string;
  perSession?: string;
  perStudent?: string;
  perModule?: string;
  videoCompletion?: string;
  downloads?: number;
  active?: string;
  reactivation?: string;
  averagePerWeek?: number;
}

const EngagementMetricCard: React.FC<EngagementMetricCardProps> = ({
  title,
  perSession,
  perStudent,
  perModule,
  videoCompletion,
  downloads,
  active,
  reactivation,
  averagePerWeek
}) => {
  return <div className="bg-card border rounded-md p-4">
      <h5 className="text-sm font-medium text-muted-foreground">{title}</h5>
      
      <div className="mt-2 space-y-1">
        {perSession && <p className="text-sm">Per session: <span className="font-medium">{perSession}</span></p>}
        {perStudent && <p className="text-sm">Per student: <span className="font-medium">{perStudent}</span></p>}
        {perModule && <p className="text-sm">Per module: <span className="font-medium">{perModule}</span></p>}
        
        {videoCompletion && <p className="text-sm">Video completion: <span className="font-medium">{videoCompletion}</span></p>}
        {downloads !== undefined && <p className="text-sm">Resource downloads: <span className="font-medium">{downloads}</span></p>}
        
        {active && <p className="text-sm">Active students: <span className="font-medium">{active}</span></p>}
        {reactivation && <p className="text-sm">Reactivation rate: <span className="font-medium">{reactivation}</span></p>}
        
        {averagePerWeek !== undefined && <p className="text-sm">Sessions per week: <span className="font-medium">{averagePerWeek}</span></p>}
      </div>
    </div>;
};

export default EngagementMetricCard;
