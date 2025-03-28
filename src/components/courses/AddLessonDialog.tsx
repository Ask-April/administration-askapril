
import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LessonTypeSelector, ContentEditor, lessonTypes } from "./lesson-editors";
import { supabase } from "@/integrations/supabase/client";

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
    content?: string;
    contentUrl?: string;
  }) => void;
}

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
  const [contentUrl, setContentUrl] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = async () => {
    if (!lessonName.trim()) return;
    
    let finalContentUrl = contentUrl;
    let finalContent = content;
    
    // Handle file upload if applicable
    if (file && ["video", "audio", "e-book", "powerpoint", "pdf", "downloads"].includes(selectedType || "")) {
      try {
        const bucketId = getBucketForFileType(selectedType || "");
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from(bucketId)
          .upload(fileName, file);
          
        if (error) throw error;
        
        const { data: urlData } = await supabase.storage
          .from(bucketId)
          .getPublicUrl(fileName);
          
        finalContentUrl = urlData.publicUrl;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    
    onAddLesson({
      id: Date.now().toString(),
      title: lessonName,
      type: selectedType || undefined,
      isPreview: enableFreePreview,
      isDraft: setAsDraft,
      isCompulsory: setAsCompulsory,
      enableDiscussion,
      content: finalContent || undefined,
      contentUrl: finalContentUrl || undefined
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
    setContentUrl("");
    setContent("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const getBucketForFileType = (type: string): string => {
    switch (type) {
      case "video":
        return "course_videos";
      case "audio":
        return "course_audios";
      case "e-book":
      case "powerpoint":
      case "pdf":
        return "course_documents";
      case "downloads":
        return "course_resources";
      default:
        return "course_resources";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Lesson</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="lesson-name">Lesson Name</Label>
            <Input 
              id="lesson-name" 
              value={lessonName} 
              onChange={e => setLessonName(e.target.value)} 
              placeholder="Untitled lesson" 
              className="mt-1.5" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="free-preview" checked={enableFreePreview} onCheckedChange={checked => setEnableFreePreview(!!checked)} />
              <Label htmlFor="free-preview">Enable Free Preview</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="as-draft" checked={setAsDraft} onCheckedChange={checked => setSetAsDraft(!!checked)} />
              <Label htmlFor="as-draft">Set as Draft</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="as-compulsory" checked={setAsCompulsory} onCheckedChange={checked => setSetAsCompulsory(!!checked)} />
              <Label htmlFor="as-compulsory">Set as Compulsory</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="enable-discussion" checked={enableDiscussion} onCheckedChange={checked => setEnableDiscussion(!!checked)} />
              <Label htmlFor="enable-discussion">Enable Discussion</Label>
            </div>
          </div>
          
          <LessonTypeSelector 
            selectedType={selectedType} 
            onSelectType={setSelectedType} 
          />
          
          {selectedType && (
            <ContentEditor
              selectedType={selectedType}
              contentUrl={contentUrl}
              onContentUrlChange={setContentUrl}
              content={content}
              onContentChange={setContent}
              onFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
          )}
        </div>
        
        <div className="flex justify-end space-x-2 mt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={!lessonName.trim()}>
            Save Lesson
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonDialog;
