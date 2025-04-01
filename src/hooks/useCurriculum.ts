
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
  position: number;
}

export interface Lesson {
  id: string;
  title: string;
  type?: string;
  isPreview?: boolean;
  isDraft?: boolean;
  isCompulsory?: boolean;
  enableDiscussion?: boolean;
  content?: string;
  contentUrl?: string;
  position?: number;
}

interface UseCurriculumProps {
  updateCourseData: (data: { lessons: number }) => void;
  onUpdateSections: (sections: Section[]) => void;
}

export const useCurriculum = ({ updateCourseData, onUpdateSections }: UseCurriculumProps) => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: uuidv4(),
      title: "Introduction",
      lessons: [],
      position: 0
    }
  ]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [isAddLessonDialogOpen, setIsAddLessonDialogOpen] = useState(false);

  useEffect(() => {
    const totalLessons = sections.reduce((count, section) => count + section.lessons.length, 0);
    updateCourseData({ lessons: totalLessons });
    onUpdateSections(sections);
  }, [sections, updateCourseData, onUpdateSections]);

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection = {
      id: uuidv4(),
      title: newSectionTitle,
      lessons: [],
      position: sections.length
    };
    
    setSections([...sections, newSection]);
    setNewSectionTitle("");
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const openAddLessonDialog = (section: Section) => {
    setCurrentSection(section);
    setIsAddLessonDialogOpen(true);
  };

  const handleAddLesson = (lesson: Lesson) => {
    if (!currentSection) return;
    
    const lessonWithPosition = {
      ...lesson,
      id: lesson.id || uuidv4(),
      position: currentSection.lessons.length
    };
    
    setSections(sections.map(section => 
      section.id === currentSection.id 
        ? { ...section, lessons: [...section.lessons, lessonWithPosition] }
        : section
    ));
    
    setIsAddLessonDialogOpen(false);
    toast.success(`Lesson "${lesson.title}" added successfully`);
  };

  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, lessons: section.lessons.filter(lesson => lesson.id !== lessonId) }
        : section
    ));
  };

  return {
    sections,
    newSectionTitle,
    setNewSectionTitle,
    currentSection,
    isAddLessonDialogOpen,
    setIsAddLessonDialogOpen,
    handleAddSection,
    handleDeleteSection,
    openAddLessonDialog,
    handleAddLesson,
    handleDeleteLesson
  };
};
