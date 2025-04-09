
import React from "react";
import { Switch } from "@/components/ui/switch";

interface EnrollmentTriggersProps {
  // Add any props here if needed
}

const EnrollmentTriggers: React.FC<EnrollmentTriggersProps> = () => {
  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Welcome Message</h5>
          <p className="text-sm text-muted-foreground">
            Send a welcome email when a student enrolls
          </p>
        </div>
        <Switch id="welcome-message" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Course Materials</h5>
          <p className="text-sm text-muted-foreground">
            Deliver initial course materials
          </p>
        </div>
        <Switch id="course-materials" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Introduction Video</h5>
          <p className="text-sm text-muted-foreground">
            Send introduction video to new students
          </p>
        </div>
        <Switch id="intro-video" />
      </div>
    </div>
  );
};

export default EnrollmentTriggers;
