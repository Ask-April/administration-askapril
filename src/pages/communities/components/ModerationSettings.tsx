import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Save, RotateCcw } from "lucide-react";
import SettingItem from "./SettingItem";
import IconHeader from "./CardHeader";
import { useSettingsState } from "../hooks/useSettingsState";
import { useToast } from "@/hooks/use-toast";

const ModerationSettings = () => {
  const { toast } = useToast();
  
  const initialSettings = [
    { id: "autoModerate", value: true },
    { id: "requireApproval", value: false },
    { id: "spamDetection", value: true },
    { id: "reportThreshold", value: true }
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
      title: "Moderation settings saved",
      description: "Your community moderation settings have been updated successfully.",
    });
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
            defaultChecked={true}
            onToggle={(checked) => updateSetting("autoModerate", checked)}
            isChanged={isSettingChanged("autoModerate")}
          />
          
          <SettingItem
            title="Require post approval"
            description="New posts require moderator approval before publishing"
            defaultChecked={false}
            onToggle={(checked) => updateSetting("requireApproval", checked)}
            isChanged={isSettingChanged("requireApproval")}
          />
          
          <SettingItem
            title="Enable spam detection"
            description="Automatically flag potential spam content"
            defaultChecked={true}
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

// Keeping the ThresholdSetting component within the same file
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
