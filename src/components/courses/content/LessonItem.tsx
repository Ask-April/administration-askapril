
import React, { useState } from "react";
import { Pencil, Check, X, GripVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lessonTypes } from "@/components/courses/lesson-editors/LessonTypeSelector";

interface Lesson {
  id: string;
  title: string;
  type: string;
  position: number;
  content?: string;
  contentUrl?: string;
}

interface LessonItemProps {
  lesson: Lesson;
  sectionId: string;
  onDeleteLesson: (sectionId: string, lessonId: string) => void;
  onOpenLessonModal: (sectionId: string, lesson: Lesson) => void;
  onDragStart: (e: React.DragEvent, item: any, type: 'section' | 'lesson', sectionId?: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetId: string, type: 'section' | 'lesson', sectionId?: string) => void;
  changeLessonType: (sectionId: string, lessonId: string, newType: string) => void;
  updateLessonTitle?: (lessonId: string, newTitle: string) => void;
}

const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  sectionId,
  onDeleteLesson,
  onOpenLessonModal,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  changeLessonType,
  updateLessonTitle
}) => {
  const [editingLesson, setEditingLesson] = useState<{ sectionId: string, lessonId: string, title: string } | null>(null);
  
  const startEditingLesson = (sectionId: string, lessonId: string, title: string) => {
    setEditingLesson({ sectionId, lessonId, title });
  };
  
  const saveEditingLesson = () => {
    if (!editingLesson) return;
    
    // Call the parent component's function to update the title
    if (updateLessonTitle) {
      updateLessonTitle(editingLesson.lessonId, editingLesson.title);
    }
    
    setEditingLesson(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEditingLesson();
    } else if (e.key === 'Escape') {
      setEditingLesson(null);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lesson, 'lesson', sectionId)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, lesson.id, 'lesson', sectionId)}
      className="p-2 border rounded-md bg-background flex items-center justify-between cursor-pointer hover:bg-accent/10 transition-colors"
      onClick={() => onOpenLessonModal(sectionId, lesson)}
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
              onKeyDown={handleKeyDown}
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
              startEditingLesson(sectionId, lesson.id, lesson.title);
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
                    changeLessonType(sectionId, lesson.id, type.id);
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
          onDeleteLesson(sectionId, lesson.id);
        }}
        className="h-7 w-7 p-0 text-destructive"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default LessonItem;
