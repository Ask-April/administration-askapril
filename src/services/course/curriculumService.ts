
import { CourseSection, CourseLesson } from "../types";

/**
 * Service for managing course curriculum (sections and lessons) using mock data
 */
export const curriculumService = {
  /**
   * Create a course section
   */
  createSection: async (sectionData: Omit<CourseSection, 'id' | 'lessons'>): Promise<CourseSection> => {
    // Create a new mock section
    const newSection: CourseSection = {
      id: crypto.randomUUID(),
      course_id: sectionData.course_id,
      title: sectionData.title,
      position: sectionData.position,
      lessons: []
    };
    
    console.log("Created new section:", newSection);
    return newSection;
  },
  
  /**
   * Create a course lesson
   */
  createLesson: async (lessonData: Omit<CourseLesson, 'id'>): Promise<CourseLesson> => {
    // Create a new mock lesson
    const newLesson: CourseLesson = {
      id: crypto.randomUUID(),
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
    // Return mock data
    return [
      {
        id: "section-1",
        course_id: courseId,
        title: "Introduction",
        position: 1,
        lessons: [
          {
            id: "lesson-1",
            section_id: "section-1",
            title: "Welcome to the Course",
            type: "video",
            position: 1,
            duration: 5,
            is_preview: true
          },
          {
            id: "lesson-2",
            section_id: "section-1",
            title: "Course Overview",
            type: "text",
            position: 2,
            content: "This is the course overview...",
            duration: 10
          }
        ]
      },
      {
        id: "section-2",
        course_id: courseId,
        title: "Getting Started",
        position: 2,
        lessons: [
          {
            id: "lesson-3",
            section_id: "section-2",
            title: "Setting Up Your Development Environment",
            type: "video",
            position: 1,
            duration: 15
          },
          {
            id: "lesson-4",
            section_id: "section-2",
            title: "Creating Your First Project",
            type: "video",
            position: 2,
            duration: 20
          }
        ]
      }
    ];
  },
  
  /**
   * Save complete curriculum (sections and lessons)
   */
  saveCurriculum: async (courseId: string, sections: CourseSection[]): Promise<{ success: boolean }> => {
    console.log("CourseService - Saving curriculum for course:", courseId, sections);
    
    // In a real implementation, this would save to the database
    // For now, just log and return success
    
    console.log("CourseService - Curriculum saved successfully");
    return { success: true };
  }
};
