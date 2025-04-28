
import React from "react";
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil, Video, FileText, File, Book, Code, Download, HelpCircle, ClipboardList, Radio, FileAudio2, X } from "lucide-react";
import { lessonTypes } from "@/components/courses/lesson-editors";

interface LessonProps {
  id: string;
  title: string;
  type: string;
  position: number;
  content?: string;
  videoUrl?: string;
  contentUrl?: string;
  isPreview?: boolean;
  isDraft?: boolean;
  isCompulsory?: boolean;
  enableDiscussion?: boolean;
  duration?: number;
}

interface LessonItemProps {
  lesson: LessonProps;
  sectionId: string;
  onDeleteLesson: (sectionId: string, lessonId: string) => void;
  onOpenLessonModal: (sectionId: string, lesson: LessonProps) => void;
  onDragStart: (e: React.DragEvent, item: any, type: 'section' | 'lesson', sectionId?: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetId: string, type: 'section' | 'lesson', sectionId?: string) => void;
  changeLessonType: (sectionId: string, lessonId: string, newType: string) => void;
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
  changeLessonType
}) => {
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

  // Find the appropriate lesson type label
  const getLessonTypeLabel = (type: string | undefined) => {
    if (!type) return "Unknown";
    const foundType = lessonTypes.find(t => t.id === type);
    return foundType ? foundType.name : type;
  };

  const getLessonTypeColor = (type: string | undefined) => {
    switch (type) {
      case "video": return "bg-blue-100 text-blue-800";
      case "audio": return "bg-purple-100 text-purple-800";
      case "text": return "bg-green-100 text-green-800";
      case "quiz": return "bg-yellow-100 text-yellow-800";
      case "survey": return "bg-orange-100 text-orange-800";
      case "pdf": return "bg-red-100 text-red-800";
      case "e-book": return "bg-indigo-100 text-indigo-800";
      case "custom-code": return "bg-gray-100 text-gray-800";
      case "live": return "bg-pink-100 text-pink-800";
      default: return "bg-primary/10 text-primary";
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
        <div className="cursor-grab mr-2" onClick={(e) => e.stopPropagation()}>
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <span className="mr-2">{lesson.position + 1}.</span>
        
        <div className="flex items-center gap-1">
          {getIconForLessonType(lesson.type)}
          <span>{lesson.title}</span>
          
          {/* Display lesson type as simple tag */}
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getLessonTypeColor(lesson.type)}`}>
            {getLessonTypeLabel(lesson.type)}
          </span>
          
          {lesson.isPreview && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">Preview</span>
          )}
          {lesson.isDraft && (
            <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">Draft</span>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteLesson(sectionId, lesson.id);
        }}
        className="h-7 w-7 p-0"
      >
        <X className="h-3.5 w-3.5 text-destructive" />
      </Button>
    </div>
  );
};

export default LessonItem;
