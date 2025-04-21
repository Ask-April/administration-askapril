
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
      return {
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
        external_id: item.external_id,
        external_metadata: item.external_metadata,
        slug: item.slug,
        created_at: item.created_at,
        updated_at: item.updated_at,
        // Add in any virtual properties that aren't stored in the DB
        image: item.image_url,
        category: item.category_id,
        lessons: 0, // Would need additional query to count lessons
        students: 0  // Would need additional query to count students
      };
    });

    return courses;
  } catch (error) {
    console.error("Error in getPublicCourses:", error);
    throw error;
  }
};
