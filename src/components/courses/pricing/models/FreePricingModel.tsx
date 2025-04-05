
import React from "react";
import { Switch } from "@/components/ui/switch";

interface FreePricingModelProps {
  editedCourse?: any;
  updateCourseData?: (field: string, value: any) => void;
}

const FreePricingModel: React.FC<FreePricingModelProps> = ({ 
  editedCourse,
  updateCourseData
}) => {
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Free Course Options</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Completely Free</h5>
            <p className="text-sm text-muted-foreground">
              No payment required at any point
            </p>
          </div>
          <Switch 
            id="completely-free"
            checked={editedCourse?.completelyFree || true}
            onCheckedChange={(checked) => updateCourseData && updateCourseData('completelyFree', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Free Trial</h5>
            <p className="text-sm text-muted-foreground">
              Free access for a limited time
            </p>
          </div>
          <Switch 
            id="free-trial"
            checked={editedCourse?.freeTrial || false}
            onCheckedChange={(checked) => updateCourseData && updateCourseData('freeTrial', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Freemium</h5>
            <p className="text-sm text-muted-foreground">
              Basic content free, premium content paid
            </p>
          </div>
          <Switch 
            id="freemium"
            checked={editedCourse?.freemium || false}
            onCheckedChange={(checked) => updateCourseData && updateCourseData('freemium', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default FreePricingModel;
