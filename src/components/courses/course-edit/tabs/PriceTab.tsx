
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PriceTabProps {
  duration: string;
  onUpdateDuration: (value: string) => void;
}

const PriceTab: React.FC<PriceTabProps> = ({ 
  duration,
  onUpdateDuration
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium">Price & Plans</h3>
        <p className="text-muted-foreground mb-4">Set pricing options for your course.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md" 
              value={duration || ''}
              onChange={(e) => onUpdateDuration(e.target.value)}
              placeholder="e.g., 8 hours"
            />
          </div>
          
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium mb-2">Pricing Plans</h4>
            <div className="bg-muted rounded-md p-6 text-center">
              <p>No pricing plans yet</p>
              <Button className="mt-4" variant="outline">Add Plan</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTab;
