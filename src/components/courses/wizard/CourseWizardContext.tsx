import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  CourseData, 
  CurriculumSection, 
  CourseWizardContextValue 
} from './types';
import { validateCurrentStep } from './validation';
import { generateAIContent } from './contentGeneration';
import { saveCurrentStepData, finalizeCourse } from './courseOperations';

const defaultCourseData: CourseData = {
  title: '',
  description: '',
  category: '',
  image: '',
  lessons: 0,
  status: 'draft',
  students: 0
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
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
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

  // Auto-generate content using AI
  const autoGenerateContent = useCallback(async (field: string) => {
    setIsGeneratingContent(true);
    try {
      await generateAIContent(field, courseData, updateCourseData, updateCurriculumSections);
    } catch (error) {
      console.error(`Error in autoGenerateContent:`, error);
    } finally {
      setIsGeneratingContent(false);
    }
  }, [courseData, updateCourseData, updateCurriculumSections]);

  const saveCurrentStep = async (): Promise<boolean> => {
    if (!validateCurrentStepCallback()) {
      return false;
    }

    setIsLoading(true);
    try {
      const courseId = await saveCurrentStepData(
        currentStep, 
        courseData, 
        curriculumSections, 
        createdCourseId
      );
      
      if (courseId && !createdCourseId) {
        setCreatedCourseId(courseId);
      }
      
      setIsLoading(false);
      setHasUnsavedChanges(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const finishWizard = async () => {
    try {
      setIsLoading(true);
      if (createdCourseId) {
        await finalizeCourse(createdCourseId);
        navigate('/courses/overview');
      }
    } catch (error) {
      console.error('Error in finishWizard:', error);
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
        autoGenerateContent,
        isGeneratingContent,
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
