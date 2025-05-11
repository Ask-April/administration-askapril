
import React, { createContext, useContext } from 'react';
import { toast } from 'sonner';
import { CourseWizardContextValue } from '../types';
import { CourseWizardProviderProps } from './types';
import { useCourseWizardState } from './useCourseWizardState';
import { saveCourse, saveCurriculum } from './wizardOperations';

const CourseWizardContext = createContext<CourseWizardContextValue | undefined>(undefined);

export const CourseWizardProvider: React.FC<CourseWizardProviderProps> = ({ children }) => {
  const state = useCourseWizardState();
  
  const { 
    courseData, 
    curriculumSections, 
    validateCurrentStep: validateCurrentStepCallback,
    setIsLoading,
    setHasUnsavedChanges,
    navigate,
    currentStep
  } = state;

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
      
      // Create the course
      const { success, courseId } = await saveCourse(courseData, setIsLoading);
      
      if (!success || !courseId) {
        toast.error('Failed to create course. Please try again.');
        return false;
      }

      // If we successfully created the course and have curriculum sections, save those too
      if (curriculumSections.length > 0) {
        const curriculumSaved = await saveCurriculum({
          courseId,
          sections: curriculumSections
        });
        
        if (!curriculumSaved) {
          toast.error('Course created but there was an issue saving the curriculum');
        }
      }

      toast.success('Course created successfully!');
      navigate('/courses/overview');
      return true;
    } catch (error) {
      console.error('Error in finishWizard:', error);
      toast.error('Failed to create course. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelWizard = () => {
    if (state.hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/courses/overview');
      }
    } else {
      navigate('/courses/overview');
    }
  };

  return (
    <CourseWizardContext.Provider
      value={{
        ...state,
        saveCurrentStep,
        finishWizard,
        cancelWizard
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
