
import React, { useState } from "react";
import {
  PricingModelSelector,
  FreePricingModel,
  OneTimePricingModel,
  PaymentPlanModel,
  SubscriptionPricingModel
} from "./models";

interface PricingModelsProps {
  editedCourse?: any;
  updateCourseData?: (field: string, value: any) => void;
}

const PricingModels: React.FC<PricingModelsProps> = ({ 
  editedCourse,
  updateCourseData
}) => {
  const [pricingModel, setPricingModel] = useState('one-time');

  return (
    <div className="space-y-4">
      <PricingModelSelector 
        pricingModel={pricingModel}
        setPricingModel={setPricingModel}
      />
      
      {pricingModel === 'free' && (
        <FreePricingModel 
          editedCourse={editedCourse}
          updateCourseData={updateCourseData}
        />
      )}
      
      {pricingModel === 'one-time' && (
        <OneTimePricingModel 
          editedCourse={editedCourse}
          updateCourseData={updateCourseData}
        />
      )}
      
      {pricingModel === 'payment-plan' && (
        <PaymentPlanModel 
          editedCourse={editedCourse}
          updateCourseData={updateCourseData}
        />
      )}
      
      {pricingModel === 'subscription' && (
        <SubscriptionPricingModel 
          editedCourse={editedCourse}
          updateCourseData={updateCourseData}
        />
      )}
    </div>
  );
};

export default PricingModels;
