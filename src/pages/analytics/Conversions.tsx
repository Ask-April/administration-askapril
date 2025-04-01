
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  BarChart, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  DollarSign,
  CheckCircle 
} from "lucide-react";

const Conversions = () => {
  const stats = [
    { 
      title: "Conversion Rate", 
      value: "5.8%", 
      change: "+1.2%", 
      trend: "up",
      description: "Site-wide conversion rate"
    },
    { 
      title: "Revenue per Visitor", 
      value: "$2.46", 
      change: "+$0.32", 
      trend: "up",
      description: "Average revenue per visitor"
    },
    { 
      title: "Cart Abandonment", 
      value: "68.3%", 
      change: "-2.5%", 
      trend: "up",
      description: "Shopping cart abandonment rate"
    },
    { 
      title: "Lead-to-Customer", 
      value: "12.4%", 
      change: "-0.8%", 
      trend: "down",
      description: "Lead to customer conversion rate"
    },
  ];

  const funnels = [
    { 
      name: "Course Registration", 
      stages: [
        { name: "Landing Page View", count: 8426, rate: "100%" },
        { name: "Course Preview", count: 4215, rate: "50.0%" },
        { name: "Add to Cart", count: 1845, rate: "21.9%" },
        { name: "Checkout Started", count: 1208, rate: "14.3%" },
        { name: "Purchase Completed", count: 782, rate: "9.3%" },
      ]
    },
    { 
      name: "Lead Capture", 
      stages: [
        { name: "Form View", count: 12453, rate: "100%" },
        { name: "Form Started", count: 5842, rate: "46.9%" },
        { name: "Form Submitted", count: 3216, rate: "25.8%" },
        { name: "Email Confirmed", count: 2845, rate: "22.8%" },
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Conversion Analytics</h1>

        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  {stat.title}
                  {stat.trend === "up" ? (
                    <Badge className={`bg-${stat.title === "Cart Abandonment" ? "red" : "green"}-100 text-${stat.title === "Cart Abandonment" ? "red" : "green"}-800 hover:bg-${stat.title === "Cart Abandonment" ? "red" : "green"}-100`}>
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {stat.change}
                    </Badge>
                  ) : (
                    <Badge className={`bg-${stat.title === "Lead-to-Customer" ? "red" : "green"}-100 text-${stat.title === "Lead-to-Customer" ? "red" : "green"}-800 hover:bg-${stat.title === "Lead-to-Customer" ? "red" : "green"}-100`}>
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {stat.change}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Conversion Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Course Purchases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">9.3%</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +1.2%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">78% of target (12%) achieved</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Lead Generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">25.8%</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +3.6%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "86%" }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">86% of target (30%) achieved</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">Newsletter Signups</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">16.4%</span>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +2.1%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "54%" }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">54% of target (30%) achieved</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Revenue Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Total Revenue</span>
                    <span>$128,452</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>85% of $150k target</span>
                    <span>+12.4% from last month</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Average Order Value</span>
                    <span>$62.30</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>78% of $80 target</span>
                    <span>+8.2% from last month</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Lifetime Value</span>
                    <span>$384.50</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: "64%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>64% of $600 target</span>
                    <span>+5.7% from last month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          {funnels.map((funnel, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{funnel.name} Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pt-10">
                  <div className="absolute top-0 left-0 right-0 flex justify-between text-sm font-medium px-8">
                    <span>Stage</span>
                    <span>Visitors</span>
                    <span>Conversion Rate</span>
                  </div>
                  <div className="space-y-4">
                    {funnel.stages.map((stage, stageIndex) => (
                      <div key={stageIndex} className="flex items-center">
                        <div className="w-1/3 flex gap-2 items-center">
                          <div className={`h-8 w-2 rounded-full bg-${["green", "blue", "purple", "amber", "pink"][stageIndex % 5]}-500`}></div>
                          <span className="font-medium">{stage.name}</span>
                        </div>
                        <div className="w-1/3 text-center">{stage.count.toLocaleString()}</div>
                        <div className="w-1/3 text-right">
                          {stageIndex === 0 ? (
                            <span>{stage.rate}</span>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <span>{stage.rate}</span>
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                {((stage.count / funnel.stages[stageIndex - 1].count) * 100).toFixed(1)}%
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Conversions;
