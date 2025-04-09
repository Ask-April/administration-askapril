
import React from "react";
import { Switch } from "@/components/ui/switch";

interface FinancialTriggersProps {
  // Add props as needed
}

const FinancialTriggers: React.FC<FinancialTriggersProps> = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Payment Received</h5>
          <p className="text-sm text-muted-foreground">
            Send confirmation when payment is received
          </p>
        </div>
        <Switch id="payment-received" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Payment Failed</h5>
          <p className="text-sm text-muted-foreground">
            Alert when payment fails
          </p>
        </div>
        <Switch id="payment-failed" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Subscription Renewal</h5>
          <p className="text-sm text-muted-foreground">
            Notify before subscription renews
          </p>
        </div>
        <Switch id="subscription-renewal" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Refund Processed</h5>
          <p className="text-sm text-muted-foreground">
            Send notification when refund is processed
          </p>
        </div>
        <Switch id="refund-processed" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Coupon Applied</h5>
          <p className="text-sm text-muted-foreground">
            Track when coupons are used
          </p>
        </div>
        <Switch id="coupon-applied" defaultChecked />
      </div>
    </div>
  );
};

export default FinancialTriggers;
