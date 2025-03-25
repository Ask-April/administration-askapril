
import { supabase } from "@/integrations/supabase/client";

export interface ContentReport {
  id: string;
  community_id: string;
  reporter_id: string;
  content_type: string;
  content_id: string;
  content_excerpt: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
  updated_at: string;
}

const COMMUNITY_ID = '00000000-0000-0000-0000-000000000001';

export const fetchContentReports = async (): Promise<ContentReport[]> => {
  try {
    const { data, error } = await supabase
      .from('content_reports')
      .select('*')
      .eq('community_id', COMMUNITY_ID)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }

    return data as ContentReport[];
  } catch (error) {
    console.error('Failed to fetch content reports:', error);
    throw error;
  }
};

export const updateReportStatus = async (reportId: string, status: ContentReport['status']): Promise<void> => {
  try {
    const { error } = await supabase
      .from('content_reports')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', reportId);

    if (error) {
      console.error('Error updating report status:', error);
      throw error;
    }
  } catch (error) {
    console.error(`Failed to update report ${reportId}:`, error);
    throw error;
  }
};

export const removeReport = async (reportId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('content_reports')
      .update({ status: 'dismissed', updated_at: new Date().toISOString() })
      .eq('id', reportId);

    if (error) {
      console.error('Error dismissing report:', error);
      throw error;
    }
  } catch (error) {
    console.error(`Failed to dismiss report ${reportId}:`, error);
    throw error;
  }
};
