
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const CourseSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col">
        <Skeleton className="h-40 w-full rounded-none" />
        <div className="p-4 space-y-3">
          <div className="flex">
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-16 w-full" />
          <div className="flex items-center justify-between pt-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export const CourseSkeletonGrid = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6).fill(0).map((_, index) => (
        <CourseSkeleton key={index} />
      ))}
    </div>
  );
};
