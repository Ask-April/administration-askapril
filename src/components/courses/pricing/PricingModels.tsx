import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

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
      
      {pricingModel === 'free' && (
        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-4">Free Course Options</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Completely Free</h5>
                <p className="text-sm text-muted-foreground">
                  No payment required at any point
                </p>
              </div>
              <Switch 
                id="completely-free"
                checked={editedCourse?.completelyFree || true}
                onCheckedChange={(checked) => updateCourseData && updateCourseData('completelyFree', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Free Trial</h5>
                <p className="text-sm text-muted-foreground">
                  Free access for a limited time
                </p>
              </div>
              <Switch 
                id="free-trial"
                checked={editedCourse?.freeTrial || false}
                onCheckedChange={(checked) => updateCourseData && updateCourseData('freeTrial', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Freemium</h5>
                <p className="text-sm text-muted-foreground">
                  Basic content free, premium content paid
                </p>
              </div>
              <Switch 
                id="freemium"
                checked={editedCourse?.freemium || false}
                onCheckedChange={(checked) => updateCourseData && updateCourseData('freemium', checked)}
              />
            </div>
          </div>
        </div>
      )}
      
      {pricingModel === 'one-time' && (
        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-4">One-Time Purchase Settings</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="standard-price">Standard Price</Label>
              <div className="flex mt-1">
                <div className="flex items-center border rounded-l-md px-3 bg-muted">
                  <span>$</span>
                </div>
                <Input 
                  id="standard-price" 
                  type="number" 
                  value={editedCourse?.price || ""}
                  onChange={(e) => updateCourseData && updateCourseData('price', e.target.value)}
                  className="rounded-l-none" 
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Tiered Pricing</h5>
                <p className="text-sm text-muted-foreground">
                  Offer different package levels
                </p>
              </div>
              <Switch 
                id="tiered-pricing"
                checked={editedCourse?.tieredPricing || false}
                onCheckedChange={(checked) => updateCourseData && updateCourseData('tieredPricing', checked)}
              />
            </div>
            
            {editedCourse?.tieredPricing && (
              <div className="border rounded-md p-4">
                <h5 className="font-medium mb-2">Package Tiers</h5>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="basic-tier">Basic Tier</Label>
                      <div className="flex mt-1">
                        <div className="flex items-center border rounded-l-md px-3 bg-muted">
                          <span>$</span>
                        </div>
                        <Input 
                          id="basic-tier" 
                          type="number" 
                          value="49.99"
                          className="rounded-l-none" 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="premium-tier">Premium Tier</Label>
                      <div className="flex mt-1">
                        <div className="flex items-center border rounded-l-md px-3 bg-muted">
                          <span>$</span>
                        </div>
                        <Input 
                          id="premium-tier" 
                          type="number" 
                          value="99.99"
                          className="rounded-l-none" 
                        />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Add Tier</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {pricingModel === 'payment-plan' && (
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
                  value={editedCourse?.totalPrice || "299.99"}
                  onChange={(e) => updateCourseData && updateCourseData('totalPrice', e.target.value)}
                  className="rounded-l-none" 
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="installments">Number of Installments</Label>
              <Input 
                id="installments" 
                type="number" 
                value={editedCourse?.installments || "3"}
                onChange={(e) => updateCourseData && updateCourseData('installments', e.target.value)}
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="installment-period">Days Between Installments</Label>
              <Input 
                id="installment-period" 
                type="number" 
                value={editedCourse?.installmentPeriod || "30"}
                onChange={(e) => updateCourseData && updateCourseData('installmentPeriod', e.target.value)}
                className="mt-1" 
              />
            </div>
            
            <div className="border rounded-md p-4 bg-muted/30">
              <h5 className="font-medium mb-2">Payment Breakdown</h5>
              <div className="text-sm">
                <p className="flex justify-between mb-1">
                  <span>Initial payment:</span>
                  <span>${parseFloat(editedCourse?.totalPrice || 299.99) / parseFloat(editedCourse?.installments || 3)}</span>
                </p>
                <p className="flex justify-between mb-1">
                  <span>{parseInt(editedCourse?.installments || 3) - 1} additional payments:</span>
                  <span>${parseFloat(editedCourse?.totalPrice || 299.99) / parseFloat(editedCourse?.installments || 3)} every {editedCourse?.installmentPeriod || 30} days</span>
                </p>
                <p className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <span>Total:</span>
                  <span>${editedCourse?.totalPrice || 299.99}</span>
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
                checked={editedCourse?.requireDownPayment || false}
                onCheckedChange={(checked) => updateCourseData && updateCourseData('requireDownPayment', checked)}
              />
            </div>
            
            {editedCourse?.requireDownPayment && (
              <div>
                <Label htmlFor="down-payment-percent">Down Payment Percentage</Label>
                <div className="flex mt-1">
                  <Input 
                    id="down-payment-percent" 
                    type="number" 
                    value={editedCourse?.downPaymentPercent || "25"}
                    onChange={(e) => updateCourseData && updateCourseData('downPaymentPercent', e.target.value)}
                  />
                  <div className="flex items-center border rounded-r-md px-3 bg-muted">
                    <span>%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {pricingModel === 'subscription' && (
        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-4">Subscription Settings</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthly-price">Monthly Price</Label>
                <div className="flex mt-1">
                  <div className="flex items-center border rounded-l-md px-3 bg-muted">
                    <span>$</span>
                  </div>
                  <Input 
                    id="monthly-price" 
                    type="number" 
                    value={editedCourse?.monthlyPrice || "9.99"}
                    onChange={(e) => updateCourseData && updateCourseData('monthlyPrice', e.target.value)}
                    className="rounded-l-none" 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="annual-price">Annual Price</Label>
                <div className="flex mt-1">
                  <div className="flex items-center border rounded-l-md px-3 bg-muted">
                    <span>$</span>
                  </div>
                  <Input 
                    id="annual-price" 
                    type="number" 
                    value={editedCourse?.annualPrice || "99.99"}
                    onChange={(e) => updateCourseData && updateCourseData('annualPrice', e.target.value)}
                    className="rounded-l-none" 
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Auto-Renewal</h5>
                <p className="text-sm text-muted-foreground">
                  Automatically renew subscriptions
                </p>
              </div>
              <Switch 
                id="auto-renewal"
                checked={editedCourse?.autoRenewal || true}
                onCheckedChange={(checked) => updateCourseData && updateCourseData('autoRenewal', checked)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingModels;
