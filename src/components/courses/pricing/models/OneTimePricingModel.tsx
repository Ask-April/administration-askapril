
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CourseData } from "@/components/courses/wizard/types";

interface OneTimePricingModelProps {
  editedCourse?: any;
  updateCourseData?: ((data: Partial<CourseData>) => void) | ((field: string, value: any) => void);
}

const OneTimePricingModel: React.FC<OneTimePricingModelProps> = ({ 
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

  // Instead of updating 'price' directly, we'll use a pricing_data object
  useEffect(() => {
    // Initialize pricing_data if it doesn't exist
    if (!editedCourse?.pricing_data) {
      updatePricingData({
        model: 'one-time',
        price: '99.99',
        tieredPricing: false
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
      <h4 className="font-medium mb-4">One-Time Purchase Settings</h4>
      <div className="space-y-4">
        <div>
          <Label htmlFor="standard-price">Standard Price</Label>
          <div className="flex mt-1">
            <div className="flex items-center border rounded-l-md px-3 bg-muted">
              <span>$</span>
            </div>
            <Input 
              id="standard-price" 
              type="number" 
              value={editedCourse?.pricing_data?.price || "99.99"}
              onChange={(e) => updateField('price', e.target.value)}
              className="rounded-l-none" 
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Tiered Pricing</h5>
            <p className="text-sm text-muted-foreground">
              Offer different package levels
            </p>
          </div>
          <Switch 
            id="tiered-pricing"
            checked={editedCourse?.pricing_data?.tieredPricing || false}
            onCheckedChange={(checked) => updateField('tieredPricing', checked)}
          />
        </div>
        
        {editedCourse?.pricing_data?.tieredPricing && (
          <div className="border rounded-md p-4">
            <h5 className="font-medium mb-2">Package Tiers</h5>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="basic-tier">Basic Tier</Label>
                  <div className="flex mt-1">
                    <div className="flex items-center border rounded-l-md px-3 bg-muted">
                      <span>$</span>
                    </div>
                    <Input 
                      id="basic-tier" 
                      type="number" 
                      value={editedCourse?.pricing_data?.basicTier || "49.99"}
                      onChange={(e) => updateField('basicTier', e.target.value)}
                      className="rounded-l-none" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="premium-tier">Premium Tier</Label>
                  <div className="flex mt-1">
                    <div className="flex items-center border rounded-l-md px-3 bg-muted">
                      <span>$</span>
                    </div>
                    <Input 
                      id="premium-tier" 
                      type="number" 
                      value={editedCourse?.pricing_data?.premiumTier || "99.99"}
                      onChange={(e) => updateField('premiumTier', e.target.value)}
                      className="rounded-l-none" 
                    />
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">Add Tier</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneTimePricingModel;
