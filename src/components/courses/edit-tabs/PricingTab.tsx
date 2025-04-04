
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PricingTabProps {
  editedCourse: any;
  setEditedCourse: (course: any) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({ 
  editedCourse, 
  setEditedCourse 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium">Pricing</h3>
        <p className="text-muted-foreground mb-4">
          Set pricing options for your course.
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">
            Duration
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={editedCourse.duration || ""}
            onChange={(e) =>
              setEditedCourse({
                ...editedCourse,
                duration: e.target.value,
              })
            }
            placeholder="e.g., 8 hours"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingTab;
