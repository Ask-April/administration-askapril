
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface DiscountsManagerProps {
  // Add props as needed
}

interface Discount {
  id: string;
  code: string;
  discount: string;
  usage: number;
  status: string;
  expires: string;
}

const DiscountsManager: React.FC<DiscountsManagerProps> = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: '1', code: 'EARLYBIRD', discount: '25%', usage: 23, status: 'active', expires: '2024-12-31' },
    { id: '2', code: 'WELCOME10', discount: '10%', usage: 45, status: 'active', expires: 'Never' },
    { id: '3', code: 'HOLIDAY2023', discount: '30%', usage: 12, status: 'expired', expires: '2023-01-15' },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Discount Codes</h4>
        <Button>Add Discount Code</Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow key={discount.id}>
              <TableCell className="font-medium">{discount.code}</TableCell>
              <TableCell>{discount.discount}</TableCell>
              <TableCell>{discount.usage} uses</TableCell>
              <TableCell>
                <span 
                  className={`px-2 py-1 text-xs rounded-full ${
                    discount.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {discount.status}
                </span>
              </TableCell>
              <TableCell>{discount.expires}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="mt-6 space-y-4">
        <div className="border rounded-md p-4">
          <h5 className="font-medium mb-2">Bulk Discounts</h5>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Enable volume discounts for group purchases
            </p>
            <Switch id="bulk-discounts" />
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h5 className="font-medium mb-2">Limited-Time Offers</h5>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Enable flash sales
              </p>
              <Switch id="flash-sales" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Enable seasonal promotions
              </p>
              <Switch id="seasonal-promotions" />
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h5 className="font-medium mb-2">Referral Incentives</h5>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Enable referral program
            </p>
            <Switch id="referral-program" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountsManager;
