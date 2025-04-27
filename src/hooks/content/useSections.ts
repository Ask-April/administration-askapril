
import { useState } from "react";
import { toast } from "sonner";
import { Section } from "@/hooks/useCurriculum";

export const useSections = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'section-1',
      title: 'Introduction',
      position: 1,
      lessons: [
        { id: 'lesson-1', title: 'Welcome to the Course', type: 'video', position: 1 },
        { id: 'lesson-2', title: 'Course Overview', type: 'text', position: 2 }
      ]
    },
    {
      id: 'section-2',
      title: 'Getting Started',
      position: 2,
      lessons: [
        { id: 'lesson-3', title: 'Setting Up Your Environment', type: 'video', position: 1 },
        { id: 'lesson-4', title: 'First Steps', type: 'text', position: 2 },
        { id: 'lesson-5', title: 'Quick Quiz', type: 'quiz', position: 3 }
      ]
    }
  ]);

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const handleAddSection = (title: string) => {
    if (!title.trim()) return;
    
    const newSection = {
      id: `section-${Date.now()}`,
      title: title.trim(),
      position: sections.length + 1,
      lessons: []
    };
    
    setSections([...sections, newSection]);
  };

  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, title: newTitle };
      }
      return section;
    });
    
    setSections(updatedSections);
    toast.success("Section title updated successfully");
  };

  return {
    sections,
    setSections,
    handleAddSection,
    handleDeleteSection,
    updateSectionTitle
  };
};
