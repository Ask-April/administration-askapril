
import React from "react";
import { useCourseWizard } from "./wizard/context";
import { CourseData } from "./course-info/types"; 
import TitleField from "./course-info/TitleField";
import DescriptionField from "./course-info/DescriptionField";
import CategorySelect from "./course-info/CategorySelect";
import CourseImageUpload from "./course-info/CourseImageUpload";

interface CourseInfoFormProps {
  courseData: CourseData;
  updateCourseData: (data: Partial<CourseData>) => void;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({
  courseData,
  updateCourseData
}) => {
  const { formErrors } = useCourseWizard();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Course Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Title, Description, Category */}
        <div className="space-y-4">
          <TitleField
            value={courseData.title}
            onChange={(value) => updateCourseData({ title: value })}
            errors={formErrors.title}
          />
          <DescriptionField
            value={courseData.description}
            onChange={(value) => updateCourseData({ description: value })}
            errors={formErrors.description}
            maxLength={200}
          />
          <CategorySelect
            value={courseData.category}
            onChange={(value) => updateCourseData({ category: value })}
            errors={formErrors.category}
          />
        </div>
        {/* Right Column: Image Upload */}
        <div className="space-y-6">
          <CourseImageUpload
            value={courseData.image}
            onChange={(url) => updateCourseData({ image: url })}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfoForm;
