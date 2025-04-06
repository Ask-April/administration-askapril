
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
  const previewContent = [{
    title: "Course Title",
    content: courseData.title || "Your course title will appear here",
    image: courseData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    title: "Course Description",
    content: courseData.description || "Your course description will appear here",
    image: courseData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }];

  // Fixed navigation handlers that directly set a number value instead of a function
  const handlePrevPreview = () => {
    setPreviewIndex(previewIndex > 0 ? previewIndex - 1 : 0);
  };

  const handleNextPreview = () => {
    setPreviewIndex(previewIndex < previewContent.length - 1 ? previewIndex + 1 : previewContent.length - 1);
  };

  return <div>
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
              <Input id="title" ref={titleInputRef} placeholder="Enter course title" value={courseData.title} onChange={e => updateCourseData({
              title: e.target.value
            })} className={formErrors.title ? "border-red-500" : ""} />
              {showAISuggestion && <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute right-3 top-2.5 cursor-pointer">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <button type="button" className="bg-transparent p-1 rounded-full hover:bg-primary/10 transition-colors" onClick={() => autoGenerateContent('description')} disabled={isGeneratingContent}>
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
                </TooltipProvider>}
            </div>
            {formErrors.title && formErrors.title.map((error, index) => <p key={index} className="text-sm text-red-500 mt-1 flex items-center">
                <AlertOctagon className="h-3 w-3 mr-1" />
                {error}
              </p>)}
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
            <Textarea id="description" ref={descriptionTextareaRef} placeholder="Enter course description" value={courseData.description} onChange={handleDescriptionChange} rows={5} className={formErrors.description ? "border-red-500" : ""} />
            {formErrors.description && formErrors.description.map((error, index) => <p key={index} className="text-sm text-red-500 mt-1 flex items-center">
                <AlertOctagon className="h-3 w-3 mr-1" />
                {error}
              </p>)}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center">
              Category
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={courseData.category} onValueChange={value => updateCourseData({
            category: value
          })}>
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
            {formErrors.category && formErrors.category.map((error, index) => <p key={index} className="text-sm text-red-500 mt-1 flex items-center">
                <AlertOctagon className="h-3 w-3 mr-1" />
                {error}
              </p>)}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Estimated Duration</Label>
            <Input id="duration" placeholder="e.g., 6 hours, 2 weeks" value={courseData.duration} onChange={e => updateCourseData({
            duration: e.target.value
          })} />
          </div>
        </div>
        
        {/* Right Column: Image Upload and Preview */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Course Thumbnail</Label>
            <ImageUpload value={courseData.image} onChange={url => updateCourseData({
            image: url
          })} />
            <p className="text-xs text-muted-foreground mt-1">
              Upload a high-quality image that represents your course (16:9 aspect ratio recommended)
            </p>
          </div>
          
          {/* Preview Section */}
          <div className="border rounded-md overflow-hidden">
            <div className="bg-muted/50 p-3 border-b">
              <h3 className="text-sm font-medium">Preview: {previewContent[previewIndex].title}</h3>
            </div>
            <div className="p-4 space-y-4">
              {previewContent[previewIndex].image && (
                <div className="aspect-video rounded-md overflow-hidden bg-muted">
                  <img 
                    src={previewContent[previewIndex].image} 
                    alt="Course preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-sm">{previewContent[previewIndex].content}</p>
            </div>
            <div className="flex justify-between p-2 border-t bg-muted/30">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handlePrevPreview}
                disabled={previewIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleNextPreview}
                disabled={previewIndex === previewContent.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          {/* AI Generation Button */}
          {courseData.title && <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => autoGenerateContent('description')} disabled={isGeneratingContent}>
              <Sparkles className="h-4 w-4" />
              {isGeneratingContent ? "Generating..." : "Generate Description with AI"}
            </Button>}
        </div>
      </div>
    </div>;
};
export default CourseInfoForm;
