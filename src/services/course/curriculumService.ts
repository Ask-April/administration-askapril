
import { supabase } from "@/integrations/supabase/client";
import { CourseSection, CourseLesson } from "../types";

/**
 * Service for managing course curriculum (sections and lessons)
 */
export const curriculumService = {
  /**
   * Create a course section
   */
  createSection: async (sectionData: Omit<CourseSection, 'id' | 'created_at' | 'updated_at'>) => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to create a section");
    }
    
    const { data, error } = await supabase
      .from('course_sections')
      .insert(sectionData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating section:", error);
      throw error;
    }
    
    return data as CourseSection;
  },
  
  /**
   * Create a course lesson
   */
  createLesson: async (lessonData: Omit<CourseLesson, 'id' | 'created_at' | 'updated_at'>) => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to create a lesson");
    }
    
    const { data, error } = await supabase
      .from('course_lessons')
      .insert({
        section_id: lessonData.section_id,
        title: lessonData.title,
        type: lessonData.type,
        content: lessonData.content,
        content_url: lessonData.content_url,
        video_url: lessonData.video_url,
        duration: lessonData.duration,
        position: lessonData.position,
        is_preview: lessonData.is_preview,
        is_draft: lessonData.is_draft,
        is_compulsory: lessonData.is_compulsory,
        enable_discussion: lessonData.enable_discussion
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error creating lesson:", error);
      throw error;
    }
    
    return data as CourseLesson;
  },
  
  /**
   * Get all sections and lessons for a course
   */
  getCourseCurriculum: async (courseId: string) => {
    // First get all sections
    const { data: sections, error: sectionsError } = await supabase
      .from('course_sections')
      .select('*')
      .eq('course_id', courseId)
      .order('position', { ascending: true });
    
    if (sectionsError) {
      console.error("Error fetching course sections:", sectionsError);
      throw sectionsError;
    }
    
    if (!sections || sections.length === 0) {
      return [];
    }
    
    // Now get all lessons for these sections
    const sectionIds = sections.map(section => section.id);
    const { data: lessons, error: lessonsError } = await supabase
      .from('course_lessons')
      .select('*')
      .in('section_id', sectionIds)
      .order('position', { ascending: true });
    
    if (lessonsError) {
      console.error("Error fetching course lessons:", lessonsError);
      throw lessonsError;
    }
    
    // Combine sections with their lessons
    const sectionsWithLessons = sections.map(section => ({
      ...section,
      lessons: (lessons || []).filter(lesson => lesson.section_id === section.id)
    }));
    
    return sectionsWithLessons;
  },
  
  /**
   * Save complete curriculum (sections and lessons)
   */
  saveCurriculum: async (courseId: string, sections: any[]) => {
    console.log("CourseService - Saving curriculum for course:", courseId, sections);
    
    // First, save all sections
    for (const section of sections) {
      // Ensure we're using a valid UUID for section id
      if (!section.id || typeof section.id !== 'string' || !section.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        console.error("Invalid section ID format:", section.id);
        throw new Error("Invalid section ID format: must be a valid UUID");
      }
      
      console.log("Saving section:", section);
      
      const { error: sectionError } = await supabase
        .from('course_sections')
        .upsert({
          id: section.id,
          course_id: courseId,
          title: section.title,
          position: section.position
        }, { onConflict: 'id' });
      
      if (sectionError) {
        console.error("CourseService - Error saving section:", sectionError);
        throw sectionError;
      }
      
      // Then save all lessons for this section
      for (const lesson of section.lessons) {
        // Ensure we're using a valid UUID for lesson id
        if (!lesson.id || typeof lesson.id !== 'string' || !lesson.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          console.error("Invalid lesson ID format:", lesson.id);
          throw new Error("Invalid lesson ID format: must be a valid UUID");
        }
        
        console.log("Saving lesson:", lesson);
        
        const { error: lessonError } = await supabase
          .from('course_lessons')
          .upsert({
            id: lesson.id,
            section_id: section.id,
            title: lesson.title,
            type: lesson.type || 'video',
            position: lesson.position,
            content: lesson.content || '',
            duration: lesson.duration || 0,
            is_draft: lesson.isDraft || false
          }, { onConflict: 'id' });
        
        if (lessonError) {
          console.error("CourseService - Error saving lesson:", lessonError);
          throw lessonError;
        }
      }
    }
    
    // Update total lessons count in the course
    const totalLessons = sections.reduce((count, section) => count + section.lessons.length, 0);
    
    const { error: updateError } = await supabase
      .from('courses')
      .update({ lessons: totalLessons })
      .eq('course_id', courseId);
    
    if (updateError) {
      console.error("CourseService - Error updating lesson count:", updateError);
      throw updateError;
    }
    
    console.log("CourseService - Curriculum saved successfully");
    return { success: true };
  }
};
