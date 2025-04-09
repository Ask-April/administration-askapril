
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PricingOptionsProps {
  editedCourse?: any;
  updateCourseData?: (field: string, value: any) => void;
}

const PricingOptions: React.FC<PricingOptionsProps> = ({ 
  editedCourse,
  updateCourseData
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="duration">Course Duration</Label>
        <Input
          id="duration"
          value={editedCourse?.duration || ""}
          onChange={(e) => updateCourseData && updateCourseData('duration', e.target.value)}
          placeholder="e.g., 8 hours, 6 weeks, etc."
          className="mt-1"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Payment Plans</h5>
          <p className="text-sm text-muted-foreground">
            Allow payment in installments
          </p>
        </div>
        <Switch 
          id="payment-plans"
          checked={editedCourse?.paymentPlans || false}
          onCheckedChange={(checked) => updateCourseData && updateCourseData('paymentPlans', checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Pay-Per-Module</h5>
          <p className="text-sm text-muted-foreground">
            Allow students to purchase individual modules
          </p>
        </div>
        <Switch 
          id="pay-per-module"
          checked={editedCourse?.payPerModule || false}
          onCheckedChange={(checked) => updateCourseData && updateCourseData('payPerModule', checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Pay-What-You-Want</h5>
          <p className="text-sm text-muted-foreground">
            Let students choose their own price
          </p>
        </div>
        <Switch 
          id="pay-what-you-want"
          checked={editedCourse?.payWhatYouWant || false}
          onCheckedChange={(checked) => updateCourseData && updateCourseData('payWhatYouWant', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Price Visibility</h5>
          <p className="text-sm text-muted-foreground">
            Show price on course landing page
          </p>
        </div>
        <Switch 
          id="price-visible"
          checked={editedCourse?.priceVisible !== false}
          onCheckedChange={(checked) => updateCourseData && updateCourseData('priceVisible', checked)}
        />
      </div>
    </div>
  );
};

export default PricingOptions;
