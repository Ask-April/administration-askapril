
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LessonForm from "./lesson-form/LessonForm";
import { useAddLessonForm, LessonFormData } from "@/hooks/useAddLessonForm";

interface AddLessonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLesson: (lesson: LessonFormData) => void;
}

const AddLessonDialog: React.FC<AddLessonDialogProps> = ({
  isOpen,
  onClose,
  onAddLesson
}) => {
  const {
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
  } = useAddLessonForm(onAddLesson);
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Lesson</DialogTitle>
        </DialogHeader>
        
        <LessonForm
          lessonName={lessonName}
          setLessonName={setLessonName}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          enableFreePreview={enableFreePreview}
          setEnableFreePreview={setEnableFreePreview}
          setAsDraft={setAsDraft}
          setSetAsDraft={setSetAsDraft}
          setAsCompulsory={setAsCompulsory}
          setSetAsCompulsory={setSetAsCompulsory}
          enableDiscussion={enableDiscussion}
          setEnableDiscussion={setEnableDiscussion}
          contentUrl={contentUrl}
          setContentUrl={setContentUrl}
          content={content}
          setContent={setContent}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />
        
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
