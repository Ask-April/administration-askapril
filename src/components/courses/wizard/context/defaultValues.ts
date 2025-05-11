
import { CourseData } from '../types';

export const defaultCourseData: CourseData = {
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

export const steps = [
  { id: "info", label: "Basic Info" },
  { id: "curriculum", label: "Curriculum" },
  { id: "pricing", label: "Pricing" },
  { id: "settings", label: "Settings" }
];
