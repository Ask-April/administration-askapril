
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Course } from "@/pages/api/courses";

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
      if (!courseId) return null;

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('course_id', courseId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // PGRST116 means no rows returned
          return null;
        }
        console.error("Error fetching course:", error);
        throw error;
      }

      return data;
    },
    enabled: !!courseId,
  });
}
