
import React from "react";
import { Switch } from "@/components/ui/switch";

interface ProgressTrackingProps {
  // Add any props here if needed
}

const ProgressTracking: React.FC<ProgressTrackingProps> = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Completion Certificates</h5>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Automatically issue certificates upon course completion
          </p>
          <Switch id="auto-certificates" defaultChecked />
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Learning Analytics</h5>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Track engagement scores
            </p>
            <Switch id="engagement-scores" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Enable comparative metrics
            </p>
            <Switch id="comparative-metrics" />
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Achievement System</h5>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Enable badges
            </p>
            <Switch id="badges" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Enable leaderboard
            </p>
            <Switch id="leaderboard" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
