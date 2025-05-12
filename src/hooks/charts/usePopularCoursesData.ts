
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type CoursePopularityData = {
  name: string;
  students: number;
  revenue: number;
};

export const usePopularCoursesData = () => {
  return useQuery({
    queryKey: ["popularCourses"],
    queryFn: async (): Promise<CoursePopularityData[]> => {
      // Get courses with enrollment counts
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from("enrollment" as any)
        .select("course_id")
        .order("course_id");

      if (enrollmentError) {
        console.error("Error fetching enrollment data:", enrollmentError);
        throw enrollmentError;
      }

      // Get course details
      const { data: coursesData, error: coursesError } = await supabase
        .from("courses" as any)
        .select("course_id, title")
        .order("title");

      if (coursesError) {
        console.error("Error fetching courses data:", coursesError);
        throw coursesError;
      }

      // Get revenue by course
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders" as any)
        .select("product_id, amount");

      if (ordersError) {
        console.error("Error fetching orders data:", ordersError);
        throw ordersError;
      }

      // Get product mappings
      const { data: productsData, error: productsError } = await supabase
        .from("product" as any)
        .select("product_id, reference_id");

      if (productsError) {
        console.error("Error fetching products data:", productsError);
        throw productsError;
      }

      // Map courses to enrollment counts
      const enrollments = enrollmentData as any[] || [];
      const courses = coursesData as any[] || [];
      const orders = ordersData as any[] || [];
      const products = productsData as any[] || [];

      // Create a mapping of course_id -> revenue via products
      const courseRevenueMap: Record<string, number> = {};
      products.forEach(product => {
        if (!product.reference_id) return;
        courseRevenueMap[product.reference_id] = 0;
      });

      // Calculate revenue by course via product reference
      products.forEach(product => {
        if (!product.reference_id || !product.product_id) return;
        const courseOrders = orders.filter(order => order.product_id === product.product_id);
        courseOrders.forEach(order => {
          if (!order.amount) return;
          courseRevenueMap[product.reference_id] += Number(order.amount);
        });
      });

      // Count enrollments by course
      const courseEnrollmentMap: Record<string, number> = {};
      enrollments.forEach(enrollment => {
        if (!enrollment.course_id) return;
        courseEnrollmentMap[enrollment.course_id] = (courseEnrollmentMap[enrollment.course_id] || 0) + 1;
      });

      // Format data for chart (top 5 courses by enrollment)
      const courseData = courses
        .map(course => ({
          name: course.title || "Untitled Course",
          id: course.course_id,
          students: courseEnrollmentMap[course.course_id] || 0,
          revenue: courseRevenueMap[course.course_id] || 0
        }))
        .sort((a, b) => b.students - a.students)
        .slice(0, 5);

      return courseData;
    },
  });
};
