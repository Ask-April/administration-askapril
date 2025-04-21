
import { toast } from 'sonner';
import { CourseData, CurriculumSection } from './types';

export const generateAIContent = async (
  field: string,
  courseData: CourseData,
  updateCourseData: (data: Partial<CourseData>) => void,
  updateCurriculumSections: (sections: CurriculumSection[]) => void
): Promise<void> => {
  try {
    // Validate the course data
    if (field === "description" && (!courseData.title || courseData.title.length < 3)) {
      toast.error("Please enter a course title with at least 3 characters");
      return;
    }

    if (field === "curriculum" && (!courseData.title || !courseData.description)) {
      toast.error("Both title and description are required to generate curriculum");
      return;
    }

    // Generate different content based on the field
    if (field === "description" && courseData.title) {
      try {
        const response = await fetch('https://nbrfwjjlpgeuobknyfst.supabase.co/functions/v1/generate-course-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            title: courseData.title,
            contentType: 'description'
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate description');
        }
        
        const data = await response.json();
        let generatedContent = data.content;
        
        // Trim to 200 characters if needed
        if (generatedContent.length > 200) {
          generatedContent = generatedContent.substring(0, 197) + '...';
        }
        
        updateCourseData({ description: generatedContent });
        toast.success('Generated description successfully');
      } catch (error) {
        console.error("Error generating description:", error);
        toast.error(`Failed to generate description: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } 
    else if (field === "curriculum" && courseData.title && courseData.description) {
      try {
        const response = await fetch('https://nbrfwjjlpgeuobknyfst.supabase.co/functions/v1/generate-course-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: courseData.title,
            description: courseData.description, 
            contentType: 'curriculum'
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate curriculum');
        }
        
        const data = await response.json();
        
        if (data.sections && Array.isArray(data.sections)) {
          const formattedSections = data.sections.map((section: any, sectionIndex: number) => ({
            title: section.title,
            position: sectionIndex,
            lessons: section.lessons.map((lesson: any, lessonIndex: number) => ({
              title: lesson.title,
              type: lesson.type || 'text',
              position: lessonIndex,
              isPreview: false,
              isDraft: true,
              isCompulsory: true,
              enableDiscussion: true
            }))
          }));
          
          updateCurriculumSections(formattedSections);
          toast.success('Generated curriculum successfully');
        } else {
          throw new Error('Invalid curriculum data received');
        }
      } catch (error) {
        console.error("Error generating curriculum:", error);
        toast.error(`Failed to generate curriculum: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  } catch (error) {
    console.error(`Error generating ${field}:`, error);
    toast.error(`Failed to generate ${field}. Please try again later.`);
  }
};
