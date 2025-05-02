
import { supabase } from '@/integrations/supabase/client';
import { CourseFormValues } from '../schema/courseFormSchema';
import { toast } from 'sonner';
import { categoryService } from '@/services/course/categoryService';

export const createCourse = async (values: CourseFormValues): Promise<string | void> => {
  console.log("Submitting course form with values:", values);
  
  try {
    // Check authentication status before inserting
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError || !authData.session) {
      toast.error("You must be signed in to create a course.");
      console.error("Authentication error:", authError);
      throw new Error("Authentication required");
    }
    
    // Generate a site_id since it's required
    const site_id = crypto.randomUUID();
    
    // Prepare course data - add the owner field which is required
    const courseData = {
      title: values.title,
      description: values.description,
      category_id: values.category || null, // Ensure null if empty string
      image_url: values.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      status: values.status,
      site_id: site_id,
      owner: authData.session.user.id, // Add the owner field from the authenticated user
    };
    
    console.log("Creating course with data:", courseData);
    
    // Cast the table name to any to avoid TypeScript errors with Supabase typed client
    const { data, error } = await supabase
      .from('courses' as any)
      .insert(courseData as any)
      .select();
    
    if (error) {
      console.error("Error creating course:", error);
      throw new Error("Failed to create course: " + error.message);
    }
    
    console.log("Course created successfully:", data);
    return data && data.length > 0 ? (data[0] as any).course_id : undefined;
  } catch (error: any) {
    console.error("Error in createCourse:", error);
    throw error;
  }
};

export const getCategoryName = async (categoryId: string): Promise<string> => {
  if (!categoryId) return "Uncategorized";
  
  try {
    const { data, error } = await supabase
      .from('course_category')
      .select('name')
      .eq('category_id', categoryId)
      .single();
    
    if (error || !data) {
      return "Unknown Category";
    }
    
    return data.name || "Unnamed Category";
  } catch (error) {
    console.error("Error getting category name:", error);
    return "Unknown Category";
  }
};
