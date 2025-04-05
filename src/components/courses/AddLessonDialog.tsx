
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Video, FileAudio2, Book, FileText, File, 
  Code, Download, HelpCircle, ClipboardList, Globe, Radio
} from "lucide-react";
import { useAddLessonForm, LessonFormData } from "@/hooks/useAddLessonForm";

interface AddLessonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLesson: (lesson: LessonFormData) => void;
}

const AddLessonDialog: React.FC<AddLessonDialogProps> = ({
  isOpen,
  onClose,
  onAddLesson
}) => {
  const {
    lessonName,
    setLessonName,
    selectedType,
    setSelectedType,
    enableFreePreview,
    setEnableFreePreview,
    setAsDraft,
    setSetAsDraft,
    setAsCompulsory,
    setSetAsCompulsory,
    enableDiscussion,
    setEnableDiscussion,
    contentUrl,
    setContentUrl,
    content,
    setContent,
    fileInputRef,
    handleFileChange,
    handleSubmit,
    resetForm
  } = useAddLessonForm(onAddLesson);
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const lessonTypes = [
    { id: "video", name: "Video", icon: <Video className="h-6 w-6" /> },
    { id: "audio", name: "Audio", icon: <FileAudio2 className="h-6 w-6" /> },
    { id: "e-book", name: "E-book", icon: <Book className="h-6 w-6" /> },
    { id: "powerpoint", name: "PowerPoint", icon: <FileText className="h-6 w-6" /> },
    { id: "pdf", name: "PDF", icon: <File className="h-6 w-6" /> },
    { id: "text", name: "Text", icon: <FileText className="h-6 w-6" /> },
    { id: "custom-code", name: "Custom Code", icon: <Code className="h-6 w-6" /> },
    { id: "downloads", name: "Downloads", icon: <Download className="h-6 w-6" /> },
    { id: "quiz", name: "Quiz", icon: <HelpCircle className="h-6 w-6" /> },
    { id: "survey", name: "Survey", icon: <ClipboardList className="h-6 w-6" /> },
    { id: "scorm", name: "SCORM/HTML", icon: <Globe className="h-6 w-6" /> },
    { id: "assignment", name: "Assignment", icon: <ClipboardList className="h-6 w-6" /> },
    { id: "live", name: "Live", icon: <Radio className="h-6 w-6" /> }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">Add New Lesson</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="lessonName" className="text-base font-medium">Lesson Name</Label>
            <Input
              id="lessonName"
              placeholder="Untitled lesson"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="h-12"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="enableFreePreview" 
                checked={enableFreePreview}
                onCheckedChange={(checked) => setEnableFreePreview(checked === true)}
              />
              <Label htmlFor="enableFreePreview">Enable Free Preview</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="setAsDraft" 
                checked={setAsDraft}
                onCheckedChange={(checked) => setSetAsDraft(checked === true)}
              />
              <Label htmlFor="setAsDraft">Set as Draft</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="setAsCompulsory" 
                checked={setAsCompulsory}
                onCheckedChange={(checked) => setSetAsCompulsory(checked === true)}
              />
              <Label htmlFor="setAsCompulsory">Set as Compulsory</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="enableDiscussion" 
                checked={enableDiscussion}
                onCheckedChange={(checked) => setEnableDiscussion(checked === true)}
              />
              <Label htmlFor="enableDiscussion">Enable Discussion</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-base font-medium">Add Content</Label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {lessonTypes.slice(0, 6).map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={selectedType === type.id ? "secondary" : "outline"}
                  onClick={() => setSelectedType(type.id)}
                  className={`h-24 flex-col py-3 ${selectedType === type.id ? 'border-primary bg-primary/10' : ''}`}
                >
                  <div className="mb-2">{type.icon}</div>
                  <span className="text-sm">{type.name}</span>
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
              {lessonTypes.slice(6, 12).map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={selectedType === type.id ? "secondary" : "outline"}
                  onClick={() => setSelectedType(type.id)}
                  className={`h-24 flex-col py-3 ${selectedType === type.id ? 'border-primary bg-primary/10' : ''}`}
                >
                  <div className="mb-2">{type.icon}</div>
                  <span className="text-sm">{type.name}</span>
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
              {lessonTypes.slice(12).map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={selectedType === type.id ? "secondary" : "outline"}
                  onClick={() => setSelectedType(type.id)}
                  className={`h-24 flex-col py-3 ${selectedType === type.id ? 'border-primary bg-primary/10' : ''}`}
                >
                  <div className="mb-2">{type.icon}</div>
                  <span className="text-sm">{type.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 p-6 border-t">
          <DialogClose asChild>
            <Button variant="outline">Delete Lesson</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={!lessonName.trim()} className="px-8">
            Save Lesson
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonDialog;
