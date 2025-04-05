
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  HeadphonesIcon 
} from "lucide-react";
import {
  StudentTable,
  ProgressTracking,
  CommunicationTools,
  StudentSupport
} from "@/components/courses/students";

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

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Progress Tracking</h3>
          </div>
          <ProgressTracking />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Communication</h3>
          </div>
          <CommunicationTools />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <HeadphonesIcon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Support & Engagement</h3>
          </div>
          <StudentSupport />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsTab;
