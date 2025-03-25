
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Community Settings</CardTitle>
            <CardDescription>
              Manage general settings for all communities
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <SettingItem
            title="Allow file uploads in discussions"
            description="Let users attach files to their discussion posts"
            defaultChecked={true}
          />
          
          <SettingItem
            title="Enable community search"
            description="Allow users to search content within communities"
            defaultChecked={true}
          />
          
          <SettingItem
            title="Allow rich text formatting"
            description="Enable markdown and rich text in community posts"
            defaultChecked={true}
          />
          
          <SettingItem
            title="Enable code snippets"
            description="Allow users to share formatted code in discussions"
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

export default GeneralSettings;
