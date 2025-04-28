
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { CourseFormValues } from "@/components/courses/schema/courseFormSchema";
import { useCoursesList } from "@/hooks/useCoursesList";
import { courseManagementService } from "@/services/course/courseManagementService";
import { EmptyState } from "@/components/ui/loading-states";
import { Button } from "@/components/ui/button";
import { 
  BookOpen,
  Filter, 
  Plus, 
  Search,
  SlidersHorizontal
} from "lucide-react";
import { toast } from "sonner";
import CourseOverviewHeader from "./components/CourseOverviewHeader";
import CourseOverviewControls from "./components/CourseOverviewControls";
import CourseOverviewGrid from "./components/CourseOverviewGrid";
import { CourseSkeletonGrid } from "@/components/courses/CourseSkeleton";

const Overview = () => {
  const { data: coursesData, isLoading, error, refetch } = useCoursesList();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("newest");

  const handleCreateCourse = async (formData: CourseFormValues) => {
    try {
      await courseManagementService.createCourse({
        title: formData.title,
        description: formData.description,
        image: formData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: formData.category,
        lessons: formData.lessons || 0,
        students: 0,
        status: "draft",
      });
      
      toast.success("Course created successfully!");
      refetch(); // Refresh the course list
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course. Please try again.");
    }
  };

  const filteredCourses = coursesData?.filter((course) => {
    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    if (filterType === "published") return matchesSearch && course.status === "published";
    if (filterType === "draft") return matchesSearch && course.status === "draft";
    
    return matchesSearch;
  }) || [];

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "newest") {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    }
    if (sortBy === "oldest") {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateA - dateB;
    }
    if (sortBy === "popular") return (b.students || 0) - (a.students || 0);
    if (sortBy === "a-z") return (a.title || '').localeCompare(b.title || '');
    return 0;
  });

  return (
    <PageTransition>
      <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
        <CourseOverviewHeader />
        <CourseOverviewControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <CourseOverviewGrid
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          sortedCourses={sortedCourses}
          handleCreateCourse={handleCreateCourse}
        />
      </div>
    </PageTransition>
  );
};

export default Overview;
