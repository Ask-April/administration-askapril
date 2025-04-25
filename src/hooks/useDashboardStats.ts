
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type DashboardStats = {
  totalStudents: number;
  totalCourses: number;
  totalCompletions: number;
  totalRevenue: number;
  recentEnrollments: any[];
  topCourses: any[];
  studentProgress: any[];
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async (): Promise<DashboardStats> => {
      // Get total students (from enrollment table)
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from("enrollment")
        .select("student_id")
        .order("enroll_date", { ascending: false });

      if (enrollmentError) {
        console.error("Error fetching student count:", enrollmentError);
        throw enrollmentError;
      }

      // Get unique students
      const uniqueStudents = [...new Set(enrollmentData?.map(e => e.student_id) || [])];

      // Get total courses
      const { count: totalCourses, error: coursesError } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true });

      if (coursesError) {
        console.error("Error fetching course count:", coursesError);
        throw coursesError;
      }

      // Get total completions from lesson_completion
      const { data: completionsData, error: completionsError } = await supabase
        .from("lesson_completion")
        .select("student_id, lesson_id")
        .order("completed_at", { ascending: false });

      if (completionsError) {
        console.error("Error fetching completions:", completionsError);
        throw completionsError;
      }

      // Get total revenue
      const { data: revenueData, error: revenueError } = await supabase
        .from("orders")
        .select("amount");

      if (revenueError) {
        console.error("Error fetching revenue:", revenueError);
        throw revenueError;
      }

      const totalRevenue = revenueData?.reduce((acc, order) => acc + (order.amount || 0), 0) || 0;

      // Get recent enrollments
      const { data: recentEnrollments, error: recentError } = await supabase
        .from("enrollment")
        .select(`
          enrollment_id,
          enroll_date,
          student_id,
          course_id,
          courses:course_id (title, image_url)
        `)
        .order("enroll_date", { ascending: false })
        .limit(4);

      if (recentError) {
        console.error("Error fetching recent enrollments:", recentError);
        throw recentError;
      }

      // Get top courses by enrollment count
      const { data: topCourses, error: topCoursesError } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (topCoursesError) {
        console.error("Error fetching top courses:", topCoursesError);
        throw topCoursesError;
      }

      // Get user progress data
      const { data: studentProgress, error: progressError } = await supabase
        .from("enrollment")
        .select(`
          enrollment_id,
          progress_percent,
          course_id,
          courses:course_id (title, image_url)
        `)
        .order("progress_percent", { ascending: false })
        .limit(3);

      if (progressError) {
        console.error("Error fetching student progress:", progressError);
        throw progressError;
      }

      return {
        totalStudents: uniqueStudents.length,
        totalCourses: totalCourses || 0,
        totalCompletions: completionsData?.length || 0,
        totalRevenue,
        recentEnrollments: recentEnrollments || [],
        topCourses: topCourses || [],
        studentProgress: studentProgress || []
      };
    },
  });
};
