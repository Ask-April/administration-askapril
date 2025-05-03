
import { supabase } from "@/integrations/supabase/client";
import { CourseLesson } from "@/services/types";

/**
 * Get a specific lesson by ID
 * @param lessonId The unique identifier of the lesson to retrieve
 */
export const getLessonById = async (lessonId: string): Promise<CourseLesson | null> => {
  try {
    const { data, error } = await supabase
      .from("lessons")
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
    
    // Map the database response to our CourseLesson type
    // with fallbacks for fields that might not exist in the database
    const lesson: CourseLesson = {
      id: data.lesson_id,
      section_id: data.module_id,
      title: data.title || '',
      type: data.type || 'video',
      position: data.position || 0,
      // Explicitly add fields with type assertions if needed
      content: (data as any).content ?? '',
      content_url: data.content_url || '',
      video_url: (data as any).video_url ?? '',
      duration: data.duration || 0,
      is_preview: (data as any).is_preview === true,
      is_draft: (data as any).is_draft === true,
      is_compulsory: (data as any).is_compulsory !== false, // default to true if not defined
      enable_discussion: (data as any).enable_discussion === true
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
