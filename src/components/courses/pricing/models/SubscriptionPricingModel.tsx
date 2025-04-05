
import React from "react";
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
                value={editedCourse?.monthlyPrice || "9.99"}
                onChange={(e) => updateCourseData && updateCourseData('monthlyPrice', e.target.value)}
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
                value={editedCourse?.annualPrice || "99.99"}
                onChange={(e) => updateCourseData && updateCourseData('annualPrice', e.target.value)}
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
            checked={editedCourse?.autoRenewal || true}
            onCheckedChange={(checked) => updateCourseData && updateCourseData('autoRenewal', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPricingModel;
