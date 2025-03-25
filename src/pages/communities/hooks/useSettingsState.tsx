
import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchCommunitySettings, 
  updateCommunitySettings, 
  CommunitySetting 
} from "../services/communitySettingsService";
import { useToast } from "@/hooks/use-toast";

export function useSettingsState(initialSettingsIds: string[]) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<CommunitySetting[]>([]);
  const [originalSettings, setOriginalSettings] = useState<CommunitySetting[]>([]);
  
  // Fetch settings from Supabase using React Query
  const { 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['communitySettings'],
    queryFn: fetchCommunitySettings,
    onSuccess: (fetchedSettings) => {
      // Filter fetched settings to only include the ones we need based on initialSettingsIds
      const filteredSettings = initialSettingsIds.map(id => {
        const found = fetchedSettings.find(s => s.id === id);
        return found || { id, value: false };
      });
      
      setSettings(filteredSettings);
      setOriginalSettings(JSON.parse(JSON.stringify(filteredSettings)));
    },
    onError: (err) => {
      console.error("Error loading settings:", err);
      toast({
        title: "Error loading settings",
        description: "Could not load community settings. Please try again.",
        variant: "destructive"
      });
      
      // Fallback to default settings on error
      const defaultSettings = initialSettingsIds.map(id => ({ id, value: false }));
      setSettings(defaultSettings);
      setOriginalSettings(JSON.parse(JSON.stringify(defaultSettings)));
    }
  });
  
  // Mutation for saving settings
  const { mutate: saveSettingsMutation, isPending: isSaving } = useMutation({
    mutationFn: updateCommunitySettings,
    onSuccess: () => {
      // Update original settings to reflect the current state
      setOriginalSettings(JSON.parse(JSON.stringify(settings)));
      
      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ['communitySettings'] });
      
      toast({
        title: "Settings saved",
        description: "Your community settings have been updated successfully.",
      });
    },
    onError: (err) => {
      console.error("Error saving settings:", err);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your changes. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  const updateSetting = useCallback((id: string, value: boolean) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, value } : setting
      )
    );
  }, []);
  
  const isSettingChanged = useCallback((id: string) => {
    const current = settings.find(s => s.id === id);
    const original = originalSettings.find(s => s.id === id);
    return current?.value !== original?.value;
  }, [settings, originalSettings]);
  
  const hasChanges = useCallback(() => {
    return settings.some((setting) => {
      const original = originalSettings.find(s => s.id === setting.id);
      return setting.value !== original?.value;
    });
  }, [settings, originalSettings]);
  
  const resetSettings = useCallback(() => {
    setSettings(JSON.parse(JSON.stringify(originalSettings)));
  }, [originalSettings]);
  
  const saveSettings = useCallback(() => {
    // Only update settings that have changed
    const changedSettings = settings.filter(setting => {
      const original = originalSettings.find(s => s.id === setting.id);
      return setting.value !== original?.value;
    });
    
    if (changedSettings.length > 0) {
      saveSettingsMutation(changedSettings);
    }
    
    return settings;
  }, [settings, originalSettings, saveSettingsMutation]);

  return {
    settings,
    updateSetting,
    isSettingChanged,
    hasChanges,
    resetSettings,
    saveSettings,
    isLoading: isLoading || isSaving,
    error
  };
}
