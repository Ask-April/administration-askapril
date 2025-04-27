
import { useState, useRef } from "react";
import { toast } from "sonner";

export const useLessonForm = (sections: any[], setSections: (sections: any[]) => void) => {
  const [lessonName, setLessonName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>('video');
  const [enableFreePreview, setEnableFreePreview] = useState(false);
  const [setAsDraft, setSetAsDraft] = useState(false);
  const [setAsCompulsory, setSetAsCompulsory] = useState(false);
  const [enableDiscussion, setEnableDiscussion] = useState(false);
  const [content, setContent] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File selected:", e.target.files);
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
    fileInputRef,
    handleFileChange,
    resetForm
  };
};
