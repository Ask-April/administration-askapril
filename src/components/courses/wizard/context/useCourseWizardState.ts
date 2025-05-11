
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { validateCurrentStep } from '../validation';
import { CourseData, CurriculumSection } from '../types';
import { defaultCourseData, steps } from './defaultValues';
import { courseService } from '@/services/course';

export const useCourseWizardState = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<string>('info');
  const [courseData, setCourseData] = useState<CourseData>(defaultCourseData);
  const [curriculumSections, setCurriculumSections] = useState<CurriculumSection[]>([]);
  const [createdCourseId, setCreatedCourseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [focusFirstInput, setFocusFirstInput] = useState(false);

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

  // Effect for autofocus on curriculum step
  useEffect(() => {
    if (currentStep === 'curriculum') {
      setFocusFirstInput(true);
    } else {
      setFocusFirstInput(false);
    }
  }, [currentStep]);

  return {
    currentStep,
    setCurrentStep,
    courseData,
    setCourseData,
    updateCourseData,
    curriculumSections,
    setCurriculumSections,
    updateCurriculumSections,
    createdCourseId,
    setCreatedCourseId,
    isLoading,
    setIsLoading,
    formErrors,
    setFormErrors,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    focusFirstInput,
    setFocusFirstInput,
    steps,
    currentStepIndex,
    validateCurrentStep: validateCurrentStepCallback,
    navigate,
  };
};
