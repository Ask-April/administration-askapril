
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CourseFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  submitLabel?: string;
}

const CourseFormActions: React.FC<CourseFormActionsProps> = ({ 
  isSubmitting, 
  onCancel,
  submitLabel = "Create Course"
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
            {submitLabel === "Create Course" ? "Creating..." : "Saving..."}
          </>
        ) : submitLabel}
      </Button>
    </div>
  );
};

export default CourseFormActions;
