
import { supabase } from '@/integrations/supabase/client';
import { courseService } from '@/services/courseService';

/**
 * This is a simple API endpoint example that can be used to fetch courses
 * It's not using Next.js, just a regular exported function
 */
export const getCourses = async () => {
  return await courseService.getPublicCourses();
};

export const getCourseById = async (id: string) => {
  return await courseService.getCourseById(id);
};

// This shows how you could implement a frontend-safe way to get courses
// without exposing the Supabase client directly in the frontend
export const getPublishedCoursesByCategory = async (category: string) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .eq('category', category);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    throw error;
  }
};
