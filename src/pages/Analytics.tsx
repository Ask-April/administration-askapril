
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from "recharts";

// Sample data
const enrollmentData = [
  { name: 'Jan', count: 4000 },
  { name: 'Feb', count: 3000 },
  { name: 'Mar', count: 2000 },
  { name: 'Apr', count: 2780 },
  { name: 'May', count: 1890 },
  { name: 'Jun', count: 2390 },
  { name: 'Jul', count: 3490 },
];

const completionData = [
  { name: 'Jan', count: 2400 },
  { name: 'Feb', count: 1398 },
  { name: 'Mar', count: 9800 },
  { name: 'Apr', count: 3908 },
  { name: 'May', count: 4800 },
  { name: 'Jun', count: 3800 },
  { name: 'Jul', count: 4300 },
];

const courseEngagementData = [
  { name: 'Web Development', students: 4000, hours: 2400 },
  { name: 'Data Science', students: 3000, hours: 1398 },
  { name: 'UX Design', students: 2000, hours: 9800 },
  { name: 'Digital Marketing', students: 2780, hours: 3908 },
  { name: 'Business Analytics', students: 1890, hours: 4800 },
  { name: 'Mobile App Dev', students: 2390, hours: 3800 },
];

const pieData = [
  { name: 'Completed', value: 540 },
  { name: 'In Progress', value: 620 },
  { name: 'Not Started', value: 210 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics: React.FC = () => {
  return (
    <PageTransition>
      <div className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground">
                Track student progress and course engagement metrics
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Students
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,248</div>
                      <p className="text-xs text-muted-foreground">
                        +12% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Course Completions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">540</div>
                      <p className="text-xs text-muted-foreground">
                        +8% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Average Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.2 hrs</div>
                      <p className="text-xs text-muted-foreground">
                        Per student weekly
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Enrollment Trend</CardTitle>
                      <CardDescription>
                        New students enrolled over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={enrollmentData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Completion Rates</CardTitle>
                      <CardDescription>
                        Course completions by month
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={completionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="count" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="courses" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Engagement</CardTitle>
                    <CardDescription>
                      Number of students and hours spent by course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={courseEngagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="students" fill="#8884d8" name="Students" />
                        <Bar dataKey="hours" fill="#82ca9d" name="Hours Spent" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="students" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Progress</CardTitle>
                      <CardDescription>
                        Overall course completion status
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Learning Hours</CardTitle>
                      <CardDescription>
                        Hours spent learning by day of week
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                          {name: 'Mon', hours: 4.2},
                          {name: 'Tue', hours: 3.8},
                          {name: 'Wed', hours: 5.1},
                          {name: 'Thu', hours: 4.5},
                          {name: 'Fri', hours: 3.2},
                          {name: 'Sat', hours: 7.3},
                          {name: 'Sun', hours: 6.4},
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="hours" fill="#8884d8" name="Hours" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Analytics;
