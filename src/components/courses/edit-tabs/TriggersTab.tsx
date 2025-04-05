
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  DollarSign, 
  Send, 
  Code 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EnrollmentTriggers,
  ProgressMilestones,
  CourseCompletion,
  InactivityDetection,
  AdministrativeTriggers,
  CommunicationChannels
} from "@/components/courses/triggers";

interface TriggersTabProps {
  courseId: string;
}

const TriggersTab: React.FC<TriggersTabProps> = ({ courseId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Automation & Triggers</h3>
          
          <Tabs defaultValue="student-journey" className="w-full">
            <TabsList className="mb-4 grid grid-cols-5 md:w-auto w-full">
              <TabsTrigger value="student-journey" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Student Journey</span>
              </TabsTrigger>
              <TabsTrigger value="administrative" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Administrative</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden md:inline">Financial</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden md:inline">Communication</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden md:inline">Advanced</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student-journey">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="enrollment">
                  <AccordionTrigger>Enrollment Triggers</AccordionTrigger>
                  <AccordionContent>
                    <EnrollmentTriggers />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="progress">
                  <AccordionTrigger>Progress Milestones</AccordionTrigger>
                  <AccordionContent>
                    <ProgressMilestones />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="course-completion">
                  <AccordionTrigger>Course Completion</AccordionTrigger>
                  <AccordionContent>
                    <CourseCompletion />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="inactivity">
                  <AccordionTrigger>Inactivity Detection</AccordionTrigger>
                  <AccordionContent>
                    <InactivityDetection />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="administrative" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Administrative Triggers</h4>
              <AdministrativeTriggers />
            </TabsContent>

            <TabsContent value="financial" className="border rounded-md p-4">
              <p className="text-muted-foreground">Financial triggers content coming soon</p>
            </TabsContent>

            <TabsContent value="communication" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Communication Channels</h4>
              <CommunicationChannels />
            </TabsContent>

            <TabsContent value="advanced" className="border rounded-md p-4">
              <p className="text-muted-foreground">Advanced automation content coming soon</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TriggersTab;
