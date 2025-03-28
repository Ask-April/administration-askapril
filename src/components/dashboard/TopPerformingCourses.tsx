
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TopPerformingCourses = () => {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Top Performing Courses</CardTitle>
        <CardDescription>
          Based on student enrollment and ratings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
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
                    {["Advanced React Development", "JavaScript Fundamentals", "UX Design Principles"][index]}
                  </p>
                  <div className="flex items-center">
                    <span className="text-xs font-medium">
                      {[4.9, 4.8, 4.7][index]}
                    </span>
                    <span className="ml-1 text-yellow-500">★</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {[342, 287, 264][index]} students enrolled
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformingCourses;
