
import React from "react";

interface ActivityMetricCardProps {
  title: string;
  last24h?: number;
  last7d?: number;
  last30d?: number;
  count?: number;
  averageScore?: string;
  completionRate?: string;
  unanswered?: number;
  responseTime?: string;
  newPosts?: number;
  activeDiscussions?: number;
}

const ActivityMetricCard: React.FC<ActivityMetricCardProps> = ({
  title,
  last24h,
  last7d,
  last30d,
  count,
  averageScore,
  completionRate,
  unanswered,
  responseTime,
  newPosts,
  activeDiscussions
}) => {
  return <div className="bg-card border rounded-md p-4">
      <h5 className="text-sm font-medium text-muted-foreground">{title}</h5>
      
      <div className="mt-2 space-y-1">
        {last24h !== undefined && <p className="text-sm">Last 24h: <span className="font-medium">{last24h}</span></p>}
        {last7d !== undefined && <p className="text-sm">Last 7 days: <span className="font-medium">{last7d}</span></p>}
        {last30d !== undefined && <p className="text-sm">Last 30 days: <span className="font-medium">{last30d}</span></p>}
        
        {count !== undefined && <p className="text-sm">Count: <span className="font-medium">{count}</span></p>}
        {averageScore && <p className="text-sm">Average score: <span className="font-medium">{averageScore}</span></p>}
        {completionRate && <p className="text-sm">Completion rate: <span className="font-medium">{completionRate}</span></p>}
        
        {unanswered !== undefined && <p className="text-sm">Unanswered: <span className="font-medium">{unanswered}</span></p>}
        {responseTime && <p className="text-sm">Avg. response time: <span className="font-medium">{responseTime}</span></p>}
        
        {newPosts !== undefined && <p className="text-sm">New posts: <span className="font-medium">{newPosts}</span></p>}
        {activeDiscussions !== undefined && <p className="text-sm">Active discussions: <span className="font-medium">{activeDiscussions}</span></p>}
      </div>
    </div>;
};

export default ActivityMetricCard;
