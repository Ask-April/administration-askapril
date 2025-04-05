
import React from "react";
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
  InactivityDetection
} from "@/components/courses/triggers";

interface StudentJourneyTriggersProps {
  // Add props as needed
}

const StudentJourneyTriggers: React.FC<StudentJourneyTriggersProps> = () => {
  return (
    <div>
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
    </div>
  );
};

export default StudentJourneyTriggers;
