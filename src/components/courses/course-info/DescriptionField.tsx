
import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import CourseFormField from "./CourseFormField";

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
  maxLength?: number;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({ 
  value, 
  onChange, 
  errors, 
  maxLength = 200 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (maxLength && text.length <= maxLength) {
      onChange(text);
    }
  };

  return (
    <CourseFormField 
      id="description" 
      label="Description" 
      required 
      errors={errors}
      characterCount={{
        current: value.length,
        max: maxLength
      }}
    >
      <Textarea 
        id="description" 
        ref={textareaRef} 
        placeholder="Enter course description" 
        value={value} 
        onChange={handleChange} 
        rows={5} 
        className={errors ? "border-red-500" : ""}
      />
    </CourseFormField>
  );
};

export default DescriptionField;
