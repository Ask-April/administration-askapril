
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import StatCard from "@/components/dashboard/StatCard";
import CourseProgress from "@/components/dashboard/CourseProgress";
import { 
  BarChart3, 
  BookOpen, 
  GraduationCap, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  // Mock data for dashboard
  const courseProgressData = [
    { title: "Introduction to Web Design", progress: 7, total: 10, image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { title: "JavaScript Fundamentals", progress: 4, total: 12, image: "https://images.unsplash.com/photo-1592609931095-54a2168ae893?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { title: "Advanced React Development", progress: 2, total: 8, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  ];
  
  return (
    <PageTransition>
      <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your learning platform.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value="2,834"
            icon={Users}
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="Active Courses"
            value="42"
            icon={BookOpen}
            trend="up"
            trendValue="4%"
          />
          <StatCard
            title="Course Completions"
            value="1,248"
            icon={GraduationCap}
            trend="up"
            trendValue="18%"
          />
          <StatCard
            title="Total Revenue"
            value="$48,294"
            icon={BarChart3}
            trend="up"
            trendValue="24%"
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-full lg:col-span-8">
            <Tabs defaultValue="overview" className="h-full w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  View All Reports
                </Button>
              </div>
              <TabsContent value="overview" className="h-[400px] mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>
                      Student enrollment and revenue trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <BarChart3 className="h-8 w-8 text-primary" />
                      </div>
                      <p>Analytics visualization will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics" className="h-[400px]">
                {/* Analytics content would go here */}
              </TabsContent>
              <TabsContent value="reports" className="h-[400px]">
                {/* Reports content would go here */}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="col-span-full lg:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>
                  Continue where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseProgressData.map((course, index) => (
                    <CourseProgress
                      key={index}
                      title={course.title}
                      progress={course.progress}
                      total={course.total}
                      image={course.image}
                    />
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    View All Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full md:col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions on your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-lg border p-3"
                  >
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        New student enrolled
                      </p>
                      <p className="text-xs text-muted-foreground">
                        John Smith joined Advanced React Development
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-full md:col-span-1">
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
              <CardDescription>
                Based on student enrollment and ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border p-3"
                  >
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">
                          {["Advanced React Development", "JavaScript Fundamentals", "UX Design Principles"][index]}
                        </p>
                        <div className="flex items-center">
                          <span className="text-xs font-medium">
                            {[4.9, 4.8, 4.7][index]}
                          </span>
                          <span className="ml-1 text-yellow-500">★</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {[342, 287, 264][index]} students enrolled
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-full md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                  <span>Add Course</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center">
                  <Users className="h-6 w-6" />
                  <span>Add Student</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center">
                  <BarChart3 className="h-6 w-6" />
                  <span>View Reports</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center">
                  <GraduationCap className="h-6 w-6" />
                  <span>Certificates</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
