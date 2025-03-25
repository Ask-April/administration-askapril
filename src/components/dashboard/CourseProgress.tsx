
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CourseProgressProps {
  title: string;
  progress: number;
  total: number;
  image?: string;
  className?: string;
}

const CourseProgress: React.FC<CourseProgressProps> = ({
  title,
  progress,
  total,
  image,
  className,
}) => {
  const percentage = Math.round((progress / total) * 100);
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-xl border bg-card p-4 shadow-sm transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-110" 
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
              <span className="text-2xl font-bold text-accent">{title.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium line-clamp-1 mb-1">{title}</h3>
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{progress} of {total} completed</span>
            <span>{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-1.5" />
        </div>
      </div>
    </motion.div>
  );
};

export default CourseProgress;
