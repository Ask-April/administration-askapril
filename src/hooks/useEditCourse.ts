
import { useState, useEffect } from 'react';
import { useCourseById } from '@/hooks/useCourses';
import { toast } from 'sonner';
import { updateCourse } from '@/services/course/updateCourse';
import type { Course } from '@/services/types';
import { useQueryClient } from '@tanstack/react-query';

export const useEditCourse = (id: string | undefined) => {
  // Get query client for invalidation
  const queryClient = useQueryClient();
  
  // Fetch the course data using our useCourseById hook
  const { data: course, isLoading, error, isError, refetch } = useCourseById(id);

  // Local state for edited course data - initialize with default empty values
  const [editedCourse, setEditedCourse] = useState<Partial<Course>>({
    title: "",
    description: "",
    category_id: "",
    image_url: "",
    status: "draft",
    site_id: "",
    featured: false,
    price_visible: true,
    hidden: false,
    has_certificate: false,
    has_enrollment_limit: false,
    max_enrollments: 100,
    subtitle: "",
    slug: "",
    // Virtual properties
    category: "",
    image: "",
    certificateTemplate: "", // Keep tracking this in state, but don't send to database
  });

  // Update local state when the data is loaded
  useEffect(() => {
    if (course) {
      setEditedCourse({
        course_id: course.course_id,
        title: course.title || "",
        description: course.description || "",
        category_id: course.category_id || "",
        image_url: course.image_url || "",
        status: course.status || "draft",
        site_id: course.site_id || "",
        featured: !!course.featured,
        price_visible: course.price_visible !== false,
        hidden: !!course.hidden,
        has_certificate: !!course.has_certificate,
        has_enrollment_limit: !!course.has_enrollment_limit,
        max_enrollments: course.max_enrollments ?? 100,
        subtitle: course.subtitle || "",
        slug: course.slug || "",
        // Set virtual properties
        category: course.category_id || "",
        image: course.image_url || "",
        certificateTemplate: course.certificateTemplate || "", // Keep for UI purposes
      });
    }
  }, [course]);

  const handleSave = async () => {
    try {
      if (!id) {
        throw new Error("Course ID is missing");
      }
      
      if (!editedCourse.title) {
        toast.error("Course title is required");
        return false;
      }
      
      if (editedCourse) {
        // Make sure virtual properties are synced with their DB counterparts
        const courseToUpdate = {
          ...editedCourse,
          category_id: editedCourse.category || editedCourse.category_id,
          image_url: editedCourse.image || editedCourse.image_url,
        };
        
        // Call the updateCourse function with the right parameters
        await updateCourse(id, courseToUpdate);
        
        // Invalidate both single course and courses list queries
        queryClient.invalidateQueries({ queryKey: ["course", id] });
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        queryClient.invalidateQueries({ queryKey: ["courses-list"] });
        
        // Also refetch the current course to get the latest data
        await refetch();
        
        toast.success("Course saved successfully");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error saving course:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Error saving course: ${errorMessage}`);
      return false;
    }
  };
  
  return {
    course,
    editedCourse,
    setEditedCourse,
    isLoading,
    error,
    isError,
    handleSave
  };
};
