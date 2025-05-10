
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface DownloadEditorProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  contentUrl?: string;
}

const DownloadEditor: React.FC<DownloadEditorProps> = ({ onFileChange, fileInputRef, contentUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  
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
        <Label htmlFor="download-file">Upload File for Download</Label>
        <Input 
          id="download-file" 
          type="file" 
          ref={fileInputRef}
          onChange={handleLocalFileChange}
          disabled={isUploading}
        />
      </div>
      
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
      )}
      
      {contentUrl && !isUploading && (
        <div className="p-3 bg-muted/50 rounded border text-sm break-all">
          <Label className="block mb-1">Uploaded file:</Label>
          <a href={contentUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            {contentUrl.split('/').pop()}
          </a>
        </div>
      )}
    </div>
  );
};

export default DownloadEditor;
