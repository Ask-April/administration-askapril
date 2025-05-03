
import { supabase } from "@/integrations/supabase/client";
import { Category } from "../types";

/**
 * Service for managing course categories
 */
export const categoryService = {
  /**
   * Get all course categories
   */
  getCategories: async () => {
    const { data, error } = await supabase
      .from('course_category')
      .select('category_id, name, description');
    
    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Create a new category
   */
  createCategory: async (name: string, description: string) => {
    const { data, error } = await supabase
      .from('course_category')
      .insert({
        name: name,
        description: description
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
