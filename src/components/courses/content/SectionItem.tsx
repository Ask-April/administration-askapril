
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X, GripVertical, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import LessonItem from "./LessonItem";
import { CurriculumSection } from "../wizard/types";

interface SectionItemProps {
  section: CurriculumSection;
  onDeleteSection: (sectionId: string) => void;
  onAddLesson: (sectionId: string) => void;
  onDeleteLesson: (sectionId: string, lessonId: string) => void;
  onOpenLessonModal: (sectionId: string, lesson: any) => void;
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
  const [expanded, setExpanded] = useState<boolean>(true);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const startEditingSection = (sectionId: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSection({ id: sectionId, title });
  };
  
  const saveEditingSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editingSection) return;
    
    // Call the parent component's function to update the title
    if (updateSectionTitle) {
      updateSectionTitle(editingSection.id, editingSection.title);
    }
    
    setEditingSection(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      saveEditingSection(e as unknown as React.MouseEvent);
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
      <div 
        className="p-4 flex items-center justify-between bg-muted cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <div className="cursor-grab mr-2" onClick={e => e.stopPropagation()}>
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          
          {editingSection && editingSection.id === section.id ? (
            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
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
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingSection(null);
                }}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="font-medium flex items-center gap-2" 
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
              <span>{section.position + 1}. {section.title}</span>
              <Pencil 
                className="h-3.5 w-3.5 text-muted-foreground cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  startEditingSection(section.id, section.title, e);
                }}
              />
            </div>
          )}
        </div>
        <div className="space-x-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddLesson(section.id);
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Lesson
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSection(section.id);
            }}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className={`p-2 ${expanded ? 'block' : 'hidden'}`}>
        {section.lessons.length === 0 ? (
          <p className="text-sm text-muted-foreground p-2">
            No lessons yet. Click "Add Lesson" to create one.
          </p>
        ) : (
          <div className="space-y-1">
            {section.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                sectionId={section.id}
                onDeleteLesson={onDeleteLesson}
                onOpenLessonModal={onOpenLessonModal}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                changeLessonType={changeLessonType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionItem;
