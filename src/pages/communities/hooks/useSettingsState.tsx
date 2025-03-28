
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { communitySettingsService } from "../services/communitySettingsService";
import { useState, useRef } from "react";

export interface CommunitySetting {
  id: string;
  name: string;
  description: string | null;
  category: string;
  value: boolean;
}

export const useSettingsState = (communityId: string | string[]) => {
  // Convert to string if an array is passed (used by settings components)
  const communityIdString = typeof communityId === 'string' 
    ? communityId 
    : '00000000-0000-0000-0000-000000000001'; // Default community ID

  const [settings, setSettings] = useState<CommunitySetting[]>([]);
  const originalSettings = useRef<CommunitySetting[]>([]);
  const queryClient = useQueryClient();

  // Fetch settings
  const { data: fetchedSettings, isLoading } = useQuery({
    queryKey: ["community-settings", communityIdString],
    queryFn: () => communitySettingsService.getSettings(communityIdString),
    meta: {
      onSuccess: (data: CommunitySetting[]) => {
        setSettings(data);
        originalSettings.current = JSON.parse(JSON.stringify(data)); // Deep copy for comparison
      }
    }
  });

  // Use the settings from the query or the local state
  const displaySettings = fetchedSettings || settings;

  // Check if a specific setting has changed
  const isSettingChanged = (settingId: string) => {
    const current = displaySettings.find(s => s.id === settingId);
    const original = originalSettings.current.find(s => s.id === settingId);
    
    return current && original && current.value !== original.value;
  };

  // Check if any settings have changed
  const hasChanges = () => {
    return displaySettings.some(current => {
      const original = originalSettings.current.find(s => s.id === current.id);
      return original && current.value !== original.value;
    });
  };

  // Reset settings to original values
  const resetSettings = () => {
    setSettings([...originalSettings.current]);
  };

  // Update setting mutation
  const updateSettingMutation = useMutation({
    mutationFn: ({ settingId, value }: { settingId: string; value: boolean }) =>
      communitySettingsService.updateSetting(communityIdString, settingId, value),
    onMutate: async ({ settingId, value }) => {
      // Optimistically update the UI
      const updatedSettings = displaySettings.map(setting =>
        setting.id === settingId ? { ...setting, value } : setting
      );
      setSettings(updatedSettings);
    },
    onSettled: () => {
      // Refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["community-settings", communityIdString] });
    }
  });

  // Save all changed settings
  const saveSettings = async () => {
    const changedSettings = displaySettings.filter(current => {
      const original = originalSettings.current.find(s => s.id === current.id);
      return original && current.value !== original.value;
    });

    // Update each changed setting
    await Promise.all(
      changedSettings.map(setting => 
        communitySettingsService.updateSetting(communityIdString, setting.id, setting.value)
      )
    );

    // Refresh the data
    queryClient.invalidateQueries({ queryKey: ["community-settings", communityIdString] });
    
    // Update our reference copy
    originalSettings.current = JSON.parse(JSON.stringify(displaySettings));
  };

  return {
    settings: displaySettings,
    updateSetting: (settingId: string, value: boolean) => updateSettingMutation.mutate({ settingId, value }),
    isSettingChanged,
    hasChanges,
    resetSettings,
    saveSettings,
    isLoading
  };
};
