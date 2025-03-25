
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save, RotateCcw } from "lucide-react";
import SettingItem from "./SettingItem";
import IconHeader from "./CardHeader";
import { useSettingsState } from "../hooks/useSettingsState";
import { useToast } from "@/hooks/use-toast";

const GeneralSettings = () => {
  const { toast } = useToast();
  
  const initialSettingsIds = [
    "fileUploads",
    "communitySearch",
    "richText",
    "codeSnippets"
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
        title: "Settings saved",
        description: "Your community settings have been updated successfully.",
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
          icon={<Settings />}
          title="Community Settings" 
          description="Manage general settings for all communities"
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
        icon={<Settings />}
        title="Community Settings" 
        description="Manage general settings for all communities"
      />
      <CardContent>
        <div className="space-y-6">
          <SettingItem
            title="Allow file uploads in discussions"
            description="Let users attach files to their discussion posts"
            defaultChecked={getSetting("fileUploads").value}
            onToggle={(checked) => updateSetting("fileUploads", checked)}
            isChanged={isSettingChanged("fileUploads")}
          />
          
          <SettingItem
            title="Enable community search"
            description="Allow users to search content within communities"
            defaultChecked={getSetting("communitySearch").value}
            onToggle={(checked) => updateSetting("communitySearch", checked)}
            isChanged={isSettingChanged("communitySearch")}
          />
          
          <SettingItem
            title="Allow rich text formatting"
            description="Enable markdown and rich text in community posts"
            defaultChecked={getSetting("richText").value}
            onToggle={(checked) => updateSetting("richText", checked)}
            isChanged={isSettingChanged("richText")}
          />
          
          <SettingItem
            title="Enable code snippets"
            description="Allow users to share formatted code in discussions"
            defaultChecked={getSetting("codeSnippets").value}
            onToggle={(checked) => updateSetting("codeSnippets", checked)}
            isChanged={isSettingChanged("codeSnippets")}
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

export default GeneralSettings;
