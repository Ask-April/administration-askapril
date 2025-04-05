
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { format } from "date-fns";
import { EmptyState } from "@/components/ui/loading-states";

// This component is now used in other pages, but its main dashboard functionality
// has been moved to the CourseProgressContainer
const RecentActivity = () => {
  const { data, isError } = useDashboardStats();

  if (isError) {
    return (
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest actions on your platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState 
            title="Unable to load activity"
            description="There was an error loading recent activity."
            icon={Users}
          />
        </CardContent>
      </Card>
    );
  }

  const recentEnrollments = data?.recentEnrollments || [];

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions on your platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recentEnrollments.length === 0 ? (
          <EmptyState 
            title="No recent activity"
            description="Student enrollments will appear here as they happen."
            icon={Users}
          />
        ) : (
          <div className="space-y-4">
            {recentEnrollments.map((enrollment, index) => (
              <div
                key={enrollment.enrollment_id || index}
                className="flex items-start gap-4 rounded-lg border p-3"
              >
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    New student enrolled
                  </p>
                  <p className="text-xs text-muted-foreground">
                    A student joined {enrollment.courses?.title || "a course"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {enrollment.enroll_date 
                      ? format(new Date(enrollment.enroll_date), 'MMM d, yyyy') 
                      : "Recently"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
