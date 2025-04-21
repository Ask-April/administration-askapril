import React from "react";
import { useCourses } from "@/hooks/useCourses";
import { LoadingSkeleton, EmptyState } from "@/components/ui/loading-states";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import CourseCard from "@/components/courses/CourseCard";
import { Card } from "@/components/ui/card";

const Courses = () => {
  const { data: courses, isLoading, error } = useCourses();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (error) {
    return (
      <EmptyState
        title="Couldn't load courses"
        description="Sorry, there was an error loading the courses. Please try again later."
        action={
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        }
      />
    );
  }
  
  if (!courses || courses.length === 0) {
    return (
      <EmptyState
        title="Nothing here yet"
        description="There are no courses yet. Create your first course!"
        action={
          <Button onClick={() => navigate("/courses/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        }
      />
    );
  }
  
  return (
    <div className="container px-4 py-6">
      <PageHeader
        title="Courses"
        description="Manage your educational content"
        action={
          <Button onClick={() => navigate("/courses/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {courses.map((course) => (
          <Card key={course.course_id} className="overflow-hidden">
            <CourseCard
              course={course}
              onClick={() => navigate(`/courses/${course.course_id}`)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
