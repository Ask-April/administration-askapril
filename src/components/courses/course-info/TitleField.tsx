
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import CourseFormField from "./CourseFormField";

interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
}

const TitleField: React.FC<TitleFieldProps> = ({ 
  value, 
  onChange, 
  errors
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <CourseFormField id="title" label="Course Title" required errors={errors}>
      <div className="relative">
        <Input 
          id="title" 
          ref={inputRef} 
          placeholder="Enter course title" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className={errors ? "border-red-500" : ""}
        />
      </div>
    </CourseFormField>
  );
};

export default TitleField;
