
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LessonForm from "../lesson-form/LessonForm";

interface LessonEditDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedLesson: any | null;
  setSelectedLesson: (lesson: any | null) => void;
  content: string;
  setContent: (content: string) => void;
  contentUrl: string;
  setContentUrl: (url: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLessonContentSave: () => void;
  isNewLesson?: boolean;
}

const LessonEditDrawer: React.FC<LessonEditDrawerProps> = ({
  isOpen,
  setIsOpen,
  selectedLesson,
  setSelectedLesson,
  content,
  setContent,
  contentUrl,
  setContentUrl,
  fileInputRef,
  handleFileChange,
  handleLessonContentSave,
  isNewLesson = false,
}) => {
  const [lessonName, setLessonName] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [enableFreePreview, setEnableFreePreview] = React.useState(false);
  const [setAsDraft, setSetAsDraft] = React.useState(true);
  const [setAsCompulsory, setSetAsCompulsory] = React.useState(true);
  const [enableDiscussion, setEnableDiscussion] = React.useState(true);

  // Update form state when selectedLesson changes or drawer opens
  useEffect(() => {
    if (isOpen) {
      if (selectedLesson && !isNewLesson) {
        // Update form with existing lesson data
        setLessonName(selectedLesson.title || "");
        setSelectedType(selectedLesson.type || null);
        setEnableFreePreview(selectedLesson.is_preview || false);
        setSetAsDraft(selectedLesson.is_draft || false);
        setSetAsCompulsory(selectedLesson.is_compulsory || true);
        setEnableDiscussion(selectedLesson.enable_discussion || true);
        setContent(selectedLesson.content || "");
        setContentUrl(selectedLesson.content_url || "");
      } else if (isNewLesson) {
        // Reset form for new lesson
        resetForm();
      }
    }
  }, [selectedLesson, isOpen, isNewLesson, setContent, setContentUrl]);

  const resetForm = () => {
    setLessonName("");
    setSelectedType("video");
    setEnableFreePreview(false);
    setSetAsDraft(false);
    setSetAsCompulsory(true);
    setEnableDiscussion(true);
    setContent("");
    setContentUrl("");
  };

  const handleSave = () => {
    // Update the selected lesson with the form values
    if (selectedLesson || isNewLesson) {
      const updatedLesson = {
        ...(selectedLesson || {}),
        title: lessonName,
        type: selectedType,
        is_preview: enableFreePreview,
        is_draft: setAsDraft,
        is_compulsory: setAsCompulsory,
        enable_discussion: enableDiscussion,
        content: content,
        content_url: contentUrl,
      };
      
      setSelectedLesson(updatedLesson);
      handleLessonContentSave();
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (isNewLesson) {
      resetForm();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md md:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isNewLesson ? "Add New Lesson" : `Edit Lesson: ${lessonName}`}
          </SheetTitle>
        </SheetHeader>

        <div className="py-4">
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
        </div>

        <SheetFooter className="pt-4 mt-6 border-t">
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!lessonName || !selectedType}
            >
              Save Lesson
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default LessonEditDrawer;
