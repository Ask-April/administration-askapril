
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  PlayCircle, 
  Users,
} from "lucide-react";
import { Course } from "@/services/types";

export interface CourseCardProps {
  course?: Course;
  onClick?: () => void;
  // Individual props for direct usage
  course_id?: string;
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  duration?: string;
  students?: number;
  lessons?: number;
  status?: "published" | "draft";
}

const CourseCard: React.FC<CourseCardProps> = (props) => {
  const {
    course,
    onClick,
    // Extract individual props with defaults
    course_id = course?.course_id,
    title = course?.title || "Untitled Course",
    description = course?.description || "No description provided.",
    image = course?.image_url || course?.image,
    status = course?.status || "draft",
    category = course?.category || "Uncategorized",
    duration = course?.duration || "N/A",
    students = course?.students || 0,
    lessons = course?.lessons || 0,
  } = props;
  
  // If no course_id is provided, use a fallback ID
  const id = course_id || "unknown";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link to={`/courses/edit/${id}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title || "Course"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
              <span className="text-4xl font-bold text-accent">{(title || "C").charAt(0)}</span>
            </div>
          )}
          
          <div className="absolute top-3 left-3">
            <Badge variant={status === "published" ? "default" : "outline"} className="capitalize">
              {status}
            </Badge>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" className="rounded-full" onClick={e => {
              e.preventDefault();
              if (onClick) onClick();
            }}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="bg-accent/10 text-accent">
              {category}
            </Badge>
          </div>
          
          <h3 className="mb-1 line-clamp-1 text-base font-medium transition-colors duration-200 group-hover:text-accent">
            {title}
          </h3>
          
          <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
            {description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Clock className="mr-1 h-3.5 w-3.5" />
                {duration}
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-3.5 w-3.5" />
                {students}
              </div>
            </div>
            <div>{lessons} lessons</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
