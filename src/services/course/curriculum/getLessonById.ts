
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
      // Check if these properties exist in the data object before accessing them
      content: 'content' in data ? data.content : '',
      content_url: data.content_url ?? '',
      video_url: 'video_url' in data ? data.video_url : '',
      duration: data.duration ?? 0,
      is_preview: 'is_preview' in data ? data.is_preview === true : false,
      is_draft: 'is_draft' in data ? data.is_draft === true : false,
      is_compulsory: 'is_compulsory' in data ? data.is_compulsory !== false : true,
      enable_discussion: 'enable_discussion' in data ? data.enable_discussion === true : false
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
