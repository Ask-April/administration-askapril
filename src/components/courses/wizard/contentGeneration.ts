
import { toast } from 'sonner';
import { CourseData, CurriculumSection } from './types';

export const generateAIContent = async (
  field: string,
  courseData: CourseData,
  updateCourseData: (data: Partial<CourseData>) => void,
  updateCurriculumSections: (sections: CurriculumSection[]) => void
): Promise<void> => {
  try {
    // Generate different content based on the field
    if (field === "description" && courseData.title) {
      const response = await fetch('https://nbrfwjjlpgeuobknyfst.supabase.co/functions/v1/generate-course-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: courseData.title,
          contentType: 'description'
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate description');
      const data = await response.json();
      let generatedContent = data.content;
      
      // Trim to 200 characters if needed
      if (generatedContent.length > 200) {
        generatedContent = generatedContent.substring(0, 197) + '...';
      }
      
      updateCourseData({ description: generatedContent });
    } 
    else if (field === "curriculum" && courseData.title && courseData.description) {
      const response = await fetch('https://nbrfwjjlpgeuobknyfst.supabase.co/functions/v1/generate-course-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: courseData.title,
          description: courseData.description, 
          contentType: 'curriculum'
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate curriculum');
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
      }
    }
    
    toast.success(`Generated ${field} successfully`);
  } catch (error) {
    console.error(`Error generating ${field}:`, error);
    toast.error(`Failed to generate ${field}. Please try again.`);
    throw error;
  }
};
