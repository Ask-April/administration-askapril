
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookPlus } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/courses/CourseCard";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";

type Course = Tables<"courses">;

const Overview = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch courses from the database
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error fetching courses:", error);
          return;
        }
        
        setCourses(data || []);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Courses Overview</h1>
          <Button asChild>
            <Link to="/courses/create">
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
              <p className="text-4xl font-bold">
                {courses.filter(course => course.status === 'published').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
              <CardDescription>Number of enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {courses.reduce((sum, course) => sum + (course.students || 0), 0)}
              </p>
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
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-muted-foreground">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <p className="text-muted-foreground mb-4">No courses found</p>
              <Button asChild>
                <Link to="/courses/create">
                  <BookPlus className="mr-2 h-4 w-4" />
                  Create Your First Course
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description || ""}
                  image={course.image || ""}
                  category={course.category}
                  duration={course.duration}
                  students={course.students}
                  lessons={course.lessons}
                  status={course.status as "draft" | "published"}
                  onClick={() => navigate(`/courses/edit/${course.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Overview;
