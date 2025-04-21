
import { useState, useEffect } from 'react';
import { useCourseById } from '@/hooks/useCourses';
import { toast } from 'sonner';
import { updateCourse } from '@/services/course/updateCourse';
import type { Course } from '@/services/types';

export const useEditCourse = (id: string | undefined) => {
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
    // external_metadata: null, // removed
    slug: "",
  });

  // Update local state when the data is loaded
  useEffect(() => {
    if (course) {
      setEditedCourse({
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
        // external_metadata: null, // removed
        slug: course.slug || "",
      });
    }
  }, [course]);

  const handleSave = async () => {
    try {
      if (!id) {
        throw new Error("Course ID is missing");
      }
      
      if (editedCourse) {
        // Call the updateCourse function with the right parameters
        await updateCourse(id, editedCourse);
        await refetch(); // Refresh the course data after update
        toast.success("Course saved successfully");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Error saving course");
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

