
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CourseData } from "@/components/courses/wizard/types";

interface PaymentPlanModelProps {
  editedCourse?: any;
  updateCourseData?: ((data: Partial<CourseData>) => void) | ((field: string, value: any) => void);
}

const PaymentPlanModel: React.FC<PaymentPlanModelProps> = ({ 
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
  
  // Initialize pricing_data if it doesn't exist
  useEffect(() => {
    if (!editedCourse?.pricing_data) {
      updatePricingData({
        model: 'payment-plan',
        totalPrice: '299.99',
        installments: '3',
        installmentPeriod: '30',
        requireDownPayment: false,
        downPaymentPercent: '25'
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

  // Calculate the payment amount with 2 decimal places
  const calculatePaymentAmount = () => {
    const total = parseFloat(editedCourse?.pricing_data?.totalPrice || '299.99');
    const installments = parseFloat(editedCourse?.pricing_data?.installments || '3');
    return (total / installments).toFixed(2);
  };

  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Payment Plan Settings</h4>
      <div className="space-y-4">
        <div>
          <Label htmlFor="total-price">Total Price</Label>
          <div className="flex mt-1">
            <div className="flex items-center border rounded-l-md px-3 bg-muted">
              <span>$</span>
            </div>
            <Input 
              id="total-price" 
              type="number" 
              value={editedCourse?.pricing_data?.totalPrice || "299.99"}
              onChange={(e) => updateField('totalPrice', e.target.value)}
              className="rounded-l-none" 
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="installments">Number of Installments</Label>
          <Input 
            id="installments" 
            type="number" 
            value={editedCourse?.pricing_data?.installments || "3"}
            onChange={(e) => updateField('installments', e.target.value)}
            className="mt-1" 
          />
        </div>
        
        <div>
          <Label htmlFor="installment-period">Days Between Installments</Label>
          <Input 
            id="installment-period" 
            type="number" 
            value={editedCourse?.pricing_data?.installmentPeriod || "30"}
            onChange={(e) => updateField('installmentPeriod', e.target.value)}
            className="mt-1" 
          />
        </div>
        
        <div className="border rounded-md p-4 bg-muted/30">
          <h5 className="font-medium mb-2">Payment Breakdown</h5>
          <div className="text-sm">
            <p className="flex justify-between mb-1">
              <span>Initial payment:</span>
              <span>${calculatePaymentAmount()}</span>
            </p>
            <p className="flex justify-between mb-1">
              <span>{parseInt(editedCourse?.pricing_data?.installments || '3') - 1} additional payments:</span>
              <span>${calculatePaymentAmount()} every {editedCourse?.pricing_data?.installmentPeriod || '30'} days</span>
            </p>
            <p className="flex justify-between font-medium mt-2 pt-2 border-t">
              <span>Total:</span>
              <span>${parseFloat(editedCourse?.pricing_data?.totalPrice || '299.99').toFixed(2)}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Require Down Payment</h5>
            <p className="text-sm text-muted-foreground">
              First payment is higher than subsequent payments
            </p>
          </div>
          <Switch 
            id="down-payment"
            checked={editedCourse?.pricing_data?.requireDownPayment || false}
            onCheckedChange={(checked) => updateField('requireDownPayment', checked)}
          />
        </div>
        
        {editedCourse?.pricing_data?.requireDownPayment && (
          <div>
            <Label htmlFor="down-payment-percent">Down Payment Percentage</Label>
            <div className="flex mt-1">
              <Input 
                id="down-payment-percent" 
                type="number" 
                value={editedCourse?.pricing_data?.downPaymentPercent || "25"}
                onChange={(e) => updateField('downPaymentPercent', e.target.value)}
              />
              <div className="flex items-center border rounded-r-md px-3 bg-muted">
                <span>%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPlanModel;
