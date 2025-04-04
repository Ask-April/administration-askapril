
import { useState, useEffect } from 'react';
import { useCourseById } from '@/hooks/useCourses';
import { toast } from 'sonner';
import { updateCourse } from '@/pages/api/courses';

export const useEditCourse = (id: string | undefined) => {
  // Fetch the course data using our useCourseById hook
  const { data: course, isLoading, error, isError } = useCourseById(id);

  // Local state for edited course data - initialize with default empty values
  const [editedCourse, setEditedCourse] = useState<any>({
    title: "",
    description: "",
    category: "",
    image: "",
    duration: "",
    status: "draft",
    lessons: 0,
    students: 0,
  });

  // Update local state when the data is loaded
  useEffect(() => {
    if (course) {
      setEditedCourse({
        title: course.title || "",
        description: course.description || "",
        category: course.category || "",
        image: course.image || "",
        duration: course.duration || "",
        status: course.status || "draft",
        lessons: course.lessons || 0,
        students: course.students || 0,
      });
    }
  }, [course]);

  const handleSave = async () => {
    try {
      if (id && editedCourse) {
        // Call the updateCourse API function
        await updateCourse(id, {
          title: editedCourse.title,
          description: editedCourse.description,
          status: editedCourse.status,
          category: editedCourse.category,
          image: editedCourse.image,
          duration: editedCourse.duration,
          lessons: editedCourse.lessons,
          students: editedCourse.students,
        });

        toast.success("Course saved successfully!");
      }
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course. Please try again.");
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
