
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Get a single course by id.
 */
export const getCourseById = async (id: string): Promise<Course | null> => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("course_id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching course by id:", error);
    throw error;
  }
  if (!data) return null;

  return {
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
    external_id: data.external_id,
    external_metadata: data.external_metadata,
    slug: data.slug,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};
