
import { supabase } from "@/integrations/supabase/client";
import { CourseLesson } from "../../types";

/**
 * Find a specific lesson by ID
 */
export const getLessonById = async (lessonId: string): Promise<CourseLesson | null> => {
  if (!lessonId) return null;

  try {
    // Get full lesson details including content and other fields
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('lesson_id', lessonId)
      .maybeSingle();
    
    if (error) {
      console.error("Error getting lesson:", error);
      return null;
    }
    
    if (!data) return null;
    
    // Safely map the database fields to our CourseLesson type
    // Handle potentially missing fields with default values or empty strings
    const lesson: CourseLesson = {
      id: data.lesson_id,
      section_id: data.module_id,
      title: data.title || '',
      type: data.type || 'video',
      position: data.position || 0,
      content: data.content || '',  // Default to empty string if not in DB
      content_url: data.content_url || '',
      video_url: data.video_url || '', // Default to empty string if not in DB
      duration: data.duration || 0,
      is_preview: data.is_preview === true,  // Default to false if not in DB
      is_draft: data.is_draft === true,      // Default to false if not in DB
      is_compulsory: data.is_compulsory !== false, // Default to true if undefined
      enable_discussion: data.enable_discussion === true  // Default to false if not in DB
    };
    
    return lesson;
  } catch (error) {
    console.error("Error in getLessonById:", error);
    return null;
  }
};
