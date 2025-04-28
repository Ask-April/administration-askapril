
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Create a new course (admin/teacher only)
 */
export const createCourse = async (courseData: {
  title: string;
  description: string;
  category: string;
  image: string;
  status: "draft" | "published";
  lessons: number;
  students?: number;
}): Promise<Course> => {
  console.log("Creating course with data:", courseData);

  const { data, error } = await supabase
    .from("courses")
    .insert([
      {
        title: courseData.title,
        description: courseData.description,
        category_id: courseData.category,
        image_url: courseData.image,
        status: courseData.status,
        site_id: crypto.randomUUID(), // Generate site_id since it's required
        featured: false,
        price_visible: true,
        hidden: false,
        has_certificate: false,
        has_enrollment_limit: false,
        max_enrollments: null,
        subtitle: null,
        pricing_metadata: {}, // Initialize empty pricing metadata
        slug: null
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating course:", error);
    throw error;
  }

  // Map to our Course type
  const course: Course = {
    ...data,
    // Add virtual properties and ensure string types for category and image
    image: data.image_url || "",
    category: data.category_id || "",
    lessons: courseData.lessons,
    students: courseData.students || 0,
    pricing_metadata: data.pricing_metadata || {} // Add pricing_metadata
  };

  return course;
};
