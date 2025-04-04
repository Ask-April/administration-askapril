
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewTabProps {
  title: string;
  description: string;
  onUpdateTitle: (value: string) => void;
  onUpdateDescription: (value: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  title,
  description,
  onUpdateTitle,
  onUpdateDescription
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium">Course Overview</h3>
        <p className="text-muted-foreground mb-4">View and edit basic course information.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md" 
              value={title || ''}
              onChange={(e) => onUpdateTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              className="w-full p-2 border rounded-md min-h-[100px]" 
              value={description || ''}
              onChange={(e) => onUpdateDescription(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
