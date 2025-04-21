
export interface CourseData {
  title: string;
  description: string;
  category: string;
  image: string;
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
export interface CourseWizardContextValue {
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
  hasUnsavedChanges: boolean;
  focusFirstInput: boolean;
  setFocusFirstInput: (value: boolean) => void;
}
