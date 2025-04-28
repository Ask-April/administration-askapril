
export interface CourseData {
  title: string;
  description: string;
  category: string;
  image: string;
  lessons: number;
  status: 'draft' | 'published';
  students: number;
  created_at?: string;
  updated_at?: string;
}

export interface CurriculumSection {
  id?: string; // Added id property
  title: string;
  position: number;
  lessons: {
    id?: string; // Added id property
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
    duration?: number; // Added duration property
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
  finishWizard: () => Promise<boolean>; // Changed return type to match implementation
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
