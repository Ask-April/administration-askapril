
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StudentsTabProps {
  students: number;
  onUpdateStudents: (value: number) => void;
}

const StudentsTab: React.FC<StudentsTabProps> = ({ 
  students,
  onUpdateStudents 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium">Students</h3>
        <p className="text-muted-foreground mb-4">Manage students enrolled in this course.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Number of Students</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-md" 
              value={students || 0}
              onChange={(e) => onUpdateStudents(parseInt(e.target.value, 10) || 0)}
            />
          </div>
          
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium mb-2">Enrolled Students</h4>
            <div className="bg-muted rounded-md p-6 text-center">
              <p>No students enrolled yet</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsTab;
