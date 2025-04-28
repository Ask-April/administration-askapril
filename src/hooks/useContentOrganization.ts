
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { CurriculumSection } from "@/components/courses/wizard/types";

export const useContentOrganization = (
  initialSections: CurriculumSection[],
  updateSections: (sections: CurriculumSection[]) => void
) => {
  const [sections, setSections] = useState<CurriculumSection[]>(initialSections);
  const [newSectionTitle, setNewSectionTitle] = useState<string>("");
  const [isAddLessonSidebarOpen, setIsAddLessonSidebarOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{
    sectionId: string;
    lesson: any;
  } | null>(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragOverItem, setDragOverItem] = useState<any>(null);
  const [dragType, setDragType] = useState<'section' | 'lesson' | null>(null);

  // Update parent component when sections change
  useEffect(() => {
    updateSections(sections);
  }, [sections, updateSections]);

  // Lesson form state
  const [lessonName, setLessonName] = useState('');
  const [selectedType, setSelectedType] = useState<string>('video');
  const [enableFreePreview, setEnableFreePreview] = useState(false);
  const [setAsDraft, setSetAsDraft] = useState(false);
  const [setAsCompulsory, setSetAsCompulsory] = useState(true);
  const [enableDiscussion, setEnableDiscussion] = useState(false);
  const [content, setContent] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection: CurriculumSection = {
      id: crypto.randomUUID(),
      title: newSectionTitle.trim(),
      position: sections.length,
      lessons: []
    };
    
    setSections([...sections, newSection]);
    setNewSectionTitle('');
    toast.success(`Section "${newSectionTitle}" added successfully`);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (window.confirm("Are you sure you want to delete this section and all its lessons?")) {
      setSections(sections.filter(section => section.id !== sectionId));
      toast.success("Section deleted successfully");
    }
  };

  const handleAddLesson = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setIsAddLessonSidebarOpen(true);
  };

  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.filter(lesson => lesson.id !== lessonId)
          };
        }
        return section;
      });
      
      setSections(updatedSections);
      toast.success("Lesson deleted successfully");
    }
  };

  const openLessonModal = (sectionId: string, lesson: any) => {
    setSelectedLesson({ sectionId, lesson });
    setContent(lesson.content || "");
    setContentUrl(lesson.contentUrl || "");
    setIsLessonModalOpen(true);
  };

  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, title: newTitle };
      }
      return section;
    });
    
    setSections(updatedSections);
    toast.success("Section title updated successfully");
  };

  const changeLessonType = (sectionId: string, lessonId: string, newType: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        const updatedLessons = section.lessons.map(lesson => {
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
    toast.success(`Lesson type changed to ${newType}`);
  };

  // Drag and drop handling
  const handleDragStart = (e: React.DragEvent, item: any, type: 'section' | 'lesson', sectionId?: string) => {
    setDraggedItem({ item, sectionId });
    setDragType(type);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedItem(null);
    setDragOverItem(null);
    setDragType(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string, type: 'section' | 'lesson', sectionId?: string) => {
    e.preventDefault();
    
    // Don't do anything if not dragging or dropping on the same item
    if (!draggedItem || draggedItem.item.id === targetId) return;
    
    // Handle section reordering
    if (dragType === 'section' && type === 'section') {
      const reorderedSections = [...sections];
      const draggedIndex = sections.findIndex(s => s.id === draggedItem.item.id);
      const targetIndex = sections.findIndex(s => s.id === targetId);
      
      const [movedSection] = reorderedSections.splice(draggedIndex, 1);
      reorderedSections.splice(targetIndex, 0, movedSection);
      
      // Update positions
      const updatedSections = reorderedSections.map((section, index) => ({
        ...section,
        position: index
      }));
      
      setSections(updatedSections);
      toast.success("Section order updated");
      return;
    }
    
    // Handle lesson reordering within the same section
    if (dragType === 'lesson' && type === 'lesson' && draggedItem.sectionId === sectionId) {
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;
      
      const reorderedLessons = [...section.lessons];
      const draggedIndex = reorderedLessons.findIndex(l => l.id === draggedItem.item.id);
      const targetIndex = reorderedLessons.findIndex(l => l.id === targetId);
      
      const [movedLesson] = reorderedLessons.splice(draggedIndex, 1);
      reorderedLessons.splice(targetIndex, 0, movedLesson);
      
      // Update positions
      const updatedLessons = reorderedLessons.map((lesson, index) => ({
        ...lesson,
        position: index
      }));
      
      const updatedSections = sections.map(s => {
        if (s.id === sectionId) {
          return { ...s, lessons: updatedLessons };
        }
        return s;
      });
      
      setSections(updatedSections);
      toast.success("Lesson order updated");
      return;
    }
    
    // Handle moving a lesson between sections
    if (dragType === 'lesson' && type === 'section') {
      const sourceSection = sections.find(s => s.id === draggedItem.sectionId);
      const targetSection = sections.find(s => s.id === targetId);
      if (!sourceSection || !targetSection) return;
      
      const lessonToMove = sourceSection.lessons.find(l => l.id === draggedItem.item.id);
      if (!lessonToMove) return;
      
      // Remove from source section
      const updatedSourceLessons = sourceSection.lessons.filter(l => l.id !== draggedItem.item.id);
      
      // Add to target section
      const updatedTargetLessons = [
        ...targetSection.lessons,
        { ...lessonToMove, position: targetSection.lessons.length }
      ];
      
      const updatedSections = sections.map(s => {
        if (s.id === draggedItem.sectionId) {
          return { ...s, lessons: updatedSourceLessons.map((l, i) => ({ ...l, position: i })) };
        }
        if (s.id === targetId) {
          return { ...s, lessons: updatedTargetLessons };
        }
        return s;
      });
      
      setSections(updatedSections);
      toast.success("Lesson moved to another section");
      return;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File selected:", e.target.files);
    // In a real implementation, you would handle file uploads here
    toast.info("File upload functionality will be implemented in the future");
  };

  const resetForm = () => {
    setLessonName('');
    setSelectedType('video');
    setEnableFreePreview(false);
    setSetAsDraft(false);
    setSetAsCompulsory(true);
    setEnableDiscussion(false);
    setContent('');
    setContentUrl('');
  };

  const handleSaveNewLesson = () => {
    if (!currentSectionId || !lessonName.trim() || !selectedType) return;

    const section = sections.find(s => s.id === currentSectionId);
    if (!section) return;

    const newLesson = {
      id: crypto.randomUUID(),
      title: lessonName,
      type: selectedType,
      isPreview: enableFreePreview,
      isDraft: setAsDraft,
      isCompulsory: setAsCompulsory,
      enableDiscussion: enableDiscussion,
      content: content,
      contentUrl: contentUrl,
      position: section.lessons.length
    };

    const updatedSections = sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          lessons: [...section.lessons, newLesson]
        };
      }
      return section;
    });
    
    setSections(updatedSections);
    setIsAddLessonSidebarOpen(false);
    toast.success(`Lesson "${lessonName}" added successfully`);
    resetForm();
  };

  const handleLessonContentSave = () => {
    if (!selectedLesson) return;
    
    const updatedSections = sections.map(section => {
      if (section.id === selectedLesson.sectionId) {
        const updatedLessons = section.lessons.map(lesson => {
          if (lesson.id === selectedLesson.lesson.id) {
            return { 
              ...lesson, 
              title: selectedLesson.lesson.title,
              type: selectedLesson.lesson.type,
              content: content,
              contentUrl: contentUrl
            };
          }
          return lesson;
        });
        
        return { ...section, lessons: updatedLessons };
      }
      return section;
    });
    
    setSections(updatedSections);
    toast.success("Lesson content saved successfully");
    setIsLessonModalOpen(false);
    setSelectedLesson(null);
  };

  return {
    // Section management
    sections,
    setSections,
    newSectionTitle,
    setNewSectionTitle,
    handleAddSection,
    handleDeleteSection,
    updateSectionTitle,

    // Lesson management
    handleAddLesson,
    handleDeleteLesson,
    changeLessonType,
    openLessonModal,
    
    // Modal management
    isLessonModalOpen,
    setIsLessonModalOpen,

    // Drag and drop
    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,

    // Lesson form
    lessonName,
    setLessonName,
    selectedType,
    setSelectedType,
    enableFreePreview,
    setEnableFreePreview,
    setAsDraft,
    setSetAsDraft,
    setAsCompulsory,
    setSetAsCompulsory,
    enableDiscussion,
    setEnableDiscussion,
    content,
    setContent,
    contentUrl,
    setContentUrl,
    fileInputRef,
    handleFileChange,

    // Modal and drawer management
    isAddLessonSidebarOpen,
    setIsAddLessonSidebarOpen,
    currentSectionId,
    selectedLesson,
    setSelectedLesson,

    // Form actions
    handleSaveNewLesson,
    handleLessonContentSave
  };
};

export type ContentOrganizationHook = ReturnType<typeof useContentOrganization>;
