
import { supabase } from "@/integrations/supabase/client";
import { CommunitySetting } from "../hooks/useSettingsState";

// Fixed community ID for demo purposes
const COMMUNITY_ID = '00000000-0000-0000-0000-000000000001';

export interface CommunitySettingResponse {
  id: string;
  community_id: string;
  setting_id: string;
  value: boolean;
  updated_at: string;
  created_at: string;
}

const getSettings = async (communityId: string): Promise<CommunitySetting[]> => {
  try {
    // First get the settings definitions
    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .select('*')
      .order('category');

    if (settingsError) {
      console.error('Error fetching settings definitions:', settingsError);
      throw settingsError;
    }

    // Then get the community-specific values
    const { data: communitySettingsData, error: communitySettingsError } = await supabase
      .from('community_settings')
      .select('*')
      .eq('community_id', communityId);

    if (communitySettingsError) {
      console.error('Error fetching community settings:', communitySettingsError);
      throw communitySettingsError;
    }

    // Map the settings with their values
    return (settingsData || []).map(setting => {
      const communitySetting = (communitySettingsData || []).find(
        cs => cs.setting_id === setting.id
      );
      
      return {
        id: setting.id,
        name: setting.name,
        description: setting.description,
        category: setting.category,
        value: communitySetting ? communitySetting.value : false
      };
    });
  } catch (error) {
    console.error('Failed to fetch community settings:', error);
    throw error;
  }
};

const updateSetting = async (communityId: string, settingId: string, value: boolean): Promise<void> => {
  try {
    // Check if setting exists for this community
    const { data: existingSetting, error: checkError } = await supabase
      .from('community_settings')
      .select('*')
      .eq('community_id', communityId)
      .eq('setting_id', settingId)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking setting:', checkError);
      throw checkError;
    }

    if (existingSetting) {
      // Update existing setting
      const { error: updateError } = await supabase
        .from('community_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('community_id', communityId)
        .eq('setting_id', settingId);

      if (updateError) {
        console.error('Error updating setting:', updateError);
        throw updateError;
      }
    } else {
      // Insert new setting
      const { error: insertError } = await supabase
        .from('community_settings')
        .insert({
          community_id: communityId,
          setting_id: settingId,
          value
        });

      if (insertError) {
        console.error('Error inserting setting:', insertError);
        throw insertError;
      }
    }
  } catch (error) {
    console.error(`Failed to update setting ${settingId}:`, error);
    throw error;
  }
};

// Export as an object with methods
export const communitySettingsService = {
  getSettings,
  updateSetting
};
