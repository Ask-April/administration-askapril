
import { useState, useEffect } from 'react';
import { useCourseById } from '@/hooks/useCourses';
import { toast } from 'sonner';
import { updateCourse } from '@/pages/api/courses';
import { Course } from '@/services/types';

export const useEditCourse = (id: string | undefined) => {
  // Fetch the course data using our useCourseById hook
  const { data: course, isLoading, error, isError } = useCourseById(id);

  // Local state for edited course data - initialize with default empty values
  const [editedCourse, setEditedCourse] = useState<Partial<Course>>({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    image: "",
    duration: "",
    status: "draft",
    lessons: 0,
    students: 0,
    featured: false,
    priceVisible: true,
    hidden: false,
    hasCertificate: false,
    certificateTemplate: "",
    hasEnrollmentLimit: false,
    maxEnrollments: 100,
  });

  // Update local state when the data is loaded
  useEffect(() => {
    if (course) {
      setEditedCourse({
        title: course.title || "",
        subtitle: course.subtitle || "",
        description: course.description || "",
        category: course.category || "",
        image: course.image || "",
        duration: course.duration || "",
        status: course.status || "draft",
        lessons: course.lessons || 0,
        students: course.students || 0,
        featured: course.featured || false,
        priceVisible: course.priceVisible !== false,
        hidden: course.hidden || false,
        hasCertificate: course.hasCertificate || false,
        certificateTemplate: course.certificateTemplate || "",
        hasEnrollmentLimit: course.hasEnrollmentLimit || false,
        maxEnrollments: course.maxEnrollments || 100,
      });
    }
  }, [course]);

  const handleSave = async () => {
    try {
      if (id && editedCourse) {
        // Call the updateCourse API function
        await updateCourse(id, editedCourse);
      }
    } catch (error) {
      console.error("Error saving course:", error);
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
