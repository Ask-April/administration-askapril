
import React from "react";
import { Book, Video, FileText, Download, File, Code, Radio, HelpCircle, ClipboardList, FileAudio2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface LessonType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export const lessonTypes: LessonType[] = [
  {
    id: "video",
    name: "Video",
    icon: <Video className="h-5 w-5" />,
    description: "Upload or embed video content"
  },
  {
    id: "audio",
    name: "Audio",
    icon: <FileAudio2 className="h-5 w-5" />,
    description: "Upload or embed audio content"
  },
  {
    id: "e-book",
    name: "E-book",
    icon: <Book className="h-5 w-5" />,
    description: "Upload e-book materials"
  },
  {
    id: "powerpoint",
    name: "PowerPoint",
    icon: <FileText className="h-5 w-5" />,
    description: "Upload presentation slides"
  },
  {
    id: "pdf",
    name: "PDF",
    icon: <File className="h-5 w-5" />,
    description: "Upload PDF documents"
  },
  {
    id: "text",
    name: "Rich Text",
    icon: <FileText className="h-5 w-5" />,
    description: "Create formatted text content"
  },
  {
    id: "custom-code",
    name: "Custom Code",
    icon: <Code className="h-5 w-5" />,
    description: "Add code snippets or examples"
  },
  {
    id: "downloads",
    name: "Downloads",
    icon: <Download className="h-5 w-5" />,
    description: "Add downloadable resources"
  },
  {
    id: "quiz",
    name: "Quiz",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Create an interactive quiz"
  },
  {
    id: "survey",
    name: "Survey",
    icon: <ClipboardList className="h-5 w-5" />,
    description: "Add feedback surveys"
  },
  {
    id: "live",
    name: "Live",
    icon: <Radio className="h-5 w-5" />,
    description: "Set up live sessions"
  }
];

interface LessonTypeSelectorProps {
  selectedType: string | null;
  onSelectType: (type: string) => void;
}

const LessonTypeSelector: React.FC<LessonTypeSelectorProps> = ({ selectedType, onSelectType }) => {
  return (
    <div className="space-y-2">
      <Label>Lesson Type</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <TooltipProvider>
          {lessonTypes.map(type => (
            <Tooltip key={type.id}>
              <TooltipTrigger asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  className={`h-auto flex-col py-3 ${selectedType === type.id ? 'border-primary bg-primary/10' : ''}`} 
                  onClick={() => onSelectType(type.id)}
                >
                  <div className="mb-1">{type.icon}</div>
                  <span className="text-xs">{type.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-sm">{type.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default LessonTypeSelector;
