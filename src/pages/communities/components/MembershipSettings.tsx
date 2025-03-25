import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Save, RotateCcw } from "lucide-react";
import SettingItem from "./SettingItem";
import IconHeader from "./CardHeader";
import { useSettingsState } from "../hooks/useSettingsState";
import { useToast } from "@/hooks/use-toast";

const MembershipSettings = () => {
  const { toast } = useToast();
  
  const initialSettings = [
    { id: "openMembership", value: false },
    { id: "requireApproval", value: true },
    { id: "memberInvitation", value: true },
    { id: "waitingPeriod", value: true }
  ];
  
  const { 
    updateSetting, 
    isSettingChanged, 
    hasChanges, 
    resetSettings, 
    saveSettings 
  } = useSettingsState(initialSettings);

  const handleSave = () => {
    saveSettings();
    toast({
      title: "Membership settings saved",
      description: "Your community membership settings have been updated successfully.",
    });
  };

  return (
    <Card>
      <IconHeader 
        icon={<UserPlus />}
        title="Membership Controls" 
        description="Manage how users join and participate in communities"
      />
      <CardContent>
        <div className="space-y-6">
          <SettingItem
            title="Open membership"
            description="Allow anyone to join communities without approval"
            defaultChecked={false}
            onToggle={(checked) => updateSetting("openMembership", checked)}
            isChanged={isSettingChanged("openMembership")}
          />
          
          <SettingItem
            title="Require membership approval"
            description="New members must be approved by moderators"
            defaultChecked={true}
            onToggle={(checked) => updateSetting("requireApproval", checked)}
            isChanged={isSettingChanged("requireApproval")}
          />
          
          <SettingItem
            title="Allow invitation by members"
            description="Existing members can invite others to join"
            defaultChecked={true}
            onToggle={(checked) => updateSetting("memberInvitation", checked)}
            isChanged={isSettingChanged("memberInvitation")}
          />
          
          <ThresholdSetting
            title="Waiting period for new members"
            description="Days before new members can post (0 for none)"
            value="1"
          />
          
          <div className="flex justify-end gap-2">
            {hasChanges() && (
              <Button 
                variant="outline" 
                onClick={resetSettings}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            )}
            <Button 
              onClick={handleSave} 
              disabled={!hasChanges()}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
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
