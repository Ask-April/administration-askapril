
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

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onClick,
}) => {
  // Extract properties from course object
  const {
    course_id: id,
    title,
    description,
    image_url: image,
    status = "published",
  } = course;
  
  // Default or computed values
  const category = course.category || "Uncategorized";
  const duration = course.duration || "N/A";
  const students = course.students || 0;
  const lessons = course.lessons || 0;

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
            {title || "Untitled Course"}
          </h3>
          
          <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
            {description || "No description provided."}
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
