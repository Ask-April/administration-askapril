import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

/**
 * Update an existing course (admin/teacher only)
 */
export const updateCourse = async (id: string, courseData: Partial<Course>): Promise<Course> => {
  console.log("Updating course with id:", id, "and data:", courseData);
  
  // Prepare the data for database update - handle virtual properties
  const dbData = {
    ...courseData,
    updated_at: new Date().toISOString()
  };
  
  // Remove virtual properties that don't exist in the database
  delete dbData.image;
  delete dbData.category;
  delete dbData.lessons;
  delete dbData.students;
  
  // If we have a category value, map it to category_id
  if (courseData.category) {
    dbData.category_id = courseData.category;
  }
  
  // If we have an image value, map it to image_url
  if (courseData.image) {
    dbData.image_url = courseData.image;
  }

  const { data, error } = await supabase
    .from("courses")
    .update(dbData)
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
    // Add virtual properties back
    image: data.image_url,
    category: data.category_id,
    // Other virtual props would need to be populated if needed
    lessons: 0,
    students: 0
  };

  return course;
};
