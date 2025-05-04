
import { supabase } from "@/integrations/supabase/client";
import { CourseLesson } from "@/services/types";

/**
 * Get a specific lesson by ID
 * @param lessonId The unique identifier of the lesson to retrieve
 */
export const getLessonById = async (lessonId: string): Promise<CourseLesson | null> => {
  try {
    const { data, error } = await supabase
      .from("course_lesson")  // Using the actual table name in the database
      .select("*")
      .eq("lesson_id", lessonId)
      .single();
    
    if (error) {
      console.error("Error fetching lesson:", error);
      throw error;
    }
    
    if (!data) {
      return null;
    }
    
    // Map the database response to our CourseLesson type with proper type safety
    // and default values for potentially missing properties
    const lesson: CourseLesson = {
      id: data.lesson_id,
      section_id: data.section_id,
      title: data.title || '',
      type: data.type || 'video',
      position: data.position || 0,
      content: data.content || '',  // Explicitly add this even if not in DB response
      content_url: data.content_url || '',
      video_url: data.video_url || '', // Explicitly add this even if not in DB response
      duration: data.duration || 0,
      is_preview: Boolean(data.is_preview),  // Convert to boolean with default false
      is_draft: Boolean(data.is_draft),      // Convert to boolean with default false
      is_compulsory: data.is_compulsory !== false, // If undefined, default to true
      enable_discussion: Boolean(data.enable_discussion) // Convert to boolean with default false
    };

    return lesson;
  } catch (error) {
    console.error("Error in getLessonById:", error);
    throw error;
  }
};

/**
 * Service for managing course lessons
 */
export const lessonService = {
  getLessonById,
};
