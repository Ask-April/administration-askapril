
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
        
        // Ensure returned data matches the Course type
        const course: Course = {
          course_id: data.course_id,
          title: data.title,
          description: data.description,
          category: data.category,
          image: data.image_url, // Map image_url to image property
          duration: data.duration,
          lessons: data.lessons,
          status: data.status,
          students: data.students,
          site_id: data.site_id,
          created_at: data.created_at,
          updated_at: data.updated_at,
          subtitle: data.subtitle,
          featured: data.featured,
          priceVisible: data.price_visible, // Map price_visible to priceVisible
          hidden: data.hidden,
          hasCertificate: data.has_certificate, // Map has_certificate to hasCertificate
          certificateTemplate: data.certificate_template,
          hasEnrollmentLimit: data.has_enrollment_limit, // Map has_enrollment_limit to hasEnrollmentLimit
          maxEnrollments: data.max_enrollments // Map max_enrollments to maxEnrollments
        };
        
        return course || null;
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
