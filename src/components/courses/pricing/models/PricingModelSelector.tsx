
import React, { useEffect } from "react";
import { CourseData } from "@/components/courses/wizard/types";

interface PricingModelSelectorProps {
  pricingModel: string;
  setPricingModel: (model: string) => void;
  editedCourse?: any;
  updateCourseData?: ((data: Partial<CourseData>) => void) | ((field: string, value: any) => void);
}

const PricingModelSelector: React.FC<PricingModelSelectorProps> = ({
  pricingModel,
  setPricingModel,
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

  // When pricing model changes, update the pricing_data.model property
  useEffect(() => {
    if (updateCourseData && editedCourse) {
      const currentPricingData = editedCourse.pricing_data || {};
      updatePricingData({
        ...currentPricingData,
        model: pricingModel
      });
    }
  }, [pricingModel, updateCourseData, editedCourse]);

  return (
    <div className="border rounded-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          className={`border rounded-md p-4 cursor-pointer ${pricingModel === 'free' ? 'border-primary bg-primary/5' : ''}`}
          onClick={() => setPricingModel('free')}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Free Access</h4>
            <div className={`h-4 w-4 rounded-full ${pricingModel === 'free' ? 'bg-primary' : 'border'}`} />
          </div>
          <p className="text-sm text-muted-foreground">
            Offer your course for free to all students
          </p>
        </div>
        
        <div 
          className={`border rounded-md p-4 cursor-pointer ${pricingModel === 'one-time' ? 'border-primary bg-primary/5' : ''}`}
          onClick={() => setPricingModel('one-time')}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">One-Time Purchase</h4>
            <div className={`h-4 w-4 rounded-full ${pricingModel === 'one-time' ? 'bg-primary' : 'border'}`} />
          </div>
          <p className="text-sm text-muted-foreground">
            Charge a single fee for lifetime access
          </p>
        </div>
        
        <div 
          className={`border rounded-md p-4 cursor-pointer ${pricingModel === 'payment-plan' ? 'border-primary bg-primary/5' : ''}`}
          onClick={() => setPricingModel('payment-plan')}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Payment Plan</h4>
            <div className={`h-4 w-4 rounded-full ${pricingModel === 'payment-plan' ? 'bg-primary' : 'border'}`} />
          </div>
          <p className="text-sm text-muted-foreground">
            Split payments over multiple installments
          </p>
        </div>
        
        <div 
          className={`border rounded-md p-4 cursor-pointer ${pricingModel === 'subscription' ? 'border-primary bg-primary/5' : ''}`}
          onClick={() => setPricingModel('subscription')}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Subscription</h4>
            <div className={`h-4 w-4 rounded-full ${pricingModel === 'subscription' ? 'bg-primary' : 'border'}`} />
          </div>
          <p className="text-sm text-muted-foreground">
            Charge a recurring fee for ongoing access
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingModelSelector;
