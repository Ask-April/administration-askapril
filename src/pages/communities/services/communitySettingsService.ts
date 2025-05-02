
// Mock community settings service for now, will be replaced with real data later
import { CommunitySetting } from "@/services/types";

// Export as a named constant to match import in useSettingsState
export const communitySettingsService = {
  getSettings: async (communityId: string): Promise<CommunitySetting[]> => {
    // Since there's a type error with the table name "settings" not being in the Supabase types,
    // we'll continue using mock data for now until the database schema is updated
    
    // Mock data for now
    return [
      {
        id: "1",
        name: "Enable discussions",
        description: "Allow members to create and participate in discussions",
        category: "general",
        value: true
      },
      {
        id: "2",
        name: "Auto-approve new members",
        description: "Automatically approve new member requests",
        category: "membership",
        value: false
      },
      {
        id: "3",
        name: "Content moderation",
        description: "Review posts before they are published",
        category: "moderation",
        value: true
      },
      {
        id: "4",
        name: "Email notifications",
        description: "Send email notifications for new activities",
        category: "notifications",
        value: true
      }
    ];
  },
  
  updateSetting: async (communityId: string, settingId: string, value: boolean): Promise<void> => {
    console.log(`Updating setting ${settingId} to ${value} for community ${communityId}`);
    // In a real implementation, this would update the database
    return Promise.resolve();
  }
};
