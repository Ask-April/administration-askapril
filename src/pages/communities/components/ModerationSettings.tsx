
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const ModerationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Moderation Controls</CardTitle>
            <CardDescription>
              Manage content moderation settings and tools
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <SettingItem
            title="Auto-moderate offensive content"
            description="Automatically filter potentially harmful content"
            defaultChecked={true}
          />
          
          <SettingItem
            title="Require post approval"
            description="New posts require moderator approval before publishing"
            defaultChecked={false}
          />
          
          <SettingItem
            title="Enable spam detection"
            description="Automatically flag potential spam content"
            defaultChecked={true}
          />
          
          <ThresholdSetting
            title="Content reporting threshold"
            description="Number of reports before content is automatically hidden"
            value="5"
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

type ThresholdSettingProps = {
  title: string;
  description: string;
  value: string;
};

const ThresholdSetting = ({ title, description, value }: ThresholdSettingProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <span>{value}</span>
        <Button variant="outline" size="sm">Change</Button>
      </div>
    </div>
  );
};

export default ModerationSettings;
