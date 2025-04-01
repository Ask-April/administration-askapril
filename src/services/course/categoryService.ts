
import { supabase } from "@/integrations/supabase/client";

/**
 * Service for managing course categories
 */
export const categoryService = {
  /**
   * Get all course categories
   */
  getCategories: async (siteId: string) => {
    const { data, error } = await supabase
      .from('course_category')
      .select('*')
      .eq('site_id', siteId);
    
    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Create a new category
   */
  createCategory: async (siteId: string, name: string) => {
    const { data, error } = await supabase
      .from('course_category')
      .insert({
        site_id: siteId,
        name: name
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error creating category:", error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Delete a category
   */
  deleteCategory: async (categoryId: string) => {
    const { error } = await supabase
      .from('course_category')
      .delete()
      .eq('category_id', categoryId);
    
    if (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
    
    return true;
  }
};
