
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/layout/PageTransition";
import { useCourseById } from "@/hooks/useCourses";
import { EmptyState, LoadingSkeleton } from "@/components/ui/loading-states";
import { updateCourse } from "@/pages/api/courses";
import { Button } from "@/components/ui/button";
import EditCourseHeader from "@/components/courses/course-edit/EditCourseHeader";
import EditCourseTabs from "@/components/courses/course-edit/EditCourseTabs";

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch the course data using our useCourseById hook
  const { data: course, isLoading, error, isError } = useCourseById(id);
  
  // Local state for edited course data - initialize as null
  const [editedCourse, setEditedCourse] = useState<any>(null);
  
  // Update local state when the data is loaded
  useEffect(() => {
    if (course) {
      setEditedCourse({
        title: course.title || '',
        description: course.description || '',
        category: course.category || '',
        image: course.image || '',
        duration: course.duration || '',
        lessons: course.lessons || 0,
        status: course.status || 'draft',
        students: course.students || 0
      });
    }
  }, [course]);
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
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
          students: editedCourse.students
        });
        
        toast.success("Course saved successfully!");
      }
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    // For now, just show a toast and navigate away
    // In a real implementation, you would call an API to delete the course
    toast.error("Course deleted!");
    navigate('/courses/overview');
  };

  const updateCourseData = (data: Partial<typeof editedCourse>) => {
    setEditedCourse({
      ...editedCourse,
      ...data
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError || !id) {
    return (
      <EmptyState 
        title="Course Not Found" 
        description="The course you're looking for doesn't exist or has been removed."
        action={<Button onClick={() => navigate('/courses/overview')}>Back to Courses</Button>}
      />
    );
  }

  // Only render the form if editedCourse is available
  if (!editedCourse) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <EditCourseHeader 
          title={editedCourse.title} 
          isSaving={isSaving}
          onSave={handleSave}
          onDelete={handleDelete}
        />

        <EditCourseTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          courseData={editedCourse}
          updateCourseData={updateCourseData}
        />
      </div>
    </PageTransition>
  );
};

export default EditCourse;
