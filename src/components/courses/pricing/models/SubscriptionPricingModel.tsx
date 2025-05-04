
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CourseData } from "@/components/courses/wizard/types";

interface SubscriptionPricingModelProps {
  editedCourse?: any;
  updateCourseData?: ((data: Partial<CourseData>) => void) | ((field: string, value: any) => void);
}

const SubscriptionPricingModel: React.FC<SubscriptionPricingModelProps> = ({ 
  editedCourse,
  updateCourseData
}) => {
  // Helper function to update pricing data, handling both function signatures
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
  
  // Initialize pricing_data if it doesn't exist
  useEffect(() => {
    if (!editedCourse?.pricing_data) {
      updatePricingData({
        model: 'subscription',
        monthlyPrice: '9.99',
        annualPrice: '99.99',
        autoRenewal: true
      });
    }
  }, [editedCourse, updateCourseData]);

  const updateField = (field: string, value: any) => {
    if (editedCourse?.pricing_data) {
      const updatedPricingData = {
        ...editedCourse.pricing_data,
        [field]: value
      };
      updatePricingData(updatedPricingData);
    }
  };

  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Subscription Settings</h4>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="monthly-price">Monthly Price</Label>
            <div className="flex mt-1">
              <div className="flex items-center border rounded-l-md px-3 bg-muted">
                <span>$</span>
              </div>
              <Input 
                id="monthly-price" 
                type="number" 
                value={editedCourse?.pricing_data?.monthlyPrice || "9.99"}
                onChange={(e) => updateField('monthlyPrice', e.target.value)}
                className="rounded-l-none" 
              />
            </div>
          </div>
          <div>
            <Label htmlFor="annual-price">Annual Price</Label>
            <div className="flex mt-1">
              <div className="flex items-center border rounded-l-md px-3 bg-muted">
                <span>$</span>
              </div>
              <Input 
                id="annual-price" 
                type="number" 
                value={editedCourse?.pricing_data?.annualPrice || "99.99"}
                onChange={(e) => updateField('annualPrice', e.target.value)}
                className="rounded-l-none" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Auto-Renewal</h5>
            <p className="text-sm text-muted-foreground">
              Automatically renew subscriptions
            </p>
          </div>
          <Switch 
            id="auto-renewal"
            checked={editedCourse?.pricing_data?.autoRenewal !== false}
            onCheckedChange={(checked) => updateField('autoRenewal', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPricingModel;
