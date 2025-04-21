
// This file previously used mock data; it now uses Supabase for all actions.
import { supabase } from "@/integrations/supabase/client";
import { Course } from "../types";

export const courseManagementService = {
  /**
   * Get all published courses
   */
  getPublicCourses: async (): Promise<Course[]> => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching public courses:", error);
      throw error;
    }

    if (!data || data.length === 0) return [];

    return data.map((row) => ({
      course_id: row.course_id,
      title: row.title,
      description: row.description,
      category_id: row.category_id,
      image_url: row.image_url,
      status: row.status,
      site_id: row.site_id,
      featured: row.featured,
      price_visible: row.price_visible,
      hidden: row.hidden,
      has_certificate: row.has_certificate,
      has_enrollment_limit: row.has_enrollment_limit,
      max_enrollments: row.max_enrollments,
      subtitle: row.subtitle,
      external_id: row.external_id,
      external_metadata: row.external_metadata,
      slug: row.slug,
      created_at: row.created_at,
      updated_at: row.updated_at,
      // Enhanced properties:
      image: row.image_url,
      category: undefined,
      duration: undefined,
      lessons: undefined,
      students: undefined,
    }));
  },

  /**
   * Get a single course by id
   */
  getCourseById: async (id: string): Promise<Course | null> => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("course_id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching course by id:", error);
      throw error;
    }
    if (!data) return null;

    return {
      course_id: data.course_id,
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      image_url: data.image_url,
      status: data.status,
      site_id: data.site_id,
      featured: data.featured,
      price_visible: data.price_visible,
      hidden: data.hidden,
      has_certificate: data.has_certificate,
      has_enrollment_limit: data.has_enrollment_limit,
      max_enrollments: data.max_enrollments,
      subtitle: data.subtitle,
      external_id: data.external_id,
      external_metadata: data.external_metadata,
      slug: data.slug,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  },

  /**
   * Get courses by category
   */
  getCoursesByCategory: async (categoryId: string): Promise<Course[]> => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("category_id", categoryId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching courses by category:", error);
      throw error;
    }
    if (!data || data.length === 0) return [];

    return data.map((row) => ({
      course_id: row.course_id,
      title: row.title,
      description: row.description,
      category_id: row.category_id,
      image_url: row.image_url,
      status: row.status,
      site_id: row.site_id,
      featured: row.featured,
      price_visible: row.price_visible,
      hidden: row.hidden,
      has_certificate: row.has_certificate,
      has_enrollment_limit: row.has_enrollment_limit,
      max_enrollments: row.max_enrollments,
      subtitle: row.subtitle,
      external_id: row.external_id,
      external_metadata: row.external_metadata,
      slug: row.slug,
      created_at: row.created_at,
      updated_at: row.updated_at,
      image: row.image_url,
      category: undefined,
      duration: undefined,
      lessons: undefined,
      students: undefined,
    }));
  },

  /**
   * Create a new course (admin/teacher only)
   */
  createCourse: async (courseData: {
    title: string;
    description: string;
    category: string;
    image: string;
    duration: string;
    status: "draft" | "published";
    lessons: number;
    students: number;
  }): Promise<Course> => {
    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          title: courseData.title,
          description: courseData.description,
          category_id: courseData.category,
          image_url: courseData.image,
          status: courseData.status,
          site_id: "", // Set the proper site_id if you have one in context
          featured: false,
          price_visible: true,
          hidden: false,
          has_certificate: false,
          has_enrollment_limit: false,
          max_enrollments: null,
          subtitle: null,
          external_id: null,
          external_metadata: null,
          slug: null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating course:", error);
      throw error;
    }

    return data;
  },

  /**
   * Update an existing course (admin/teacher only)
   */
  updateCourse: async (id: string, courseData: Partial<Course>): Promise<Course> => {
    const { data, error } = await supabase
      .from("courses")
      .update({
        ...courseData,
        updated_at: new Date().toISOString(),
      })
      .eq("course_id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating course:", error);
      throw error;
    }

    return data;
  },

  /**
   * Delete a course (admin/teacher only)
   */
  deleteCourse: async (id: string): Promise<boolean> => {
    const { error } = await supabase.from("courses").delete().eq("course_id", id);
    if (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
    return true;
  },
};

// NOTE: This file has grown quite long. It's a good idea to refactor it into smaller files soon!
