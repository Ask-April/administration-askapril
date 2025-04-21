
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Course } from "@/services/types";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async (): Promise<Course[]> => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('course_id', { ascending: false });

      if (error) {
        console.error("Error fetching courses:", error);
        throw error;
      }

      // Map result to our Course type. Only fields present in schema are present.
      const courses: Course[] = (data || []).map(course => ({
        course_id: course.course_id,
        title: course.title,
        description: course.description,
        category_id: course.category_id,
        image_url: course.image_url,
        status: course.status,
        site_id: course.site_id,
        featured: course.featured,
        price_visible: course.price_visible,
        hidden: course.hidden,
        has_certificate: course.has_certificate,
        has_enrollment_limit: course.has_enrollment_limit,
        max_enrollments: course.max_enrollments,
        subtitle: course.subtitle,
        external_metadata: course.external_metadata,
        slug: course.slug,
      }));

      return courses;
    },
  });
}

export function useCourseById(courseId: string | undefined) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async (): Promise<Course | null> => {
      if (!courseId) {
        return null;
      }
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('course_id', courseId)
        .maybeSingle();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw error;
      }

      if (!data) return null;

      const course: Course = {
        course_id: data.course_id,
        title: data.title,
        description: data.description,
        category_id: data.category_id,
        image_url: data.image_url,
        status: data.status,
        site_id: data.site_id,
        featured: data.featured,
        price_visible: data.price_visible,
        hidden: data.hidden,
        has_certificate: data.has_certificate,
        has_enrollment_limit: data.has_enrollment_limit,
        max_enrollments: data.max_enrollments,
        subtitle: data.subtitle,
        external_metadata: data.external_metadata,
        slug: data.slug,
      };
      return course;
    },
    enabled: !!courseId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
