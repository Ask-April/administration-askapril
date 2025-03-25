
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all duration-200",
        className
      )}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-3 text-2xl font-bold">{value}</h3>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
          {trend && trendValue && (
            <div className="mt-3 flex items-center text-xs font-medium">
              <span
                className={cn(
                  "mr-1 rounded-sm px-1 py-0.5",
                  trend === "up" && "bg-green-100 text-green-700",
                  trend === "down" && "bg-red-100 text-red-700",
                  trend === "neutral" && "bg-blue-100 text-blue-700"
                )}
              >
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {trend === "neutral" && "→"} {trendValue}
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          <Icon size={22} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 to-accent/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

export default StatCard;
