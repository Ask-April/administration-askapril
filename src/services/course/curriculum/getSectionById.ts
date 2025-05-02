
import { supabase } from "@/integrations/supabase/client";
import { CourseSection } from "../../types";

/**
 * Find a specific section by ID in the curriculum
 */
export const getSectionById = async (sectionId: string): Promise<CourseSection | null> => {
  if (!sectionId) return null;

  try {
    // Query directly from course_module table
    const { data, error } = await supabase
      .from('course_module')
      .select('*')
      .eq('module_id', sectionId)
      .maybeSingle();
    
    if (error) {
      console.error("Error getting section:", error);
      return null;
    }
    
    return data ? {
      id: data.module_id,
      title: data.title,
      position: data.position,
      course_id: data.course_id,
      lessons: []
    } : null;
  } catch (error) {
    console.error("Error in getSectionById:", error);
    return null;
  }
};
