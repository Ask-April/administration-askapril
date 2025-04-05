
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  DollarSign, 
  Tag, 
  CreditCard, 
  PieChart 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PricingTabProps {
  editedCourse: any;
  setEditedCourse: (course: any) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({ 
  editedCourse, 
  setEditedCourse 
}) => {
  const [pricingModel, setPricingModel] = useState('one-time');
  const [discounts, setDiscounts] = useState([
    { id: '1', code: 'EARLYBIRD', discount: '25%', usage: 23, status: 'active', expires: '2024-12-31' },
    { id: '2', code: 'WELCOME10', discount: '10%', usage: 45, status: 'active', expires: 'Never' },
    { id: '3', code: 'HOLIDAY2023', discount: '30%', usage: 12, status: 'expired', expires: '2023-01-15' },
  ]);
  
  // Function to update any course property
  const updateCourseData = (field: string, value: any) => {
    setEditedCourse({
      ...editedCourse,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Course Pricing</h3>
          
          <Tabs defaultValue="models" className="w-full">
            <TabsList className="mb-4 grid grid-cols-4 md:w-auto w-full">
              <TabsTrigger value="models" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden md:inline">Pricing Models</span>
              </TabsTrigger>
              <TabsTrigger value="discounts" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span className="hidden md:inline">Discounts</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden md:inline">Payment</span>
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span className="hidden md:inline">Analysis</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="models" className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        checked={editedCourse.completelyFree || true}
                        onCheckedChange={(checked) => updateCourseData('completelyFree', checked)}
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
                        checked={editedCourse.freeTrial || false}
                        onCheckedChange={(checked) => updateCourseData('freeTrial', checked)}
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
                        checked={editedCourse.freemium || false}
                        onCheckedChange={(checked) => updateCourseData('freemium', checked)}
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
                          value={editedCourse.price || ""}
                          onChange={(e) => updateCourseData('price', e.target.value)}
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
                        checked={editedCourse.tieredPricing || false}
                        onCheckedChange={(checked) => updateCourseData('tieredPricing', checked)}
                      />
                    </div>
                    
                    {editedCourse.tieredPricing && (
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
                            value={editedCourse.monthlyPrice || "9.99"}
                            onChange={(e) => updateCourseData('monthlyPrice', e.target.value)}
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
                            value={editedCourse.annualPrice || "99.99"}
                            onChange={(e) => updateCourseData('annualPrice', e.target.value)}
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
                        checked={editedCourse.autoRenewal || true}
                        onCheckedChange={(checked) => updateCourseData('autoRenewal', checked)}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-4">Additional Options</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="duration">Course Duration</Label>
                    <Input
                      id="duration"
                      value={editedCourse.duration || ""}
                      onChange={(e) => updateCourseData('duration', e.target.value)}
                      placeholder="e.g., 8 hours, 6 weeks, etc."
                      className="mt-1"
                    />
                  </div>
                  
                  {pricingModel !== 'free' && (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Payment Plans</h5>
                          <p className="text-sm text-muted-foreground">
                            Allow payment in installments
                          </p>
                        </div>
                        <Switch 
                          id="payment-plans"
                          checked={editedCourse.paymentPlans || false}
                          onCheckedChange={(checked) => updateCourseData('paymentPlans', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Pay-Per-Module</h5>
                          <p className="text-sm text-muted-foreground">
                            Allow students to purchase individual modules
                          </p>
                        </div>
                        <Switch 
                          id="pay-per-module"
                          checked={editedCourse.payPerModule || false}
                          onCheckedChange={(checked) => updateCourseData('payPerModule', checked)}
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Pay-What-You-Want</h5>
                      <p className="text-sm text-muted-foreground">
                        Let students choose their own price
                      </p>
                    </div>
                    <Switch 
                      id="pay-what-you-want"
                      checked={editedCourse.payWhatYouWant || false}
                      onCheckedChange={(checked) => updateCourseData('payWhatYouWant', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="discounts" className="border rounded-md p-4">
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
            </TabsContent>

            <TabsContent value="payment" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Payment Processing</h4>
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
            </TabsContent>

            <TabsContent value="analysis" className="border rounded-md p-4">
              <p className="text-muted-foreground">Pricing analysis content coming soon</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingTab;
