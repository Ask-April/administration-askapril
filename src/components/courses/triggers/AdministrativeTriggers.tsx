
import React from "react";
import { Switch } from "@/components/ui/switch";

interface AdministrativeTriggersProps {
  // Add any props here if needed
}

const AdministrativeTriggers: React.FC<AdministrativeTriggersProps> = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Review Submission</h5>
          <p className="text-sm text-muted-foreground">
            Thank students when they submit a review
          </p>
        </div>
        <Switch id="review-thanks" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Question Posted</h5>
          <p className="text-sm text-muted-foreground">
            Notify instructors when questions are posted
          </p>
        </div>
        <Switch id="question-notification" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Content Updates</h5>
          <p className="text-sm text-muted-foreground">
            Notify students when course content is updated
          </p>
        </div>
        <Switch id="content-updates" />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Deadline Approaching</h5>
          <p className="text-sm text-muted-foreground">
            Remind students of upcoming assignment deadlines
          </p>
        </div>
        <Switch id="deadline-reminders" />
      </div>
    </div>
  );
};

export default AdministrativeTriggers;
