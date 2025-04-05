
import React from "react";

interface PaymentProcessingProps {
  // Add any props here if needed
}

const PaymentProcessing: React.FC<PaymentProcessingProps> = () => {
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Payment Processing</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Stripe</span>
          <span className="text-sm font-medium">78%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">PayPal</span>
          <span className="text-sm font-medium">15%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Credit Card (Direct)</span>
          <span className="text-sm font-medium">7%</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
