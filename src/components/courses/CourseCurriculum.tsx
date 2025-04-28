
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, AlertOctagon } from "lucide-react";
import ContentOrganization from "./content/ContentOrganization";
import { useCourseWizard } from "./wizard/CourseWizardContext";
import { CurriculumSection } from "./wizard/types";

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
      position: curriculumSections.length,
      lessons: []
    };
    
    updateCurriculumSections([...curriculumSections, newSection]);
    setNewSectionTitle("");
    setHasEnteredSection(true);
  };
  
  // Handle key press to add section on enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSectionTitle.trim()) {
      handleAddSection();
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
          
          <div className="flex items-center justify-center border border-dashed rounded-md p-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Start by entering a section title above. Sections help organize your course content.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Content organization will show after adding at least one section */}
      {curriculumSections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
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
          
          <ContentOrganization 
            sections={curriculumSections}
            updateSections={updateCurriculumSections}
          />
        </div>
      )}
    </div>
  );
};

export default CourseCurriculum;
