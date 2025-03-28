
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LiveSessionEditorProps {
  contentUrl: string;
  onContentUrlChange: (url: string) => void;
}

const LiveSessionEditor: React.FC<LiveSessionEditorProps> = ({ contentUrl, onContentUrlChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="live-url">Live Session URL</Label>
      <Input 
        id="live-url" 
        placeholder="https://zoom.us/j/..." 
        value={contentUrl}
        onChange={(e) => onContentUrlChange(e.target.value)}
      />
    </div>
  );
};

export default LiveSessionEditor;
