
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, LineChart, ArrowUpRight, ArrowDownRight, BarChart, Clock } from "lucide-react";

const Traffic = () => {
  const stats = [
    { 
      title: "Total Visitors", 
      value: "28,495", 
      change: "+18%",
      trend: "up"
    },
    { 
      title: "Pageviews", 
      value: "124,768", 
      change: "+24%",
      trend: "up"
    },
    { 
      title: "Bounce Rate", 
      value: "32%", 
      change: "-5%",
      trend: "up"
    },
    { 
      title: "Avg. Session Duration", 
      value: "4:32", 
      change: "+0:18",
      trend: "up"
    },
  ];

  const sources = [
    { source: "Google", visits: 12458, percentage: 42, change: "+15%" },
    { source: "Direct", visits: 5672, percentage: 19, change: "+8%" },
    { source: "Social Media", visits: 4321, percentage: 15, change: "+22%" },
    { source: "Referrals", visits: 3562, percentage: 12, change: "+5%" },
    { source: "Email", visits: 2481, percentage: 8, change: "-3%" },
    { source: "Other", visits: 1244, percentage: 4, change: "+1%" },
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Traffic Analytics</h1>

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
            <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
            <TabsTrigger value="pages">Top Pages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Traffic Overview</CardTitle>
                    <CardDescription>
                      Website traffic over the past 30 days
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                  <p className="text-muted-foreground">Traffic overview chart</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>
                      Where your visitors are coming from
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">Traffic sources chart</p>
                  </div>
                  
                  <div>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-3 font-medium text-sm border-b">
                        <div className="col-span-2">Source</div>
                        <div>Visits</div>
                        <div>Change</div>
                      </div>
                      <div className="divide-y">
                        {sources.map((source, index) => (
                          <div key={index} className="grid grid-cols-4 p-3 text-sm items-center">
                            <div className="col-span-2 flex items-center gap-2">
                              <div className="w-full bg-muted h-1.5 rounded-full">
                                <div 
                                  className="bg-primary h-1.5 rounded-full" 
                                  style={{ width: `${source.percentage}%` }}
                                />
                              </div>
                              <span>{source.source}</span>
                            </div>
                            <div>{source.visits.toLocaleString()}</div>
                            <div className={source.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                              {source.change}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pages" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Top Pages</CardTitle>
                    <CardDescription>
                      Most visited pages on your platform
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-3 font-medium text-sm border-b">
                    <div className="col-span-2">Page</div>
                    <div>Views</div>
                    <div>Avg. Time</div>
                    <div>Bounce Rate</div>
                  </div>
                  <div className="divide-y">
                    <PageRow title="Homepage" path="/" views={8750} time="2:34" bounce="28%" />
                    <PageRow title="Web Development Course" path="/courses/web-development" views={5432} time="4:12" bounce="18%" />
                    <PageRow title="Data Science Course" path="/courses/data-science" views={4321} time="5:06" bounce="15%" />
                    <PageRow title="Sign Up Page" path="/sign-up" views={3897} time="1:47" bounce="42%" />
                    <PageRow title="Login Page" path="/login" views={3645} time="0:58" bounce="35%" />
                    <PageRow title="UX Design Course" path="/courses/ux-design" views={2967} time="3:28" bounce="22%" />
                    <PageRow title="Free Resources" path="/resources" views={2756} time="2:15" bounce="25%" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Peak Traffic Hours</CardTitle>
                  <CardDescription>When your visitors are most active</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Traffic hours chart</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Visitors by country and region</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Geographic distribution chart</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

const PageRow = ({ title, path, views, time, bounce }: { title: string; path: string; views: number; time: string; bounce: string }) => {
  return (
    <div className="grid grid-cols-5 p-3 text-sm items-center">
      <div className="col-span-2">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{path}</p>
      </div>
      <div>{views.toLocaleString()}</div>
      <div>{time}</div>
      <div>{bounce}</div>
    </div>
  );
};

export default Traffic;
