
import React from "react";
import { Input } from "@/components/ui/input";
import CourseFormField from "./CourseFormField";

interface DurationFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const DurationField: React.FC<DurationFieldProps> = ({ value, onChange }) => {
  return (
    <CourseFormField id="duration" label="Estimated Duration">
      <Input 
        id="duration" 
        placeholder="e.g., 6 hours, 2 weeks" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </CourseFormField>
  );
};

export default DurationField;
