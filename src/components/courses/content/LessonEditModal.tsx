
import React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContentEditor from "@/components/courses/lesson-editors/ContentEditor";
import { Lesson } from "@/hooks/useCurriculum";
import { LessonTypeSelector } from "@/components/courses/lesson-editors";

interface LessonEditModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedLesson: {
    sectionId: string;
    lesson: Lesson;
  } | null;
  setSelectedLesson: (lesson: {
    sectionId: string;
    lesson: Lesson;
  } | null) => void;
  content: string;
  setContent: (content: string) => void;
  contentUrl: string;
  setContentUrl: (url: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLessonContentSave: () => void;
}

const LessonEditModal: React.FC<LessonEditModalProps> = ({
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
  handleLessonContentSave
}) => {
  const handleLessonTypeChange = (type: string) => {
    if (selectedLesson) {
      setSelectedLesson({
        ...selectedLesson,
        lesson: { ...selectedLesson.lesson, type }
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {selectedLesson ? (
              <>Edit Lesson: {selectedLesson.lesson.title}</>
            ) : (
              <>Edit Lesson</>
            )}
          </SheetTitle>
        </SheetHeader>
        
        {selectedLesson && (
          <div className="space-y-6 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Lesson Title</label>
              <Input 
                value={selectedLesson.lesson.title}
                onChange={(e) => {
                  if (selectedLesson) {
                    setSelectedLesson({
                      ...selectedLesson,
                      lesson: { ...selectedLesson.lesson, title: e.target.value }
                    });
                  }
                }}
                className="w-full"
              />
            </div>
            
            <LessonTypeSelector 
              selectedType={selectedLesson.lesson.type || null}
              onSelectType={handleLessonTypeChange}
            />
            
            <ContentEditor
              selectedType={selectedLesson.lesson.type || null}
              contentUrl={contentUrl}
              onContentUrlChange={setContentUrl}
              content={content}
              onContentChange={setContent}
              onFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
          </div>
        )}
        
        <SheetFooter className="pt-4 mt-6 border-t">
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLessonContentSave}>
              Save Changes
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default LessonEditModal;
