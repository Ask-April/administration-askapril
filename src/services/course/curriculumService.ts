
import { supabase } from "@/integrations/supabase/client";
import { CourseSection, CourseLesson } from "../types";

/**
 * Get curriculum for a course
 */
export const getCurriculum = async (courseId: string): Promise<CourseSection[]> => {
  try {
    // Fetch modules for the course
    const { data: modules, error: modulesError } = await supabase
      .from("course_section") // Using course_section as the actual table name
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
        .from("course_lesson") // Using course_lesson as the actual table name
        .select("*")
        .eq("section_id", module.module_id) // Using section_id as column name
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
          is_preview: lesson.is_preview || false,
          is_draft: lesson.is_draft || false,
          is_compulsory: lesson.is_compulsory ?? true,
          enable_discussion: lesson.enable_discussion || false
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
    console.log("Saving curriculum for course:", courseId);
    console.log("Sections to save:", sections);
    
    // Convert sections to a saveable format
    const formattedSections = sections.map(section => {
      return {
        id: section.id,
        title: section.title,
        position: section.position,
        course_id: courseId,
        lessons: section.lessons.map(lesson => {
          return {
            id: lesson.id,
            title: lesson.title,
            type: lesson.type || "text",
            is_preview: lesson.is_preview || false,
            is_draft: lesson.is_draft || false,
            is_compulsory: lesson.is_compulsory || false,
            enable_discussion: lesson.enable_discussion || false,
            content: lesson.content || null,
            content_url: lesson.content_url || null,
            position: lesson.position || 0
          };
        })
      };
    });
    
    console.log("Formatted sections:", formattedSections);
    
    // Save to Supabase or your API
    // For now, save to localStorage as a prototype
    localStorage.setItem(`curriculum-${courseId}`, JSON.stringify(formattedSections));
    
    return true;
  } catch (error) {
    console.error("Error saving curriculum:", error);
    return false;
  }
};

/**
 * Get a specific lesson by ID
 */
export const getLessonById = async (courseId: string | undefined, lessonId: string | undefined): Promise<any> => {
  try {
    if (!courseId || !lessonId) return null;
    
    // Get curriculum from localStorage or API
    const curriculumStr = localStorage.getItem(`curriculum-${courseId}`);
    if (!curriculumStr) return null;
    
    const curriculum = JSON.parse(curriculumStr) as CourseSection[];
    
    // Find the lesson
    for (const section of curriculum) {
      const lesson = section.lessons.find(l => {
        // Ensure we're comparing strings for the id check
        const lessonIdStr = typeof l.id === 'string' ? l.id : String(l.id);
        const targetIdStr = typeof lessonId === 'string' ? lessonId : String(lessonId);
        return lessonIdStr === targetIdStr;
      });
      
      if (lesson) return lesson;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting lesson by ID:", error);
    return null;
  }
};

// Create an object with all exports
export const curriculumService = {
  getCurriculum,
  saveCurriculum,
  getLessonById
};
