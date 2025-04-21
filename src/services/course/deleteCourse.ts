
import { supabase } from "@/integrations/supabase/client";

/**
 * Delete a course (admin/teacher only)
 */
export const deleteCourse = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("courses").delete().eq("course_id", id);
  if (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
  return true;
};
