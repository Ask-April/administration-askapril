import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LessonItem from "./LessonItem";
import { Section } from "@/hooks/useCurriculum";

interface SectionCardProps {
  section: Section;
  onDeleteSection: (sectionId: string) => void;
  onAddLesson: (section: Section) => void;
  onDeleteLesson: (sectionId: string, lessonId: string) => void;
  onOpenLessonModal: (lessonId: string) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  changeLessonType: (lessonId: string, newType: string) => void;
  updateLessonTitle: (lessonId: string, newTitle: string) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
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
  updateLessonTitle
}) => {
  return (
    <Card className="relative group">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">{section.title}</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onDeleteSection(section.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="sr-only">Delete section</span>
          </Button>
        </div>
        
        <div className="space-y-2 pl-4 border-l-2 border-muted">
          {section.lessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              sectionId={section.id}
              onDelete={onDeleteLesson}
              onOpenLessonModal={onOpenLessonModal}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              changeLessonType={changeLessonType}
              updateLessonTitle={updateLessonTitle}
            />
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => onAddLesson(section)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Lesson
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
