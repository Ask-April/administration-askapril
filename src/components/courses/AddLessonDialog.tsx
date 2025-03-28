
import React, { useState, useRef } from "react";
import { 
  Book, Video, FileText, Download, File, Code, Radio, 
  HelpCircle, ClipboardList, FileAudio2, Upload, Link, Mic, 
  Camera, Bold, Italic, Underline, Strikethrough, Heading1, 
  Heading2, List, ListOrdered
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface LessonType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface AddLessonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLesson: (lesson: {
    id: string;
    title: string;
    type?: string;
    isPreview?: boolean;
    isDraft?: boolean;
    isCompulsory?: boolean;
    enableDiscussion?: boolean;
    content?: string;
    contentUrl?: string;
  }) => void;
}

const lessonTypes: LessonType[] = [
  {
    id: "video",
    name: "Video",
    icon: <Video className="h-5 w-5" />
  },
  {
    id: "audio",
    name: "Audio",
    icon: <FileAudio2 className="h-5 w-5" />
  },
  {
    id: "e-book",
    name: "E-book",
    icon: <Book className="h-5 w-5" />
  },
  {
    id: "powerpoint",
    name: "PowerPoint",
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: "pdf",
    name: "PDF",
    icon: <File className="h-5 w-5" />
  },
  {
    id: "text",
    name: "Rich Text",
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: "custom-code",
    name: "Custom Code",
    icon: <Code className="h-5 w-5" />
  },
  {
    id: "downloads",
    name: "Downloads",
    icon: <Download className="h-5 w-5" />
  },
  {
    id: "quiz",
    name: "Quiz",
    icon: <HelpCircle className="h-5 w-5" />
  },
  {
    id: "survey",
    name: "Survey",
    icon: <ClipboardList className="h-5 w-5" />
  },
  {
    id: "live",
    name: "Live",
    icon: <Radio className="h-5 w-5" />
  }
];

