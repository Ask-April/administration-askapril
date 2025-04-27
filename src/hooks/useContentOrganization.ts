
import { useSections } from "./content/useSections";
import { useLessons } from "./content/useLessons";
import { useDragAndDrop } from "./content/useDragAndDrop";
import { useLessonForm } from "./content/useLessonForm";
import { toast } from "sonner";

export const useContentOrganization = () => {
  const {
    sections,
    setSections,
    handleAddSection,
    handleDeleteSection,
    updateSectionTitle
  } = useSections();

  const {
    isAddLessonSidebarOpen,
    setIsAddLessonSidebarOpen,
    currentSectionId,
    setCurrentSectionId,
    selectedLesson,
    setSelectedLesson,
    handleAddLesson,
    handleDeleteLesson,
    updateLessonTitle,
    changeLessonType
  } = useLessons(sections, setSections);

  const {
    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = useDragAndDrop(sections, setSections);

  const {
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
    resetForm
  } = useLessonForm(sections, setSections);

  const handleSaveNewLesson = () => {
    if (!currentSectionId || !lessonName.trim() || !selectedType) return;

    const section = sections.find(s => s.id === currentSectionId);
    if (!section) return;

    const newLesson = {
      id: `lesson-${Date.now()}`,
      title: lessonName,
      type: selectedType,
      isPreview: enableFreePreview,
      isDraft: setAsDraft,
      isCompulsory: setAsCompulsory,
      enableDiscussion: enableDiscussion,
      content: content,
      contentUrl: contentUrl,
      position: section.lessons.length + 1
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
    setIsAddLessonSidebarOpen(false);
    setSelectedLesson(null);
  };

  return {
    // Section management
    sections,
    setSections,
    handleAddSection,
    handleDeleteSection,
    updateSectionTitle,

    // Lesson management
    handleAddLesson,
    handleDeleteLesson,
    updateLessonTitle,
    changeLessonType,

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
