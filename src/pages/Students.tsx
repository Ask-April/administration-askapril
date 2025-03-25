
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Download, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Upload 
} from "lucide-react";

const studentsData = [
  {
    id: "ST-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    enrolledCourses: 3,
    progress: 67,
    lastActive: "2 hours ago",
    status: "active",
  },
  {
    id: "ST-1002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    enrolledCourses: 2,
    progress: 85,
    lastActive: "1 day ago",
    status: "active",
  },
  {
    id: "ST-1003",
    name: "Michael Brown",
    email: "m.brown@example.com",
    enrolledCourses: 4,
    progress: 42,
    lastActive: "3 days ago",
    status: "active",
  },
  {
    id: "ST-1004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    enrolledCourses: 1,
    progress: 12,
    lastActive: "5 hours ago",
    status: "pending",
  },
  {
    id: "ST-1005",
    name: "Daniel Wilson",
    email: "daniel.w@example.com",
    enrolledCourses: 2,
    progress: 93,
    lastActive: "Just now",
    status: "active",
  },
  {
    id: "ST-1006",
    name: "Olivia Miller",
    email: "olivia.m@example.com",
    enrolledCourses: 3,
    progress: 78,
    lastActive: "4 hours ago",
    status: "active",
  },
  {
    id: "ST-1007",
    name: "James Taylor",
    email: "james.t@example.com",
    enrolledCourses: 0,
    progress: 0,
    lastActive: "1 week ago",
    status: "inactive",
  },
  {
    id: "ST-1008",
    name: "Sophia Anderson",
    email: "sophia.a@example.com",
    enrolledCourses: 5,
    progress: 54,
    lastActive: "2 days ago",
    status: "active",
  },
];

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Active</Badge>;
    case 'inactive':
      return <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Students = () => {
  return (
    <PageTransition>
      <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage your student roster and enrollments
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">2,834</CardTitle>
              <CardDescription>Total Students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">↑ 12%</span> from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">1,653</CardTitle>
              <CardDescription>Active Students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">↑ 8%</span> from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">76%</CardTitle>
              <CardDescription>Completion Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">↑ 5%</span> from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Student Directory</CardTitle>
                <CardDescription>
                  Manage student accounts and their course enrollments
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-9 gap-1">
                  <Upload className="h-4 w-4" />
                  <span>Import</span>
                </Button>
                <Button variant="outline" className="h-9 gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
                <Button className="h-9 gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Student</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8 w-full sm:w-[300px]"
                />
              </div>
              <Button variant="outline" className="gap-1 h-9 w-full sm:w-auto">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{student.enrolledCourses}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-secondary">
                            <div 
                              className="h-full rounded-full bg-accent" 
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Students;
