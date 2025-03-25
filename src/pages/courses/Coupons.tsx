
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Clock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Coupons = () => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied to clipboard!");
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Course Coupons</h1>
        <div className="grid gap-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Ticket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Summer Sale</CardTitle>
                  <p className="text-sm text-muted-foreground">30% off all courses</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Expires in 15 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-mono bg-muted p-2 rounded-md inline-block">SUMMER30</p>
                  <p className="text-sm text-muted-foreground mt-2">Used 152 times</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyCode("SUMMER30")}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Ticket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>New Student</CardTitle>
                  <p className="text-sm text-muted-foreground">50% off first course</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Never expires</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-mono bg-muted p-2 rounded-md inline-block">NEWSTUDENT50</p>
                  <p className="text-sm text-muted-foreground mt-2">Used 438 times</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyCode("NEWSTUDENT50")}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Ticket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Programming Bundle</CardTitle>
                  <p className="text-sm text-muted-foreground">25% off programming courses</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Expires in 7 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-mono bg-muted p-2 rounded-md inline-block">CODE25</p>
                  <p className="text-sm text-muted-foreground mt-2">Used 78 times</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyCode("CODE25")}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Coupons;
