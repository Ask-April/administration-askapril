
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, AlertOctagon } from "lucide-react";
import ContentOrganization from "./content/ContentOrganization";
import { useCourseWizard } from "./wizard/CourseWizardContext";
import { CurriculumSection } from "./wizard/types";
import { CourseSection } from "@/services/types";
import { EmptyState } from "@/components/ui/loading-states";

interface CourseCurriculumProps {
  courseData: any;
  updateCourseData: (data: any) => void;
  courseId: string;
  onUpdateSections: (sections: any) => void;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({
  courseData,
  courseId,
  onUpdateSections
}) => {
  const { 
    curriculumSections,
    updateCurriculumSections,
    focusFirstInput,
    setFocusFirstInput,
    formErrors
  } = useCourseWizard();
  
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const sectionInputRef = useRef<HTMLInputElement>(null);
  const [hasEnteredSection, setHasEnteredSection] = useState(false);
  
  // Focus the input field when the component mounts if focusFirstInput is true
  useEffect(() => {
    if (focusFirstInput && sectionInputRef.current) {
      sectionInputRef.current.focus();
      setFocusFirstInput(false);
    }
  }, [focusFirstInput, setFocusFirstInput]);
  
  useEffect(() => {
    setHasEnteredSection(curriculumSections.length > 0);
  }, [curriculumSections]);
  
  // Handle adding a new section
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection: CurriculumSection = {
      id: crypto.randomUUID(),
      title: newSectionTitle.trim(),
      position: 0, // Position 0 puts it at the top
      lessons: []
    };
    
    // Update positions of existing sections
    const updatedSections = curriculumSections.map(section => ({
      ...section,
      position: section.position + 1
    }));
    
    // Add the new section at the beginning
    updateCurriculumSections([newSection, ...updatedSections]);
    setNewSectionTitle("");
    setHasEnteredSection(true);
  };
  
  // Handle key press to add section on enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSectionTitle.trim()) {
      handleAddSection();
    }
  };

  // Convert CurriculumSection[] to CourseSection[] by adding course_id
  const getCourseSections = (): CourseSection[] => {
    return curriculumSections.map(section => ({
      ...section,
      course_id: courseId
    }));
  };

  // Handler for updating sections - this is our connection to ContentOrganization
  const handleUpdateSections = (updatedSections: CourseSection[]) => {
    // Since this is triggered by ContentOrganization, we need to transform the sections back
    const newCurriculumSections = updatedSections.map(section => ({
      id: section.id,
      title: section.title,
      position: section.position,
      lessons: section.lessons
    }));
    
    // Only update if there are changes to avoid infinite loops
    if (JSON.stringify(newCurriculumSections) !== JSON.stringify(curriculumSections)) {
      updateCurriculumSections(newCurriculumSections);
      
      // Also notify the parent if needed
      onUpdateSections(updatedSections);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
      
      {!hasEnteredSection && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="section-title">Section Title</Label>
              {formErrors.curriculum && (
                <span className="text-sm text-red-500">Required</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Input
                id="section-title"
                ref={sectionInputRef}
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                placeholder="e.g., Introduction to the course"
                className={formErrors.curriculum ? "border-red-500" : ""}
                onKeyPress={handleKeyPress}
              />
              <Button onClick={handleAddSection} disabled={!newSectionTitle.trim()}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
            {formErrors.curriculum && formErrors.curriculum.map((error, index) => (
              <p key={index} className="text-sm text-red-500 mt-1 flex items-center">
                <AlertOctagon className="h-3 w-3 mr-1" />
                {error}
              </p>
            ))}
          </div>
          
          <EmptyState
            title="Start Creating Your Course Structure"
            description="Enter a section title above to begin organizing your course content."
            icon={PlusCircle}
          />
        </div>
      )}
      
      {/* Content organization will show after adding at least one section */}
      {curriculumSections.length > 0 && (
        <ContentOrganization 
          sections={getCourseSections()}
          updateSections={handleUpdateSections}
          showAddSection={false} // Don't show AddSectionForm in ContentOrganization
        />
      )}
      
      {/* Only show the add section form if we already have sections */}
      {curriculumSections.length > 0 && (
        <div className="flex items-center space-x-2 mt-4">
          <Input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Enter section title"
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleAddSection} disabled={!newSectionTitle.trim()}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseCurriculum;
