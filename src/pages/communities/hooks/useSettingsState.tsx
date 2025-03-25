
import { useState, useCallback } from "react";

export interface Setting {
  id: string;
  value: boolean;
}

export function useSettingsState(initialSettings: Setting[]) {
  const [settings, setSettings] = useState<Setting[]>(initialSettings);
  const [originalSettings] = useState<Setting[]>(initialSettings);
  
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
    return settings.some((setting, index) => 
      setting.value !== originalSettings[index].value
    );
  }, [settings, originalSettings]);
  
  const resetSettings = useCallback(() => {
    setSettings([...originalSettings]);
  }, [originalSettings]);
  
  const saveSettings = useCallback(() => {
    // In a real app, this would save to backend
    console.log("Saving settings:", settings);
    // After save, the current settings become the original
    return settings;
  }, [settings]);

  return {
    settings,
    updateSetting,
    isSettingChanged,
    hasChanges,
    resetSettings,
    saveSettings
  };
}
