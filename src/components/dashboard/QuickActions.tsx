
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, GraduationCap, Users } from "lucide-react";

const QuickActions = () => {
  return (
    <Card className="col-span-full md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center">
            <BookOpen className="h-6 w-6" />
            <span>Add Course</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center">
            <Users className="h-6 w-6" />
            <span>Add Student</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center">
            <BarChart3 className="h-6 w-6" />
            <span>View Reports</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center">
            <GraduationCap className="h-6 w-6" />
            <span>Certificates</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
