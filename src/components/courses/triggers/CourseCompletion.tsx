
import React from "react";
import { Switch } from "@/components/ui/switch";

interface CourseCompletionProps {
  // Add any props here if needed
}

const CourseCompletion: React.FC<CourseCompletionProps> = () => {
  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Congratulations Message</h5>
          <p className="text-sm text-muted-foreground">
            Send congratulations when course is completed
          </p>
        </div>
        <Switch id="congrats-message" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Certificate Delivery</h5>
          <p className="text-sm text-muted-foreground">
            Automatically deliver completion certificate
          </p>
        </div>
        <Switch id="certificate-delivery" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Next Steps</h5>
          <p className="text-sm text-muted-foreground">
            Recommend next courses or actions
          </p>
        </div>
        <Switch id="next-steps" defaultChecked />
      </div>
    </div>
  );
};

export default CourseCompletion;
