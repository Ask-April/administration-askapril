
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Get a single course by ID
 */
export const getCourseById = async (id: string): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("course_id", id)
      .single();

    if (error) {
      // Handle not found case
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error("Error fetching course by ID:", error);
      throw error;
    }

    if (!data) {
      return null;
    }

    // Map the database response to our Course type
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
      pricing_metadata: data.pricing_metadata || {}, // Add the pricing_metadata field
      slug: data.slug,
      // Add in any virtual properties that aren't stored in the DB
      image: data.image_url || "",
      category: data.category_id || "",
      lessons: 0, // Would need additional query to count lessons
      students: 0  // Would need additional query to count students
    };

    // Safely handle created_at/updated_at timestamps with type checking
    if ('created_at' in data && typeof data.created_at === 'string') {
      course.created_at = data.created_at;
    }
    if ('updated_at' in data && typeof data.updated_at === 'string') {
      course.updated_at = data.updated_at;
    }

    return course;
  } catch (error) {
    console.error("Error in getCourseById:", error);
    throw error;
  }
};
