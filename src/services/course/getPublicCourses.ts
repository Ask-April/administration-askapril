
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Get all published courses
 */
export const getPublicCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("status", "published")
      .order("course_id", { ascending: false });

    if (error) {
      console.error("Error fetching public courses:", error);
      throw error;
    }

    // Map the database response to our Course type
    const courses: Course[] = data.map((item: any) => {
      const course: Course = {
        course_id: item.course_id,
        title: item.title,
        description: item.description,
        category_id: item.category_id,
        image_url: item.image_url,
        status: item.status,
        site_id: item.site_id,
        featured: item.featured,
        price_visible: item.price_visible,
        hidden: item.hidden,
        has_certificate: item.has_certificate,
        has_enrollment_limit: item.has_enrollment_limit,
        max_enrollments: item.max_enrollments,
        subtitle: item.subtitle,
        // external_metadata removed
        slug: item.slug,
        image: item.image_url,
        category: item.category_id,
        lessons: 0,
        students: 0
      };
      if ('created_at' in item) course.created_at = item.created_at;
      if ('updated_at' in item) course.updated_at = item.updated_at;
      return course;
    });

    return courses;
  } catch (error) {
    console.error("Error in getPublicCourses:", error);
    throw error;
  }
};

