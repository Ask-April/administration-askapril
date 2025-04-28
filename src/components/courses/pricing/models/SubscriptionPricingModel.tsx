
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SubscriptionPricingModelProps {
  editedCourse?: any;
  updateCourseData?: (field: string, value: any) => void;
}

const SubscriptionPricingModel: React.FC<SubscriptionPricingModelProps> = ({ 
  editedCourse,
  updateCourseData
}) => {
  // Initialize pricing_data if it doesn't exist
  useEffect(() => {
    if (!editedCourse?.pricing_data) {
      updateCourseData && updateCourseData('pricing_data', {
        model: 'subscription',
        monthlyPrice: '9.99',
        annualPrice: '99.99',
        autoRenewal: true
      });
    }
  }, [editedCourse, updateCourseData]);

  const updatePricingData = (field: string, value: any) => {
    if (updateCourseData && editedCourse?.pricing_data) {
      const updatedPricingData = {
        ...editedCourse.pricing_data,
        [field]: value
      };
      updateCourseData('pricing_data', updatedPricingData);
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
                onChange={(e) => updatePricingData('monthlyPrice', e.target.value)}
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
                onChange={(e) => updatePricingData('annualPrice', e.target.value)}
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
            onCheckedChange={(checked) => updatePricingData('autoRenewal', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPricingModel;
