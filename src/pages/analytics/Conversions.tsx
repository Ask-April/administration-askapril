
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, DollarSign, ArrowUpRight, ArrowDownRight, BarChart, LineChart, TrendingUp } from "lucide-react";

const Conversions = () => {
  const stats = [
    { 
      title: "Conversion Rate", 
      value: "8.4%", 
      change: "+1.2%",
      trend: "up"
    },
    { 
      title: "Total Conversions", 
      value: "2,384", 
      change: "+15%",
      trend: "up"
    },
    { 
      title: "Revenue", 
      value: "$42,580", 
      change: "+24%",
      trend: "up"
    },
    { 
      title: "Avg. Order Value", 
      value: "$178.50", 
      change: "+$12.75",
      trend: "up"
    },
  ];

  const funnels = [
    { 
      name: "Website Visitor to Lead", 
      stages: [
        { name: "Website Visit", value: 28495, percentage: 100 },
        { name: "Course View", value: 14872, percentage: 52 },
        { name: "Lead Form", value: 5218, percentage: 18 },
        { name: "Lead Capture", value: 2384, percentage: 8 }
      ],
      conversion: "8.4%"
    },
    { 
      name: "Lead to Sale", 
      stages: [
        { name: "Lead", value: 2384, percentage: 100 },
        { name: "Email Opened", value: 1863, percentage: 78 },
        { name: "Course Preview", value: 1125, percentage: 47 },
        { name: "Purchase", value: 542, percentage: 23 }
      ],
      conversion: "22.7%"
    }
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Conversion Analytics</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`flex items-center gap-1 text-xs mt-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{stat.change} from last month</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funnels">Conversion Funnels</TabsTrigger>
            <TabsTrigger value="courses">Course Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Conversion Overview</CardTitle>
                    <CardDescription>
                      Conversion performance over the last 30 days
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                  <p className="text-muted-foreground">Conversion trends chart</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="funnels" className="mt-6">
            <div className="grid gap-6">
              {funnels.map((funnel, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{funnel.name}</CardTitle>
                          <CardDescription>
                            Overall conversion rate: {funnel.conversion}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="flex items-center justify-between relative">
                        {funnel.stages.map((stage, stageIndex) => (
                          <div key={stageIndex} className="text-center z-10 px-2">
                            <div className="font-medium">{stage.value.toLocaleString()}</div>
                            <div className="text-sm">{stage.percentage}%</div>
                            <div className="text-xs text-muted-foreground mt-1">{stage.name}</div>
                          </div>
                        ))}
                        <div className="absolute top-3 left-0 right-0 h-1 bg-muted" />
                        <div className="absolute top-3 left-0 h-1 bg-primary" style={{ width: `${funnel.stages[funnel.stages.length - 1].percentage}%` }} />
                      </div>
                      
                      <div className="h-48 flex items-center justify-center bg-muted/50 rounded-md">
                        <p className="text-muted-foreground">Funnel visualization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Course Conversion Rates</CardTitle>
                      <CardDescription>
                        Conversion rate by course
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Course conversion chart</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Revenue by Course</CardTitle>
                      <CardDescription>
                        Revenue generated from each course
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Revenue by course chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <LineChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Conversion by Traffic Source</CardTitle>
                  <CardDescription>How different traffic sources convert</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-3 font-medium text-sm border-b">
                  <div className="col-span-2">Source</div>
                  <div>Visits</div>
                  <div>Conversion</div>
                </div>
                <div className="divide-y">
                  <SourceRow source="Google" visits={12458} conversion="9.8%" />
                  <SourceRow source="Direct" visits={5672} conversion="12.3%" />
                  <SourceRow source="Social Media" visits={4321} conversion="7.5%" />
                  <SourceRow source="Referrals" visits={3562} conversion="14.2%" />
                  <SourceRow source="Email" visits={2481} conversion="18.6%" />
                  <SourceRow source="Other" visits={1244} conversion="5.2%" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Conversion by Device</CardTitle>
                  <CardDescription>Conversion rates across different devices</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Device conversion chart</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

const SourceRow = ({ source, visits, conversion }: { source: string; visits: number; conversion: string }) => {
  return (
    <div className="grid grid-cols-4 p-3 text-sm items-center">
      <div className="col-span-2">
        <p className="font-medium">{source}</p>
      </div>
      <div>{visits.toLocaleString()}</div>
      <div>{conversion}</div>
    </div>
  );
};

export default Conversions;
