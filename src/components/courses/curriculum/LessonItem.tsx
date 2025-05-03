
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";

interface LessonProps {
  id: string;
  title: string;
  type?: string;
  position?: number;
}

interface LessonItemProps {
  lesson: LessonProps;
  sectionId: string;
  onDelete: () => void;
  onOpen: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onChangeType: (newType: string) => void;
}

const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  onDelete,
  onOpen,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop
}) => {
  return (
    <div
      className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent/5"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex items-center">
        <span className="mr-2">{lesson.position !== undefined ? lesson.position + 1 : ''}</span>
        <span>{lesson.title}</span>
        {lesson.type && (
          <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
            {lesson.type}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-1">
        <Button size="sm" variant="ghost" onClick={onOpen} className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button size="sm" variant="ghost" onClick={onDelete} className="h-8 w-8 p-0">
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default LessonItem;
