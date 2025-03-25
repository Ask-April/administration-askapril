
import { supabase } from "@/integrations/supabase/client";

export interface CommunitySettingResponse {
  id: string;
  community_id: string;
  setting_id: string;
  value: boolean;
  updated_at: string;
  created_at: string;
}

export interface CommunitySetting {
  id: string;
  value: boolean;
}

// Fixed community ID for demo purposes
const COMMUNITY_ID = '00000000-0000-0000-0000-000000000001';

export const fetchCommunitySettings = async (): Promise<CommunitySetting[]> => {
  try {
    const { data, error } = await supabase
      .from('community_settings')
      .select('*')
      .eq('community_id', COMMUNITY_ID);

    if (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }

    return (data as CommunitySettingResponse[]).map(setting => ({
      id: setting.setting_id,
      value: setting.value
    }));
  } catch (error) {
    console.error('Failed to fetch community settings:', error);
    throw error;
  }
};

export const updateCommunitySetting = async (settingId: string, value: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('community_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('community_id', COMMUNITY_ID)
      .eq('setting_id', settingId);

    if (error) {
      console.error('Error updating setting:', error);
      throw error;
    }
  } catch (error) {
    console.error(`Failed to update setting ${settingId}:`, error);
    throw error;
  }
};

export const updateCommunitySettings = async (settings: CommunitySetting[]): Promise<void> => {
  try {
    // Using Promise.all to perform all updates concurrently
    await Promise.all(
      settings.map(setting => 
        updateCommunitySetting(setting.id, setting.value)
      )
    );
  } catch (error) {
    console.error('Failed to update community settings:', error);
    throw error;
  }
};
