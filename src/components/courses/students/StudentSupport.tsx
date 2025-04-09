
import React from "react";
import { Button } from "@/components/ui/button";

interface StudentSupportProps {
  // Add any props here if needed
}

const StudentSupport: React.FC<StudentSupportProps> = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Help Desk</h5>
        <p className="text-sm text-muted-foreground mb-4">
          Manage student support requests and inquiries
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">View Support Tickets</Button>
          <Button variant="outline">FAQ Management</Button>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Student Engagement</h5>
        <p className="text-sm text-muted-foreground mb-4">
          Tools to increase student engagement and retention
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Send Encouragement</Button>
          <Button variant="outline">Schedule Check-in</Button>
        </div>
      </div>
    </div>
  );
};

export default StudentSupport;
