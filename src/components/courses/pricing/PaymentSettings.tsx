
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentSettingsProps {
  // Add props as needed
}

const PaymentSettings: React.FC<PaymentSettingsProps> = () => {
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Payment Methods</h5>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Switch id="credit-card" defaultChecked />
            <Label htmlFor="credit-card">Credit Card</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="paypal" defaultChecked />
            <Label htmlFor="paypal">PayPal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="bank-transfer" />
            <Label htmlFor="bank-transfer">Bank Transfer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="crypto" />
            <Label htmlFor="crypto">Cryptocurrency</Label>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Currency</h5>
        <Select defaultValue="usd">
          <SelectTrigger>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD ($)</SelectItem>
            <SelectItem value="eur">EUR (€)</SelectItem>
            <SelectItem value="gbp">GBP (£)</SelectItem>
            <SelectItem value="cad">CAD (C$)</SelectItem>
            <SelectItem value="aud">AUD (A$)</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground">
            Enable multi-currency support
          </p>
          <Switch id="multi-currency" />
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Tax Handling</h5>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Collect VAT
            </p>
            <Switch id="vat" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Collect sales tax
            </p>
            <Switch id="sales-tax" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Automatic tax calculation
            </p>
            <Switch id="auto-tax" defaultChecked />
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Invoice Generation</h5>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Generate automatic invoices
          </p>
          <Switch id="auto-invoices" defaultChecked />
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
