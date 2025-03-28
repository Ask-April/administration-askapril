
import React from "react";
import { Link } from "react-router-dom";
import { BookPlus } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/courses/CourseCard";

// Initial courses data
const coursesData = [
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
    status: "published" as const,
  },
];

const Overview = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Courses Overview</h1>
          <Button asChild>
            <Link to="/courses">
              <BookPlus className="mr-2 h-4 w-4" />
              Create New Course
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Courses</CardTitle>
              <CardDescription>Total active courses in your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">24</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
              <CardDescription>Number of enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">1,284</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Course Completion</CardTitle>
              <CardDescription>Average completion rate</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">76%</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">All Courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coursesData.map((course) => (
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
      </div>
    </PageTransition>
  );
};

export default Overview;
