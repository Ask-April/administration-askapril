
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
        ownership: crypto.randomUUID(), // Generate ownership since it's required (previously site_id)
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

  // Map to our Course type - make sure to include ownership
  const rawData = data as any;
  const course: Course = {
    course_id: rawData.course_id,
    title: rawData.title,
    description: rawData.description,
    category_id: rawData.category_id,
    image_url: rawData.image_url,
    status: rawData.status,
    site_id: rawData.ownership || crypto.randomUUID(), // Use existing ownership or generate one if missing
    featured: !!rawData.featured,
    price_visible: rawData.price_visible !== false,
    hidden: !!rawData.hidden,
    has_certificate: !!rawData.has_certificate,
    has_enrollment_limit: !!rawData.has_enrollment_limit,
    max_enrollments: rawData.max_enrollments,
    subtitle: rawData.subtitle || "",
    pricing_metadata: rawData.pricing_metadata || {}, // Ensure pricing_metadata exists
    slug: rawData.slug,
    // Add virtual properties
    image: rawData.image_url || "",
    category: rawData.category_id || "",
    lessons: courseData.lessons,
    students: courseData.students || 0,
  };

  return course;
};
