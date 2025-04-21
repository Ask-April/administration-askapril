
import { supabase } from "@/integrations/supabase/client";
import { CourseSection, CourseLesson } from "../types";

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
          is_preview: false,
          is_draft: false,
          is_compulsory: true,
          enable_discussion: false
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

/**
 * Save curriculum for a course
 */
export const saveCurriculum = async (
  courseId: string,
  sections: CourseSection[]
): Promise<boolean> => {
  try {
    // For now, let's implement a simple version that just logs the data
    // In a real implementation, we would save each section and its lessons to the database
    console.log("Saving curriculum for course", courseId, sections);

    // Process each section
    for (const section of sections) {
      // Check if section exists
      const { data: existingSection } = await supabase
        .from("course_module")
        .select("*")
        .eq("module_id", section.id)
        .single();

      if (existingSection) {
        // Update existing section
        await supabase
          .from("course_module")
          .update({
            title: section.title,
            position: section.position
          })
          .eq("module_id", section.id);
      } else {
        // Create new section
        await supabase
          .from("course_module")
          .insert({
            module_id: section.id,
            course_id: courseId,
            title: section.title,
            position: section.position
          });
      }

      // Process each lesson in the section
      for (const lesson of section.lessons) {
        // Check if lesson exists
        const { data: existingLesson } = await supabase
          .from("lessons")
          .select("*")
          .eq("lesson_id", lesson.id)
          .single();

        const lessonData = {
          title: lesson.title,
          type: lesson.type,
          position: lesson.position,
          content: lesson.content || '',
          content_url: lesson.content_url || '',
          video_url: lesson.video_url || '',
          duration: lesson.duration || 0,
          module_id: section.id
        };

        if (existingLesson) {
          // Update existing lesson
          await supabase
            .from("lessons")
            .update(lessonData)
            .eq("lesson_id", lesson.id);
        } else {
          // Create new lesson
          await supabase
            .from("lessons")
            .insert({
              lesson_id: lesson.id,
              ...lessonData
            });
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error in saveCurriculum:", error);
    return false;
  }
};

// Create an object with all exports
export const curriculumService = {
  getCurriculum,
  saveCurriculum
};
