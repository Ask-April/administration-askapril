
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface CourseFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  isUpdate?: boolean;
}

const CourseFormActions: React.FC<CourseFormActionsProps> = ({ 
  isSubmitting, 
  onCancel,
  isUpdate = false
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
            {isUpdate ? "Updating..." : "Creating..."}
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {isUpdate ? "Save Course" : "Create Course"}
          </>
        )}
      </Button>
    </div>
  );
};

export default CourseFormActions;
