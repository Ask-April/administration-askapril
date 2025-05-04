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
  courseData: any, 
  curriculumSections: any[]
): { isValid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};
  
  switch (currentStep) {
    case "info": {
      // Validate basic course info
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
      
      break;
    }
    case "curriculum": {
      // Validate curriculum
      try {
        curriculumSchema.parse({ sections: curriculumSections });
      } catch (error) {
        if (error instanceof z.ZodError) {
          isValid = false;
          errors.curriculum = error.errors.map(e => e.message);
        }
      }
      
      break;
    }
    case "pricing": {
      // Validate pricing information
      if (courseData.pricing_data?.model === 'one-time' || courseData.pricing_data?.model === 'subscription' || courseData.pricing_data?.model === 'payment-plan') {
        // Validate base price is a valid number for paid models
        const basePrice = parseFloat(String(courseData.pricing_data?.basePrice));
        if (isNaN(basePrice) || basePrice < 0) {
          errors.basePrice = ['Please enter a valid price'];
        }
        
        // If it's a subscription with trial, validate trial days
        if (courseData.pricing_data?.model === 'subscription' && courseData.pricing_data?.hasTrialPeriod) {
          const trialDays = parseInt(String(courseData.pricing_data?.trialDays));
          if (isNaN(trialDays) || trialDays <= 0) {
            errors.trialDays = ['Please enter a valid number of trial days'];
          }
        }
        
        // If it's a payment plan, validate installments
        if (courseData.pricing_data?.model === 'payment-plan') {
          const installments = parseInt(String(courseData.pricing_data?.installments));
          if (isNaN(installments) || installments <= 0) {
            errors.installments = ['Please enter a valid number of installments'];
          }
        }
      }
      
      break;
    }
    case "settings": {
      // No specific validation for settings step
      break;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
