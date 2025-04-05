
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X, GripVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { lessonTypes } from "@/components/courses/lesson-editors/LessonTypeSelector";
import ContentEditor from "@/components/courses/lesson-editors/ContentEditor";

interface Section {
  id: string;
  title: string;
  position: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: string;
  position: number;
  content?: string;
  contentUrl?: string;
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
  const [editingSection, setEditingSection] = useState<{ id: string, title: string } | null>(null);
  const [editingLesson, setEditingLesson] = useState<{ sectionId: string, lessonId: string, title: string } | null>(null);
  
  // New state for lesson editing modal
  const [selectedLesson, setSelectedLesson] = useState<{
    sectionId: string;
    lesson: Lesson;
  } | null>(null);
  
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  
  // Content editor states
  const [content, setContent] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
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
  
  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };
  
  const handleAddLesson = (sectionId: string, lessonType: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        const newLesson = {
          id: `lesson-${Date.now()}`,
          title: `New ${lessonType} Lesson`,
          type: lessonType.toLowerCase(),
          position: section.lessons.length + 1
        };
        return {
          ...section,
          lessons: [...section.lessons, newLesson]
        };
      }
      return section;
    });
    
    setSections(updatedSections);
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
  
  const startEditingSection = (sectionId: string, title: string) => {
    setEditingSection({ id: sectionId, title });
  };
  
  const saveEditingSection = () => {
    if (!editingSection) return;
    
    const updatedSections = sections.map(section => {
      if (section.id === editingSection.id) {
        return { ...section, title: editingSection.title };
      }
      return section;
    });
    
    setSections(updatedSections);
    setEditingSection(null);
  };
  
  const startEditingLesson = (sectionId: string, lessonId: string, title: string) => {
    setEditingLesson({ sectionId, lessonId, title });
  };
  
  const saveEditingLesson = () => {
    if (!editingLesson) return;
    
    const updatedSections = sections.map(section => {
      if (section.id === editingLesson.sectionId) {
        const updatedLessons = section.lessons.map(lesson => {
          if (lesson.id === editingLesson.lessonId) {
            return { ...lesson, title: editingLesson.title };
          }
          return lesson;
        });
        
        return { ...section, lessons: updatedLessons };
      }
      return section;
    });
    
    setSections(updatedSections);
    setEditingLesson(null);
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
    
    // Add a visual cue that the item is being dragged
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add('opacity-50');
    }
    
    // Set the drag image
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };
  
  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('opacity-50');
    }
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
      }
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
    setIsLessonModalOpen(false);
    setSelectedLesson(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file uploads here
    console.log("File selected:", e.target.files);
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
          <div 
            key={section.id}
            draggable
            onDragStart={(e) => handleDragStart(e, section, 'section')}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, section.id, 'section')}
            className="border rounded-md bg-card transition-all"
          >
            <div className="p-4 flex items-center justify-between bg-muted">
              <div className="flex items-center">
                <div className="cursor-grab mr-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
                
                {editingSection && editingSection.id === section.id ? (
                  <div className="flex items-center gap-2">
                    <Input 
                      value={editingSection.title}
                      onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                      className="h-8 w-60"
                      autoFocus
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={saveEditingSection}
                      className="h-8 w-8"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => setEditingSection(null)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <h3 
                    className="font-medium flex items-center gap-2 cursor-pointer"
                    onClick={() => startEditingSection(section.id, section.title)}
                  >
                    <span>{section.position}. {section.title}</span>
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </h3>
                )}
              </div>
              <div className="space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddLesson(section.id, 'Video')}
                >
                  Add Lesson
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteSection(section.id)}
                  className="text-destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="p-2">
              {section.lessons.length === 0 ? (
                <p className="text-sm text-muted-foreground p-2">
                  No lessons yet. Click "Add Lesson" to create one.
                </p>
              ) : (
                <div className="space-y-1">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lesson, 'lesson', section.id)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, lesson.id, 'lesson', section.id)}
                      className="p-2 border rounded-md bg-background flex items-center justify-between cursor-pointer hover:bg-accent/10 transition-colors"
                      onClick={() => openLessonModal(section.id, lesson)}
                    >
                      <div className="flex items-center">
                        <div className="cursor-grab mr-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </div>
                        
                        <span className="mr-2">{lesson.position}.</span>
                        {editingLesson && editingLesson.lessonId === lesson.id ? (
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <Input 
                              value={editingLesson.title}
                              onChange={(e) => setEditingLesson({...editingLesson, title: e.target.value})}
                              className="h-7 w-48"
                              autoFocus
                            />
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={saveEditingLesson}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => setEditingLesson(null)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <span 
                            className="flex items-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditingLesson(section.id, lesson.id, lesson.title);
                            }}
                          >
                            {lesson.title}
                            <Pencil className="h-3 w-3 text-muted-foreground" />
                          </span>
                        )}
                        
                        <Popover>
                          <PopoverTrigger asChild>
                            <span 
                              className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {lesson.type}
                            </span>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 p-2" onClick={(e) => e.stopPropagation()}>
                            <div className="grid grid-cols-2 gap-1">
                              {lessonTypes.map((type) => (
                                <Button
                                  key={type.id}
                                  size="sm"
                                  variant={lesson.type === type.id ? "secondary" : "ghost"}
                                  className="justify-start h-8 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    changeLessonType(section.id, lesson.id, type.id);
                                  }}
                                >
                                  <div className="mr-1.5 h-3.5 w-3.5">{type.icon}</div>
                                  {type.name}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLesson(section.id, lesson.id);
                        }}
                        className="h-7 w-7 p-0 text-destructive"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Lesson Content Edit Modal */}
      <Dialog open={isLessonModalOpen} onOpenChange={setIsLessonModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedLesson ? (
                <>Edit Lesson: {selectedLesson.lesson.title}</>
              ) : (
                <>Edit Lesson</>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedLesson && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Lesson Title</label>
                <Input 
                  value={selectedLesson.lesson.title}
                  onChange={(e) => {
                    if (selectedLesson) {
                      setSelectedLesson({
                        ...selectedLesson,
                        lesson: { ...selectedLesson.lesson, title: e.target.value }
                      });
                    }
                  }}
                  className="w-full"
                />
              </div>
              
              <ContentEditor
                selectedType={selectedLesson.lesson.type}
                contentUrl={contentUrl}
                onContentUrlChange={setContentUrl}
                content={content}
                onContentChange={setContent}
                onFileChange={handleFileChange}
                fileInputRef={fileInputRef}
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLessonModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLessonContentSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentOrganization;
