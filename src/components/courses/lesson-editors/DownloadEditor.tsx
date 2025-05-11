
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Loader2, FileIcon, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DownloadEditorProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  contentUrl?: string;
}

const DownloadEditor: React.FC<DownloadEditorProps> = ({ onFileChange, fileInputRef, contentUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLocalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setIsUploading(true);
    
    // File validation
    const file = e.target.files?.[0];
    if (file && file.size > 100 * 1024 * 1024) { // 100MB limit
      setError("File size exceeds 100MB limit");
      setIsUploading(false);
      return;
    }
    
    onFileChange(e);
    
    // The actual upload is handled by the parent component
    // This is just for UI feedback
    setTimeout(() => {
      setIsUploading(false);
    }, 500);
  };

  const getFileNameFromUrl = (url?: string) => {
    if (!url) return "";
    return url.split('/').pop() || "file";
  };
  
  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || "";
  };

  const fileName = getFileNameFromUrl(contentUrl);
  const fileExt = getFileExtension(fileName);

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
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Select a file for students to download (max 100MB)
        </p>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
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
        <div className="p-4 bg-muted/50 rounded border border-border">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded">
              <FileIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{fileName}</p>
              <p className="text-xs text-muted-foreground uppercase">{fileExt}</p>
            </div>
            <a 
              href={contentUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              Preview
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadEditor;
