
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { communitySettingsService } from "../services/communitySettingsService";
import { useState } from "react";

export interface CommunitySetting {
  id: string;
  name: string;
  description: string | null;
  category: string;
  value: boolean;
}

export const useSettingsState = (communityId: string) => {
  const [settings, setSettings] = useState<CommunitySetting[]>([]);
  const queryClient = useQueryClient();

  // Fetch settings
  const { data: fetchedSettings, isLoading } = useQuery({
    queryKey: ["community-settings", communityId],
    queryFn: () => communitySettingsService.getSettings(communityId),
  });

  // Use the settings from the query or the local state
  const displaySettings = fetchedSettings || settings;

  // Update setting
  const updateSettingMutation = useMutation({
    mutationFn: ({ settingId, value }: { settingId: string; value: boolean }) =>
      communitySettingsService.updateSetting(communityId, settingId, value),
    onMutate: async ({ settingId, value }) => {
      // Optimistically update the UI
      const updatedSettings = displaySettings.map(setting =>
        setting.id === settingId ? { ...setting, value } : setting
      );
      setSettings(updatedSettings);
    },
    onSettled: () => {
      // Refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["community-settings", communityId] });
    }
  });

  return {
    settings: displaySettings,
    updateSetting: (settingId: string, value: boolean) => updateSettingMutation.mutate({ settingId, value }),
    isLoading
  };
};
