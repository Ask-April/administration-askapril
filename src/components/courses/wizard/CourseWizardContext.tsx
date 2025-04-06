
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { courseService } from '@/services/course';
import { z } from 'zod';

export interface CourseData {
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  lessons: number;
  status: 'draft' | 'published';
  students: number;
}

export interface CurriculumSection {
  title: string;
  position: number;
  lessons: {
    title: string;
    type: string;
    content?: string;
    videoUrl?: string;
    contentUrl?: string;
    isPreview?: boolean;
    isDraft?: boolean;
    isCompulsory?: boolean;
    enableDiscussion?: boolean;
    position: number;
  }[];
}

interface CourseWizardContextValue {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  courseData: CourseData;
  updateCourseData: (data: Partial<CourseData>) => void;
  curriculumSections: CurriculumSection[];
  updateCurriculumSections: (sections: CurriculumSection[]) => void;
  createdCourseId: string | null;
  isLoading: boolean;
  saveCurrentStep: () => Promise<boolean>;
  finishWizard: () => Promise<void>;
  cancelWizard: () => void;
  steps: { id: string; label: string }[];
  currentStepIndex: number;
  validateCurrentStep: () => boolean;
  formErrors: Record<string, string[]>;
  autoGenerateContent: (field: string) => void;
  isGeneratingContent: boolean;
  previewIndex: number;
  setPreviewIndex: (index: number) => void;
  hasUnsavedChanges: boolean;
  focusFirstInput: boolean;
  setFocusFirstInput: (value: boolean) => void;
}

const defaultCourseData: CourseData = {
  title: '',
  description: '',
  category: '',
  image: '',
  duration: '',
  lessons: 0,
  status: 'draft',
  students: 0
};

const CourseWizardContext = createContext<CourseWizardContextValue | undefined>(undefined);

// Validation schemas
const courseInfoSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }).max(200, { message: "Description cannot exceed 200 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  image: z.string().optional(),
  duration: z.string().optional(),
});

const curriculumSchema = z.object({
  sections: z.array(z.object({
    title: z.string().min(1, { message: "Section title is required" }),
    lessons: z.array(z.object({
      title: z.string().min(1, { message: "Lesson title is required" }),
      type: z.string().min(1, { message: "Lesson type is required" }),
    }))
  })).min(1, { message: "At least one section is required" })
});

export const CourseWizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<string>('info');
  const [courseData, setCourseData] = useState<CourseData>(defaultCourseData);
  const [curriculumSections, setCurriculumSections] = useState<CurriculumSection[]>([]);
  const [createdCourseId, setCreatedCourseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [focusFirstInput, setFocusFirstInput] = useState(false);

  const steps = [
    { id: "info", label: "Basic Info" },
    { id: "curriculum", label: "Curriculum" },
    { id: "pricing", label: "Pricing" },
    { id: "settings", label: "Settings" }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const updateCourseData = useCallback((data: Partial<CourseData>) => {
    setCourseData(prev => ({ ...prev, ...data }));
    setHasUnsavedChanges(true);
  }, []);

  const updateCurriculumSections = useCallback((sections: CurriculumSection[]) => {
    setCurriculumSections(sections);
    // Update the total lesson count
    const totalLessons = sections.reduce((count, section) => count + section.lessons.length, 0);
    updateCourseData({ lessons: totalLessons });
    setHasUnsavedChanges(true);
  }, [updateCourseData]);

  // Validate the current step
  const validateCurrentStep = useCallback(() => {
    let isValid = true;
    const errors: Record<string, string[]> = {};

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

    setFormErrors(errors);
    return isValid;
  }, [currentStep, courseData, curriculumSections]);

  // Auto-generate content using AI
  const autoGenerateContent = useCallback(async (field: string) => {
    setIsGeneratingContent(true);
    try {
      // Simulate AI content generation (replace with actual implementation)
      let generatedContent = "";
      
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
        generatedContent = data.content;
        
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
    } finally {
      setIsGeneratingContent(false);
    }
  }, [courseData, updateCourseData, updateCurriculumSections]);

  const saveCurrentStep = async (): Promise<boolean> => {
    if (!validateCurrentStep()) {
      return false;
    }

    setIsLoading(true);
    try {
      if (currentStep === 'info') {
        if (!createdCourseId) {
          // Create the course
          const course = await courseService.createCourse({
            title: courseData.title,
            description: courseData.description,
            category: courseData.category,
            image: courseData.image,
            duration: courseData.duration || '0 hours',
            status: courseData.status,
            lessons: courseData.lessons,
            students: 0
          });
          
          setCreatedCourseId(course.course_id);
          toast.success('Course information saved!');
        } else {
          // Update existing course
          await courseService.updateCourse(createdCourseId, courseData);
          toast.success('Course information updated!');
        }
      } else if (currentStep === 'curriculum' && createdCourseId) {
        if (curriculumSections.length > 0) {
          await courseService.saveCurriculum(createdCourseId, curriculumSections);
          toast.success('Curriculum saved successfully!');
        } else {
          toast.info('No curriculum sections to save.');
        }
      } else if (currentStep === 'pricing' && createdCourseId) {
        // Save pricing information
        await courseService.updateCourse(createdCourseId, {
          duration: courseData.duration
        });
        toast.success('Pricing information saved!');
      } else if (currentStep === 'settings' && createdCourseId) {
        // Save settings information
        await courseService.updateCourse(createdCourseId, {
          status: courseData.status,
          lessons: courseData.lessons
        });
        toast.success('Settings saved!');
      }
      setIsLoading(false);
      setHasUnsavedChanges(false);
      return true;
    } catch (error) {
      console.error(`Error saving ${currentStep}:`, error);
      toast.error(`Failed to save ${currentStep}. Please try again.`);
      setIsLoading(false);
      return false;
    }
  };

  const finishWizard = async () => {
    try {
      setIsLoading(true);
      if (createdCourseId) {
        await courseService.updateCourse(createdCourseId, {
          status: 'published'
        });
        
        toast.success('Course created successfully!');
        navigate('/courses/overview');
      }
    } catch (error) {
      console.error('Error finalizing course:', error);
      toast.error('Failed to finalize course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelWizard = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/courses/overview');
      }
    } else {
      navigate('/courses/overview');
    }
  };
  
  // Effect for autofocus on curriculum step
  useEffect(() => {
    if (currentStep === 'curriculum') {
      setFocusFirstInput(true);
    } else {
      setFocusFirstInput(false);
    }
  }, [currentStep]);

  return (
    <CourseWizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        courseData,
        updateCourseData,
        curriculumSections,
        updateCurriculumSections,
        createdCourseId,
        isLoading,
        saveCurrentStep,
        finishWizard,
        cancelWizard,
        steps,
        currentStepIndex,
        validateCurrentStep,
        formErrors,
        autoGenerateContent,
        isGeneratingContent,
        previewIndex,
        setPreviewIndex,
        hasUnsavedChanges,
        focusFirstInput,
        setFocusFirstInput
      }}
    >
      {children}
    </CourseWizardContext.Provider>
  );
};

export const useCourseWizard = () => {
  const context = useContext(CourseWizardContext);
  if (context === undefined) {
    throw new Error('useCourseWizard must be used within a CourseWizardProvider');
  }
  return context;
};
