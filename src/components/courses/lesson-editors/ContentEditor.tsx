
import React from "react";
import { VideoEditor, AudioEditor, DocumentEditor, RichTextEditor, CodeEditor, DownloadEditor, QuizEditor, SurveyEditor, LiveSessionEditor } from "./index";
import { Label } from "@/components/ui/label";

interface ContentEditorProps {
  selectedType: string | null;
  contentUrl: string;
  onContentUrlChange: (url: string) => void;
  content: string;
  onContentChange: (content: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  selectedType,
  contentUrl,
  onContentUrlChange,
  content,
  onContentChange,
  onFileChange,
  fileInputRef
}) => {
  if (!selectedType) return null;

  return (
    <div className="space-y-2">
      <Label>Lesson Content</Label>
      <div className="p-4 bg-muted/30 rounded-md">
        {selectedType === "video" && (
          <VideoEditor 
            contentUrl={contentUrl} 
            onContentUrlChange={onContentUrlChange} 
            onFileChange={onFileChange}
            fileInputRef={fileInputRef}
          />
        )}
        
        {selectedType === "audio" && (
          <AudioEditor 
            contentUrl={contentUrl} 
            onContentUrlChange={onContentUrlChange} 
            onFileChange={onFileChange}
            fileInputRef={fileInputRef}
          />
        )}
        
        {(selectedType === "e-book" || selectedType === "powerpoint" || selectedType === "pdf") && (
          <DocumentEditor 
            type={selectedType as "e-book" | "powerpoint" | "pdf"}
            onFileChange={onFileChange}
            fileInputRef={fileInputRef}
            contentUrl={contentUrl}
          />
        )}
        
        {selectedType === "text" && (
          <RichTextEditor 
            content={content} 
            onContentChange={onContentChange}
          />
        )}
        
        {selectedType === "custom-code" && (
          <CodeEditor 
            content={content} 
            onContentChange={onContentChange}
          />
        )}
        
        {selectedType === "downloads" && (
          <DownloadEditor 
            onFileChange={onFileChange}
            fileInputRef={fileInputRef}
            contentUrl={contentUrl}
          />
        )}
        
        {selectedType === "quiz" && (
          <QuizEditor />
        )}
        
        {selectedType === "survey" && (
          <SurveyEditor 
            content={content}
            onContentChange={onContentChange}
          />
        )}
        
        {selectedType === "live" && (
          <LiveSessionEditor 
            contentUrl={contentUrl} 
            onContentUrlChange={onContentUrlChange}
          />
        )}
      </div>
    </div>
  );
};

export default ContentEditor;
