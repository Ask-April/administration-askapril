
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface OneTimePricingModelProps {
  editedCourse?: any;
  updateCourseData?: (field: string, value: any) => void;
}

const OneTimePricingModel: React.FC<OneTimePricingModelProps> = ({ 
  editedCourse,
  updateCourseData
}) => {
  // Instead of updating 'price' directly, we'll use a pricing_data object
  useEffect(() => {
    // Initialize pricing_data if it doesn't exist
    if (!editedCourse?.pricing_data) {
      updateCourseData && updateCourseData('pricing_data', {
        model: 'one-time',
        price: '99.99',
        tieredPricing: false
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
              onChange={(e) => updatePricingData('price', e.target.value)}
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
            onCheckedChange={(checked) => updatePricingData('tieredPricing', checked)}
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
                      onChange={(e) => updatePricingData('basicTier', e.target.value)}
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
                      onChange={(e) => updatePricingData('premiumTier', e.target.value)}
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
