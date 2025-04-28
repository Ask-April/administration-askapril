
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import { ContentOrganization } from "@/components/courses/content";
import { CurriculumSection } from "@/components/courses/wizard/types";
import { curriculumService } from "@/services/course/curriculumService";
import { toast } from "sonner";

interface ContentTabProps {
  editedCourse?: any;
  setEditedCourse?: (course: any) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({ 
  editedCourse, 
  setEditedCourse 
}) => {
  const [sections, setSections] = useState<CurriculumSection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch curriculum sections when component mounts
  useEffect(() => {
    const fetchCurriculum = async () => {
      if (editedCourse?.course_id) {
        try {
          setIsLoading(true);
          const curriculumData = await curriculumService.getCurriculum(editedCourse.course_id);
          setSections(curriculumData);
        } catch (error) {
          console.error("Error fetching curriculum:", error);
          toast.error("Failed to load course curriculum");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchCurriculum();
  }, [editedCourse?.course_id]);

  // Handle updating sections
  const updateSections = async (updatedSections: CurriculumSection[]) => {
    setSections(updatedSections);
    
    // Save curriculum changes if we have a course ID
    if (editedCourse?.course_id) {
      try {
        await curriculumService.saveCurriculum(editedCourse.course_id, updatedSections);
      } catch (error) {
        console.error("Error saving curriculum:", error);
        toast.error("Failed to save curriculum changes");
      }
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Course Organization</h3>
          </div>
          <ContentOrganization 
            sections={sections} 
            updateSections={updateSections} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;
