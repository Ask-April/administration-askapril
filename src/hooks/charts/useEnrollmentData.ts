
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type EnrollmentData = {
  month: string;
  count: number;
};

export const useEnrollmentData = () => {
  return useQuery({
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
};
