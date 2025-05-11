
import React from "react";
import { BookPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CourseFormValues } from "./schema/courseFormSchema";

interface CreateCourseDialogProps {
  onCourseCreated?: (data: CourseFormValues) => void;
}

const CreateCourseDialog: React.FC<CreateCourseDialogProps> = () => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate("/courses/create");
  };

  return (
    <div 
      id="create-course-trigger"
      className="flex flex-col items-center justify-center gap-4 p-6 border border-dashed rounded-lg border-border bg-card h-full cursor-pointer hover:bg-accent/10 transition-colors"
      onClick={handleCreateCourse}
    >
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
        <BookPlus className="h-6 w-6 text-accent" />
      </div>
      <span className="text-sm font-medium">Create New Course</span>
    </div>
  );
};

// Re-export CourseFormValues from courseFormSchema to maintain backward compatibility
export type { CourseFormValues };
export default CreateCourseDialog;
