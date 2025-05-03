
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
          is_compulsory: lesson.is_compulsory || true,
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
    console.log("Saving curriculum for course", courseId, sections);
    
    // First, get existing sections for this course to identify what needs deletion
    const { data: existingSections, error: fetchError } = await supabase
      .from("course_section")
      .select("module_id")
      .eq("course_id", courseId);
    
    if (fetchError) {
      console.error("Error fetching existing sections:", fetchError);
      throw fetchError;
    }
    
    // Create a set of current section IDs for easy lookup
    const currentSectionIds = new Set(sections.map(section => section.id));
    
    // Identify sections that need to be deleted (exist in DB but not in current sections)
    const sectionsToDelete = existingSections
      ? existingSections.filter(section => !currentSectionIds.has(section.module_id))
      : [];
    
    // Delete sections that are no longer present
    if (sectionsToDelete.length > 0) {
      const sectionIdsToDelete = sectionsToDelete.map(section => section.module_id);
      
      console.log("Deleting removed sections:", sectionIdsToDelete);
      
      // First delete related lessons to avoid foreign key constraints
      for (const sectionId of sectionIdsToDelete) {
        // Convert explicitly to string, fixing the type error
        const moduleId = String(sectionId);
        
        const { error: lessonDeleteError } = await supabase
          .from("course_lesson")
          .delete()
          .eq("section_id", moduleId); // Using section_id as column name
        
        if (lessonDeleteError) {
          console.error(`Error deleting lessons for section ${moduleId}:`, lessonDeleteError);
          throw lessonDeleteError;
        }
      }
      
      // Then delete the sections - make sure we convert all IDs to strings
      const { error: sectionDeleteError } = await supabase
        .from("course_section")
        .delete()
        .in("module_id", sectionIdsToDelete.map(id => String(id)));
      
      if (sectionDeleteError) {
        console.error("Error deleting sections:", sectionDeleteError);
        throw sectionDeleteError;
      }
    }

    // Process each section
    for (const section of sections) {
      // Check if section exists
      const { data: existingSection, error: sectionError } = await supabase
        .from("course_section")
        .select("*")
        .eq("module_id", String(section.id))
        .maybeSingle();
      
      if (sectionError) {
        console.error("Error checking section existence:", sectionError);
        throw sectionError;
      }

      if (existingSection) {
        // Update existing section
        console.log("Updating section:", section.id, section.title);
        const { error: updateError } = await supabase
          .from("course_section")
          .update({
            title: section.title,
            position: section.position
          })
          .eq("module_id", String(section.id));
        
        if (updateError) {
          console.error("Error updating section:", updateError);
          throw updateError;
        }
      } else {
        // Create new section
        console.log("Creating new section:", section.id, section.title);
        const { error: insertError } = await supabase
          .from("course_section")
          .insert({
            module_id: String(section.id),
            course_id: courseId,
            title: section.title,
            position: section.position
          });
        
        if (insertError) {
          console.error("Error inserting section:", insertError);
          throw insertError;
        }
      }

      // Process each lesson in the section
      const existingLessonIds = new Set();
      
      // Get existing lessons for this section
      const { data: existingLessons, error: lessonsQueryError } = await supabase
        .from("course_lesson")
        .select("lesson_id")
        .eq("section_id", String(section.id)); // Using section_id as column name
      
      if (lessonsQueryError) {
        console.error("Error fetching existing lessons:", lessonsQueryError);
        throw lessonsQueryError;
      }
      
      // Build a set of existing lesson IDs
      if (existingLessons) {
        existingLessons.forEach(lesson => existingLessonIds.add(lesson.lesson_id));
      }
      
      // Get current lesson IDs
      const currentLessonIds = new Set(section.lessons.map(lesson => lesson.id));
      
      // Delete lessons that are no longer in the section
      for (const existingId of existingLessonIds) {
        if (!currentLessonIds.has(existingId)) {
          console.log("Deleting removed lesson:", existingId);
          const { error: deleteError } = await supabase
            .from("course_lesson")
            .delete()
            .eq("lesson_id", String(existingId));
          
          if (deleteError) {
            console.error("Error deleting lesson:", deleteError);
            throw deleteError;
          }
        }
      }
      
      // Process each lesson in the section
      for (const lesson of section.lessons) {
        const lessonData = {
          title: lesson.title,
          type: lesson.type,
          position: lesson.position,
          content: lesson.content || '',
          content_url: lesson.content_url || '',
          video_url: lesson.video_url || '',
          duration: lesson.duration || 0,
          section_id: String(section.id), // Using section_id as column name
          is_preview: lesson.is_preview || false,
          is_draft: lesson.is_draft || false,
          is_compulsory: lesson.is_compulsory || true,
          enable_discussion: lesson.enable_discussion || false
        };

        // Check if lesson exists
        if (existingLessonIds.has(lesson.id)) {
          // Update existing lesson
          console.log("Updating lesson:", lesson.id, lesson.title);
          const { error: updateError } = await supabase
            .from("course_lesson")
            .update(lessonData)
            .eq("lesson_id", String(lesson.id));
          
          if (updateError) {
            console.error("Error updating lesson:", updateError);
            throw updateError;
          }
        } else {
          // Create new lesson
          console.log("Creating new lesson:", lesson.id, lesson.title);
          const { error: insertError } = await supabase
            .from("course_lesson")
            .insert({
              lesson_id: String(lesson.id),
              ...lessonData
            });
          
          if (insertError) {
            console.error("Error inserting lesson:", insertError);
            throw insertError;
          }
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
