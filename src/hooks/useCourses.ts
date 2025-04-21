

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Course } from "@/services/types";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async (): Promise<Course[]> => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching courses:", error);
        throw error;
      }

      return data || [];
    },
  });
}

export function useCourseById(courseId: string | undefined) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async (): Promise<Course | null> => {
      if (!courseId) {
        console.log("No course ID provided");
        return null;
      }

      console.log("Fetching course with ID:", courseId);
      
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('course_id', courseId)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            console.log("No course found with ID:", courseId);
            return null;
          }
          console.error("Error fetching course:", error);
          throw error;
        }

        console.log("Course data retrieved:", data);
        return data || null;
      } catch (error) {
        console.error("Exception in useCourseById:", error);
        throw error;
      }
    },
    enabled: !!courseId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}

