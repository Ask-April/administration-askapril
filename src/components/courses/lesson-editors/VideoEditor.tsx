
import React, { useState, useEffect } from "react";
import { Camera, Upload, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getVideoThumbnail } from "@/utils/videoUtils";

interface VideoEditorProps {
  contentUrl: string;
  onContentUrlChange: (url: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const VideoEditor: React.FC<VideoEditorProps> = ({ 
  contentUrl, 
  onContentUrlChange, 
  onFileChange,
  fileInputRef 
}) => {
  const [contentMethod, setContentMethod] = useState<string>("url");
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (contentUrl) {
      getVideoThumbnail(contentUrl)
        .then(thumbnailUrl => {
          setThumbnail(thumbnailUrl);
        })
        .catch(() => {
          setThumbnail(null);
        });
    } else {
      setThumbnail(null);
    }
  }, [contentUrl]);

  return (
    <Tabs defaultValue="url" value={contentMethod} onValueChange={setContentMethod} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="url"><LinkIcon className="h-4 w-4 mr-1" /> URL</TabsTrigger>
        <TabsTrigger value="upload"><Upload className="h-4 w-4 mr-1" /> Upload</TabsTrigger>
        <TabsTrigger value="camera"><Camera className="h-4 w-4 mr-1" /> Record</TabsTrigger>
      </TabsList>
      <TabsContent value="url" className="space-y-2">
        <div>
          <Label htmlFor="video-url">Video URL (YouTube, Vimeo, etc.)</Label>
          <Input 
            id="video-url" 
            placeholder="https://..." 
            value={contentUrl}
            onChange={(e) => onContentUrlChange(e.target.value)}
          />
        </div>
        {thumbnail && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-1">Preview:</p>
            <div className="border rounded-md overflow-hidden bg-black/5">
              <img 
                src={thumbnail} 
                alt="Video thumbnail" 
                className="w-full h-auto object-cover" 
              />
            </div>
          </div>
        )}
      </TabsContent>
      <TabsContent value="upload" className="space-y-2">
        <div>
          <Label htmlFor="video-file">Upload Video</Label>
          <Input 
            id="video-file" 
            type="file" 
            ref={fileInputRef}
            accept="video/*"
            onChange={onFileChange}
          />
        </div>
      </TabsContent>
      <TabsContent value="camera" className="space-y-2">
        <div className="text-center p-4 border-2 border-dashed rounded-md">
          <Camera className="w-10 h-10 mx-auto text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Record from camera feature coming soon</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default VideoEditor;
