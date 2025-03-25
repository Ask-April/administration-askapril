
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Save, RotateCcw } from "lucide-react";
import SettingItem from "./SettingItem";
import IconHeader from "./CardHeader";
import { useSettingsState } from "../hooks/useSettingsState";
import { useToast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const { toast } = useToast();
  
  const initialSettings = [
    { id: "emailDigests", value: true },
    { id: "newDiscussions", value: true },
    { id: "replyNotifications", value: true },
    { id: "moderatorAlerts", value: true }
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
      title: "Notification settings saved",
      description: "Your community notification preferences have been updated successfully.",
    });
  };

  return (
    <Card>
      <IconHeader 
        icon={<BellRing />}
        title="Notification Settings" 
        description="Configure how and when notifications are sent"
      />
      <CardContent>
        <div className="space-y-6">
          <SettingItem
            title="Email digests"
            description="Send weekly email digests of community activity"
            defaultChecked={true}
            onToggle={(checked) => updateSetting("emailDigests", checked)}
            isChanged={isSettingChanged("emailDigests")}
          />
          
          <SettingItem
            title="New discussion notifications"
            description="Notify members when new discussions are created"
            defaultChecked={true}
            onToggle={(checked) => updateSetting("newDiscussions", checked)}
            isChanged={isSettingChanged("newDiscussions")}
          />
          
          <SettingItem
            title="Reply notifications"
            description="Notify users when someone replies to their posts"
            defaultChecked={true}
            onToggle={(checked) => updateSetting("replyNotifications", checked)}
            isChanged={isSettingChanged("replyNotifications")}
          />
          
          <SettingItem
            title="Moderator alerts"
            description="Send alerts to moderators for flagged content"
            defaultChecked={true}
            onToggle={(checked) => updateSetting("moderatorAlerts", checked)}
            isChanged={isSettingChanged("moderatorAlerts")}
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

export default NotificationSettings;
