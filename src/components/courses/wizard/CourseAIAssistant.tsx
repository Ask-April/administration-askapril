
import React, { useState } from "react";
import { Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useCourseWizard } from "./CourseWizardContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const CourseAIAssistant: React.FC = () => {
  const { courseData, updateCourseData } = useCourseWizard();
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    title?: string;
    description?: string;
    category?: string;
    duration?: string;
  }>({});

  const handleGenerateContent = async () => {
    if (!courseData.title && !courseData.description) {
      toast.error("Please enter at least a course title or description to generate content");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate AI generation (in a real implementation, this would call a backend API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const baseTitle = courseData.title || "Modern Web Development";
      const baseDescription = courseData.description || "Introduction to web development";
      
      // Generate enhanced content
      const aiGeneratedContent = {
        title: courseData.title ? courseData.title : "Complete Guide to Modern Web Development",
        description: courseData.description ? 
          courseData.description : 
          "This comprehensive course covers everything you need to know about modern web development. Starting from the fundamentals of HTML, CSS, and JavaScript, you'll progress to advanced topics like React, state management, and backend integration. By the end of this course, you'll be able to build full-stack web applications with confidence.",
        category: "Development",
        duration: "8 hours"
      };
      
      setGeneratedContent(aiGeneratedContent);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const applyGeneratedContent = () => {
    updateCourseData({
      ...courseData,
      ...generatedContent
    });
    setDialogOpen(false);
    toast.success("AI-generated content applied");
  };

  return (
    <>
      <div className="flex items-center justify-center border border-dashed p-4 rounded-lg bg-muted/30">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="gap-2" 
                onClick={handleGenerateContent}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {isLoading ? "Generating..." : "Generate with AI"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Let AI help you generate course content based on your title and description</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>AI-Generated Course Content</AlertDialogTitle>
            <AlertDialogDescription>
              Here's what our AI assistant has created for your course. You can apply these suggestions or continue with your current content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            {generatedContent.title && (
              <div>
                <h4 className="font-medium">Title</h4>
                <p className="text-sm">{generatedContent.title}</p>
              </div>
            )}
            
            {generatedContent.description && (
              <div>
                <h4 className="font-medium">Description</h4>
                <p className="text-sm">{generatedContent.description}</p>
              </div>
            )}
            
            {generatedContent.category && (
              <div>
                <h4 className="font-medium">Category</h4>
                <p className="text-sm">{generatedContent.category}</p>
              </div>
            )}
            
            {generatedContent.duration && (
              <div>
                <h4 className="font-medium">Estimated Duration</h4>
                <p className="text-sm">{generatedContent.duration}</p>
              </div>
            )}
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={applyGeneratedContent}>Apply Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CourseAIAssistant;
