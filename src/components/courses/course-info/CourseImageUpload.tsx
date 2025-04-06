
import React from "react";
import ImageUpload from "@/components/courses/ImageUpload";
import CourseFormField from "./CourseFormField";

interface CourseImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const CourseImageUpload: React.FC<CourseImageUploadProps> = ({ value, onChange }) => {
  return (
    <CourseFormField 
      id="thumbnail" 
      label="Course Thumbnail"
      hint="Upload a high-quality image that represents your course (16:9 aspect ratio recommended)"
    >
      <ImageUpload 
        value={value} 
        onChange={onChange} 
      />
    </CourseFormField>
  );
};

export default CourseImageUpload;
