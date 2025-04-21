
import React from "react";
import CourseCard from "@/components/courses/CourseCard";
import CreateCourseDialog from "@/components/courses/CreateCourseDialog";
import { CourseFormValues } from "@/components/courses/schema/courseFormSchema";
import { EmptyState } from "@/components/ui/loading-states";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

interface CourseOverviewGridProps {
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  sortedCourses: any[];
  handleCreateCourse: (formData: CourseFormValues) => void;
}

const CourseOverviewGrid: React.FC<CourseOverviewGridProps> = ({
  isLoading, error, refetch, sortedCourses, handleCreateCourse
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState 
        title="Error Loading Courses" 
        description="There was an error loading your courses. Please try again."
        action={<Button onClick={() => refetch()}>Retry</Button>}
      />
    );
  }

  if (sortedCourses.length === 0) {
    return (
      <EmptyState 
        title="No Courses Found"
        description="Get started by creating your first course."
        icon={BookOpen}
        action={
          <Button onClick={() => document.getElementById('create-course-trigger')?.click()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div id="create-course-trigger" className="h-full">
        <CreateCourseDialog onCourseCreated={handleCreateCourse} />
      </div>
      {sortedCourses.map((course) => (
        <CourseCard
          key={course.course_id}
          course={course}
          course_id={course.course_id}
          title={course.title || 'Untitled Course'}
          subtitle={course.subtitle || ''}
          description={course.description || 'No description available.'}
          image={course.image_url || course.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
          category={course.category || 'Uncategorized'}
          students={course.students || 0}
          lessons={course.lessons || 0}
          status={(course.status as "published" | "draft") || "draft"}
        />
      ))}
    </div>
  );
};

export default CourseOverviewGrid;
