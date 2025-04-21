
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Course } from "@/services/types";

export function useCoursesList() {
  return useQuery({
    queryKey: ["courses-list"],
    queryFn: async (): Promise<Course[]> => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('course_id', { ascending: false });

      if (error) {
        console.error("Error fetching courses list:", error);
        throw error;
      }

      // Ensure returned data matches the Course type
      const courses: Course[] = (data || []).map(course => {
        const c: Course = ({
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
          slug: course.slug,
        });
        if ('created_at' in course && course.created_at) c.created_at = String(course.created_at);
        if ('updated_at' in course && course.updated_at) c.updated_at = String(course.updated_at);
        return c;
      });

      return courses;
    },
  });
}
