
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DocumentEditorProps {
  type: "e-book" | "powerpoint" | "pdf";
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ 
  type, 
  onFileChange,
  fileInputRef 
}) => {
  const getAcceptTypes = () => {
    switch(type) {
      case "e-book":
        return ".epub,.mobi,.azw";
      case "powerpoint":
        return ".ppt,.pptx";
      case "pdf":
        return ".pdf";
      default:
        return "";
    }
  };

  const getLabel = () => {
    switch(type) {
      case "e-book":
        return "Upload E-book";
      case "powerpoint":
        return "Upload PowerPoint";
      case "pdf":
        return "Upload PDF";
      default:
        return "Upload Document";
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="document-file">{getLabel()}</Label>
      <Input 
        id="document-file" 
        type="file" 
        ref={fileInputRef}
        accept={getAcceptTypes()}
        onChange={onFileChange}
      />
    </div>
  );
};

export default DocumentEditor;
