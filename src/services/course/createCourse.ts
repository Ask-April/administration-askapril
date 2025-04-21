
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
  duration: string;
  status: "draft" | "published";
  lessons: number;
  students: number;
}): Promise<Course> => {
  const { data, error } = await supabase
    .from("courses")
    .insert([
      {
        title: courseData.title,
        description: courseData.description,
        category_id: courseData.category,
        image_url: courseData.image,
        status: courseData.status,
        site_id: "", // Set the proper site_id if you have one in context
        featured: false,
        price_visible: true,
        hidden: false,
        has_certificate: false,
        has_enrollment_limit: false,
        max_enrollments: null,
        subtitle: null,
        external_id: null,
        external_metadata: null,
        slug: null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating course:", error);
    throw error;
  }

  return data;
};
