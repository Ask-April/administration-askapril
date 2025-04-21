
import { ContentReport } from "@/services/types";

const COMMUNITY_ID = '00000000-0000-0000-0000-000000000001';

export const fetchContentReports = async (): Promise<ContentReport[]> => {
  try {
    // Mock data instead of using Supabase directly
    return [
      {
        id: "1",
        community_id: COMMUNITY_ID,
        reporter_id: "user1",
        content_type: "post",
        content_id: "post1",
        content_excerpt: "This is inappropriate content...",
        reason: "Offensive language",
        severity: "medium",
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "2",
        community_id: COMMUNITY_ID,
        reporter_id: "user2",
        content_type: "comment",
        content_id: "comment1",
        content_excerpt: "Spam link: click here...",
        reason: "Spam",
        severity: "low",
        status: "reviewed",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  } catch (error) {
    console.error('Failed to fetch content reports:', error);
    throw error;
  }
};

export const updateReportStatus = async (reportId: string, status: ContentReport['status']): Promise<void> => {
  try {
    // Mock implementation
    console.log(`Updating report ${reportId} status to ${status}`);
    return Promise.resolve();
  } catch (error) {
    console.error(`Failed to update report ${reportId}:`, error);
    throw error;
  }
};

export const removeReport = async (reportId: string): Promise<void> => {
  try {
    // Mock implementation
    console.log(`Dismissing report ${reportId}`);
    return Promise.resolve();
  } catch (error) {
    console.error(`Failed to dismiss report ${reportId}:`, error);
    throw error;
  }
};
