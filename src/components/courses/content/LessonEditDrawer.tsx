
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
}) => {
  const [lessonName, setLessonName] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [enableFreePreview, setEnableFreePreview] = React.useState(false);
  const [setAsDraft, setSetAsDraft] = React.useState(true);
  const [setAsCompulsory, setSetAsCompulsory] = React.useState(true);
  const [enableDiscussion, setEnableDiscussion] = React.useState(true);

  // Update form state when selectedLesson changes
  useEffect(() => {
    if (selectedLesson) {
      setLessonName(selectedLesson.title || "");
      setSelectedType(selectedLesson.type || null);
      setEnableFreePreview(selectedLesson.isPreview || false);
      setSetAsDraft(selectedLesson.isDraft || true);
      setSetAsCompulsory(selectedLesson.isCompulsory || true);
      setEnableDiscussion(selectedLesson.enableDiscussion || true);
    } else {
      resetForm();
    }
  }, [selectedLesson]);

  const resetForm = () => {
    setLessonName("");
    setSelectedType(null);
    setEnableFreePreview(false);
    setSetAsDraft(true);
    setSetAsCompulsory(true);
    setEnableDiscussion(true);
    setContent("");
    setContentUrl("");
  };

  const handleSave = () => {
    // Update the selected lesson with the form values
    if (selectedLesson) {
      const updatedLesson = {
        ...selectedLesson,
        title: lessonName,
        type: selectedType,
        isPreview: enableFreePreview,
        isDraft: setAsDraft,
        isCompulsory: setAsCompulsory,
        enableDiscussion: enableDiscussion,
      };
      setSelectedLesson(updatedLesson);
      handleLessonContentSave();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md md:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {selectedLesson?.title
              ? `Edit Lesson: ${selectedLesson.title}`
              : "New Lesson"}
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
            <Button variant="outline" onClick={() => setIsOpen(false)}>
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
