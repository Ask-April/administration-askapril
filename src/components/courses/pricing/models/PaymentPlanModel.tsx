
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
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
        fullPrice: '499.99',
        installmentCount: 3,
        installmentPrice: '179.99',
        installmentPlans: [
          { months: 3, price: '179.99' }
        ]
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

  const addInstallmentPlan = () => {
    if (editedCourse?.pricing_data?.installmentPlans) {
      const plans = [...editedCourse.pricing_data.installmentPlans];
      plans.push({ months: 6, price: '99.99' });
      updatePricingData('installmentPlans', plans);
    }
  };

  const updateInstallmentPlan = (index: number, field: string, value: string | number) => {
    if (editedCourse?.pricing_data?.installmentPlans) {
      const plans = [...editedCourse.pricing_data.installmentPlans];
      plans[index] = { ...plans[index], [field]: value };
      updatePricingData('installmentPlans', plans);
    }
  };

  const removeInstallmentPlan = (index: number) => {
    if (editedCourse?.pricing_data?.installmentPlans) {
      const plans = [...editedCourse.pricing_data.installmentPlans];
      plans.splice(index, 1);
      updatePricingData('installmentPlans', plans);
    }
  };

  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Payment Plan Settings</h4>
      <div className="space-y-4">
        <div>
          <Label htmlFor="full-price">Full Price</Label>
          <div className="flex mt-1">
            <div className="flex items-center border rounded-l-md px-3 bg-muted">
              <span>$</span>
            </div>
            <Input 
              id="full-price" 
              type="number" 
              value={editedCourse?.pricing_data?.fullPrice || "499.99"}
              onChange={(e) => updatePricingData('fullPrice', e.target.value)}
              className="rounded-l-none" 
            />
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h5 className="font-medium mb-2">Installment Plans</h5>
          {editedCourse?.pricing_data?.installmentPlans?.map((plan: any, index: number) => (
            <div key={index} className="grid grid-cols-5 gap-2 items-end mb-2">
              <div className="col-span-2">
                <Label htmlFor={`months-${index}`}>Months</Label>
                <Input 
                  id={`months-${index}`} 
                  type="number" 
                  value={plan.months || 3}
                  onChange={(e) => updateInstallmentPlan(index, 'months', parseInt(e.target.value))}
                  min={1}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor={`price-${index}`}>Payment / Month</Label>
                <div className="flex">
                  <div className="flex items-center border rounded-l-md px-3 bg-muted">
                    <span>$</span>
                  </div>
                  <Input 
                    id={`price-${index}`} 
                    type="number" 
                    value={plan.price || "179.99"}
                    onChange={(e) => updateInstallmentPlan(index, 'price', e.target.value)}
                    className="rounded-l-none" 
                  />
                </div>
              </div>
              <div className="flex justify-end">
                {index > 0 && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => removeInstallmentPlan(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={addInstallmentPlan}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Installment Plan
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium">Down Payment</h5>
            <p className="text-sm text-muted-foreground">
              Require initial payment
            </p>
          </div>
          <Switch 
            id="down-payment"
            checked={editedCourse?.pricing_data?.downPayment || false}
            onCheckedChange={(checked) => updatePricingData('downPayment', checked)}
          />
        </div>
        
        {editedCourse?.pricing_data?.downPayment && (
          <div>
            <Label htmlFor="down-payment-amount">Down Payment Amount</Label>
            <div className="flex mt-1">
              <div className="flex items-center border rounded-l-md px-3 bg-muted">
                <span>$</span>
              </div>
              <Input 
                id="down-payment-amount" 
                type="number" 
                value={editedCourse?.pricing_data?.downPaymentAmount || "99.99"}
                onChange={(e) => updatePricingData('downPaymentAmount', e.target.value)}
                className="rounded-l-none" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPlanModel;
