
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LeadListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-1 divide-y">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="grid grid-cols-7 p-4 items-center">
          <div className="col-span-2 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
          <div><Skeleton className="h-4 w-20" /></div>
          <div><Skeleton className="h-6 w-16 rounded-full" /></div>
          <div className="flex gap-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div><Skeleton className="h-4 w-28" /></div>
          <div><Skeleton className="h-8 w-16 rounded-md" /></div>
        </div>
      ))}
    </div>
  );
};

export default LeadListSkeleton;
