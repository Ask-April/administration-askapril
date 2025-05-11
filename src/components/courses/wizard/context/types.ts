
import { ReactNode } from 'react';
import { CourseData, CurriculumSection } from '../types';

export interface CourseWizardProviderProps {
  children: ReactNode;
}

export interface SaveCurriculumOptions {
  courseId: string;
  sections: CurriculumSection[];
}
