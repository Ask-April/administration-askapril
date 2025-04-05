
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  HeadphonesIcon 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface StudentsTabProps {
  courseId: string;
}

const StudentsTab: React.FC<StudentsTabProps> = ({ courseId }) => {
  // Mock student data
  const students = [
    { id: '1', name: 'John Doe', email: 'john@example.com', enrollDate: '2023-10-15', progress: 45, status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', enrollDate: '2023-09-22', progress: 78, status: 'active' },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com', enrollDate: '2023-11-05', progress: 12, status: 'active' },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', enrollDate: '2023-08-30', progress: 100, status: 'completed' },
    { id: '5', name: 'Michael Brown', email: 'michael@example.com', enrollDate: '2023-10-10', progress: 60, status: 'active' },
    { id: '6', name: 'Emily Davis', email: 'emily@example.com', enrollDate: '2023-09-15', progress: 32, status: 'paused' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Student Management</h3>
          
          <Tabs defaultValue="enrollment" className="w-full">
            <TabsList className="mb-4 grid grid-cols-4 md:w-auto w-full">
              <TabsTrigger value="enrollment" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Enrollment</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden md:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden md:inline">Communication</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <HeadphonesIcon className="h-4 w-4" />
                <span className="hidden md:inline">Support</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enrollment" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative w-72">
                  <Input 
                    placeholder="Search students..." 
                    className="pl-8" 
                  />
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">Import</Button>
                  <Button variant="outline">Export</Button>
                  <Button>Add Student</Button>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <input type="checkbox" className="rounded" />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Enrollment Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <input type="checkbox" className="rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.enrollDate}</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                student.progress === 100 
                                  ? 'bg-green-500' 
                                  : student.progress > 50 
                                  ? 'bg-blue-500' 
                                  : 'bg-amber-500'
                              }`} 
                              style={{ width: `${student.progress}%` }} 
                            />
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">{student.progress}%</span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              student.status === 'completed' 
                                ? 'default' 
                                : student.status === 'active' 
                                ? 'outline' 
                                : 'secondary'
                            }
                            className={
                              student.status === 'completed' 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : student.status === 'paused' 
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                                : ''
                            }
                          >
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing 1-6 of 6 students
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Progress Tracking</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Completion Certificates</h5>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Automatically issue certificates upon course completion
                    </p>
                    <Switch id="auto-certificates" defaultChecked />
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Learning Analytics</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Track engagement scores
                      </p>
                      <Switch id="engagement-scores" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Enable comparative metrics
                      </p>
                      <Switch id="comparative-metrics" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Achievement System</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Enable badges
                      </p>
                      <Switch id="badges" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Enable leaderboard
                      </p>
                      <Switch id="leaderboard" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="communication" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Communication Tools</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Announcement System</h5>
                  <Button className="mb-4">Create Announcement</Button>
                  <p className="text-sm text-muted-foreground">
                    No announcements have been created yet.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Discussion Moderation</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Enable forums
                      </p>
                      <Switch id="forums" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Enable comments on lessons
                      </p>
                      <Switch id="lesson-comments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Require approval for posts
                      </p>
                      <Switch id="approval-workflow" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Notification Preferences</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Email notifications
                      </p>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        In-platform notifications
                      </p>
                      <Switch id="platform-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Mobile notifications
                      </p>
                      <Switch id="mobile-notifications" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="support" className="border rounded-md p-4">
              <p className="text-muted-foreground">Support & engagement content coming soon</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsTab;
