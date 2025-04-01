
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddLessonDialog from "./AddLessonDialog";
import SectionCard from "./curriculum/SectionCard";
import { useCurriculum } from "@/hooks/useCurriculum";

interface CourseCurriculumProps {
  courseData: {
    title: string;
    description: string;
    category: string;
    image: string;
    duration: string;
    lessons: number;
    status: "draft" | "published";
  };
  updateCourseData: (data: Partial<CourseCurriculumProps["courseData"]>) => void;
  courseId: string;
  onUpdateSections: (sections: any[]) => void;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ 
  courseData, 
  updateCourseData,
  courseId,
  onUpdateSections
}) => {
  const {
    sections,
    newSectionTitle,
    setNewSectionTitle,
    isAddLessonDialogOpen,
    setIsAddLessonDialogOpen,
    handleAddSection,
    handleDeleteSection,
    openAddLessonDialog,
    handleAddLesson,
    handleDeleteLesson
  } = useCurriculum({
    updateCourseData,
    onUpdateSections
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Curriculum</h2>
        <p className="text-sm text-muted-foreground">Organize your course content into sections and lessons</p>
      </div>
      
      <div className="space-y-4">
        {sections.map(section => (
          <SectionCard
            key={section.id}
            section={section}
            onDeleteSection={handleDeleteSection}
            onAddLesson={openAddLessonDialog}
            onDeleteLesson={handleDeleteLesson}
          />
        ))}
      </div>
      
      <div className="flex">
        <Input
          placeholder="Enter section title (e.g., Introduction, Module 1)"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          className="mr-2"
        />
        <Button 
          onClick={handleAddSection}
          disabled={!newSectionTitle.trim()}
        >
          Add Section
        </Button>
      </div>
      
      <AddLessonDialog
        isOpen={isAddLessonDialogOpen}
        onClose={() => setIsAddLessonDialogOpen(false)}
        onAddLesson={handleAddLesson}
      />
    </div>
  );
};

export default CourseCurriculum;
