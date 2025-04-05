
import React from "react";

interface PricingModelSelectorProps {
  pricingModel: string;
  setPricingModel: (model: string) => void;
}

const PricingModelSelector: React.FC<PricingModelSelectorProps> = ({
  pricingModel,
  setPricingModel
}) => {
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
