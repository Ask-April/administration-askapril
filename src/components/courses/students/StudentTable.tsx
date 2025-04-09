
import React from "react";
import { Button } from "@/components/ui/button";
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

interface StudentTableProps {
  // Add any props here if needed
}

const StudentTable: React.FC<StudentTableProps> = () => {
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
    <>
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
      
      <div className="border rounded-md overflow-hidden mt-4">
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
      
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing 1-6 of 6 students
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </>
  );
};

export default StudentTable;
