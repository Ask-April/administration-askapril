
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Save, RotateCcw } from "lucide-react";
import SettingItem from "./SettingItem";
import IconHeader from "./CardHeader";
import { useSettingsState } from "../hooks/useSettingsState";
import { useToast } from "@/hooks/use-toast";
import ThresholdSetting from "./ThresholdSetting";

const MembershipSettings = () => {
  const { toast } = useToast();
  
  const initialSettingsIds = [
    "openMembership",
    "requireMemberApproval",
    "memberInvitation",
    "waitingPeriod"
  ];
  
  const { 
    settings,
    updateSetting, 
    isSettingChanged, 
    hasChanges, 
    resetSettings, 
    saveSettings,
    isLoading
  } = useSettingsState(initialSettingsIds);

  const handleSave = async () => {
    try {
      await saveSettings();
      toast({
        title: "Membership settings saved",
        description: "Your community membership settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <IconHeader 
          icon={<UserPlus />}
          title="Membership Controls" 
          description="Manage how users join and participate in communities"
        />
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            Loading settings...
          </div>
        </CardContent>
      </Card>
    );
  }

  const getSetting = (id: string) => {
    return settings.find(s => s.id === id) || { id, value: false };
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
            defaultChecked={getSetting("openMembership").value}
            onToggle={(checked) => updateSetting("openMembership", checked)}
            isChanged={isSettingChanged("openMembership")}
          />
          
          <SettingItem
            title="Require membership approval"
            description="New members must be approved by moderators"
            defaultChecked={getSetting("requireMemberApproval").value}
            onToggle={(checked) => updateSetting("requireMemberApproval", checked)}
            isChanged={isSettingChanged("requireMemberApproval")}
          />
          
          <SettingItem
            title="Allow invitation by members"
            description="Existing members can invite others to join"
            defaultChecked={getSetting("memberInvitation").value}
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

export default MembershipSettings;
