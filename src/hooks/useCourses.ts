
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Course } from "@/services/types";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async (): Promise<Course[]> => {
      // Cast "courses" as any to avoid TypeScript errors
      const { data, error } = await supabase
        .from('courses' as any)
        .select('*')
        .order('course_id', { ascending: false });

      if (error) {
        console.error("Error fetching courses:", error);
        throw error;
      }

      // Map result to our Course type. Only fields present in schema are present.
      const courses: Course[] = (data || []).map(course => {
        // Cast course to any to avoid TypeScript errors with properties
        const rawCourse = course as any;
        
        const c: Course = ({
          course_id: rawCourse.course_id,
          title: rawCourse.title,
          description: rawCourse.description,
          category_id: rawCourse.category_id,
          image_url: rawCourse.image_url,
          status: rawCourse.status,
          site_id: rawCourse.site_id || "",
          featured: rawCourse.featured,
          price_visible: rawCourse.price_visible,
          hidden: rawCourse.hidden,
          has_certificate: rawCourse.has_certificate,
          has_enrollment_limit: rawCourse.has_enrollment_limit,
          max_enrollments: rawCourse.max_enrollments,
          subtitle: rawCourse.subtitle,
          pricing_metadata: rawCourse.pricing_metadata || {}, // Ensure this property exists
          slug: rawCourse.slug,
          // Add virtual properties
          image: rawCourse.image_url || "",
          category: rawCourse.category_id || "",
          lessons: 0,
          students: 0
        });
        
        // Safe type checking for timestamps
        if ('created_at' in rawCourse && typeof rawCourse.created_at === 'string') {
          c.created_at = rawCourse.created_at;
        }
        if ('updated_at' in rawCourse && typeof rawCourse.updated_at === 'string') {
          c.updated_at = rawCourse.updated_at;
        }
        
        return c;
      });

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
      
      // Cast "courses" as any to avoid TypeScript errors
      const { data, error } = await supabase
        .from('courses' as any)
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

      // Cast data to any to avoid TypeScript errors with properties
      const rawCourse = data as any;
      
      const course: Course = {
        course_id: rawCourse.course_id,
        title: rawCourse.title,
        description: rawCourse.description,
        category_id: rawCourse.category_id,
        image_url: rawCourse.image_url,
        status: rawCourse.status,
        site_id: rawCourse.site_id || "",
        featured: rawCourse.featured,
        price_visible: rawCourse.price_visible,
        hidden: rawCourse.hidden,
        has_certificate: rawCourse.has_certificate,
        has_enrollment_limit: rawCourse.has_enrollment_limit,
        max_enrollments: rawCourse.max_enrollments,
        subtitle: rawCourse.subtitle,
        pricing_metadata: rawCourse.pricing_metadata || {}, // Ensure this property exists
        slug: rawCourse.slug,
        // Add virtual properties
        image: rawCourse.image_url || "",
        category: rawCourse.category_id || "",
        lessons: 0,
        students: 0
      };
      
      // Safe type checking for timestamps
      if ('created_at' in rawCourse && typeof rawCourse.created_at === 'string') {
        course.created_at = rawCourse.created_at;
      }
      if ('updated_at' in rawCourse && typeof rawCourse.updated_at === 'string') {
        course.updated_at = rawCourse.updated_at;
      }
      
      return course;
    },
    enabled: !!courseId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
