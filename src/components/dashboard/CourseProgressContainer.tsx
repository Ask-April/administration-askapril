
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CourseProgress from "@/components/dashboard/CourseProgress";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/loading-states";

const CourseProgressContainer = () => {
  const { data, isError } = useDashboardStats();

  if (isError) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            Continue where you left off
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState 
            title="Unable to load progress"
            description="There was an error loading your course progress."
            icon={BookOpen}
          />
        </CardContent>
      </Card>
    );
  }

  const progressData = data?.studentProgress || [];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>
          Continue where you left off
        </CardDescription>
      </CardHeader>
      <CardContent>
        {progressData.length === 0 ? (
          <EmptyState 
            title="No courses in progress"
            description="Enroll in courses to track your progress here."
            icon={BookOpen}
            action={
              <Link to="/courses/overview">
                <Button variant="outline">Browse Courses</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {progressData.map((item, index) => (
              <CourseProgress
                key={item.enrollment_id || index}
                title={item.courses?.title || `Course ${index + 1}`}
                progress={Math.floor(item.progress_percent || 0)}
                total={100}
                image={item.courses?.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
              />
            ))}
            <Button variant="outline" className="w-full mt-2">
              <Link to="/courses/overview">View All Courses</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseProgressContainer;
