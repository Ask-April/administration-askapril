
import { supabase } from '@/integrations/supabase/client';
import { CourseFormValues } from '../schema/courseFormSchema';
import { toast } from 'sonner';

export const createCourse = async (values: CourseFormValues): Promise<void> => {
  console.log("Submitting course form with values:", values);
  
  // Check authentication status before inserting
  const { data: authData, error: authError } = await supabase.auth.getSession();
  
  if (authError || !authData.session) {
    toast.error("You must be signed in to create a course.");
    console.error("Authentication error:", authError);
    throw new Error("Authentication required");
  }
  
  // Generate a site_id since it's required
  const site_id = crypto.randomUUID();
  
  console.log("Creating course with site_id:", site_id);
  
  // Insert the course into the database
  const { data, error } = await supabase
    .from('courses')
    .insert({
      title: values.title,
      description: values.description,
      category: values.category,
      image: values.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      lessons: values.lessons,
      status: values.status,
      students: 0,
      site_id: site_id,
    })
    .select();
  
  if (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course: " + error.message);
  }
  
  console.log("Course created successfully:", data);
  return;
};
