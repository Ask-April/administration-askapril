
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { useCourses } from "@/hooks/useCourses";
import CourseCard from "@/components/courses/CourseCard";
import { EmptyState, LoadingSkeleton } from "@/components/ui/loading-states";

const CoursesList = () => {
  const { data: courses, isLoading, isError } = useCourses();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card overflow-hidden shadow">
            <div className="aspect-video w-full bg-muted animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-6 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              <div className="flex justify-between pt-2">
                <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                <div className="h-3 w-16 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState 
        title="Error loading courses"
        description="There was an error loading your courses. Please try again later."
      />
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="bg-muted/30 p-8 rounded-lg text-center">
        <h2 className="text-xl font-medium mb-2">No courses found</h2>
        <p className="text-muted-foreground mb-4">
          Get started by creating your first course
        </p>
        <Link to="/courses/create">
          <Button>
            Create Your First Course
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard
          key={course.course_id}
          id={course.course_id}
          title={course.title || "Untitled Course"}
          description={course.description || "No description available"}
          image={course.image}
          category={course.category || "Uncategorized"}
          duration={course.duration || "N/A"}
          students={course.students || 0}
          lessons={course.lessons || 0}
          status={course.status as "published" | "draft"}
        />
      ))}
    </div>
  );
};

const Overview = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Course Overview</h1>
          <Link to="/courses/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </Link>
        </div>
        
        <Suspense fallback={<LoadingSkeleton />}>
          <CoursesList />
        </Suspense>
      </div>
    </PageTransition>
  );
};

export default Overview;
