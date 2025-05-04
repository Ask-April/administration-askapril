
import { useState } from "react";
import { toast } from "sonner";
import { CourseSection, CourseLesson } from "@/services/types";

export const useEffectiveDragDrop = (
  sections: CourseSection[],
  updateSections: (sections: CourseSection[]) => void
) => {
  const [draggedItem, setDraggedItem] = useState<{
    item: any;
    type: 'section' | 'lesson';
    sectionId?: string;
  } | null>(null);
  
  const [dragOverItem, setDragOverItem] = useState<{
    id: string;
    type: 'section' | 'lesson';
    sectionId?: string;
  } | null>(null);
  
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (
    e: React.DragEvent, 
    item: any, 
    type: 'section' | 'lesson', 
    sectionId?: string
  ) => {
    e.stopPropagation();
    setDraggedItem({ item, type, sectionId });
    setIsDragging(true);
    
    // Set data transfer for better compatibility
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', JSON.stringify({
        id: item.id,
        type,
        sectionId
      }));
    }
    
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add('opacity-50');
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragging(false);
    setDraggedItem(null);
    setDragOverItem(null);
    
    // Remove visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('opacity-50');
    }
  };

  const handleDragOver = (
    e: React.DragEvent, 
    id: string, 
    type: 'section' | 'lesson', 
    sectionId?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedItem) return;
    
    setDragOverItem({ id, type, sectionId });
    
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add('bg-accent/10');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('bg-accent/10');
    }
  };

  const handleDrop = (
    e: React.DragEvent, 
    targetId: string, 
    type: 'section' | 'lesson', 
    sectionId?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('bg-accent/10');
    }
    
    if (!draggedItem) return;
    
    // Handle section reordering
    if (draggedItem.type === 'section' && type === 'section') {
      const updatedSections = [...sections];
      const draggedIndex = sections.findIndex(section => section.id === draggedItem.item.id);
      const targetIndex = sections.findIndex(section => section.id === targetId);
      
      if (draggedIndex === targetIndex) return;
      
      const [movedSection] = updatedSections.splice(draggedIndex, 1);
      updatedSections.splice(targetIndex, 0, movedSection);
      
      // Update positions
      updatedSections.forEach((section, idx) => {
        section.position = idx;
      });
      
      updateSections(updatedSections);
      toast.success("Section reordered successfully");
      return;
    }
    
    // Handle lesson reordering within the same section
    if (draggedItem.type === 'lesson' && type === 'lesson' && draggedItem.sectionId === sectionId) {
      const updatedSections = [...sections];
      const sectionIndex = updatedSections.findIndex(section => section.id === sectionId);
      
      if (sectionIndex === -1) return;
      
      const section = updatedSections[sectionIndex];
      const updatedLessons = [...section.lessons];
      
      const draggedIndex = updatedLessons.findIndex(lesson => lesson.id === draggedItem.item.id);
      const targetIndex = updatedLessons.findIndex(lesson => lesson.id === targetId);
      
      if (draggedIndex === targetIndex) return;
      
      const [movedLesson] = updatedLessons.splice(draggedIndex, 1);
      updatedLessons.splice(targetIndex, 0, movedLesson);
      
      // Update positions
      updatedLessons.forEach((lesson, idx) => {
        lesson.position = idx;
      });
      
      updatedSections[sectionIndex] = {
        ...section,
        lessons: updatedLessons
      };
      
      updateSections(updatedSections);
      toast.success("Lesson reordered successfully");
      return;
    }
    
    // Handle moving lesson between sections
    if (draggedItem.type === 'lesson' && type === 'section') {
      const updatedSections = [...sections];
      
      const sourceSectionIndex = updatedSections.findIndex(section => 
        section.id === draggedItem.sectionId
      );
      
      const targetSectionIndex = updatedSections.findIndex(section => 
        section.id === targetId
      );
      
      if (sourceSectionIndex === -1 || targetSectionIndex === -1) return;
      
      const sourceSection = updatedSections[sourceSectionIndex];
      const targetSection = updatedSections[targetSectionIndex];
      
      // Find the lesson to move
      const lessonIndex = sourceSection.lessons.findIndex(lesson => 
        lesson.id === draggedItem.item.id
      );
      
      if (lessonIndex === -1) return;
      
      // Remove from source section
      const [movedLesson] = sourceSection.lessons.splice(lessonIndex, 1);
      
      // Update source section lesson positions
      sourceSection.lessons.forEach((lesson, idx) => {
        lesson.position = idx;
      });
      
      // Add to target section
      const updatedLesson: CourseLesson = {
        ...movedLesson,
        section_id: targetId,
        position: targetSection.lessons.length
      };
      
      targetSection.lessons.push(updatedLesson);
      
      updateSections(updatedSections);
      toast.success("Lesson moved to another section");
    }
    
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return {
    draggedItem,
    dragOverItem,
    isDragging,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};

export type EffectiveDragDropHook = ReturnType<typeof useEffectiveDragDrop>;
