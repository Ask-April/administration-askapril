
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { StudentTable } from "@/components/courses/students";

interface StudentsTabProps {
  courseId: string;
}

const StudentsTab: React.FC<StudentsTabProps> = ({ courseId }) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Student Enrollment</h3>
          </div>
          <StudentTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsTab;
