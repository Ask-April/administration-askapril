
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Course, Category } from "@/services/types";

export function useCoursesList() {
  return useQuery({
    queryKey: ["courses-list"],
    queryFn: async (): Promise<Course[]> => {
      // First, fetch all categories to create a lookup map
      // Cast "course_category" as any to avoid TypeScript errors
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('course_category' as any)
        .select('category_id, name');

      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError);
        throw categoriesError;
      }

      // Create a map of category_id to category name for quick lookup
      const categoryMap = new Map<string, string>();
      (categoriesData || []).forEach((category: any) => {
        categoryMap.set(category.category_id, category.name || 'Uncategorized');
      });

      // Then fetch all courses
      // Cast "courses" as any to avoid TypeScript errors
      const { data, error } = await supabase
        .from('courses' as any)
        .select('*')
        .order('course_id', { ascending: false });

      if (error) {
        console.error("Error fetching courses list:", error);
        throw error;
      }

      // Map the data to the Course type with the category name
      const courses: Course[] = (data || []).map((course: any) => {
        const categoryName = course.category_id 
          ? categoryMap.get(course.category_id) || 'Uncategorized' 
          : 'Uncategorized';

        const c: Course = ({
          course_id: course.course_id,
          title: course.title,
          description: course.description,
          category_id: course.category_id,
          image_url: course.image_url,
          status: course.status,
          site_id: course.site_id || "",
          featured: course.featured,
          price_visible: course.price_visible,
          hidden: course.hidden,
          has_certificate: course.has_certificate,
          has_enrollment_limit: course.has_enrollment_limit,
          max_enrollments: course.max_enrollments,
          subtitle: course.subtitle,
          pricing_metadata: course.pricing_metadata || {}, // Ensure this property exists
          slug: course.slug,
          // Add virtual properties
          image: course.image_url || "",
          category: categoryName, // Use the category name instead of the ID
          lessons: 0,
          students: 0
        });
        
        // Safe type checking for timestamps
        if ('created_at' in course && typeof course.created_at === 'string') {
          c.created_at = course.created_at;
        }
        if ('updated_at' in course && typeof course.updated_at === 'string') {
          c.updated_at = course.updated_at;
        }
        
        return c;
      });

      return courses;
    },
  });
}

export function useCourseById(courseId: string | undefined) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async (): Promise<Course | null> => {
      if (!courseId) {
        return null;
      }
      
      // First, fetch the category data for mapping
      // Cast "course_category" as any to avoid TypeScript errors
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('course_category' as any)
        .select('category_id, name');

      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError);
        throw categoriesError;
      }

      // Create a map of category_id to category name
      const categoryMap = new Map<string, string>();
      (categoriesData || []).forEach((category: any) => {
        categoryMap.set(category.category_id, category.name || 'Uncategorized');
      });
      
      // Now fetch the course
      // Cast "courses" as any to avoid TypeScript errors
      const { data, error } = await supabase
        .from('courses' as any)
        .select('*')
        .eq('course_id', courseId)
        .maybeSingle();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw error;
      }

      if (!data) return null;

      // Cast data to any to avoid TypeScript errors with properties
      const rawCourse = data as any;
      
      // Get the category name if available
      const categoryName = rawCourse.category_id 
        ? categoryMap.get(rawCourse.category_id) || 'Uncategorized' 
        : 'Uncategorized';

      const course: Course = {
        course_id: rawCourse.course_id,
        title: rawCourse.title,
        description: rawCourse.description,
        category_id: rawCourse.category_id,
        image_url: rawCourse.image_url,
        status: rawCourse.status,
        site_id: rawCourse.site_id || "",
        featured: rawCourse.featured,
        price_visible: rawCourse.price_visible,
        hidden: rawCourse.hidden,
        has_certificate: rawCourse.has_certificate,
        has_enrollment_limit: rawCourse.has_enrollment_limit,
        max_enrollments: rawCourse.max_enrollments,
        subtitle: rawCourse.subtitle,
        pricing_metadata: rawCourse.pricing_metadata || {}, // Ensure this property exists
        slug: rawCourse.slug,
        // Add virtual properties
        image: rawCourse.image_url || "",
        category: categoryName, // Use the category name instead of the ID
        lessons: 0,
        students: 0
      };
      
      // Safe type checking for timestamps
      if ('created_at' in rawCourse && typeof rawCourse.created_at === 'string') {
        course.created_at = rawCourse.created_at;
      }
      if ('updated_at' in rawCourse && typeof rawCourse.updated_at === 'string') {
        course.updated_at = rawCourse.updated_at;
      }
      
      return course;
    },
    enabled: !!courseId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
