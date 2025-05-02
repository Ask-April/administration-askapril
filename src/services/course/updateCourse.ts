
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Update an existing course
 */
export const updateCourse = async (courseId: string, courseData: Partial<Course>): Promise<Course | null> => {
  try {
    console.log("Updating course with ID:", courseId, courseData);
    
    // Get the current user for the owner field if not provided
    if (!courseData.owner) {
      const { data: authData } = await supabase.auth.getSession();
      const userId = authData.session?.user.id;
      
      if (userId) {
        courseData.owner = userId;
      }
    }
    
    // Make sure ownership field is passed correctly
    if (courseData.site_id && !courseData.ownership) {
      courseData.ownership = courseData.site_id;
    }
    
    // Convert virtual fields to database fields
    if (courseData.image) {
      courseData.image_url = courseData.image;
    }
    
    if (courseData.category) {
      courseData.category_id = courseData.category;
    }
    
    const { data, error } = await supabase
      .from("courses" as any)
      .update({
        title: courseData.title,
        description: courseData.description,
        category_id: courseData.category_id,
        image_url: courseData.image_url,
        subtitle: courseData.subtitle,
        status: courseData.status,
        featured: courseData.featured,
        hidden: courseData.hidden,
        price_visible: courseData.price_visible,
        has_certificate: courseData.has_certificate,
        has_enrollment_limit: courseData.has_enrollment_limit,
        max_enrollments: courseData.max_enrollments,
        ownership: courseData.ownership || courseData.site_id,
        pricing_metadata: courseData.pricing_metadata,
        slug: courseData.slug
      })
      .eq("course_id", courseId)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating course:", error);
      throw error;
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
      site_id: rawData.ownership || crypto.randomUUID(),
      owner: rawData.owner,
      featured: !!rawData.featured,
      price_visible: rawData.price_visible !== false,
      hidden: !!rawData.hidden,
      has_certificate: !!rawData.has_certificate,
      has_enrollment_limit: !!rawData.has_enrollment_limit,
      max_enrollments: rawData.max_enrollments,
      subtitle: rawData.subtitle || "",
      pricing_metadata: rawData.pricing_metadata || {},
      slug: rawData.slug,
      // Add virtual properties
      image: rawData.image_url,
      category: rawData.category_id,
      lessons: 0, // Would need additional query to count lessons
      students: 0  // Would need additional query to count students
    };
    
    // Add timestamps if they exist
    if (rawData.created_at) course.created_at = rawData.created_at;
    if (rawData.updated_at) course.updated_at = rawData.updated_at;
    
    return course;
  } catch (error) {
    console.error("Error in updateCourse:", error);
    throw error;
  }
};
