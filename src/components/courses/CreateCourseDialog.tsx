
import React from "react";
import { BookPlus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface CreateCourseDialogProps {
  onCourseCreated?: (data: any) => void;
}

const CreateCourseDialog: React.FC<CreateCourseDialogProps> = ({
  onCourseCreated
}) => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate("/courses/create");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
    </Dialog>
  );
};

export default CreateCourseDialog;
