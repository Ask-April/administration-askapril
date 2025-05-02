
import { supabase } from "@/integrations/supabase/client";
import { CourseSection, CourseLesson } from "../../types";

/**
 * Get curriculum for a course
 */
export const getCurriculum = async (courseId: string): Promise<CourseSection[]> => {
  try {
    // Fetch modules for the course
    const { data: modules, error: modulesError } = await supabase
      .from("course_module")
      .select("*")
      .eq("course_id", courseId)
      .order("position", { ascending: true });

    if (modulesError) {
      console.error("Error fetching modules:", modulesError);
      throw modulesError;
    }

    if (!modules || modules.length === 0) {
      return [];
    }

    // Create an array to store the complete curriculum with sections and lessons
    const curriculum: CourseSection[] = [];

    // For each module, fetch its lessons
    for (const module of modules) {
      const { data: lessons, error: lessonsError } = await supabase
        .from("lessons")
        .select("*")
        .eq("module_id", module.module_id)
        .order("position", { ascending: true });

      if (lessonsError) {
        console.error("Error fetching lessons:", lessonsError);
        throw lessonsError;
      }

      // Transform the module data into our CourseSection format
      const section: CourseSection = {
        id: module.module_id,
        course_id: module.course_id,
        title: module.title,
        position: module.position,
        lessons: lessons ? lessons.map((lesson: any) => ({
          id: lesson.lesson_id,
          section_id: module.module_id,
          title: lesson.title,
          type: lesson.type || 'video',
          position: lesson.position,
          content: lesson.content || '',
          content_url: lesson.content_url || '',
          video_url: lesson.video_url || '',
          duration: lesson.duration || 0,
          is_preview: Boolean(lesson.is_preview),
          is_draft: Boolean(lesson.is_draft),
          is_compulsory: lesson.is_compulsory !== false,
          enable_discussion: Boolean(lesson.enable_discussion)
        })) : []
      };

      curriculum.push(section);
    }

    return curriculum;
  } catch (error) {
    console.error("Error in getCurriculum:", error);
    throw error;
  }
};
