
import { useEnrollmentData } from './useEnrollmentData';
import { useRevenueData } from './useRevenueData';
import { useCompletionData } from './useCompletionData';
import { usePopularCoursesData } from './usePopularCoursesData';

export { EnrollmentData } from './useEnrollmentData';
export { RevenueData } from './useRevenueData';
export { CompletionData } from './useCompletionData';
export { CoursePopularityData } from './usePopularCoursesData';

export const useOverviewCharts = () => {
  const enrollmentQuery = useEnrollmentData();
  const revenueQuery = useRevenueData();
  const completionsQuery = useCompletionData();
  const popularCoursesQuery = usePopularCoursesData();

  return {
    enrollmentData: enrollmentQuery.data || [],
    isEnrollmentLoading: enrollmentQuery.isLoading,
    enrollmentError: enrollmentQuery.error,
    
    revenueData: revenueQuery.data || [],
    isRevenueLoading: revenueQuery.isLoading,
    revenueError: revenueQuery.error,
    
    completionData: completionsQuery.data || [],
    isCompletionLoading: completionsQuery.isLoading,
    completionError: completionsQuery.error,
    
    popularCoursesData: popularCoursesQuery.data || [],
    isPopularCoursesLoading: popularCoursesQuery.isLoading,
    popularCoursesError: popularCoursesQuery.error,
  };
};
