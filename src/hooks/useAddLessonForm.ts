
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface LessonFormData {
  id: string;
  title: string;
  type?: string;
  isPreview?: boolean;
  isDraft?: boolean;
  isCompulsory?: boolean;
  enableDiscussion?: boolean;
  content?: string;
  contentUrl?: string;
}

export function useAddLessonForm(onAddLesson: (lesson: LessonFormData) => void) {
  const [lessonName, setLessonName] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [enableFreePreview, setEnableFreePreview] = useState(false);
  const [setAsDraft, setSetAsDraft] = useState(false);
  const [setAsCompulsory, setSetAsCompulsory] = useState(false);
  const [enableDiscussion, setEnableDiscussion] = useState(false);
  const [contentUrl, setContentUrl] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const resetForm = () => {
    setLessonName("");
    setSelectedType(null);
    setEnableFreePreview(false);
    setSetAsDraft(false);
    setSetAsCompulsory(false);
    setEnableDiscussion(false);
    setContentUrl("");
    setContent("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

  return {
    lessonName,
    setLessonName,
    selectedType,
    setSelectedType,
    enableFreePreview,
    setEnableFreePreview,
    setAsDraft,
    setSetAsDraft,
    setAsCompulsory,
    setSetAsCompulsory,
    enableDiscussion,
    setEnableDiscussion,
    contentUrl,
    setContentUrl,
    content,
    setContent,
    fileInputRef,
    handleFileChange,
    handleSubmit,
    resetForm
  };
}
