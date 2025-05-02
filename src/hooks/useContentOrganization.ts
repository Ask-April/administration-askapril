import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { CourseSection, CourseLesson } from "@/services/types";

export const useContentOrganization = (
  initialSections: CourseSection[],
  updateSections: (sections: CourseSection[]) => void
) => {
  const [sections, setSections] = useState<CourseSection[]>(initialSections);
  const [newSectionTitle, setNewSectionTitle] = useState<string>("");
  const [isAddLessonSidebarOpen, setIsAddLessonSidebarOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{
    sectionId: string;
    lesson: CourseLesson;
  } | null>(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isNewLesson, setIsNewLesson] = useState(false);
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

  // Update form state when selectedLesson changes
  useEffect(() => {
    if (selectedLesson && !isNewLesson) {
      setContent(selectedLesson.lesson.content || "");
      setContentUrl(selectedLesson.lesson.content_url || "");
    }
  }, [selectedLesson, isNewLesson]);

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection: CourseSection = {
      id: crypto.randomUUID(),
      title: newSectionTitle.trim(),
      position: sections.length,
      lessons: [],
      course_id: sections[0]?.course_id || ''
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
    setIsNewLesson(true);
    // Reset content for new lesson
    setContent("");
    setContentUrl("");
    setIsLessonModalOpen(true);
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

  const openLessonModal = (sectionId: string, lesson: CourseLesson) => {
    setIsNewLesson(false);
    setSelectedLesson({ sectionId, lesson });
    setContent(lesson.content || "");
    setContentUrl(lesson.content_url || "");
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
    
    if (!draggedItem || draggedItem.item.id === targetId) return;
    
    if (dragType === 'section' && type === 'section') {
      const reorderedSections = [...sections];
      const draggedIndex = sections.findIndex(s => s.id === draggedItem.item.id);
      const targetIndex = sections.findIndex(s => s.id === targetId);
      
      const [movedSection] = reorderedSections.splice(draggedIndex, 1);
      reorderedSections.splice(targetIndex, 0, movedSection);
      
      const updatedSections = reorderedSections.map((section, index) => ({
        ...section,
        position: index
      }));
      
      setSections(updatedSections);
      toast.success("Section order updated");
      return;
    }
    
    if (dragType === 'lesson' && type === 'lesson' && draggedItem.sectionId === sectionId) {
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;
      
      const reorderedLessons = [...section.lessons];
      const draggedIndex = reorderedLessons.findIndex(l => l.id === draggedItem.item.id);
      const targetIndex = reorderedLessons.findIndex(l => l.id === targetId);
      
      const [movedLesson] = reorderedLessons.splice(draggedIndex, 1);
      reorderedLessons.splice(targetIndex, 0, movedLesson);
      
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
    
    if (dragType === 'lesson' && type === 'section') {
      const sourceSection = sections.find(s => s.id === draggedItem.sectionId);
      const targetSection = sections.find(s => s.id === targetId);
      if (!sourceSection || !targetSection) return;
      
      const lessonToMove = sourceSection.lessons.find(l => l.id === draggedItem.item.id);
      if (!lessonToMove) return;
      
      const updatedSourceLessons = sourceSection.lessons.filter(l => l.id !== draggedItem.item.id);
      
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

    const newLesson: CourseLesson = {
      id: crypto.randomUUID(),
      section_id: currentSectionId,
      title: lessonName,
      type: selectedType,
      is_preview: enableFreePreview,
      is_draft: setAsDraft,
      is_compulsory: setAsCompulsory,
      enable_discussion: enableDiscussion,
      content: content,
      content_url: contentUrl,
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
    setIsLessonModalOpen(false);
    setIsNewLesson(false);
    toast.success(`Lesson "${lessonName}" added successfully`);
    resetForm();
  };

  const handleLessonContentSave = () => {
    if (isNewLesson) {
      handleSaveNewLesson();
      return;
    }

    if (!selectedLesson) return;
    
    const updatedSections = sections.map(section => {
      if (section.id === selectedLesson.sectionId) {
        const updatedLessons = section.lessons.map(lesson => {
          if (lesson.id === selectedLesson.lesson.id) {
            return { 
              ...lesson, 
              title: selectedLesson.lesson.title,
              type: selectedLesson.lesson.type,
              is_preview: selectedLesson.lesson.is_preview,
              is_draft: selectedLesson.lesson.is_draft,
              is_compulsory: selectedLesson.lesson.is_compulsory,
              enable_discussion: selectedLesson.lesson.enable_discussion,
              content: content,
              content_url: contentUrl
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
    sections,
    setSections,
    newSectionTitle,
    setNewSectionTitle,
    handleAddSection,
    handleDeleteSection,
    updateSectionTitle,

    handleAddLesson,
    handleDeleteLesson,
    changeLessonType,
    openLessonModal,
    
    isLessonModalOpen,
    setIsLessonModalOpen,
    isNewLesson,
    setIsNewLesson,

    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,

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

    isAddLessonSidebarOpen,
    setIsAddLessonSidebarOpen,
    currentSectionId,
    selectedLesson,
    setSelectedLesson,

    handleSaveNewLesson,
    handleLessonContentSave
  };
};

export type ContentOrganizationHook = ReturnType<typeof useContentOrganization>;
