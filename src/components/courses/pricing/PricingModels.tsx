
import React, { useState, useEffect } from "react";
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
  
  // Initialize from course data if available
  useEffect(() => {
    if (editedCourse?.pricing_data?.model) {
      setPricingModel(editedCourse.pricing_data.model);
    }
  }, [editedCourse]);

  // When pricing model changes, update the course data
  useEffect(() => {
    if (updateCourseData && editedCourse) {
      const currentPricingData = editedCourse.pricing_data || {};
      
      // Set default values for the pricing model
      let defaultData = {};
      switch (pricingModel) {
        case 'free':
          defaultData = { completelyFree: true };
          break;
        case 'one-time':
          defaultData = { price: '99.99' };
          break;
        case 'payment-plan':
          defaultData = { 
            fullPrice: '499.99', 
            installmentPlans: [{ months: 3, price: '179.99' }] 
          };
          break;
        case 'subscription':
          defaultData = { 
            monthlyPrice: '9.99', 
            annualPrice: '99.99' 
          };
          break;
      }

      updateCourseData('pricing_data', {
        ...currentPricingData,
        model: pricingModel,
        ...defaultData
      });
    }
  }, [pricingModel, updateCourseData, editedCourse]);

  return (
    <div className="space-y-4">
      <PricingModelSelector 
        pricingModel={pricingModel}
        setPricingModel={setPricingModel}
        editedCourse={editedCourse}
        updateCourseData={updateCourseData}
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
