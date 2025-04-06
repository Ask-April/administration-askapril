
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseFormField from "./CourseFormField";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange, errors }) => {
  return (
    <CourseFormField id="category" label="Category" required errors={errors}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={errors ? "border-red-500" : ""}>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Design">Design</SelectItem>
          <SelectItem value="Development">Development</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
          <SelectItem value="Marketing">Marketing</SelectItem>
          <SelectItem value="Photography">Photography</SelectItem>
          <SelectItem value="Music">Music</SelectItem>
          <SelectItem value="Data Science">Data Science</SelectItem>
          <SelectItem value="Personal Development">Personal Development</SelectItem>
        </SelectContent>
      </Select>
    </CourseFormField>
  );
};

export default CategorySelect;
