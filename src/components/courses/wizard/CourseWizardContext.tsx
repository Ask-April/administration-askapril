
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  CourseData, 
  CurriculumSection, 
  CourseWizardContextValue 
} from './types';
import { validateCurrentStep } from './validation';
import { courseService } from '@/services/course';

const defaultCourseData: CourseData = {
  title: '',
  description: '',
  category: '',
  image: '',
  lessons: 0,
  status: 'draft',
  students: 0,
  pricing_data: {
    model: 'one-time',
    basePrice: 99,
    currency: 'USD'
  }
};

const CourseWizardContext = createContext<CourseWizardContextValue | undefined>(undefined);

export const CourseWizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<string>('info');
  const [courseData, setCourseData] = useState<CourseData>(defaultCourseData);
  const [curriculumSections, setCurriculumSections] = useState<CurriculumSection[]>([]);
  const [createdCourseId, setCreatedCourseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
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
  const validateCurrentStepCallback = useCallback(() => {
    const validation = validateCurrentStep(currentStep, courseData, curriculumSections);
    setFormErrors(validation.errors);
    return validation.isValid;
  }, [currentStep, courseData, curriculumSections]);

  // Save current step - now just validates and updates UI state without DB calls (except for final step)
  const saveCurrentStep = async (): Promise<boolean> => {
    if (!validateCurrentStepCallback()) {
      return false;
    }

    setIsLoading(true);
    try {
      // Only proceed with UI state updates, no DB operations until final step
      setIsLoading(false);
      setHasUnsavedChanges(false);
      return true;
    } catch (error) {
      console.error('Error in saveCurrentStep:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Modified to create the course on the final step
  const finishWizard = async (): Promise<boolean> => {
    if (!validateCurrentStepCallback()) {
      return false;
    }

    try {
      setIsLoading(true);
      
      // Create the course - final submission with all collected data
      const course = await courseService.createCourse({
        title: courseData.title,
        description: courseData.description,
        category: courseData.category,
        image: courseData.image,
        status: courseData.status,
        lessons: courseData.lessons,
        students: 0
      });

      // If we successfully created the course and have curriculum sections, save those too
      if (course && course.course_id && curriculumSections.length > 0) {
        try {
          // Transform curriculum sections as needed by the API
          const transformedSections = curriculumSections.map(section => ({
            id: section.id || crypto.randomUUID(),
            course_id: course.course_id,
            title: section.title,
            position: section.position,
            lessons: section.lessons.map((lesson) => ({
              id: lesson.id || crypto.randomUUID(),
              section_id: section.id,
              title: lesson.title,
              type: lesson.type || 'video',
              position: lesson.position,
              content: lesson.content,
              content_url: lesson.content_url,
              video_url: lesson.video_url,
              duration: lesson.duration || 0,
              is_preview: lesson.is_preview || false,
              is_draft: lesson.is_draft || false,
              is_compulsory: lesson.is_compulsory || true,
              enable_discussion: lesson.enable_discussion || false
            }))
          }));

          // Save curriculum if we have any sections
          if (transformedSections.length > 0) {
            await courseService.saveCurriculum(course.course_id, transformedSections);
          }
        } catch (error) {
          console.error('Error saving curriculum:', error);
          toast.error('Course created but there was an issue saving the curriculum');
        }
      }

      toast.success('Course created successfully!');
      navigate('/courses/overview');
      return true;
    } catch (error) {
      console.error('Error in finishWizard:', error);
      toast.error('Failed to create course. Please try again.');
      setIsLoading(false);
      return false;
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
        validateCurrentStep: validateCurrentStepCallback,
        formErrors,
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