const AddLessonDialog: React.FC<AddLessonDialogProps> = ({
  isOpen,
  onClose,
  onAddLesson
}) => {
  const [lessonName, setLessonName] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [enableFreePreview, setEnableFreePreview] = useState(false);
  const [setAsDraft, setSetAsDraft] = useState(false);
  const [setAsCompulsory, setSetAsCompulsory] = useState(false);
  const [enableDiscussion, setEnableDiscussion] = useState(false);
  const [contentMethod, setContentMethod] = useState<string>("url");
  const [contentUrl, setContentUrl] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = async () => {
    if (!lessonName.trim()) return;
    
    let finalContentUrl = contentUrl;
    let finalContent = content;
    
    // Handle file upload if applicable
    if (file && ["video", "audio", "e-book", "powerpoint", "pdf", "downloads"].includes(selectedType || "")) {
      try {
        const bucketId = getBucketForFileType(selectedType || "");
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from(bucketId)
          .upload(fileName, file);
          
        if (error) throw error;
        
        const { data: urlData } = await supabase.storage
          .from(bucketId)
          .getPublicUrl(fileName);
          
        finalContentUrl = urlData.publicUrl;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    
    onAddLesson({
      id: Date.now().toString(),
      title: lessonName,
      type: selectedType || undefined,
      isPreview: enableFreePreview,
      isDraft: setAsDraft,
      isCompulsory: setAsCompulsory,
      enableDiscussion,
      content: finalContent || undefined,
      contentUrl: finalContentUrl || undefined
    });
    
    resetForm();
  };
  
  const resetForm = () => {
    setLessonName("");
    setSelectedType(null);
    setEnableFreePreview(false);
    setSetAsDraft(false);
    setSetAsCompulsory(false);
    setEnableDiscussion(false);
    setContentMethod("url");
    setContentUrl("");
    setContent("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const getBucketForFileType = (type: string): string => {
    switch (type) {
      case "video":
        return "course_videos";
      case "audio":
        return "course_audios";
      case "e-book":
      case "powerpoint":
      case "pdf":
        return "course_documents";
      case "downloads":
        return "course_resources";
      default:
        return "course_resources";
    }
  };
  
  const renderContentOptions = () => {
    if (!selectedType) return null;
    
    switch (selectedType) {
      case "video":
        return (
          <Tabs defaultValue="url" value={contentMethod} onValueChange={setContentMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="camera">Record</TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="space-y-2">
              <div>
                <Label htmlFor="video-url">Video URL (YouTube, Vimeo, etc.)</Label>
                <Input 
                  id="video-url" 
                  placeholder="https://..." 
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="upload" className="space-y-2">
              <div>
                <Label htmlFor="video-file">Upload Video</Label>
                <Input 
                  id="video-file" 
                  type="file" 
                  ref={fileInputRef}
                  accept="video/*"
                  onChange={handleFileChange}
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
        
      case "audio":
        return (
          <Tabs defaultValue="url" value={contentMethod} onValueChange={setContentMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="record">Record</TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="space-y-2">
              <div>
                <Label htmlFor="audio-url">Audio URL</Label>
                <Input 
                  id="audio-url" 
                  placeholder="https://..." 
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
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
                  onChange={handleFileChange}
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
        
      case "e-book":
      case "powerpoint":
      case "pdf":
        return (
          <div className="space-y-2">
            <Label htmlFor="document-file">Upload Document</Label>
            <Input 
              id="document-file" 
              type="file" 
              ref={fileInputRef}
              accept={
                selectedType === "e-book" ? ".epub,.mobi,.azw" : 
                selectedType === "powerpoint" ? ".ppt,.pptx" : 
                ".pdf"
              }
              onChange={handleFileChange}
            />
          </div>
        );
        
      case "text":
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-1 mb-2">
              <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
                <Bold className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
                <Italic className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
                <Underline className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
                <Strikethrough className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
                <List className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              placeholder="Enter rich text content here..."
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        );
        
      case "custom-code":
        return (
          <div className="space-y-2">
            <Textarea
              placeholder="Enter or paste code here..."
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="font-mono"
            />
          </div>
        );
        
      case "downloads":
        return (
          <div className="space-y-2">
            <Label htmlFor="download-file">Upload File for Download</Label>
            <Input 
              id="download-file" 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        );
        
      case "quiz":
        return (
          <div className="space-y-2">
            <div className="text-center p-4 border-2 border-dashed rounded-md">
              <HelpCircle className="w-10 h-10 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Quiz builder coming soon</p>
              <p className="text-xs text-muted-foreground">You'll be able to add questions after creating this lesson</p>
            </div>
          </div>
        );
        
      case "survey":
        return (
          <div className="space-y-2">
            <div className="text-center p-4 border-2 border-dashed rounded-md">
              <ClipboardList className="w-10 h-10 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Survey builder coming soon</p>
              <p className="text-xs text-muted-foreground">You'll be able to add questions after creating this lesson</p>
            </div>
          </div>
        );
        
      case "live":
        return (
          <div className="space-y-2">
            <Label htmlFor="live-url">Live Session URL</Label>
            <Input 
              id="live-url" 
              placeholder="https://zoom.us/j/..." 
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Lesson</DialogTitle>
        </DialogHeader>
        
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
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="free-preview" checked={enableFreePreview} onCheckedChange={checked => setEnableFreePreview(!!checked)} />
              <Label htmlFor="free-preview">Enable Free Preview</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="as-draft" checked={setAsDraft} onCheckedChange={checked => setSetAsDraft(!!checked)} />
              <Label htmlFor="as-draft">Set as Draft</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="as-compulsory" checked={setAsCompulsory} onCheckedChange={checked => setSetAsCompulsory(!!checked)} />
              <Label htmlFor="as-compulsory">Set as Compulsory</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="enable-discussion" checked={enableDiscussion} onCheckedChange={checked => setEnableDiscussion(!!checked)} />
              <Label htmlFor="enable-discussion">Enable Discussion</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Lesson Type</Label>
            <div className="grid grid-cols-3 gap-3">
              {lessonTypes.map(type => (
                <Button 
                  key={type.id} 
                  type="button" 
                  variant="outline" 
                  className={`h-auto flex-col py-3 ${selectedType === type.id ? 'border-primary bg-primary/10' : ''}`} 
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="mb-1">{type.icon}</div>
                  <span className="text-xs">{type.name}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {selectedType && (
            <div className="space-y-2">
              <Label>Lesson Content</Label>
              <div className="p-4 bg-muted/30 rounded-md">
                {renderContentOptions()}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 mt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={!lessonName.trim()}>
            Save Lesson
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonDialog;
