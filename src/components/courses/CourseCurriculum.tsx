
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AddLessonDialog from "./AddLessonDialog";

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type?: string;
  isPreview?: boolean;
  isDraft?: boolean;
  isCompulsory?: boolean;
  enableDiscussion?: boolean;
}

interface CourseCurriculumProps {
  courseData: {
    title: string;
    description: string;
    category: string;
    image: string;
    duration: string;
    lessons: number;
    status: "draft" | "published";
  };
  updateCourseData: (data: Partial<CourseCurriculumProps["courseData"]>) => void;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ 
  courseData, 
  updateCourseData 
}) => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "Introduction",
      lessons: []
    }
  ]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [isAddLessonDialogOpen, setIsAddLessonDialogOpen] = useState(false);

  // Update total lesson count when sections/lessons change
  React.useEffect(() => {
    const totalLessons = sections.reduce((count, section) => count + section.lessons.length, 0);
    updateCourseData({ lessons: totalLessons });
  }, [sections, updateCourseData]);

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        title: newSectionTitle,
        lessons: []
      }
    ]);
    
    setNewSectionTitle("");
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const openAddLessonDialog = (section: Section) => {
    setCurrentSection(section);
    setIsAddLessonDialogOpen(true);
  };

  const handleAddLesson = (lesson: Lesson) => {
    if (!currentSection) return;
    
    setSections(sections.map(section => 
      section.id === currentSection.id 
        ? { ...section, lessons: [...section.lessons, lesson] }
        : section
    ));
    
    setIsAddLessonDialogOpen(false);
  };

  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, lessons: section.lessons.filter(lesson => lesson.id !== lessonId) }
        : section
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Curriculum</h2>
        <p className="text-sm text-muted-foreground">Organize your course content into sections and lessons</p>
      </div>
      
      <div className="space-y-4">
        {sections.map(section => (
          <Card key={section.id} className="relative group">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">{section.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteSection(section.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <span className="sr-only">Delete section</span>
                </Button>
              </div>
              
              <div className="space-y-2 pl-4 border-l-2 border-muted">
                {section.lessons.map(lesson => (
                  <div key={lesson.id} className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-md group/lesson">
                    <div>
                      <span className="text-sm">{lesson.title}</span>
                      {lesson.isPreview && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">Preview</span>
                      )}
                      {lesson.isDraft && (
                        <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">Draft</span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 opacity-0 group-hover/lesson:opacity-100 transition-opacity"
                      onClick={() => handleDeleteLesson(section.id, lesson.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      <span className="sr-only">Delete lesson</span>
                    </Button>
                  </div>
                ))}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => openAddLessonDialog(section)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex">
        <Input
          placeholder="Enter section title (e.g., Introduction, Module 1)"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          className="mr-2"
        />
        <Button 
          onClick={handleAddSection}
          disabled={!newSectionTitle.trim()}
        >
          Add Section
        </Button>
      </div>
      
      <AddLessonDialog
        isOpen={isAddLessonDialogOpen}
        onClose={() => setIsAddLessonDialogOpen(false)}
        onAddLesson={handleAddLesson}
      />
    </div>
  );
};

export default CourseCurriculum;
