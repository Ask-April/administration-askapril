
import { supabase } from "@/integrations/supabase/client";
import { Category } from "../types";

/**
 * Get all categories
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('course_category')
      .select('*')
      .order('name', { ascending: true });
      
    if (error) throw error;
    
    return data as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id: string): Promise<Category | null> => {
  if (!id) return null;
  
  try {
    const { data, error } = await supabase
      .from('course_category')
      .select('*')
      .eq('category_id', id)
      .single();
      
    if (error) throw error;
    
    return data as Category;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    return null;
  }
};

/**
 * Create a new category
 */
export const createCategory = async (category: Partial<Category>): Promise<Category | null> => {
  try {
    // Create the new category
    const { data, error } = await supabase
      .from('course_category')
      .insert({
        name: category.name,
        description: category.description || ''
      })
      .select()
      .single();
      
    if (error) throw error;
    
    return data as Category;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
};

/**
 * Update an existing category
 */
export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category | null> => {
  try {
    const { data, error } = await supabase
      .from('course_category')
      .update({
        name: category.name,
        description: category.description
      })
      .eq('category_id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return data as Category;
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    return null;
  }
};

/**
 * Delete a category
 */
export const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('course_category')
      .delete()
      .eq('category_id', id);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    return false;
  }
};

export const categoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
