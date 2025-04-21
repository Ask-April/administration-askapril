
// Direct exports from individual files
export { getPublicCourses } from './getPublicCourses';
export { getCourseById } from './getCourseById';
export { getCoursesByCategory } from './getCoursesByCategory';
export { createCourse } from './createCourse';
export { updateCourse } from './updateCourse';
export { deleteCourse } from './deleteCourse';

// Create an object with all exports for backward compatibility
const courseManagementService = {
  getPublicCourses,
  getCourseById,
  getCoursesByCategory,
  createCourse,
  updateCourse,
  deleteCourse
};

export { courseManagementService };
