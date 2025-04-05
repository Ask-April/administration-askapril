import React, { useState } from "react";
import PageTransition from "@/components/layout/PageTransition";
import CourseCard from "@/components/courses/CourseCard";
import CreateCourseDialog, { CourseFormValues } from "@/components/courses/CreateCourseDialog";
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
  Filter, 
  Plus, 
  Search,
  SlidersHorizontal
} from "lucide-react";
import { Link } from 'react-router-dom';

const initialCoursesData = [
  {
    id: "1",
    title: "Introduction to Web Design",
    description: "Learn the fundamentals of web design including HTML, CSS, and responsive design principles.",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Design",
    duration: "6 hours",
    students: 487,
    lessons: 10,
    status: "published" as const,
  },
  {
    id: "2",
    title: "JavaScript Fundamentals",
    description: "A comprehensive course on JavaScript fundamentals for web development.",
    image: "https://images.unsplash.com/photo-1592609931095-54a2168ae893?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Development",
    duration: "8 hours",
    students: 932,
    lessons: 12,
    status: "published" as const,
  },
  {
    id: "3",
    title: "Advanced React Development",
    description: "Master advanced React concepts including hooks, context, and performance optimization.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Development",
    duration: "10 hours",
    students: 654,
    lessons: 15,
    status: "published" as const,
  },
  {
    id: "4",
    title: "UX Design Principles",
    description: "Learn the core principles of user experience design and how to apply them.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Design",
    duration: "7 hours",
    students: 321,
    lessons: 8,
    status: "published" as const,
  },
  {
    id: "5",
    title: "Python for Data Science",
    description: "Learn Python programming with a focus on data analysis and visualization.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Data Science",
    duration: "12 hours",
    students: 876,
    lessons: 18,
    status: "published" as const,
  },
  {
    id: "6",
    title: "Digital Marketing Fundamentals",
    description: "A comprehensive introduction to digital marketing strategies and tactics.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Marketing",
    duration: "5 hours",
    students: 542,
    lessons: 9,
    status: "draft" as const,
  },
];

const Courses = () => {
  const [coursesData, setCoursesData] = useState(initialCoursesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleCreateCourse = (formData: CourseFormValues) => {
    const newCourse = {
      id: `${coursesData.length + 1}`,
      title: formData.title,
      description: formData.description,
      image: formData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: formData.category,
      duration: formData.duration,
      students: 0,
      lessons: formData.lessons,
      status: "published" as const,
    };
    
    setCoursesData([newCourse, ...coursesData]);
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    if (filterType === "published") return matchesSearch && course.status === "published";
    if (filterType === "draft") return matchesSearch && course.status === "draft";
    
    return matchesSearch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "newest") return parseInt(b.id) - parseInt(a.id);
    if (sortBy === "oldest") return parseInt(a.id) - parseInt(b.id);
    if (sortBy === "popular") return b.students - a.students;
    if (sortBy === "a-z") return a.title.localeCompare(b.title);
    return 0;
  });

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
            <Link to="/courses/create">
              <Button variant="outline" className="gap-1">
                <Plus className="h-4 w-4" />
                <span>Use Wizard</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div id="create-course-trigger" className="h-full">
            <CreateCourseDialog onCourseCreated={handleCreateCourse} />
          </div>
          
          {sortedCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
              category={course.category}
              duration={course.duration}
              students={course.students}
              lessons={course.lessons}
              status={course.status}
              onClick={() => console.log(`Previewing course: ${course.id}`)}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Courses;
