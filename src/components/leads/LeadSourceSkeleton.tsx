
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LeadSourceSkeleton = () => {
  return (
    <div className="space-y-5">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="grid grid-cols-5 p-4 items-center border-b last:border-b-0">
          <div className="col-span-2 flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
          </div>
          <div><Skeleton className="h-5 w-10" /></div>
          <div><Skeleton className="h-5 w-16" /></div>
          <div><Skeleton className="h-6 w-20 rounded-full" /></div>
        </div>
      ))}
    </div>
  );
};

export default LeadSourceSkeleton;
