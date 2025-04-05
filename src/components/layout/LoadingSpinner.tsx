
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-4">
        <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
        <Skeleton className="h-32 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="pt-4 flex justify-center">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
