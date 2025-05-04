
import React, { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { CourseData } from "@/components/courses/wizard/types";

interface FreePricingModelProps {
  editedCourse?: any;
  updateCourseData?: ((data: Partial<CourseData>) => void) | ((field: string, value: any) => void);
}

const FreePricingModel: React.FC<FreePricingModelProps> = ({ 
  editedCourse,
  updateCourseData
}) => {
  // Initialize pricing_data if it doesn't exist
  useEffect(() => {
    if (!editedCourse?.pricing_data) {
      updateCourseData && updatePricingData({
        model: 'free',
        completelyFree: true,
        freeTrial: false,
        freemium: false
      });
    }
  }, [editedCourse, updateCourseData]);

  const updatePricingData = (data: any) => {
    if (!updateCourseData) return;
    
    if (typeof updateCourseData === 'function') {
      // Check if it's the one-parameter or two-parameter version
      if (updateCourseData.length === 1) {
        // It's the (data: Partial<CourseData>) => void signature
        (updateCourseData as (data: Partial<CourseData>) => void)({
          pricing_data: data
        });
      } else {
        // It's the (field: string, value: any) => void signature
        (updateCourseData as (field: string, value: any) => void)('pricing_data', data);
      }
    }
  };

  const updateField = (field: string, value: any) => {
    if (updateCourseData && editedCourse?.pricing_data) {
      const updatedPricingData = {
        ...editedCourse.pricing_data,
        [field]: value
      };
      updatePricingData(updatedPricingData);
    }
  };

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
            checked={editedCourse?.pricing_data?.completelyFree !== false}
            onCheckedChange={(checked) => updateField('completelyFree', checked)}
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
            checked={editedCourse?.pricing_data?.freeTrial || false}
            onCheckedChange={(checked) => updateField('freeTrial', checked)}
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
            checked={editedCourse?.pricing_data?.freemium || false}
            onCheckedChange={(checked) => updateField('freemium', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default FreePricingModel;
