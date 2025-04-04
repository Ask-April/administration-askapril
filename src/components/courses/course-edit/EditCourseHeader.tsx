
import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoursePageHeader from "@/components/courses/CoursePageHeader";

interface EditCourseHeaderProps {
  title: string;
  isSaving: boolean;
  onSave: () => void;
  onDelete: () => void;
}

const EditCourseHeader: React.FC<EditCourseHeaderProps> = ({ 
  title, 
  isSaving, 
  onSave, 
  onDelete 
}) => {
  return (
    <CoursePageHeader 
      title={`Edit Course: ${title || 'Untitled Course'}`} 
      backPath="/courses/overview"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={onDelete} className="text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      }
    />
  );
};

export default EditCourseHeader;
