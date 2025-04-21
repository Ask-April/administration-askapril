
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
  students: number;
}): Promise<Course> => {
  console.log("Creating course with data:", courseData);

  const now = new Date().toISOString();

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
        created_at: now,
        updated_at: now
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
    // Add virtual properties
    image: data.image_url,
    category: data.category_id,
    lessons: courseData.lessons,
    students: 0
  };

  return course;
};
