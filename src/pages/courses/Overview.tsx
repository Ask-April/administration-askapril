
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import CourseCard from "@/components/courses/CourseCard";
import CreateCourseDialog, { CourseFormValues } from "@/components/courses/CreateCourseDialog";
import { useCoursesList } from "@/hooks/useCoursesList";
import { courseManagementService } from "@/services/course/courseManagementService";
import { EmptyState } from "@/components/ui/loading-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  BookOpen,
  Filter, 
  Plus, 
  Search,
  SlidersHorizontal
} from "lucide-react";
import { toast } from "sonner";

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
        duration: formData.duration,
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

  // Filter courses based on search query and filter type
  const filteredCourses = coursesData?.filter((course) => {
    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    if (filterType === "published") return matchesSearch && course.status === "published";
    if (filterType === "draft") return matchesSearch && course.status === "draft";
    
    return matchesSearch;
  }) || [];

  // Sort courses based on sort option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
    if (sortBy === "oldest") return new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime();
    if (sortBy === "popular") return (b.students || 0) - (a.students || 0);
    if (sortBy === "a-z") return (a.title || '').localeCompare(b.title || '');
    return 0;
  });

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

  return (
    <PageTransition>
      <div className="flex flex-col gap-6 p-6 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Manage and organize your course catalog
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 gap-1">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterType("all")}>All Courses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("published")}>Published</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("draft")}>Drafts</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="h-10 w-10 px-0" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">More filters</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Select 
              defaultValue={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="a-z">Alphabetical A-Z</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-1" onClick={() => document.getElementById('create-course-trigger')?.click()}>
              <Plus className="h-4 w-4" />
              <span>Add Course</span>
            </Button>
          </div>
        </div>

        {sortedCourses.length === 0 ? (
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
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div id="create-course-trigger" className="h-full">
              <CreateCourseDialog onCourseCreated={handleCreateCourse} />
            </div>
            
            {sortedCourses.map((course) => (
              <CourseCard
                key={course.course_id}
                id={course.course_id}
                title={course.title || 'Untitled Course'}
                description={course.description || 'No description available.'}
                image={course.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
                category={course.category || 'Uncategorized'}
                duration={course.duration || '0 hours'}
                students={course.students || 0}
                lessons={course.lessons || 0}
                status={course.status as "published" | "draft" || "draft"}
              />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Overview;
