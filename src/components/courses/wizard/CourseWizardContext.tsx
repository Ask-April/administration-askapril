
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { courseService } from '@/services/course';

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

export const CourseWizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<string>('info');
  const [courseData, setCourseData] = useState<CourseData>(defaultCourseData);
  const [curriculumSections, setCurriculumSections] = useState<CurriculumSection[]>([]);
  const [createdCourseId, setCreatedCourseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: "info", label: "Basic Info" },
    { id: "curriculum", label: "Curriculum" },
    { id: "pricing", label: "Pricing" },
    { id: "settings", label: "Settings" }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const updateCourseData = (data: Partial<CourseData>) => {
    setCourseData(prev => ({ ...prev, ...data }));
  };

  const updateCurriculumSections = (sections: CurriculumSection[]) => {
    setCurriculumSections(sections);
    // Update the total lesson count
    const totalLessons = sections.reduce((count, section) => count + section.lessons.length, 0);
    updateCourseData({ lessons: totalLessons });
  };

  const saveCurrentStep = async (): Promise<boolean> => {
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
    navigate('/courses/overview');
  };

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
        currentStepIndex
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
