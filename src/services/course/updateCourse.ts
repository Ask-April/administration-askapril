
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Update an existing course (admin/teacher only)
 */
export const updateCourse = async (id: string, courseData: Partial<Course>): Promise<Course> => {
  const { data, error } = await supabase
    .from("courses")
    .update({
      ...courseData,
      updated_at: new Date().toISOString(),
    })
    .eq("course_id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating course:", error);
    throw error;
  }

  return data;
};
