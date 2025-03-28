
import React, { useState } from "react";
import { 
  Book, 
  Video, 
  FileText, 
  Download, 
  File, 
  Code, 
  Radio, 
  HelpCircle, 
  ClipboardList, 
  FileAudio2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface LessonType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface AddLessonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLesson: (lesson: {
    id: string;
    title: string;
    type?: string;
    isPreview?: boolean;
    isDraft?: boolean;
    isCompulsory?: boolean;
    enableDiscussion?: boolean;
  }) => void;
}

const lessonTypes: LessonType[] = [
  { id: "video", name: "Video", icon: <Video className="h-5 w-5" /> },
  { id: "audio", name: "Audio", icon: <FileAudio2 className="h-5 w-5" /> },
  { id: "e-book", name: "E-book", icon: <Book className="h-5 w-5" /> },
  { id: "powerpoint", name: "PowerPoint", icon: <FileText className="h-5 w-5" /> },
  { id: "pdf", name: "PDF", icon: <File className="h-5 w-5" /> },
  { id: "text", name: "Text", icon: <FileText className="h-5 w-5" /> },
  { id: "custom-code", name: "Custom Code", icon: <Code className="h-5 w-5" /> },
  { id: "downloads", name: "Downloads", icon: <Download className="h-5 w-5" /> },
  { id: "quiz", name: "Quiz", icon: <HelpCircle className="h-5 w-5" /> },
  { id: "survey", name: "Survey", icon: <ClipboardList className="h-5 w-5" /> },
  { id: "live", name: "Live", icon: <Radio className="h-5 w-5" /> },
];

const AddLessonDialog: React.FC<AddLessonDialogProps> = ({ 
  isOpen, 
  onClose, 
  onAddLesson 
}) => {
  const [lessonName, setLessonName] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [enableFreePreview, setEnableFreePreview] = useState(false);
  const [setAsDraft, setSetAsDraft] = useState(false);
  const [setAsCompulsory, setSetAsCompulsory] = useState(false);
  const [enableDiscussion, setEnableDiscussion] = useState(false);

  const handleSubmit = () => {
    if (!lessonName.trim()) return;
    
    onAddLesson({
      id: Date.now().toString(),
      title: lessonName,
      type: selectedType || undefined,
      isPreview: enableFreePreview,
      isDraft: setAsDraft,
      isCompulsory: setAsCompulsory,
      enableDiscussion,
    });
    
    resetForm();
  };

  const resetForm = () => {
    setLessonName("");
    setSelectedType(null);
    setEnableFreePreview(false);
    setSetAsDraft(false);
    setSetAsCompulsory(false);
    setEnableDiscussion(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Lesson</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="lesson-name">Lesson Name</Label>
            <Input
              id="lesson-name"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              placeholder="Untitled lesson"
              className="mt-1.5"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="free-preview" 
                checked={enableFreePreview}
                onCheckedChange={(checked) => setEnableFreePreview(!!checked)}
              />
              <Label htmlFor="free-preview">Enable Free Preview</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="as-draft" 
                checked={setAsDraft}
                onCheckedChange={(checked) => setSetAsDraft(!!checked)}
              />
              <Label htmlFor="as-draft">Set as Draft</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="as-compulsory" 
                checked={setAsCompulsory}
                onCheckedChange={(checked) => setSetAsCompulsory(!!checked)}
              />
              <Label htmlFor="as-compulsory">Set as Compulsory</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="enable-discussion" 
                checked={enableDiscussion}
                onCheckedChange={(checked) => setEnableDiscussion(!!checked)}
              />
              <Label htmlFor="enable-discussion">Enable Discussion</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Add Content</Label>
            <div className="grid grid-cols-3 gap-3">
              {lessonTypes.map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant="outline"
                  className={`h-auto flex-col py-3 ${selectedType === type.id ? 'border-primary bg-primary/10' : ''}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="mb-1">{type.icon}</div>
                  <span className="text-xs">{type.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSubmit}
            disabled={!lessonName.trim()}
          >
            Save Lesson
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonDialog;
