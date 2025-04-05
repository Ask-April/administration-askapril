
import React from "react";
import { Book, Video, FileText, Download, File, Code, Radio, HelpCircle, ClipboardList, FileAudio2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export interface LessonType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const lessonTypes: LessonType[] = [
  {
    id: "video",
    name: "Video",
    icon: <Video className="h-5 w-5" />
  },
  {
    id: "audio",
    name: "Audio",
    icon: <FileAudio2 className="h-5 w-5" />
  },
  {
    id: "e-book",
    name: "E-book",
    icon: <Book className="h-5 w-5" />
  },
  {
    id: "powerpoint",
    name: "PowerPoint",
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: "pdf",
    name: "PDF",
    icon: <File className="h-5 w-5" />
  },
  {
    id: "text",
    name: "Rich Text",
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: "custom-code",
    name: "Custom Code",
    icon: <Code className="h-5 w-5" />
  },
  {
    id: "downloads",
    name: "Downloads",
    icon: <Download className="h-5 w-5" />
  },
  {
    id: "quiz",
    name: "Quiz",
    icon: <HelpCircle className="h-5 w-5" />
  },
  {
    id: "survey",
    name: "Survey",
    icon: <ClipboardList className="h-5 w-5" />
  },
  {
    id: "live",
    name: "Live",
    icon: <Radio className="h-5 w-5" />
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
      <div className="grid grid-cols-3 gap-2">
        {lessonTypes.map(type => (
          <Button 
            key={type.id} 
            type="button" 
            variant="outline" 
            className={`h-auto flex-col py-3 ${selectedType === type.id ? 'border-primary bg-primary/10' : ''}`} 
            onClick={() => onSelectType(type.id)}
          >
            <div className="mb-1">{type.icon}</div>
            <span className="text-xs">{type.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LessonTypeSelector;
