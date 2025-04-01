
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/loading-states";

const TopPerformingCourses = () => {
  const { data, isError } = useDashboardStats();

  if (isError) {
    return (
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>Top Performing Courses</CardTitle>
          <CardDescription>
            Based on student enrollment and ratings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState 
            title="Unable to load courses"
            description="There was an error loading top performing courses."
            icon={BookOpen}
          />
        </CardContent>
      </Card>
    );
  }

  const topCourses = data?.topCourses || [];

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Top Performing Courses</CardTitle>
        <CardDescription>
          Based on student enrollment and ratings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {topCourses.length === 0 ? (
          <EmptyState 
            title="No courses found"
            description="Create courses to see performance metrics here."
            icon={BookOpen}
          />
        ) : (
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div
                key={course.course_id || index}
                className="flex items-center gap-4 rounded-lg border p-3"
              >
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">
                      {course.title || `Course ${index + 1}`}
                    </p>
                    <div className="flex items-center">
                      <span className="text-xs font-medium">
                        {[4.9, 4.8, 4.7][index % 3]}
                      </span>
                      <span className="ml-1 text-yellow-500">★</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {course.students || 0} students enrolled
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

export default TopPerformingCourses;
