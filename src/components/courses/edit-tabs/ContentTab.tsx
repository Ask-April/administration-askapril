import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, PlusCircle } from "lucide-react";
import { ContentOrganization } from "@/components/courses/content";
import { curriculumService } from "@/services/course/curriculum";
import { toast } from "sonner";
import { CourseSection } from "@/services/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContentTabProps {
  editedCourse?: any;
  setEditedCourse?: (course: any) => void;
  temporarySections?: CourseSection[];
  setTemporarySections?: (sections: CourseSection[]) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({ 
  editedCourse, 
  setEditedCourse,
  temporarySections,
  setTemporarySections
}) => {
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newSectionTitle, setNewSectionTitle] = useState<string>("");

  // Fetch curriculum sections when component mounts
  useEffect(() => {
    const fetchCurriculum = async () => {
      if (editedCourse?.course_id) {
        try {
          setIsLoading(true);
          
          // Use temporary sections if available, otherwise fetch from API
          if (temporarySections && temporarySections.length > 0) {
            setSections(temporarySections);
            setIsLoading(false);
          } else {
            const curriculumData = await curriculumService.getCurriculum(editedCourse.course_id);
            
            // Make sure each section has the required course_id property
            const sectionsWithCourseId = curriculumData.map(section => ({
              ...section,
              course_id: editedCourse.course_id
            }));
            
            setSections(sectionsWithCourseId);
            // Also update the temporary sections
            if (setTemporarySections) {
              setTemporarySections(sectionsWithCourseId);
            }
          }
        } catch (error) {
          console.error("Error fetching curriculum:", error);
          toast.error("Failed to load course curriculum");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchCurriculum();
  }, [editedCourse?.course_id, temporarySections, setTemporarySections]);

  // Handle updating sections
  const updateSections = async (updatedSections: CourseSection[]) => {
    setSections(updatedSections);
    
    // Update temporary sections but don't save to the database yet
    if (setTemporarySections) {
      setTemporarySections(updatedSections);
    }
  };

  // Handle adding a new section
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection: CourseSection = {
      id: crypto.randomUUID(),
      title: newSectionTitle.trim(),
      position: sections.length,
      lessons: [],
      course_id: editedCourse?.course_id || ''
    };
    
    const updatedSections = [...sections, newSection];
    updateSections(updatedSections);
    setNewSectionTitle("");
    toast.success(`Section "${newSectionTitle}" added successfully`);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Course Organization</h3>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : sections.length === 0 ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder="e.g., Introduction to the course"
                    className="flex-grow"
                  />
                  <Button onClick={handleAddSection} disabled={!newSectionTitle.trim()}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
                
                <div className="flex items-center justify-center border border-dashed rounded-md p-8">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Start by entering a section title above. Sections help organize your course content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ContentOrganization 
              sections={sections} 
              updateSections={updateSections} 
              showAddSection={true} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;
