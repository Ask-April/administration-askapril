
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContentEditor from "@/components/courses/lesson-editors/ContentEditor";

interface Lesson {
  id: string;
  title: string;
  type: string;
  position: number;
  content?: string;
  contentUrl?: string;
}

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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {selectedLesson ? (
              <>Edit Lesson: {selectedLesson.lesson.title}</>
            ) : (
              <>Edit Lesson</>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {selectedLesson && (
          <div className="space-y-4">
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
            
            <ContentEditor
              selectedType={selectedLesson.lesson.type}
              contentUrl={contentUrl}
              onContentUrlChange={setContentUrl}
              content={content}
              onContentChange={setContent}
              onFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleLessonContentSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LessonEditModal;
