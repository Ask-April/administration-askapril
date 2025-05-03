
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const LoadingSkeleton = () => {
  return <div className="w-full h-full flex items-center justify-center p-6">
      <div className="animate-pulse rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
};

export const StatCardSkeleton = () => {
  return <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>;
};

export const CourseProgressSkeleton = () => {
  return <div className="space-y-3">
      <div className="flex items-start gap-3">
        <Skeleton className="h-12 w-12 rounded" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-3/4" />
        </div>
      </div>
    </div>;
};

export const ChartSkeleton = () => {
  return <Card>
      <CardHeader>
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-48 mt-1" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>;
};

export const RecentActivitySkeleton = () => {
  return <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48 mt-1" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({
          length: 3
        }).map((_, index) => <div key={index} className="flex items-start gap-4 rounded-lg border p-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>)}
        </div>
      </CardContent>
    </Card>;
};

export const EmptyState = ({
  title = "Nothing here yet",
  description = "There is no data to display at this time.",
  icon: Icon,
  action
}: {
  title?: string;
  description?: string;
  icon?: React.ComponentType<any>;
  action?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
      {Icon && (
        <div className="rounded-full bg-muted p-3">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <div className="space-y-2">
        {title && <h3 className="text-lg font-medium">{title}</h3>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
