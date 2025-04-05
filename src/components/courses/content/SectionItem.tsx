
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X, GripVertical } from "lucide-react";
import { Lesson } from "@/hooks/useCurriculum";
import LessonItem from "./LessonItem";

interface Section {
  id: string;
  title: string;
  position: number;
  lessons: Lesson[];
}

interface SectionItemProps {
  section: Section;
  onDeleteSection: (sectionId: string) => void;
  onAddLesson: (sectionId: string, lessonType: string) => void;
  onDeleteLesson: (sectionId: string, lessonId: string) => void;
  onOpenLessonModal: (sectionId: string, lesson: Lesson) => void;
  onDragStart: (e: React.DragEvent, item: any, type: 'section' | 'lesson', sectionId?: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetId: string, type: 'section' | 'lesson', sectionId?: string) => void;
  changeLessonType: (sectionId: string, lessonId: string, newType: string) => void;
  updateSectionTitle?: (sectionId: string, newTitle: string) => void;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  onDeleteSection,
  onAddLesson,
  onDeleteLesson,
  onOpenLessonModal,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  changeLessonType,
  updateSectionTitle
}) => {
  const [editingSection, setEditingSection] = useState<{ id: string, title: string } | null>(null);
  
  const startEditingSection = (sectionId: string, title: string) => {
    setEditingSection({ id: sectionId, title });
  };
  
  const saveEditingSection = () => {
    if (!editingSection) return;
    
    // Call the parent component's function to update the title
    if (updateSectionTitle) {
      updateSectionTitle(editingSection.id, editingSection.title);
    }
    
    setEditingSection(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEditingSection();
    } else if (e.key === 'Escape') {
      setEditingSection(null);
    }
  };
  
  return (
    <div 
      key={section.id}
      draggable
      onDragStart={(e) => onDragStart(e, section, 'section')}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, section.id, 'section')}
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
                onKeyDown={handleKeyDown}
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
            onClick={() => onAddLesson(section.id, 'Video')}
          >
            Add Lesson
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteSection(section.id)}
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
              <LessonItem
                key={lesson.id}
                lesson={{...lesson, type: lesson.type || 'video'}} 
                sectionId={section.id}
                onDeleteLesson={onDeleteLesson}
                onOpenLessonModal={onOpenLessonModal}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                changeLessonType={changeLessonType}
                updateLessonTitle={(lessonId, newTitle) => {
                  // This will be handled by the parent component
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionItem;
