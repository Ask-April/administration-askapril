
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  
  const handleDragStart = (e: React.DragEvent, item: any, type: 'section' | 'lesson', sectionId?: string) => {
    setDraggedItem({ ...item, type, sectionId });
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, targetId: string, type: 'section' | 'lesson', sectionId?: string) => {
    e.preventDefault();
    
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
      // Reorder lessons within the same section or move between sections
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
      } else {
        // Move lesson between sections
        const updatedSections = sections.map(section => {
          if (section.id === draggedItem.sectionId) {
            // Remove from original section
            return {
              ...section,
              lessons: section.lessons.filter((lesson) => lesson.id !== draggedItem.id)
            };
          }
          if (section.id === sectionId) {
            // Add to target section
            const lessonToAdd = sections
              .find(s => s.id === draggedItem.sectionId)
              ?.lessons.find((l) => l.id === draggedItem.id);
            
            if (lessonToAdd) {
              const updatedLessons = [...section.lessons, { ...lessonToAdd, position: section.lessons.length + 1 }];
              return { ...section, lessons: updatedLessons };
            }
          }
          return section;
        });
        
        setSections(updatedSections);
      }
    }
    
    setDraggedItem(null);
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
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, section.id, 'section')}
            className="border rounded-md bg-card"
          >
            <div className="p-4 flex items-center justify-between bg-muted">
              <h3 className="font-medium cursor-grab">
                {section.position}. {section.title}
              </h3>
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
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, lesson.id, 'lesson', section.id)}
                      className="p-2 border rounded-md bg-background flex items-center justify-between cursor-grab"
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{lesson.position}.</span>
                        <span>{lesson.title}</span>
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {lesson.type}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLesson(section.id, lesson.id)}
                        className="text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentOrganization;
