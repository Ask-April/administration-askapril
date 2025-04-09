
import React from "react";
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
              value={editedCourse?.price || ""}
              onChange={(e) => updateCourseData && updateCourseData('price', e.target.value)}
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
            checked={editedCourse?.tieredPricing || false}
            onCheckedChange={(checked) => updateCourseData && updateCourseData('tieredPricing', checked)}
          />
        </div>
        
        {editedCourse?.tieredPricing && (
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
                      value="49.99"
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
                      value="99.99"
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
