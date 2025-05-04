
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  PricingModelSelector,
  FreePricingModel,
  OneTimePricingModel,
  PaymentPlanModel,
  SubscriptionPricingModel
} from "./models";
import { Card } from "@/components/ui/card";
import { CourseData } from "@/components/courses/wizard/types";

// Create a flexible interface that can handle both function signatures
interface PricingModelsProps {
  editedCourse?: any;
  updateCourseData?: ((data: Partial<CourseData>) => void) | ((field: string, value: any) => void);
}

const PricingModels: React.FC<PricingModelsProps> = ({ 
  editedCourse,
  updateCourseData
}) => {
  const [pricingModel, setPricingModel] = useState('one-time');
  const [basePrice, setBasePrice] = useState('99');
  const [currency, setCurrency] = useState('USD');
  const [hasTrialPeriod, setHasTrialPeriod] = useState(false);
  const [trialDays, setTrialDays] = useState('14');
  const [isDiscountAvailable, setIsDiscountAvailable] = useState(false);
  
  // Initialize from course data if available
  useEffect(() => {
    if (editedCourse?.pricing_data) {
      const pricingData = editedCourse.pricing_data;
      
      if (pricingData.model) {
        setPricingModel(pricingData.model);
      }
      
      if (pricingData.basePrice) {
        setBasePrice(String(pricingData.basePrice));
      }
      
      if (pricingData.currency) {
        setCurrency(pricingData.currency);
      }
      
      if (pricingData.hasTrialPeriod !== undefined) {
        setHasTrialPeriod(pricingData.hasTrialPeriod);
      }
      
      if (pricingData.trialDays) {
        setTrialDays(String(pricingData.trialDays));
      }
      
      if (pricingData.isDiscountAvailable !== undefined) {
        setIsDiscountAvailable(pricingData.isDiscountAvailable);
      }
    }
  }, [editedCourse]);
  
  // Helper function to update course data with proper function signature
  const updatePricingData = (pricingData: any) => {
    if (!updateCourseData) return;
    
    // Check if updateCourseData takes one parameter (Partial<CourseData>)
    // or two parameters (field: string, value: any)
    if (typeof updateCourseData === 'function') {
      if (updateCourseData.length === 1) {
        // It's the (data: Partial<CourseData>) => void signature
        (updateCourseData as (data: Partial<CourseData>) => void)({
          pricing_data: pricingData
        });
      } else {
        // It's the (field: string, value: any) => void signature
        (updateCourseData as (field: string, value: any) => void)('pricing_data', pricingData);
      }
    }
  };
  
  // Update course data when pricing details change
  useEffect(() => {
    if (updateCourseData) {
      const currentPricingData = editedCourse?.pricing_data || {};
      
      updatePricingData({
        ...currentPricingData,
        model: pricingModel,
        basePrice: parseFloat(basePrice) || 0,
        currency,
        hasTrialPeriod,
        trialDays: parseInt(trialDays) || 0,
        isDiscountAvailable
      });
    }
  }, [
    pricingModel, 
    basePrice, 
    currency, 
    hasTrialPeriod, 
    trialDays, 
    isDiscountAvailable, 
    updateCourseData, 
    editedCourse?.pricing_data
  ]);

  // Make sure we can see pricing model even if updateCourseData is not defined
  const handlePricingModelChange = (model: string) => {
    setPricingModel(model);
    if (updateCourseData) {
      const currentPricingData = editedCourse?.pricing_data || {};
      updatePricingData({
        ...currentPricingData,
        model
      });
    }
  };

  return (
    <div className="space-y-4">
      <PricingModelSelector 
        pricingModel={pricingModel}
        setPricingModel={handlePricingModelChange}
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
        <Card className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">One-Time Purchase Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base-price">Base Price</Label>
                <div className="flex items-center">
                  <Select 
                    value={currency} 
                    onValueChange={setCurrency}
                  >
                    <SelectTrigger className="w-24 mr-2">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="AUD">AUD</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="base-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="discount-toggle">Allow Discounts</Label>
                  <Switch
                    id="discount-toggle"
                    checked={isDiscountAvailable}
                    onCheckedChange={setIsDiscountAvailable}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable coupon codes and promotional discounts
                </p>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <OneTimePricingModel 
                editedCourse={editedCourse}
                updateCourseData={updateCourseData}
              />
            </div>
          </div>
        </Card>
      )}
      
      {pricingModel === 'payment-plan' && (
        <Card className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Plan Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full-price">Full Price</Label>
                <div className="flex items-center">
                  <Select 
                    value={currency} 
                    onValueChange={setCurrency}
                  >
                    <SelectTrigger className="w-24 mr-2">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="AUD">AUD</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="full-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <PaymentPlanModel 
                editedCourse={editedCourse}
                updateCourseData={updateCourseData}
              />
            </div>
          </div>
        </Card>
      )}
      
      {pricingModel === 'subscription' && (
        <Card className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Subscription Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subscription-price">Monthly Price</Label>
                <div className="flex items-center">
                  <Select 
                    value={currency} 
                    onValueChange={setCurrency}
                  >
                    <SelectTrigger className="w-24 mr-2">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="AUD">AUD</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="subscription-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="trial-toggle">Free Trial Period</Label>
                  <Switch
                    id="trial-toggle"
                    checked={hasTrialPeriod}
                    onCheckedChange={setHasTrialPeriod}
                  />
                </div>
                
                {hasTrialPeriod && (
                  <div className="mt-2">
                    <Label htmlFor="trial-days">Trial Days</Label>
                    <Input
                      id="trial-days"
                      type="number"
                      min="1"
                      max="90"
                      value={trialDays}
                      onChange={(e) => setTrialDays(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <SubscriptionPricingModel 
                editedCourse={editedCourse}
                updateCourseData={updateCourseData}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PricingModels;
