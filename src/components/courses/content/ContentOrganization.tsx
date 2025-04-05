
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SectionItem from "./SectionItem";
import LessonEditModal from "./LessonEditModal";
import { Lesson } from "@/hooks/useCurriculum";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { LessonForm } from "@/components/courses/lesson-form";

interface Section {
  id: string;
  title: string;
  position: number;
  lessons: Lesson[];
}

interface ContentOrganizationProps {
  // Add props as needed
}

const ContentOrganization: React.FC<ContentOrganizationProps> = () => {
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
  
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragOverItem, setDragOverItem] = useState<any>(null);
  
  // State for lesson editing modal
  const [selectedLesson, setSelectedLesson] = useState<{
    sectionId: string;
    lesson: Lesson;
  } | null>(null);
  
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  
  // State for adding new lesson sidebar
  const [isAddLessonSidebarOpen, setIsAddLessonSidebarOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  
  // Content editor states
  const [content, setContent] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // New lesson form state
  const [lessonName, setLessonName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>('video');
  const [enableFreePreview, setEnableFreePreview] = useState(false);
  const [setAsDraft, setSetAsDraft] = useState(false);
  const [setAsCompulsory, setSetAsCompulsory] = useState(false);
  const [enableDiscussion, setEnableDiscussion] = useState(false);

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };
  
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection = {
      id: `section-${Date.now()}`,
      title: newSectionTitle,
      position: sections.length + 1,
      lessons: []
    };
    
    setSections([...sections, newSection]);
    setNewSectionTitle('');
  };
  
  const handleAddLesson = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setIsAddLessonSidebarOpen(true);
    resetLessonForm();
  };

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
    resetLessonForm();
  };

  const resetLessonForm = () => {
    setLessonName('');
    setSelectedType('video');
    setEnableFreePreview(false);
    setSetAsDraft(false);
    setSetAsCompulsory(false);
    setEnableDiscussion(false);
    setContent('');
    setContentUrl('');
  };
  
  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.filter((lesson) => lesson.id !== lessonId)
        };
      }
      return section;
    });
    
    setSections(updatedSections);
  };
  
  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          title: newTitle
        };
      }
      return section;
    });
    
    setSections(updatedSections);
    toast.success("Section title updated successfully");
  };
  
  const updateLessonTitle = (sectionId: string, lessonId: string, newTitle: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        const updatedLessons = section.lessons.map(lesson => {
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
  };
  
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
      // Reorder sections
      const updatedSections = [...sections];
      const draggedIndex = sections.findIndex(section => section.id === draggedItem.id);
      const targetIndex = sections.findIndex(section => section.id === targetId);
      
      if (draggedIndex === targetIndex) return;
      
      const draggedSection = updatedSections[draggedIndex];
      updatedSections.splice(draggedIndex, 1);
      updatedSections.splice(targetIndex, 0, draggedSection);
      
      // Update positions
      updatedSections.forEach((section, index) => {
        section.position = index + 1;
      });
      
      setSections(updatedSections);
      toast.success("Section reordered successfully");
    } else if (draggedItem.type === 'lesson' && type === 'lesson') {
      // Only allow reordering within the same section
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
            
            // Update positions
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
      // Could also implement drag between sections here
    }
    
    setDraggedItem(null);
  };

  const openLessonModal = (sectionId: string, lesson: Lesson) => {
    setSelectedLesson({ sectionId, lesson });
    setContent(lesson.content || '');
    setContentUrl(lesson.contentUrl || '');
    setIsLessonModalOpen(true);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file uploads here
    console.log("File selected:", e.target.files);
  };

  const updateSelectedLesson = (lesson: { sectionId: string; lesson: Lesson; } | null) => {
    setSelectedLesson(lesson);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Input
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          placeholder="Enter section title"
          className="flex-grow"
        />
        <Button onClick={handleAddSection}>Add Section</Button>
      </div>
      
      <div className="space-y-4">
        {sections.map((section) => (
          <SectionItem
            key={section.id}
            section={section}
            onDeleteSection={handleDeleteSection}
            onAddLesson={handleAddLesson}
            onDeleteLesson={handleDeleteLesson}
            onOpenLessonModal={openLessonModal}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            changeLessonType={changeLessonType}
            updateSectionTitle={updateSectionTitle}
          />
        ))}
      </div>
      
      {/* Lesson Content Edit Modal */}
      <LessonEditModal
        isOpen={isLessonModalOpen}
        setIsOpen={setIsLessonModalOpen}
        selectedLesson={selectedLesson}
        setSelectedLesson={updateSelectedLesson}
        content={content}
        setContent={setContent}
        contentUrl={contentUrl}
        setContentUrl={setContentUrl}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        handleLessonContentSave={handleLessonContentSave}
      />

      {/* Add New Lesson Sidebar */}
      <Sheet open={isAddLessonSidebarOpen} onOpenChange={setIsAddLessonSidebarOpen}>
        <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Lesson</SheetTitle>
          </SheetHeader>
          
          <div className="py-4">
            <LessonForm
              lessonName={lessonName}
              setLessonName={setLessonName}
              selectedType={selectedType}
              setSelectedType={setSelectedType!}
              enableFreePreview={enableFreePreview}
              setEnableFreePreview={setEnableFreePreview}
              setAsDraft={setAsDraft}
              setSetAsDraft={setSetAsDraft}
              setAsCompulsory={setAsCompulsory}
              setSetAsCompulsory={setSetAsCompulsory}
              enableDiscussion={enableDiscussion}
              setEnableDiscussion={setEnableDiscussion}
              contentUrl={contentUrl}
              setContentUrl={setContentUrl}
              content={content}
              setContent={setContent}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
            />
          </div>
          
          <SheetFooter className="pt-4 mt-6 border-t">
            <div className="flex justify-end gap-2 w-full">
              <Button variant="outline" onClick={() => setIsAddLessonSidebarOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveNewLesson} 
                disabled={!lessonName.trim() || !selectedType}
              >
                Save Lesson
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ContentOrganization;
