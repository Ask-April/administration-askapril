
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PaymentPlanModelProps {
  editedCourse?: any;
  updateCourseData?: (field: string, value: any) => void;
}

const PaymentPlanModel: React.FC<PaymentPlanModelProps> = ({ 
  editedCourse,
  updateCourseData
}) => {
  // Initialize pricing_data if it doesn't exist
  useEffect(() => {
    if (!editedCourse?.pricing_data) {
      updateCourseData && updateCourseData('pricing_data', {
        model: 'payment-plan',
        totalPrice: '299.99',
        installments: '3',
        installmentPeriod: '30',
        requireDownPayment: false,
        downPaymentPercent: '25'
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
              onChange={(e) => updatePricingData('totalPrice', e.target.value)}
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
            onChange={(e) => updatePricingData('installments', e.target.value)}
            className="mt-1" 
          />
        </div>
        
        <div>
          <Label htmlFor="installment-period">Days Between Installments</Label>
          <Input 
            id="installment-period" 
            type="number" 
            value={editedCourse?.pricing_data?.installmentPeriod || "30"}
            onChange={(e) => updatePricingData('installmentPeriod', e.target.value)}
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
            onCheckedChange={(checked) => updatePricingData('requireDownPayment', checked)}
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
                onChange={(e) => updatePricingData('downPaymentPercent', e.target.value)}
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
