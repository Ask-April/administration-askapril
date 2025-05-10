
import { useState, useRef } from "react";
import { toast } from "sonner";
import { uploadImage } from "@/utils/supabaseStorage";

export const useLessonForm = (sections: any[], setSections: (sections: any[]) => void) => {
  const [lessonName, setLessonName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>('video');
  const [enableFreePreview, setEnableFreePreview] = useState(false);
  const [setAsDraft, setSetAsDraft] = useState(false);
  const [setAsCompulsory, setSetAsCompulsory] = useState(false);
  const [enableDiscussion, setEnableDiscussion] = useState(false);
  const [content, setContent] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);
    
    try {
      console.log("File selected:", file.name, file.type, file.size);
      
      // For now, use the uploadImage function for all file types
      if (selectedType) {
        const bucketId = getBucketForFileType(selectedType);
        toast.promise(
          uploadImage(file, bucketId, selectedType),
          {
            loading: `Uploading ${selectedType} file...`,
            success: (url) => {
              setContentUrl(url);
              return 'File uploaded successfully!';
            },
            error: 'Upload failed. Please try again.'
          }
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setLessonName('');
    setSelectedType('video');
    setEnableFreePreview(false);
    setSetAsDraft(false);
    setSetAsCompulsory(false);
    setEnableDiscussion(false);
    setContent('');
    setContentUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
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
    content,
    setContent,
    contentUrl,
    setContentUrl,
    isUploading,
    fileInputRef,
    handleFileChange,
    resetForm
  };
};
