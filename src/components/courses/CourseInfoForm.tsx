
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCourseWizard } from "./wizard/CourseWizardContext";
import ImageUpload from "@/components/courses/ImageUpload";
import { ChevronLeft, ChevronRight, Sparkles, AlertOctagon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface CourseData {
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  lessons: number;
  status: "draft" | "published";
}

interface CourseInfoFormProps {
  courseData: CourseData;
  updateCourseData: (data: Partial<CourseData>) => void;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({
  courseData,
  updateCourseData
}) => {
  // Use the wizard context for form validation and AI generation
  const { 
    formErrors, 
    autoGenerateContent, 
    isGeneratingContent,
    previewIndex,
    setPreviewIndex
  } = useCourseWizard();
  
  // References for input fields
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Track character count for description
  const [descriptionChars, setDescriptionChars] = useState(courseData.description.length);
  
  // Show AI suggestion icon after typing a few characters
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  
  // Effect for character count
  useEffect(() => {
    setDescriptionChars(courseData.description.length);
  }, [courseData.description]);
  
  // Effect to check when to show the AI suggestion icon
  useEffect(() => {
    if (courseData.title.length >= 3 && !showAISuggestion) {
      setShowAISuggestion(true);
    } else if (courseData.title.length < 3 && showAISuggestion) {
      setShowAISuggestion(false);
    }
  }, [courseData.title, showAISuggestion]);
  
  // Handle description input change with character limit
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 200) {
      updateCourseData({
        description: text
      });
    }
  };
  
  // Preview content (title and description)
  const previewContent = [
    {
      title: "Course Title",
      content: courseData.title || "Your course title will appear here",
      image: courseData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      title: "Course Description",
      content: courseData.description || "Your course description will appear here",
      image: courseData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Course Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Title, Description, Category */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center justify-between">
              Course Title
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input 
                id="title" 
                ref={titleInputRef}
                placeholder="Enter course title" 
                value={courseData.title} 
                onChange={e => updateCourseData({
                  title: e.target.value
                })} 
                className={formErrors.title ? "border-red-500" : ""}
              />
              {showAISuggestion && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute right-3 top-2.5 cursor-pointer">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <button 
                              type="button" 
                              className="bg-transparent p-1 rounded-full hover:bg-primary/10 transition-colors"
                              onClick={() => autoGenerateContent('description')}
                              disabled={isGeneratingContent}
                            >
                              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                            </button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                              <div>
                                <h4 className="text-sm font-semibold">Generate with AI</h4>
                                <p className="text-sm text-muted-foreground">
                                  Click to generate a course description based on your title.
                                </p>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Generate description with AI</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {formErrors.title && formErrors.title.map((error, index) => (
              <p key={index} className="text-sm text-red-500 mt-1 flex items-center">
                <AlertOctagon className="h-3 w-3 mr-1" />
                {error}
              </p>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">
                Description
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <span className={`text-xs ${descriptionChars > 180 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                {descriptionChars}/200
              </span>
            </div>
            <Textarea 
              id="description" 
              ref={descriptionTextareaRef}
              placeholder="Enter course description" 
              value={courseData.description} 
              onChange={handleDescriptionChange} 
              rows={5} 
              className={formErrors.description ? "border-red-500" : ""}
            />
            {formErrors.description && formErrors.description.map((error, index) => (
              <p key={index} className="text-sm text-red-500 mt-1 flex items-center">
                <AlertOctagon className="h-3 w-3 mr-1" />
                {error}
              </p>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center">
              Category
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select 
              value={courseData.category} 
              onValueChange={value => updateCourseData({
                category: value
              })}
            >
              <SelectTrigger className={formErrors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Personal Development">Personal Development</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.category && formErrors.category.map((error, index) => (
              <p key={index} className="text-sm text-red-500 mt-1 flex items-center">
                <AlertOctagon className="h-3 w-3 mr-1" />
                {error}
              </p>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Estimated Duration</Label>
            <Input 
              id="duration" 
              placeholder="e.g., 6 hours, 2 weeks" 
              value={courseData.duration} 
              onChange={e => updateCourseData({
                duration: e.target.value
              })} 
            />
          </div>
        </div>
        
        {/* Right Column: Image Upload and Preview */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Course Thumbnail</Label>
            <ImageUpload 
              value={courseData.image} 
              onChange={url => updateCourseData({
                image: url
              })} 
            />
            <p className="text-xs text-muted-foreground mt-1">
              Upload a high-quality image that represents your course (16:9 aspect ratio recommended)
            </p>
          </div>
          
          {/* Preview Section */}
          <div className="mt-6 border rounded-md p-4">
            <h3 className="text-sm font-semibold mb-2">Preview</h3>
            <div className="bg-card rounded-md p-4 min-h-[180px]">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">{previewContent[previewIndex].title}</h4>
              <p className="text-base font-medium">{previewContent[previewIndex].content}</p>
              
              {/* Preview Navigation */}
              <div className="flex items-center justify-center mt-4 space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  disabled={previewIndex === 0}
                  onClick={() => setPreviewIndex(prev => Math.max(0, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <span className="text-xs text-muted-foreground">
                  {previewIndex + 1} / {previewContent.length}
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  disabled={previewIndex === previewContent.length - 1}
                  onClick={() => setPreviewIndex(prev => Math.min(previewContent.length - 1, prev + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* AI Generation Button */}
          {courseData.title && (
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={() => autoGenerateContent('description')}
              disabled={isGeneratingContent}
            >
              <Sparkles className="h-4 w-4" />
              {isGeneratingContent ? "Generating..." : "Generate Description with AI"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfoForm;
