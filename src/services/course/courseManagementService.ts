
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Service for managing course data
 */
export const courseManagementService = {
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
      .eq('course_id', id)
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
  createCourse: async (courseData: {
    title: string;
    description: string;
    category: string;
    image: string;
    duration: string;
    status: "draft" | "published";
    lessons: number;
    students: number;
  }) => {
    console.log("CourseService - Creating course with data:", courseData);
    
    // Generate a site_id since it's required
    const site_id = crypto.randomUUID();
    
    const sanitizedData = {
      ...courseData,
      image: courseData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      site_id: site_id,
    };
    
    console.log("CourseService - Sanitized data:", sanitizedData);
    
    const { data, error } = await supabase
      .from('courses')
      .insert(sanitizedData)
      .select('*')
      .single();
    
    if (error) {
      console.error("CourseService - Error creating course:", error);
      throw error;
    }
    
    console.log("CourseService - Course created successfully:", data);
    return data;
  },
  
  /**
   * Update an existing course (admin/teacher only)
   */
  updateCourse: async (id: string, courseData: Partial<Omit<Course, 'course_id' | 'created_at' | 'updated_at'>>) => {
    // Check authentication first
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to update a course");
    }
    
    const { data, error } = await supabase
      .from('courses')
      .update(courseData)
      .eq('course_id', id)
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
      .eq('course_id', id);
    
    if (error) {
      console.error(`Error deleting course with id ${id}:`, error);
      throw error;
    }
    
    return true;
  },
};
