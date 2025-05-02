
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Update an existing course (admin/teacher only)
 */
export const updateCourse = async (id: string, courseData: Partial<Course>): Promise<Course> => {
  console.log("Updating course with id:", id, "and data:", courseData);
  
  // First, get the existing course to make sure we have site_id
  const { data: existingCourse, error: fetchError } = await supabase
    .from("courses" as any)
    .select("site_id")
    .eq("course_id", id)
    .single();
    
  if (fetchError) {
    console.error("Error fetching existing course:", fetchError);
    throw fetchError;
  }
  
  // Prepare the data for database update - handle virtual properties
  const dbData = { ...courseData };
  
  // Remove virtual properties that don't exist in the database
  delete dbData.image;
  delete dbData.category;
  delete dbData.lessons;
  delete dbData.students;
  delete dbData.certificateTemplate; // Explicitly remove this virtual property
  
  // Handle pricing data - store as JSON metadata
  if (dbData.pricing_data) {
    dbData.pricing_metadata = dbData.pricing_data;
    delete dbData.pricing_data;
  }
  
  // Handle category mapping - but ensure it's a valid UUID or null (not empty string)
  if (courseData.category) {
    dbData.category_id = courseData.category;
  }
  
  // If category_id is an empty string, set it to null to avoid UUID validation errors
  if (dbData.category_id === '') {
    dbData.category_id = null;
  }
  
  // If we have an image value, map it to image_url
  if (courseData.image) {
    dbData.image_url = courseData.image;
  }

  const { data, error } = await supabase
    .from("courses" as any)
    .update(dbData as any)
    .eq("course_id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating course:", error);
    throw error;
  }

  // Map back to our Course type
  const course: Course = {
    ...data,
    site_id: existingCourse.site_id || data.site_id, // Use existing site_id or the one from updated data
    // Add virtual properties back
    image: data.image_url,
    category: data.category_id,
    pricing_metadata: data.pricing_metadata || {}, // Ensure pricing_metadata exists
    // Other virtual props would need to be populated if needed
    lessons: 0,
    students: 0
  };

  return course;
};
