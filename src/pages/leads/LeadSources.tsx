
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, ExternalLink, ArrowUp, ArrowDown } from "lucide-react";

const LeadSources = () => {
  const sources = [
    { 
      id: "1", 
      name: "Organic Search", 
      count: 345, 
      conversion: "8.4%", 
      trend: "up", 
      change: "+12.3%"
    },
    { 
      id: "2", 
      name: "Social Media", 
      count: 231, 
      conversion: "6.7%", 
      trend: "down", 
      change: "-2.5%"
    },
    { 
      id: "3", 
      name: "Email Campaigns", 
      count: 187, 
      conversion: "12.1%", 
      trend: "up", 
      change: "+4.8%"
    },
    { 
      id: "4", 
      name: "Direct Traffic", 
      count: 154, 
      conversion: "5.2%", 
      trend: "up", 
      change: "+1.3%"
    },
    { 
      id: "5", 
      name: "Referrals", 
      count: 98, 
      conversion: "9.6%", 
      trend: "down", 
      change: "-0.7%"
    },
    { 
      id: "6", 
      name: "Paid Ads", 
      count: 276, 
      conversion: "10.2%", 
      trend: "up", 
      change: "+15.4%"
    },
  ];
  
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Lead Sources</h1>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Source
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium">
                  <div className="col-span-2">Source</div>
                  <div>Leads</div>
                  <div>Conversion Rate</div>
                  <div>Trend</div>
                </div>
                <div className="divide-y">
                  {sources.map((source) => (
                    <div key={source.id} className="grid grid-cols-5 p-4 items-center">
                      <div className="col-span-2 flex items-center gap-2">
                        <span className="font-medium">{source.name}</span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div>{source.count}</div>
                      <div>{source.conversion}</div>
                      <div className="flex items-center gap-2">
                        {source.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                            <ArrowUp className="h-3 w-3" />
                            {source.change}
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
                            <ArrowDown className="h-3 w-3" />
                            {source.change}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default LeadSources;
