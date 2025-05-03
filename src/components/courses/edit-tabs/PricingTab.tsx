
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DollarSign, 
  Tag
} from "lucide-react";
import {
  PricingModels,
  DiscountsManager
} from "@/components/courses/pricing";

interface PricingTabProps {
  editedCourse: any;
  setEditedCourse: (course: any) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({ 
  editedCourse, 
  setEditedCourse 
}) => {
  // Function to update any course property
  const updateCourseData = (field: string, value: any) => {
    setEditedCourse({
      ...editedCourse,
      [field]: value
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Pricing Models</h3>
          </div>
          <PricingModels 
            editedCourse={editedCourse}
            updateCourseData={updateCourseData}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Discounts & Promotions</h3>
          </div>
          <DiscountsManager />
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingTab;
