
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Get all published courses.
 */
export const getPublicCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "published")
    .order("course_id", { ascending: false });

  if (error) {
    console.error("Error fetching public courses:", error);
    throw error;
  }

  if (!data || data.length === 0) return [];

  return data.map((row) => ({
    course_id: row.course_id,
    title: row.title,
    description: row.description,
    category_id: row.category_id,
    image_url: row.image_url,
    status: row.status,
    site_id: row.site_id,
    featured: row.featured,
    price_visible: row.price_visible,
    hidden: row.hidden,
    has_certificate: row.has_certificate,
    has_enrollment_limit: row.has_enrollment_limit,
    max_enrollments: row.max_enrollments,
    subtitle: row.subtitle,
    external_id: row.external_id,
    external_metadata: row.external_metadata,
    slug: row.slug,
    image: row.image_url,
    category: undefined,
    duration: undefined,
    lessons: undefined,
    students: undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
};
