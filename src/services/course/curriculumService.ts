
import { v4 as uuidv4 } from 'uuid';
import { CourseSection, CourseLesson } from "../types";

/**
 * Service for managing course curriculum (sections and lessons) using storage
 */
export const curriculumService = {
  /**
   * Create a course section
   */
  createSection: async (sectionData: Omit<CourseSection, 'id' | 'lessons'>): Promise<CourseSection> => {
    // Create a new section with a unique ID
    const newSection: CourseSection = {
      id: uuidv4(),
      course_id: sectionData.course_id,
      title: sectionData.title,
      position: sectionData.position,
      lessons: []
    };
    
    // In a real implementation, we would save to the database
    console.log("Created new section:", newSection);
    
    return newSection;
  },
  
  /**
   * Create a course lesson
   */
  createLesson: async (lessonData: Omit<CourseLesson, 'id'>): Promise<CourseLesson> => {
    // Create a new lesson with a unique ID
    const newLesson: CourseLesson = {
      id: uuidv4(),
      section_id: lessonData.section_id,
      title: lessonData.title,
      type: lessonData.type || 'video',
      position: lessonData.position,
      content: lessonData.content,
      content_url: lessonData.content_url,
      video_url: lessonData.video_url,
      duration: lessonData.duration,
      is_preview: lessonData.is_preview,
      is_draft: lessonData.is_draft,
      is_compulsory: lessonData.is_compulsory,
      enable_discussion: lessonData.enable_discussion
    };
    
    console.log("Created new lesson:", newLesson);
    return newLesson;
  },
  
  /**
   * Get all sections and lessons for a course
   */
  getCourseCurriculum: async (courseId: string): Promise<CourseSection[]> => {
    // In a real implementation, we would fetch from a database
    // For now, we'll check localStorage first and return mock data if none exists
    
    try {
      const storedCurriculum = localStorage.getItem(`curriculum_${courseId}`);
      if (storedCurriculum) {
        return JSON.parse(storedCurriculum);
      }
    } catch (error) {
      console.error("Error retrieving curriculum from localStorage:", error);
    }
    
    // Return empty curriculum if no saved data
    return [];
  },
  
  /**
   * Save complete curriculum (sections and lessons)
   */
  saveCurriculum: async (courseId: string, sections: CourseSection[]): Promise<{ success: boolean }> => {
    console.log("CourseService - Saving curriculum for course:", courseId, sections);
    
    try {
      // Save to localStorage for persistence between sessions
      localStorage.setItem(`curriculum_${courseId}`, JSON.stringify(sections));
      console.log("CourseService - Curriculum saved successfully");
      return { success: true };
    } catch (error) {
      console.error("Error saving curriculum:", error);
      return { success: false };
    }
  }
};
