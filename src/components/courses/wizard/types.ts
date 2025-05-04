
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
  pricing_data?: {
    model: 'free' | 'one-time' | 'subscription' | 'payment-plan';
    basePrice?: number;
    currency?: string;
    hasTrialPeriod?: boolean;
    trialDays?: number;
    isDiscountAvailable?: boolean;
    completelyFree?: boolean;
    freeTrial?: boolean;
    freemium?: boolean;
    price?: string; 
    tieredPricing?: boolean;
    basicTier?: string;
    premiumTier?: string;
    installments?: string;
    installmentPeriod?: string;
    requireDownPayment?: boolean;
    downPaymentPercent?: string;
    monthlyPrice?: string;
    annualPrice?: string;
    autoRenewal?: boolean;
  };
}

export interface CurriculumSection {
  id: string;
  title: string;
  position: number;
  lessons: {
    id: string;
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
    duration?: number;
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
  finishWizard: () => Promise<boolean>;
  cancelWizard: () => void;
  steps: { id: string; label: string }[];
  currentStepIndex: number;
  validateCurrentStep: () => boolean;
  formErrors: Record<string, string[]>;
  hasUnsavedChanges: boolean;
  focusFirstInput: boolean;
  setFocusFirstInput: (value: boolean) => void;
}
