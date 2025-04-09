
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LessonForm } from "@/components/courses/lesson-form";
import { ContentOrganizationHook } from "@/hooks/useContentOrganization";

interface AddLessonSidebarProps {
  hook: ContentOrganizationHook;
}

const AddLessonSidebar: React.FC<AddLessonSidebarProps> = ({ hook }) => {
  const {
    isAddLessonSidebarOpen,
    setIsAddLessonSidebarOpen,
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
    handleSaveNewLesson
  } = hook;

  return (
    <Sheet open={isAddLessonSidebarOpen} onOpenChange={setIsAddLessonSidebarOpen}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Lesson</SheetTitle>
        </SheetHeader>
        
        <div className="py-4">
          <LessonForm
            lessonName={lessonName}
            setLessonName={setLessonName}
            selectedType={selectedType}
            setSelectedType={setSelectedType!}
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
            <Button variant="outline" onClick={() => setIsAddLessonSidebarOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNewLesson} 
              disabled={!lessonName.trim() || !selectedType}
            >
              Save Lesson
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddLessonSidebar;
