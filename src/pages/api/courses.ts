
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Course as CourseType } from "@/services/types";

// Define types
export type Course = CourseType;

// Get all courses
export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }
  
  return data || [];
}

// Get a single course by ID
export async function getCourseById(id: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('course_id', id)
    .single();
    
  if (error) {
    throw new Error(`Error fetching course: ${error.message}`);
  }
  
  return data;
}

// Update a course
export async function updateCourse(id: string, courseData: Partial<Course>) {
  const { data, error } = await supabase
    .from('courses')
    .update(courseData)
    .eq('course_id', id)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error updating course: ${error.message}`);
  }
  
  return data;
}
