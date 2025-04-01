
import { supabase } from "@/integrations/supabase/client";

/**
 * Service for managing course enrollments
 */
export const enrollmentService = {
  /**
   * Enroll a student in a course
   */
  enrollStudent: async (courseId: string, studentId: string) => {
    const { data, error } = await supabase
      .from('enrollment')
      .insert({
        course_id: courseId,
        student_id: studentId,
        status: 'active',
        progress_percent: 0
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error enrolling student:", error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Get all enrollments for a student
   */
  getStudentEnrollments: async (studentId: string) => {
    const { data, error } = await supabase
      .from('enrollment')
      .select(`
        *,
        courses:course_id (*)
      `)
      .eq('student_id', studentId);
    
    if (error) {
      console.error("Error fetching student enrollments:", error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Get all students enrolled in a course
   */
  getCourseEnrollments: async (courseId: string) => {
    const { data, error } = await supabase
      .from('enrollment')
      .select(`
        *,
        students:student_id (*)
      `)
      .eq('course_id', courseId);
    
    if (error) {
      console.error("Error fetching course enrollments:", error);
      throw error;
    }
    
    return data;
  }
};
