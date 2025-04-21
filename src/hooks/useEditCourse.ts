
import { useState, useEffect } from 'react';
import { useCourseById } from '@/hooks/useCourses';
import { toast } from 'sonner';
import { updateCourse } from '@/services/course/courseManagementService';
import type { Course } from '@/services/types';

export const useEditCourse = (id: string | undefined) => {
  // Fetch the course data using our useCourseById hook
  const { data: course, isLoading, error, isError } = useCourseById(id);

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
    external_id: "",
    external_metadata: null,
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
        external_id: course.external_id || "",
        external_metadata: course.external_metadata ?? null,
        slug: course.slug || "",
      });
    }
  }, [course]);

  const handleSave = async () => {
    try {
      if (id && editedCourse) {
        // Call the updateCourse function
        await updateCourse(id, editedCourse);
        toast.success("Course saved successfully");
      }
    } catch (error) {
      toast.error("Error saving course");
      throw error;
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
