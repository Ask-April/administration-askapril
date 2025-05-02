
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

  // Get the current user for the owner field
  const { data: authData } = await supabase.auth.getSession();
  const userId = authData.session?.user.id;

  if (!userId) {
    throw new Error("User must be authenticated to create a course");
  }

  const { data, error } = await supabase
    .from("courses" as any)
    .insert([
      {
        title: courseData.title,
        description: courseData.description,
        category_id: courseData.category,
        image_url: courseData.image,
        status: courseData.status,
        site_id: crypto.randomUUID(), // Generate site_id since it's required
        owner: userId, // Add the owner field which is required
        featured: false,
        price_visible: true,
        hidden: false,
        has_certificate: false,
        has_enrollment_limit: false,
        max_enrollments: null,
        subtitle: null,
        pricing_metadata: {}, // Initialize empty pricing metadata
        slug: null
      } as any,
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating course:", error);
    throw error;
  }

  // Map to our Course type - make sure to include site_id
  const course: Course = {
    ...data,
    site_id: data.site_id,
    // Add virtual properties and ensure string types for category and image
    image: data.image_url || "",
    category: data.category_id || "",
    lessons: courseData.lessons,
    students: courseData.students || 0,
    pricing_metadata: data.pricing_metadata || {} // Ensure pricing_metadata exists
  };

  return course;
};
