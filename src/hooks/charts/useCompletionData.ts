
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type CompletionData = {
  month: string;
  count: number;
};

export const useCompletionData = () => {
  return useQuery({
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
};
