
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Get a single course by ID
 */
export const getCourseById = async (id: string): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from("courses" as any)
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
    const rawData = data as any;
    const course: Course = {
      course_id: rawData.course_id,
      title: rawData.title,
      description: rawData.description,
      category_id: rawData.category_id,
      image_url: rawData.image_url,
      status: rawData.status,
      site_id: rawData.site_id || crypto.randomUUID(), // Use existing site_id or generate one if missing
      featured: !!rawData.featured,
      price_visible: rawData.price_visible !== false,
      hidden: !!rawData.hidden,
      has_certificate: !!rawData.has_certificate,
      has_enrollment_limit: !!rawData.has_enrollment_limit,
      max_enrollments: rawData.max_enrollments,
      subtitle: rawData.subtitle,
      pricing_metadata: rawData.pricing_metadata || {}, // Ensure this property exists
      slug: rawData.slug,
      // Add in any virtual properties that aren't stored in the DB
      image: rawData.image_url || "",
      category: rawData.category_id || "",
      lessons: 0, // Would need additional query to count lessons
      students: 0  // Would need additional query to count students
    };

    // Safely handle created_at/updated_at timestamps with type checking
    if (rawData.created_at && typeof rawData.created_at === 'string') {
      course.created_at = rawData.created_at;
    }
    if (rawData.updated_at && typeof rawData.updated_at === 'string') {
      course.updated_at = rawData.updated_at;
    }

    return course;
  } catch (error) {
    console.error("Error in getCourseById:", error);
    throw error;
  }
};
