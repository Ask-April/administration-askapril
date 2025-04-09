
import React from "react";
import { Switch } from "@/components/ui/switch";

interface InactivityDetectionProps {
  // Add any props here if needed
}

const InactivityDetection: React.FC<InactivityDetectionProps> = () => {
  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Reminder Thresholds</h5>
          <p className="text-sm text-muted-foreground">
            Send reminders when students are inactive
          </p>
        </div>
        <Switch id="inactivity-reminders" defaultChecked />
      </div>
      
      <div className="pl-6">
        <p className="text-sm mb-2">Send reminders after:</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="reminder-7" defaultChecked />
            <label htmlFor="reminder-7" className="text-sm">7 days inactive</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="reminder-14" defaultChecked />
            <label htmlFor="reminder-14" className="text-sm">14 days inactive</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="reminder-30" />
            <label htmlFor="reminder-30" className="text-sm">30 days inactive</label>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Re-engagement Content</h5>
          <p className="text-sm text-muted-foreground">
            Send motivational content to re-engage students
          </p>
        </div>
        <Switch id="re-engagement" />
      </div>
    </div>
  );
};

export default InactivityDetection;
