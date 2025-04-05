
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  HeadphonesIcon 
} from "lucide-react";
import {
  StudentTable,
  ProgressTracking,
  CommunicationTools
} from "@/components/courses/students";

interface StudentsTabProps {
  courseId: string;
}

const StudentsTab: React.FC<StudentsTabProps> = ({ courseId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Student Management</h3>
          
          <Tabs defaultValue="enrollment" className="w-full">
            <TabsList className="mb-4 grid grid-cols-4 md:w-auto w-full">
              <TabsTrigger value="enrollment" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Enrollment</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden md:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden md:inline">Communication</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <HeadphonesIcon className="h-4 w-4" />
                <span className="hidden md:inline">Support</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enrollment" className="space-y-4">
              <StudentTable />
            </TabsContent>

            <TabsContent value="progress" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Progress Tracking</h4>
              <ProgressTracking />
            </TabsContent>

            <TabsContent value="communication" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Communication Tools</h4>
              <CommunicationTools />
            </TabsContent>

            <TabsContent value="support" className="border rounded-md p-4">
              <p className="text-muted-foreground">Support & engagement content coming soon</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsTab;
