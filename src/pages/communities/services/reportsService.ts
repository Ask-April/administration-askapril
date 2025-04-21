
import { supabase } from "@/integrations/supabase/client";
import { ContentReport } from "@/services/types";

// Mock data for content reports
const mockReports: ContentReport[] = [
  {
    id: "1",
    community_id: "123",
    reporter_id: "user1",
    content_type: "post",
    content_id: "post1",
    content_excerpt: "This content contains inappropriate language...",
    reason: "inappropriate",
    severity: "medium",
    status: "pending",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "2",
    community_id: "123",
    reporter_id: "user2",
    content_type: "comment",
    content_id: "comment1",
    content_excerpt: "This comment contains harassment...",
    reason: "harassment",
    severity: "high",
    status: "reviewed",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 43200000).toISOString()
  },
  {
    id: "3",
    community_id: "123",
    reporter_id: "user3",
    content_type: "post",
    content_id: "post2",
    content_excerpt: "This post contains misinformation...",
    reason: "misinformation",
    severity: "low",
    status: "resolved",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString()
  }
];

// Service functions
export const getAllReports = async (): Promise<ContentReport[]> => {
  // In a real implementation, we would fetch from the database
  return mockReports;
};

export const updateReportStatus = async (reportId: string, status: ContentReport['status']): Promise<boolean> => {
  console.log(`Updating report ${reportId} status to ${status}`);
  
  // In a real implementation, we would update the database
  // For now, just return success
  return true;
};

export const dismissReport = async (reportId: string): Promise<boolean> => {
  console.log(`Dismissing report ${reportId}`);
  
  // In a real implementation, we would update the database
  return true;
};

// Export the ContentReport type to be used in other files
export type { ContentReport };
