
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LessonTypeSelector, ContentEditor } from "../lesson-editors";
import LessonFormOptions from "./LessonFormOptions";

interface LessonFormProps {
  lessonName: string;
  setLessonName: (value: string) => void;
  selectedType: string | null;
  setSelectedType: (type: string) => void;
  enableFreePreview: boolean;
  setEnableFreePreview: (value: boolean) => void;
  setAsDraft: boolean;
  setSetAsDraft: (value: boolean) => void;
  setAsCompulsory: boolean;
  setSetAsCompulsory: (value: boolean) => void;
  enableDiscussion: boolean;
  setEnableDiscussion: (value: boolean) => void;
  contentUrl: string;
  setContentUrl: (url: string) => void;
  content: string;
  setContent: (content: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LessonForm: React.FC<LessonFormProps> = ({
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
  handleFileChange
}) => {
  return (
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
      
      <LessonFormOptions
        enableFreePreview={enableFreePreview}
        setEnableFreePreview={setEnableFreePreview}
        setAsDraft={setAsDraft}
        setSetAsDraft={setSetAsDraft}
        setAsCompulsory={setAsCompulsory}
        setSetAsCompulsory={setSetAsCompulsory}
        enableDiscussion={enableDiscussion}
        setEnableDiscussion={setEnableDiscussion}
      />
      
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
  );
};

export default LessonForm;
