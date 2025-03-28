
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DownloadEditorProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const DownloadEditor: React.FC<DownloadEditorProps> = ({ onFileChange, fileInputRef }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="download-file">Upload File for Download</Label>
      <Input 
        id="download-file" 
        type="file" 
        ref={fileInputRef}
        onChange={onFileChange}
      />
    </div>
  );
};

export default DownloadEditor;
