
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface DocumentEditorProps {
  type: "e-book" | "powerpoint" | "pdf";
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  contentUrl?: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ 
  type, 
  onFileChange,
  fileInputRef,
  contentUrl
}) => {
  const [isUploading, setIsUploading] = useState(false);
  
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
  
  const handleLocalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    onFileChange(e);
    // The actual upload is handled by the parent component
    // This is just for UI feedback
    setTimeout(() => {
      setIsUploading(false);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="document-file">{getLabel()}</Label>
        <Input 
          id="document-file" 
          type="file" 
          ref={fileInputRef}
          accept={getAcceptTypes()}
          onChange={handleLocalFileChange}
          disabled={isUploading}
        />
      </div>
      
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span className="text-sm">Uploading document...</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
      )}
      
      {contentUrl && !isUploading && (
        <div className="p-3 bg-muted/50 rounded border text-sm break-all">
          <Label className="block mb-1">Uploaded document:</Label>
          <a href={contentUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            {contentUrl.split('/').pop()}
          </a>
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;
