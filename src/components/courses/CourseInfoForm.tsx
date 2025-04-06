
import React, { useState } from "react";
import { useCourseWizard } from "./wizard/CourseWizardContext";
import { CourseData } from "./course-info/types"; 

// Import sub-components
import TitleField from "./course-info/TitleField";
import DescriptionField from "./course-info/DescriptionField";
import CategorySelect from "./course-info/CategorySelect";
import DurationField from "./course-info/DurationField";
import CourseImageUpload from "./course-info/CourseImageUpload";
import CoursePreview from "./course-info/CoursePreview";
import AIGenerateButton from "./course-info/AIGenerateButton";

interface CourseInfoFormProps {
  courseData: CourseData;
  updateCourseData: (data: Partial<CourseData>) => void;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({
  courseData,
  updateCourseData
}) => {
  // Use the wizard context for form validation and AI generation
  const {
    formErrors,
    autoGenerateContent,
    isGeneratingContent,
    previewIndex,
    setPreviewIndex
  } = useCourseWizard();

  // Preview content (title and description)
  const previewContent = [
    {
      title: "Course Title",
      content: courseData.title || "Your course title will appear here",
      image: courseData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }, 
    {
      title: "Course Description",
      content: courseData.description || "Your course description will appear here",
      image: courseData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];

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
            onGenerateContent={() => autoGenerateContent('description')}
            isGeneratingContent={isGeneratingContent}
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
          
          <DurationField
            value={courseData.duration}
            onChange={(value) => updateCourseData({ duration: value })}
          />
        </div>
        
        {/* Right Column: Image Upload and Preview */}
        <div className="space-y-6">
          <CourseImageUpload
            value={courseData.image}
            onChange={(url) => updateCourseData({ image: url })}
          />
          
          {/* Preview Section */}
          <CoursePreview
            previewContent={previewContent}
            previewIndex={previewIndex}
            setPreviewIndex={setPreviewIndex}
          />
          
          {/* AI Generation Button */}
          {courseData.title && (
            <AIGenerateButton
              onClick={() => autoGenerateContent('description')}
              isGenerating={isGeneratingContent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfoForm;
