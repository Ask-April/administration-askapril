
import React, { useState } from "react";
import { Mic, Upload, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AudioEditorProps {
  contentUrl: string;
  onContentUrlChange: (url: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const AudioEditor: React.FC<AudioEditorProps> = ({ 
  contentUrl, 
  onContentUrlChange, 
  onFileChange,
  fileInputRef 
}) => {
  const [contentMethod, setContentMethod] = useState<string>("url");

  return (
    <Tabs defaultValue="url" value={contentMethod} onValueChange={setContentMethod} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="url"><LinkIcon className="h-4 w-4 mr-1" /> URL</TabsTrigger>
        <TabsTrigger value="upload"><Upload className="h-4 w-4 mr-1" /> Upload</TabsTrigger>
        <TabsTrigger value="record"><Mic className="h-4 w-4 mr-1" /> Record</TabsTrigger>
      </TabsList>
      <TabsContent value="url" className="space-y-2">
        <div>
          <Label htmlFor="audio-url">Audio URL</Label>
          <Input 
            id="audio-url" 
            placeholder="https://..." 
            value={contentUrl}
            onChange={(e) => onContentUrlChange(e.target.value)}
          />
        </div>
      </TabsContent>
      <TabsContent value="upload" className="space-y-2">
        <div>
          <Label htmlFor="audio-file">Upload Audio</Label>
          <Input 
            id="audio-file" 
            type="file" 
            ref={fileInputRef}
            accept="audio/*"
            onChange={onFileChange}
          />
        </div>
      </TabsContent>
      <TabsContent value="record" className="space-y-2">
        <div className="text-center p-4 border-2 border-dashed rounded-md">
          <Mic className="w-10 h-10 mx-auto text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Record audio feature coming soon</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AudioEditor;
