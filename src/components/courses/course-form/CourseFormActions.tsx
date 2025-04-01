
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CourseFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

const CourseFormActions: React.FC<CourseFormActionsProps> = ({ 
  isSubmitting, 
  onCancel 
}) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : "Create Course"}
      </Button>
    </div>
  );
};

export default CourseFormActions;
