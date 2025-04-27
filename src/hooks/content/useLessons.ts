
import { useState } from "react";
import { toast } from "sonner";
import { Lesson } from "@/hooks/useCurriculum";

export const useLessons = (sections: any[], setSections: (sections: any[]) => void) => {
  const [isAddLessonSidebarOpen, setIsAddLessonSidebarOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{
    sectionId: string;
    lesson: Lesson;
  } | null>(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);

  const handleAddLesson = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setIsAddLessonSidebarOpen(true);
  };

  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.filter((lesson: Lesson) => lesson.id !== lessonId)
        };
      }
      return section;
    });
    
    setSections(updatedSections);
  };

  const openLessonModal = (sectionId: string, lesson: Lesson) => {
    setSelectedLesson({ sectionId, lesson });
    setIsLessonModalOpen(true);
  };

  const updateLessonTitle = (sectionId: string, lessonId: string, newTitle: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        const updatedLessons = section.lessons.map((lesson: Lesson) => {
          if (lesson.id === lessonId) {
            return { ...lesson, title: newTitle };
          }
          return lesson;
        });
        
        return { ...section, lessons: updatedLessons };
      }
      return section;
    });
    
    setSections(updatedSections);
    toast.success("Lesson title updated successfully");
  };

  const changeLessonType = (sectionId: string, lessonId: string, newType: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        const updatedLessons = section.lessons.map((lesson: Lesson) => {
          if (lesson.id === lessonId) {
            return { ...lesson, type: newType };
          }
          return lesson;
        });
        
        return { ...section, lessons: updatedLessons };
      }
      return section;
    });
    
    setSections(updatedSections);
  };

  return {
    isAddLessonSidebarOpen,
    setIsAddLessonSidebarOpen,
    currentSectionId,
    setCurrentSectionId,
    selectedLesson,
    setSelectedLesson,
    isLessonModalOpen,
    setIsLessonModalOpen,
    handleAddLesson,
    handleDeleteLesson,
    openLessonModal,
    updateLessonTitle,
    changeLessonType
  };
};
