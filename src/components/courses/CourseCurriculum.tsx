
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, PlusCircle, AlertOctagon } from "lucide-react";
import ContentOrganization from "./content/ContentOrganization";
import { useCourseWizard } from "./wizard/CourseWizardContext";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
    autoGenerateContent, 
    isGeneratingContent, 
    curriculumSections,
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
  
  // Handle adding a new section
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection = {
      title: newSectionTitle.trim(),
      position: curriculumSections.length,
      lessons: []
    };
    
    onUpdateSections([...curriculumSections, newSection]);
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
              {(courseData.title && courseData.description) && (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => autoGenerateContent('curriculum')}
                      disabled={isGeneratingContent}
                    >
                      <Sparkles className="h-4 w-4" />
                      {isGeneratingContent ? "Generating..." : "Generate Curriculum with AI"}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">AI-Powered Curriculum</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically generate a complete course structure based on your title and description.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Content organization will show after adding at least one section */}
      {curriculumSections.length > 0 && (
        <div className="space-y-4">
          {!hasEnteredSection && (
            <div className="flex items-center space-x-2 mb-4">
              <Input
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                placeholder="Enter section title"
                onKeyPress={handleKeyPress}
              />
              <Button onClick={handleAddSection} disabled={!newSectionTitle.trim()}>Add Section</Button>
            </div>
          )}
          
          <ContentOrganization />
          
          {/* AI Generation Button */}
          <div className="flex justify-center mt-6">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => autoGenerateContent('curriculum')}
                  disabled={isGeneratingContent || !courseData.title || !courseData.description}
                >
                  <Sparkles className="h-4 w-4" />
                  {isGeneratingContent ? "Generating..." : "Regenerate Curriculum with AI"}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">AI-Powered Curriculum</h4>
                  <p className="text-sm text-muted-foreground">
                    This will replace your current curriculum with a new AI-generated one.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCurriculum;
