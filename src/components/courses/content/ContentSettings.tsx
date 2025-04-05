
import React from "react";
import { Switch } from "@/components/ui/switch";

interface ContentSettingsProps {
  // Add props as needed
}

const ContentSettings: React.FC<ContentSettingsProps> = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Drag-and-Drop Reordering</h5>
          <p className="text-sm text-muted-foreground">
            Allow reordering sections and lessons by drag and drop
          </p>
        </div>
        <Switch id="drag-drop" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Linear Progression</h5>
          <p className="text-sm text-muted-foreground">
            Require students to complete lessons in order
          </p>
        </div>
        <Switch id="linear" />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Content Dripping</h5>
          <p className="text-sm text-muted-foreground">
            Release content gradually based on schedule or progress
          </p>
        </div>
        <Switch id="drip" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Interactive Elements</h5>
          <p className="text-sm text-muted-foreground">
            Include interactive elements in lessons
          </p>
        </div>
        <Switch id="interactive" defaultChecked />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-medium">Completion Tracking</h5>
          <p className="text-sm text-muted-foreground">
            Track lesson completion by students
          </p>
        </div>
        <Switch id="completion-tracking" defaultChecked />
      </div>
    </div>
  );
};

export default ContentSettings;
