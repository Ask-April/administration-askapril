
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  amount?: string;
  image?: string;
}

interface CourseProgressContainerProps {
  activities: ActivityItem[];
}

const ActivityItem = ({ activity }: { activity: ActivityItem }) => {
  return (
    <div className="flex items-start space-x-3 p-3 border-b last:border-0">
      <div className="rounded-md bg-muted p-2">
        {activity.image ? (
          <img
            src={activity.image}
            alt={activity.type}
            className="w-8 h-8 object-cover"
          />
        ) : (
          <div className="w-8 h-8 flex items-center justify-center text-muted-foreground">
            {activity.type.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-sm">{activity.title}</h4>
          {activity.amount && (
            <span className="text-green-600 font-medium text-sm">
              ${activity.amount}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {activity.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
      </div>
    </div>
  );
};

const CourseProgressContainer: React.FC<CourseProgressContainerProps> = ({
  activities,
}) => {
  return (
    <Card className="col-span-12 md:col-span-4 h-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between border-b pb-3 mb-2">
          <h2 className="font-medium">Recent Activity</h2>
        </div>
        {activities.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-1 max-h-[400px] overflow-y-auto">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseProgressContainer;
