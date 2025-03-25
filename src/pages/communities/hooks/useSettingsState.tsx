
import { useState, useCallback, useEffect } from "react";
import { 
  fetchCommunitySettings, 
  updateCommunitySettings, 
  CommunitySetting 
} from "../services/communitySettingsService";

export function useSettingsState(initialSettingsIds: string[]) {
  const [settings, setSettings] = useState<CommunitySetting[]>([]);
  const [originalSettings, setOriginalSettings] = useState<CommunitySetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch settings from Supabase
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const fetchedSettings = await fetchCommunitySettings();
        
        // Filter fetched settings to only include the ones we need based on initialSettingsIds
        const filteredSettings = initialSettingsIds.map(id => {
          const found = fetchedSettings.find(s => s.id === id);
          return found || { id, value: false };
        });
        
        setSettings(filteredSettings);
        setOriginalSettings(JSON.parse(JSON.stringify(filteredSettings)));
        setError(null);
      } catch (err) {
        console.error("Error loading settings:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        
        // Fallback to default settings on error
        const defaultSettings = initialSettingsIds.map(id => ({ id, value: false }));
        setSettings(defaultSettings);
        setOriginalSettings(JSON.parse(JSON.stringify(defaultSettings)));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, [initialSettingsIds]);
  
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
  
  const saveSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Only update settings that have changed
      const changedSettings = settings.filter(setting => {
        const original = originalSettings.find(s => s.id === setting.id);
        return setting.value !== original?.value;
      });
      
      if (changedSettings.length > 0) {
        await updateCommunitySettings(changedSettings);
      }
      
      // Update original settings to reflect the new state
      setOriginalSettings(JSON.parse(JSON.stringify(settings)));
      return settings;
    } catch (err) {
      console.error("Error saving settings:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [settings, originalSettings]);

  return {
    settings,
    updateSetting,
    isSettingChanged,
    hasChanges,
    resetSettings,
    saveSettings,
    isLoading,
    error
  };
}
