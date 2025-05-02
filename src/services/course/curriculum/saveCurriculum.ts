
import { supabase } from "@/integrations/supabase/client";
import { CourseSection } from "../types";

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
      .from("course_module")
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
        // Make sure we have a string ID by explicitly converting it
        const moduleId = String(sectionId);
        
        const { error: lessonDeleteError } = await supabase
          .from("lessons")
          .delete()
          .eq("module_id", moduleId);
        
        if (lessonDeleteError) {
          console.error(`Error deleting lessons for section ${moduleId}:`, lessonDeleteError);
          throw lessonDeleteError;
        }
      }
      
      // Then delete the sections - make sure we convert all IDs to strings
      const { error: sectionDeleteError } = await supabase
        .from("course_module")
        .delete()
        .in("module_id", sectionIdsToDelete.map(id => String(id)));
      
      if (sectionDeleteError) {
        console.error("Error deleting sections:", sectionDeleteError);
        throw sectionDeleteError;
      }
    }

    // Process each section
    for (const section of sections) {
      await processSection(section, courseId);
    }

    return true;
  } catch (error) {
    console.error("Error in saveCurriculum:", error);
    return false;
  }
};

/**
 * Process a single section (update or create)
 */
const processSection = async (
  section: CourseSection, 
  courseId: string
): Promise<void> => {
  // Check if section exists
  const { data: existingSection, error: sectionError } = await supabase
    .from("course_module")
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
      .from("course_module")
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
      .from("course_module")
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
  await processLessons(section);
};

/**
 * Process lessons for a section (update, create, delete)
 */
const processLessons = async (section: CourseSection): Promise<void> => {
  const existingLessonIds = new Set();
  
  // Get existing lessons for this section
  const { data: existingLessons, error: lessonsQueryError } = await supabase
    .from("lessons")
    .select("lesson_id")
    .eq("module_id", String(section.id));
  
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
        .from("lessons")
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
    await processLesson(lesson, section.id, existingLessonIds);
  }
};

/**
 * Process a single lesson (update or create)
 */
const processLesson = async (
  lesson: any,
  sectionId: string,
  existingLessonIds: Set<string>
): Promise<void> => {
  const lessonData = {
    title: lesson.title,
    type: lesson.type,
    position: lesson.position,
    content: lesson.content || '',
    content_url: lesson.content_url || '',
    video_url: lesson.video_url || '',
    duration: lesson.duration || 0,
    module_id: String(sectionId),
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
      .from("lessons")
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
      .from("lessons")
      .insert({
        lesson_id: String(lesson.id),
        ...lessonData
      });
    
    if (insertError) {
      console.error("Error inserting lesson:", insertError);
      throw insertError;
    }
  }
};
