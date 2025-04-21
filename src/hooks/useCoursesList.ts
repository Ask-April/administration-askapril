
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Course } from "@/services/types";

export function useCoursesList() {
  return useQuery({
    queryKey: ["courses-list"],
    queryFn: async (): Promise<Course[]> => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching courses list:", error);
        throw error;
      }

      // Ensure returned data matches the Course type
      const courses: Course[] = data.map(course => ({
        course_id: course.course_id,
        title: course.title,
        description: course.description,
        category: course.category,
        image: course.image_url, // Map image_url to image property
        duration: course.duration,
        lessons: course.lessons,
        status: course.status,
        students: course.students,
        site_id: course.site_id,
        created_at: course.created_at,
        updated_at: course.updated_at,
        subtitle: course.subtitle,
        featured: course.featured,
        priceVisible: course.price_visible, // Map price_visible to priceVisible
        hidden: course.hidden,
        hasCertificate: course.has_certificate, // Map has_certificate to hasCertificate
        certificateTemplate: course.certificate_template,
        hasEnrollmentLimit: course.has_enrollment_limit, // Map has_enrollment_limit to hasEnrollmentLimit
        maxEnrollments: course.max_enrollments // Map max_enrollments to maxEnrollments
      }));

      return courses || [];
    },
  });
}
