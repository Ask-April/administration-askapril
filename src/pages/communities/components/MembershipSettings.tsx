
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const MembershipSettings = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Membership Controls</CardTitle>
            <CardDescription>
              Manage how users join and participate in communities
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <SettingItem
            title="Open membership"
            description="Allow anyone to join communities without approval"
            defaultChecked={false}
          />
          
          <SettingItem
            title="Require membership approval"
            description="New members must be approved by moderators"
            defaultChecked={true}
          />
          
          <SettingItem
            title="Allow invitation by members"
            description="Existing members can invite others to join"
            defaultChecked={true}
          />
          
          <ThresholdSetting
            title="Waiting period for new members"
            description="Days before new members can post (0 for none)"
            value="1"
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

export default MembershipSettings;
