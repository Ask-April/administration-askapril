
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type EnrollmentData = {
  month: string;
  count: number;
};

export type RevenueData = {
  month: string;
  amount: number;
};

export type CompletionData = {
  month: string;
  count: number;
};

export type CoursePopularityData = {
  name: string;
  students: number;
  revenue: number;
};

export const useOverviewCharts = () => {
  // Fetch enrollment trends
  const enrollmentQuery = useQuery({
    queryKey: ["enrollmentTrends"],
    queryFn: async (): Promise<EnrollmentData[]> => {
      // Get enrollment trends by month
      const { data, error } = await supabase
        .from("enrollment" as any)
        .select("enroll_date")
        .order("enroll_date", { ascending: true });

      if (error) {
        console.error("Error fetching enrollment data:", error);
        throw error;
      }

      // Group enrollment data by month
      const enrollments = data as any[] || [];
      const enrollmentsByMonth: Record<string, number> = {};

      // Get last 6 months
      const today = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        enrollmentsByMonth[monthKey] = 0;
      }

      // Count enrollments by month
      enrollments.forEach(enrollment => {
        if (!enrollment.enroll_date) return;
        const date = new Date(enrollment.enroll_date);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        if (monthKey in enrollmentsByMonth) {
          enrollmentsByMonth[monthKey]++;
        }
      });

      // Format data for chart
      return Object.entries(enrollmentsByMonth).map(([month, count]) => {
        const [year, monthNum] = month.split('-');
        const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'short' });
        return { month: monthName, count };
      });
    },
  });

  // Fetch revenue data
  const revenueQuery = useQuery({
    queryKey: ["revenueTrends"],
    queryFn: async (): Promise<RevenueData[]> => {
      // Get revenue trends by month
      const { data, error } = await supabase
        .from("orders" as any)
        .select("purchase_date, amount")
        .order("purchase_date", { ascending: true });

      if (error) {
        console.error("Error fetching revenue data:", error);
        throw error;
      }

      // Group revenue data by month
      const orders = data as any[] || [];
      const revenueByMonth: Record<string, number> = {};

      // Get last 6 months
      const today = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        revenueByMonth[monthKey] = 0;
      }

      // Sum revenue by month
      orders.forEach(order => {
        if (!order.purchase_date || !order.amount) return;
        const date = new Date(order.purchase_date);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        if (monthKey in revenueByMonth) {
          revenueByMonth[monthKey] += Number(order.amount);
        }
      });

      // Format data for chart
      return Object.entries(revenueByMonth).map(([month, amount]) => {
        const [year, monthNum] = month.split('-');
        const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'short' });
        return { month: monthName, amount: Number(amount.toFixed(2)) };
      });
    },
  });

  // Fetch course completions
  const completionsQuery = useQuery({
    queryKey: ["completionTrends"],
    queryFn: async (): Promise<CompletionData[]> => {
      // Get completion trends by month
      const { data, error } = await supabase
        .from("lesson_completion" as any)
        .select("completed_at")
        .order("completed_at", { ascending: true });

      if (error) {
        console.error("Error fetching completion data:", error);
        throw error;
      }

      // Group completion data by month
      const completions = data as any[] || [];
      const completionsByMonth: Record<string, number> = {};

      // Get last 6 months
      const today = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        completionsByMonth[monthKey] = 0;
      }

      // Count completions by month
      completions.forEach(completion => {
        if (!completion.completed_at) return;
        const date = new Date(completion.completed_at);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        if (monthKey in completionsByMonth) {
          completionsByMonth[monthKey]++;
        }
      });

      // Format data for chart
      return Object.entries(completionsByMonth).map(([month, count]) => {
        const [year, monthNum] = month.split('-');
        const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'short' });
        return { month: monthName, count };
      });
    },
  });

  // Fetch popular courses
  const popularCoursesQuery = useQuery({
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

  return {
    enrollmentData: enrollmentQuery.data || [],
    isEnrollmentLoading: enrollmentQuery.isLoading,
    enrollmentError: enrollmentQuery.error,
    
    revenueData: revenueQuery.data || [],
    isRevenueLoading: revenueQuery.isLoading,
    revenueError: revenueQuery.error,
    
    completionData: completionsQuery.data || [],
    isCompletionLoading: completionsQuery.isLoading,
    completionError: completionsQuery.error,
    
    popularCoursesData: popularCoursesQuery.data || [],
    isPopularCoursesLoading: popularCoursesQuery.isLoading,
    popularCoursesError: popularCoursesQuery.error,
  };
};
