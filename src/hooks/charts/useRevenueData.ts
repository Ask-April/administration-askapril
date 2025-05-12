
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type RevenueData = {
  month: string;
  amount: number;
};

export const useRevenueData = () => {
  return useQuery({
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
};
