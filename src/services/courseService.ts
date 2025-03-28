
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Course = Tables<"courses">;

export interface CourseSection {
  id: string;
  title: string;
  course_id: string;
  order: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  section_id: string;
  type: string;
  content_url?: string;
  is_preview: boolean;
  is_draft: boolean;
  is_compulsory: boolean;
  enable_discussion: boolean;
  order: number;
}

/**
 * Service for interacting with courses data in Supabase
 * This can be used by this project or imported into another project
 */
export const courseService = {
  /**
   * Get all published courses
   */
  getPublicCourses: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching public courses:", error);
      throw error;
    }
    
    return data as Course[];
  },
  
  /**
   * Get a single course by id
   */
  getCourseById: async (id: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching course with id ${id}:`, error);
      throw error;
    }
    
    return data as Course;
  },
  
  /**
   * Get courses by category
   */
  getCoursesByCategory: async (category: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching courses for category ${category}:`, error);
      throw error;
    }
    
    return data as Course[];
  },
  
  /**
   * Create a new course (admin/teacher only)
   */
  createCourse: async (courseData: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
    // Check authentication first
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to create a course");
    }
    
    const { data, error } = await supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating course:", error);
      throw error;
    }
    
    return data as Course;
  },
  
  /**
   * Create a course section
   */
  createSection: async (sectionData: Omit<CourseSection, 'id'>) => {
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
  createLesson: async (lessonData: Omit<CourseLesson, 'id'>) => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to create a lesson");
    }
    
    const { data, error } = await supabase
      .from('course_lessons')
      .insert(lessonData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating lesson:", error);
      throw error;
    }
    
    return data as CourseLesson;
  },
  
  /**
   * Update an existing course (admin/teacher only)
   */
  updateCourse: async (id: string, courseData: Partial<Omit<Course, 'id' | 'created_at' | 'updated_at'>>) => {
    // Check authentication first
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to update a course");
    }
    
    const { data, error } = await supabase
      .from('courses')
      .update(courseData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating course with id ${id}:`, error);
      throw error;
    }
    
    return data as Course;
  },
  
  /**
   * Delete a course (admin/teacher only)
   */
  deleteCourse: async (id: string) => {
    // Check authentication first
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to delete a course");
    }
    
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting course with id ${id}:`, error);
      throw error;
    }
    
    return true;
  }
};
