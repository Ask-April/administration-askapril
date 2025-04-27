
import { useState } from "react";
import { toast } from "sonner";

export const useDragAndDrop = (sections: any[], setSections: (sections: any[]) => void) => {
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragOverItem, setDragOverItem] = useState<any>(null);

  const handleDragStart = (e: React.DragEvent, item: any, type: 'section' | 'lesson', sectionId?: string) => {
    setDraggedItem({ ...item, type, sectionId });
    
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add('opacity-50');
    }
    
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('opacity-50');
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add('bg-accent/10');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('bg-accent/10');
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string, type: 'section' | 'lesson', sectionId?: string) => {
    e.preventDefault();
    
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('bg-accent/10');
    }
    
    if (!draggedItem) return;
    
    if (draggedItem.type === 'section' && type === 'section') {
      const updatedSections = [...sections];
      const draggedIndex = sections.findIndex(section => section.id === draggedItem.id);
      const targetIndex = sections.findIndex(section => section.id === targetId);
      
      if (draggedIndex === targetIndex) return;
      
      const draggedSection = updatedSections[draggedIndex];
      updatedSections.splice(draggedIndex, 1);
      updatedSections.splice(targetIndex, 0, draggedSection);
      
      updatedSections.forEach((section, index) => {
        section.position = index + 1;
      });
      
      setSections(updatedSections);
      toast.success("Section reordered successfully");
    } else if (draggedItem.type === 'lesson' && type === 'lesson') {
      if (draggedItem.sectionId === sectionId) {
        const updatedSections = sections.map(section => {
          if (section.id === sectionId) {
            const updatedLessons = [...section.lessons];
            const draggedIndex = updatedLessons.findIndex((lesson) => lesson.id === draggedItem.id);
            const targetIndex = updatedLessons.findIndex((lesson) => lesson.id === targetId);
            
            if (draggedIndex === targetIndex) return section;
            
            const draggedLesson = updatedLessons[draggedIndex];
            updatedLessons.splice(draggedIndex, 1);
            updatedLessons.splice(targetIndex, 0, draggedLesson);
            
            updatedLessons.forEach((lesson, index) => {
              lesson.position = index + 1;
            });
            
            return { ...section, lessons: updatedLessons };
          }
          return section;
        });
        
        setSections(updatedSections);
        toast.success("Lesson reordered successfully");
      }
    }
    
    setDraggedItem(null);
  };

  return {
    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
