
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const RecentActivity = () => {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions on your platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
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
                  John Smith joined Advanced React Development
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  2 hours ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
