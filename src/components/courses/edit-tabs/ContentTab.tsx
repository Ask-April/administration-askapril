
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  LayoutGrid, 
  FileText, 
  Music, 
  Code, 
  Boxes, 
  Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ContentTabProps {
  editedCourse?: any;
  setEditedCourse?: (course: any) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({ 
  editedCourse, 
  setEditedCourse 
}) => {
  const [sections, setSections] = useState<any[]>([
    {
      id: 'section-1',
      title: 'Introduction',
      position: 1,
      lessons: [
        { id: 'lesson-1', title: 'Welcome to the Course', type: 'video', position: 1 },
        { id: 'lesson-2', title: 'Course Overview', type: 'text', position: 2 }
      ]
    },
    {
      id: 'section-2',
      title: 'Getting Started',
      position: 2,
      lessons: [
        { id: 'lesson-3', title: 'Setting Up Your Environment', type: 'video', position: 1 },
        { id: 'lesson-4', title: 'First Steps', type: 'text', position: 2 },
        { id: 'lesson-5', title: 'Quick Quiz', type: 'quiz', position: 3 }
      ]
    }
  ]);
  
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [draggedItem, setDraggedItem] = useState<any>(null);
  
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection = {
      id: `section-${Date.now()}`,
      title: newSectionTitle,
      position: sections.length + 1,
      lessons: []
    };
    
    setSections([...sections, newSection]);
    setNewSectionTitle('');
  };
  
  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };
  
  const handleAddLesson = (sectionId: string, lessonType: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        const newLesson = {
          id: `lesson-${Date.now()}`,
          title: `New ${lessonType} Lesson`,
          type: lessonType.toLowerCase(),
          position: section.lessons.length + 1
        };
        return {
          ...section,
          lessons: [...section.lessons, newLesson]
        };
      }
      return section;
    });
    
    setSections(updatedSections);
  };
  
  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.filter((lesson: any) => lesson.id !== lessonId)
        };
      }
      return section;
    });
    
    setSections(updatedSections);
  };
  
  const handleDragStart = (e: React.DragEvent, item: any, type: 'section' | 'lesson', sectionId?: string) => {
    setDraggedItem({ ...item, type, sectionId });
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, targetId: string, type: 'section' | 'lesson', sectionId?: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    if (draggedItem.type === 'section' && type === 'section') {
      // Reorder sections
      const updatedSections = [...sections];
      const draggedIndex = sections.findIndex(section => section.id === draggedItem.id);
      const targetIndex = sections.findIndex(section => section.id === targetId);
      
      if (draggedIndex === targetIndex) return;
      
      const draggedSection = updatedSections[draggedIndex];
      updatedSections.splice(draggedIndex, 1);
      updatedSections.splice(targetIndex, 0, draggedSection);
      
      // Update positions
      updatedSections.forEach((section, index) => {
        section.position = index + 1;
      });
      
      setSections(updatedSections);
    } else if (draggedItem.type === 'lesson' && type === 'lesson') {
      // Reorder lessons within the same section
      if (draggedItem.sectionId === sectionId) {
        const updatedSections = sections.map(section => {
          if (section.id === sectionId) {
            const updatedLessons = [...section.lessons];
            const draggedIndex = updatedLessons.findIndex((lesson: any) => lesson.id === draggedItem.id);
            const targetIndex = updatedLessons.findIndex((lesson: any) => lesson.id === targetId);
            
            if (draggedIndex === targetIndex) return section;
            
            const draggedLesson = updatedLessons[draggedIndex];
            updatedLessons.splice(draggedIndex, 1);
            updatedLessons.splice(targetIndex, 0, draggedLesson);
            
            // Update positions
            updatedLessons.forEach((lesson: any, index: number) => {
              lesson.position = index + 1;
            });
            
            return { ...section, lessons: updatedLessons };
          }
          return section;
        });
        
        setSections(updatedSections);
      } else {
        // Move lesson between sections
        const updatedSections = sections.map(section => {
          if (section.id === draggedItem.sectionId) {
            // Remove from original section
            return {
              ...section,
              lessons: section.lessons.filter((lesson: any) => lesson.id !== draggedItem.id)
            };
          }
          if (section.id === sectionId) {
            // Add to target section
            const lessonToAdd = sections
              .find(s => s.id === draggedItem.sectionId)
              ?.lessons.find((l: any) => l.id === draggedItem.id);
            
            if (lessonToAdd) {
              const updatedLessons = [...section.lessons, { ...lessonToAdd, position: section.lessons.length + 1 }];
              return { ...section, lessons: updatedLessons };
            }
          }
          return section;
        });
        
        setSections(updatedSections);
      }
    }
    
    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Course Content</h3>
          
          <Tabs defaultValue="organization" className="w-full">
            <TabsList className="mb-4 grid grid-cols-6 md:w-auto w-full">
              <TabsTrigger value="organization" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden md:inline">Organization</span>
              </TabsTrigger>
              <TabsTrigger value="content-types" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden md:inline">Content Types</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span className="hidden md:inline">Audio</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden md:inline">Code</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Boxes className="h-4 w-4" />
                <span className="hidden md:inline">Advanced</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="organization" className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  placeholder="Enter section title"
                  className="flex-grow"
                />
                <Button onClick={handleAddSection}>Add Section</Button>
              </div>
              
              <div className="space-y-4">
                {sections.map((section) => (
                  <div 
                    key={section.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, section, 'section')}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, section.id, 'section')}
                    className="border rounded-md bg-card"
                  >
                    <div className="p-4 flex items-center justify-between bg-muted">
                      <h3 className="font-medium cursor-grab">
                        {section.position}. {section.title}
                      </h3>
                      <div className="space-x-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddLesson(section.id, 'Video')}
                        >
                          Add Lesson
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSection(section.id)}
                          className="text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      {section.lessons.length === 0 ? (
                        <p className="text-sm text-muted-foreground p-2">
                          No lessons yet. Click "Add Lesson" to create one.
                        </p>
                      ) : (
                        <div className="space-y-1">
                          {section.lessons.map((lesson: any) => (
                            <div
                              key={lesson.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, lesson, 'lesson', section.id)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, lesson.id, 'lesson', section.id)}
                              className="p-2 border rounded-md bg-background flex items-center justify-between cursor-grab"
                            >
                              <div className="flex items-center">
                                <span className="mr-2">{lesson.position}.</span>
                                <span>{lesson.title}</span>
                                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  {lesson.type}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteLesson(section.id, lesson.id)}
                                className="text-destructive"
                              >
                                Delete
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content-types" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Content Types</h4>
              
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="video">
                  <AccordionTrigger>Video Lectures</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Upload Videos</h5>
                          <p className="text-sm text-muted-foreground">
                            Upload video files directly to the platform
                          </p>
                        </div>
                        <Switch id="video-upload" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Embed External Videos</h5>
                          <p className="text-sm text-muted-foreground">
                            Embed videos from YouTube, Vimeo, etc.
                          </p>
                        </div>
                        <Switch id="video-embed" defaultChecked />
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Streaming Options</h5>
                        <Select defaultValue="adaptive">
                          <SelectTrigger>
                            <SelectValue placeholder="Select streaming quality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="adaptive">Adaptive Streaming</SelectItem>
                            <SelectItem value="hd">HD Only</SelectItem>
                            <SelectItem value="sd">SD Only</SelectItem>
                            <SelectItem value="low">Low Bandwidth</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="text">
                  <AccordionTrigger>Text Lessons</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Rich Text Editor</h5>
                          <p className="text-sm text-muted-foreground">
                            Format text with WYSIWYG editor
                          </p>
                        </div>
                        <Switch id="rich-text" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Markdown Support</h5>
                          <p className="text-sm text-muted-foreground">
                            Write content in Markdown format
                          </p>
                        </div>
                        <Switch id="markdown" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="assessments">
                  <AccordionTrigger>Assessments</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Quizzes</h5>
                          <p className="text-sm text-muted-foreground">
                            Create interactive quizzes
                          </p>
                        </div>
                        <Switch id="quizzes" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Assignments</h5>
                          <p className="text-sm text-muted-foreground">
                            Create assignments with submissions
                          </p>
                        </div>
                        <Switch id="assignments" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Peer Reviews</h5>
                          <p className="text-sm text-muted-foreground">
                            Enable peer review of assignments
                          </p>
                        </div>
                        <Switch id="peer-reviews" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="downloads">
                  <AccordionTrigger>Downloadable Resources</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      <div>
                        <h5 className="font-medium mb-2">Allowed File Types</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="pdf" defaultChecked />
                            <Label htmlFor="pdf">PDF</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="docx" defaultChecked />
                            <Label htmlFor="docx">Word (.docx)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="xlsx" defaultChecked />
                            <Label htmlFor="xlsx">Excel (.xlsx)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="zip" defaultChecked />
                            <Label htmlFor="zip">Archive (.zip)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="images" defaultChecked />
                            <Label htmlFor="images">Images</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="code" />
                            <Label htmlFor="code">Code Files</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Size Limits</h5>
                        <Select defaultValue="100">
                          <SelectTrigger>
                            <SelectValue placeholder="Select file size limit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 MB</SelectItem>
                            <SelectItem value="50">50 MB</SelectItem>
                            <SelectItem value="100">100 MB</SelectItem>
                            <SelectItem value="500">500 MB</SelectItem>
                            <SelectItem value="1000">1 GB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Placeholder content for other tabs */}
            <TabsContent value="audio" className="border rounded-md p-4">
              <p className="text-muted-foreground">Audio content options coming soon</p>
            </TabsContent>
            
            <TabsContent value="code" className="border rounded-md p-4">
              <p className="text-muted-foreground">Code execution environments coming soon</p>
            </TabsContent>
            
            <TabsContent value="advanced" className="border rounded-md p-4">
              <p className="text-muted-foreground">Advanced features coming soon</p>
            </TabsContent>
            
            <TabsContent value="settings" className="border rounded-md p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Drag-and-Drop Reordering</h5>
                    <p className="text-sm text-muted-foreground">
                      Allow reordering sections and lessons by drag and drop
                    </p>
                  </div>
                  <Switch id="drag-drop" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Linear Progression</h5>
                    <p className="text-sm text-muted-foreground">
                      Require students to complete lessons in order
                    </p>
                  </div>
                  <Switch id="linear" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Content Dripping</h5>
                    <p className="text-sm text-muted-foreground">
                      Release content gradually based on schedule or progress
                    </p>
                  </div>
                  <Switch id="drip" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;
