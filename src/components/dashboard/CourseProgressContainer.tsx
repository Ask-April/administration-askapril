
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CourseProgress from "@/components/dashboard/CourseProgress";

const CourseProgressContainer = () => {
  // Mock data for dashboard
  const courseProgressData = [
    { title: "Introduction to Web Design", progress: 7, total: 10, image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { title: "JavaScript Fundamentals", progress: 4, total: 12, image: "https://images.unsplash.com/photo-1592609931095-54a2168ae893?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { title: "Advanced React Development", progress: 2, total: 8, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>
          Continue where you left off
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courseProgressData.map((course, index) => (
            <CourseProgress
              key={index}
              title={course.title}
              progress={course.progress}
              total={course.total}
              image={course.image}
            />
          ))}
          <Button variant="outline" className="w-full mt-2">
            View All Courses
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgressContainer;
