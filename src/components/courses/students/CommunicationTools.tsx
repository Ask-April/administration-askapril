
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface CommunicationToolsProps {
  // Add any props here if needed
}

const CommunicationTools: React.FC<CommunicationToolsProps> = () => {
  return (
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
  );
};

export default CommunicationTools;
