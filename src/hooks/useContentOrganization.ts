
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { CourseSection, CourseLesson } from "@/services/types";

export const useContentOrganization = (
  initialSections: CourseSection[],
  updateSections: (sections: CourseSection[]) => void
) => {
  // Clone the initialSections to avoid direct mutation
  const [sections, setSections] = useState<CourseSection[]>(() => [...initialSections]);
  const [newSectionTitle, setNewSectionTitle] = useState<string>("");
  const [isAddLessonSidebarOpen, setIsAddLessonSidebarOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{
    sectionId: string;
    lesson: CourseLesson;
  } | null>(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragOverItem, setDragOverItem] = useState<any>(null);
  const [dragType, setDragType] = useState<'section' | 'lesson' | null>(null);
  
  // Previous sections ref to avoid unnecessary updates
  const prevSectionsRef = useRef<CourseSection[]>([]);

  // Handle updates from parent properly - only if they're truly different
  useEffect(() => {
    // Deep comparison isn't ideal for performance, but it's simple and effective
    const sectionsChanged = 
      JSON.stringify(initialSections) !== JSON.stringify(prevSectionsRef.current);
    
    if (sectionsChanged) {
      setSections([...initialSections]);
      prevSectionsRef.current = [...initialSections];
    }
  }, [initialSections]);

  // Notify parent component about sections changes
  useEffect(() => {
    const sectionsChanged = 
      JSON.stringify(sections) !== JSON.stringify(prevSectionsRef.current);
    
    if (sectionsChanged && sections.length > 0) {
      updateSections([...sections]);
      prevSectionsRef.current = [...sections];
    }
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
    
    const newSection: CourseSection = {
      id: crypto.randomUUID(),
      title: newSectionTitle.trim(),
      position: 0, // Position 0 means it goes at the top
      lessons: [],
      course_id: sections[0]?.course_id || ''
    };
    
    // Update positions of existing sections
    const updatedSections = sections.map(section => ({
      ...section,
      position: section.position + 1
    }));
    
    // Add the new section at the beginning and update state in a single operation
    setSections([newSection, ...updatedSections]);
    setNewSectionTitle('');
    toast.success(`Section "${newSectionTitle}" added successfully`);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (window.confirm("Are you sure you want to delete this section and all its lessons?")) {
      // Get the deleted section's position
      const deletedSection = sections.find(section => section.id === sectionId);
      const deletedPosition = deletedSection?.position || 0;
      
      // Remove the section and update positions of remaining sections
      const filteredSections = sections.filter(section => section.id !== sectionId);
      const updatedSections = filteredSections.map(section => {
        if (section.position > deletedPosition) {
          return { ...section, position: section.position - 1 };
        }
        return section;
      });
      
      setSections(updatedSections);
      toast.success("Section deleted successfully");
    }
  };

  const handleAddLesson = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    resetForm();
    setIsAddLessonSidebarOpen(true);
  };

  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          // Get the deleted lesson's position
          const deletedLesson = section.lessons.find(lesson => lesson.id === lessonId);
          const deletedPosition = deletedLesson?.position || 0;
          
          // Remove the lesson and update positions of remaining lessons
          const filteredLessons = section.lessons.filter(lesson => lesson.id !== lessonId);
          const updatedLessons = filteredLessons.map(lesson => {
            if (lesson.position > deletedPosition) {
              return { ...lesson, position: lesson.position - 1 };
            }
            return lesson;
          });
          
          return {
            ...section,
            lessons: updatedLessons
          };
        }
        return section;
      });
      
      setSections(updatedSections);
      toast.success("Lesson deleted successfully");
    }
  };

  const openLessonModal = (sectionId: string, lesson: CourseLesson) => {
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

    // Find the section to ensure we're working with the most current data
    const sectionToUpdate = sections.find(s => s.id === currentSectionId);
    if (!sectionToUpdate) return;

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
      position: sectionToUpdate.lessons.length
    };

    // Create a new array to avoid mutation issues
    const updatedSections = sections.map(section => {
      if (section.id === currentSectionId) {
        return {
          ...section,
          lessons: [...section.lessons, newLesson]
        };
      }
      return section;
    });
    
    // Update state with the new array
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
    handleLessonContentSave,
    resetForm
  };
};

export type ContentOrganizationHook = ReturnType<typeof useContentOrganization>;
