
import React from "react";
import { Switch } from "@/components/ui/switch";

interface ProgressMilestonesProps {
  // Add any props here if needed
}

const ProgressMilestones: React.FC<ProgressMilestonesProps> = () => {
  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Percentage Completion</h5>
          <p className="text-sm text-muted-foreground">
            Send notifications at key completion percentages
          </p>
        </div>
        <Switch id="percentage-completion" defaultChecked />
      </div>
      
      <div className="pl-6">
        <p className="text-sm mb-2">Notify at these percentages:</p>
        <div className="flex flex-wrap gap-2">
          {[25, 50, 75, 100].map((percent) => (
            <div key={percent} className="flex items-center space-x-2">
              <Switch id={`percent-${percent}`} defaultChecked={percent === 50 || percent === 100} />
              <label htmlFor={`percent-${percent}`} className="text-sm">{percent}%</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Module Completion</h5>
          <p className="text-sm text-muted-foreground">
            Send notification when a module is completed
          </p>
        </div>
        <Switch id="module-completion" />
      </div>
    </div>
  );
};

export default ProgressMilestones;
