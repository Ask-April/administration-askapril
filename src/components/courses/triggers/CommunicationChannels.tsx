
import React from "react";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommunicationChannelsProps {
  // Add any props here if needed
}

const CommunicationChannels: React.FC<CommunicationChannelsProps> = () => {
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">Email Delivery</h5>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Send automated emails
            </p>
            <Switch id="automated-emails" defaultChecked />
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Email template style:</p>
            <Select defaultValue="modern">
              <SelectTrigger>
                <SelectValue placeholder="Select template style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="branded">Branded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Personalize emails with student names
            </p>
            <Switch id="personalized-emails" defaultChecked />
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">In-Platform Notifications</h5>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="toast-notifications" defaultChecked />
            <label htmlFor="toast-notifications" className="text-sm">Toast notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="inbox-notifications" defaultChecked />
            <label htmlFor="inbox-notifications" className="text-sm">Inbox messages</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="dashboard-notifications" defaultChecked />
            <label htmlFor="dashboard-notifications" className="text-sm">Dashboard alerts</label>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h5 className="font-medium mb-2">SMS Messaging</h5>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Send SMS notifications (requires opt-in)
            </p>
          </div>
          <Switch id="sms-notifications" />
        </div>
      </div>
    </div>
  );
};

export default CommunicationChannels;
