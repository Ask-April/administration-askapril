
import React from "react";
import { Trash2, FileText, Video, Book, Download, File, Code, Radio, HelpCircle, ClipboardList, FileAudio2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/hooks/useCurriculum";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface LessonItemProps {
  lesson: Lesson;
  sectionId: string;
  onDelete: (sectionId: string, lessonId: string) => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ 
  lesson, 
  sectionId,
  onDelete
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getIconForLessonType = (type?: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 mr-1.5" />;
      case "audio":
        return <FileAudio2 className="h-4 w-4 mr-1.5" />;
      case "e-book":
        return <Book className="h-4 w-4 mr-1.5" />;
      case "powerpoint":
        return <FileText className="h-4 w-4 mr-1.5" />;
      case "pdf":
        return <File className="h-4 w-4 mr-1.5" />;
      case "text":
        return <FileText className="h-4 w-4 mr-1.5" />;
      case "custom-code":
        return <Code className="h-4 w-4 mr-1.5" />;
      case "downloads":
        return <Download className="h-4 w-4 mr-1.5" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4 mr-1.5" />;
      case "survey":
        return <ClipboardList className="h-4 w-4 mr-1.5" />;
      case "live":
        return <Radio className="h-4 w-4 mr-1.5" />;
      default:
        return <FileText className="h-4 w-4 mr-1.5" />;
    }
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    onDelete(sectionId, lesson.id);
  };

  return (
    <>
      <div 
        className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-md group/lesson cursor-pointer hover:bg-accent/10"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center">
          {getIconForLessonType(lesson.type)}
          <span className="text-sm">{lesson.title}</span>
          {lesson.isPreview && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">Preview</span>
          )}
          {lesson.isDraft && (
            <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">Draft</span>
          )}
          {lesson.isCompulsory && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">Required</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 opacity-0 group-hover/lesson:opacity-100 transition-opacity"
          onClick={handleDeleteClick}
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
          <span className="sr-only">Delete lesson</span>
        </Button>
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{lesson.title}</AlertDialogTitle>
            <AlertDialogDescription>
              Type: {lesson.type}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction>Edit Lesson</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LessonItem;
