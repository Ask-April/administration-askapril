
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Save, RotateCcw } from "lucide-react";
import SettingItem from "./SettingItem";
import IconHeader from "./CardHeader";
import { useSettingsState } from "../hooks/useSettingsState";
import { useToast } from "@/hooks/use-toast";

// Import the ThresholdSetting component
import ThresholdSetting from "./ThresholdSetting";

const ModerationSettings = () => {
  const { toast } = useToast();
  
  const initialSettingsIds = [
    "autoModerate",
    "requireApproval",
    "spamDetection",
    "reportThreshold"
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
        title: "Moderation settings saved",
        description: "Your community moderation settings have been updated successfully.",
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
          icon={<Shield />}
          title="Moderation Controls" 
          description="Manage content moderation settings and tools"
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
        icon={<Shield />}
        title="Moderation Controls" 
        description="Manage content moderation settings and tools"
      />
      <CardContent>
        <div className="space-y-6">
          <SettingItem
            title="Auto-moderate offensive content"
            description="Automatically filter potentially harmful content"
            defaultChecked={getSetting("autoModerate").value}
            onToggle={(checked) => updateSetting("autoModerate", checked)}
            isChanged={isSettingChanged("autoModerate")}
          />
          
          <SettingItem
            title="Require post approval"
            description="New posts require moderator approval before publishing"
            defaultChecked={getSetting("requireApproval").value}
            onToggle={(checked) => updateSetting("requireApproval", checked)}
            isChanged={isSettingChanged("requireApproval")}
          />
          
          <SettingItem
            title="Enable spam detection"
            description="Automatically flag potential spam content"
            defaultChecked={getSetting("spamDetection").value}
            onToggle={(checked) => updateSetting("spamDetection", checked)}
            isChanged={isSettingChanged("spamDetection")}
          />
          
          <ThresholdSetting
            title="Content reporting threshold"
            description="Number of reports before content is automatically hidden"
            value="5"
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

export default ModerationSettings;
