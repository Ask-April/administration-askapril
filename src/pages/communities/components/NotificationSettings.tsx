
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <BellRing className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how and when notifications are sent
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <SettingItem
            title="Email digests"
            description="Send weekly email digests of community activity"
            defaultChecked={true}
          />
          
          <SettingItem
            title="New discussion notifications"
            description="Notify members when new discussions are created"
            defaultChecked={true}
          />
          
          <SettingItem
            title="Reply notifications"
            description="Notify users when someone replies to their posts"
            defaultChecked={true}
          />
          
          <SettingItem
            title="Moderator alerts"
            description="Send alerts to moderators for flagged content"
            defaultChecked={true}
          />
          
          <div className="flex justify-end">
            <Button>Save Settings</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type SettingItemProps = {
  title: string;
  description: string;
  defaultChecked?: boolean;
};

const SettingItem = ({ title, description, defaultChecked = false }: SettingItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
};

export default NotificationSettings;
