
import { z } from 'zod';
import { CourseData, CurriculumSection } from './types';

// Validation schemas
export const courseInfoSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }).max(200, { message: "Description cannot exceed 200 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  image: z.string().optional(),
  duration: z.string().optional(),
});

export const curriculumSchema = z.object({
  sections: z.array(z.object({
    title: z.string().min(1, { message: "Section title is required" }),
    lessons: z.array(z.object({
      title: z.string().min(1, { message: "Lesson title is required" }),
      type: z.string().min(1, { message: "Lesson type is required" }),
    }))
  })).min(1, { message: "At least one section is required" })
});

export const validateCurrentStep = (
  currentStep: string, 
  courseData: CourseData, 
  curriculumSections: CurriculumSection[]
): { isValid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};
  let isValid = true;

  if (currentStep === 'info') {
    try {
      courseInfoSchema.parse(courseData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        isValid = false;
        errors.info = error.errors.map(e => e.message);
        
        // Set specific field errors
        error.errors.forEach(e => {
          const path = e.path.join('.');
          if (!errors[path]) errors[path] = [];
          errors[path].push(e.message);
        });
      }
    }
  } else if (currentStep === 'curriculum') {
    try {
      curriculumSchema.parse({ sections: curriculumSections });
    } catch (error) {
      if (error instanceof z.ZodError) {
        isValid = false;
        errors.curriculum = error.errors.map(e => e.message);
      }
    }
  }

  return { isValid, errors };
};
