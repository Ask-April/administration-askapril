
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseFormField from "./CourseFormField";
import { categoryService } from "@/services/course/categoryService";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
}

interface CategoryData {
  category_id: string;
  name: string;
  description: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange, errors }) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const data = await categoryService.getCategories();
        setCategories(data || []);
        console.log("Fetched categories:", data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCategories();
  }, []);

  return (
    <CourseFormField id="category" label="Category" required errors={errors}>
      <Select value={value} onValueChange={onChange} disabled={isLoading}>
        <SelectTrigger className={errors?.length ? "border-red-500" : ""}>
          <SelectValue placeholder={isLoading ? "Loading categories..." : "Select a category"} />
        </SelectTrigger>
        <SelectContent>
          {categories.length === 0 && (
            <SelectItem value="no-categories" disabled>
              No categories available
            </SelectItem>
          )}
          {categories.map((cat) => (
            <SelectItem key={cat.category_id} value={cat.category_id}>
              {cat.name} {cat.description && `- ${cat.description}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CourseFormField>
  );
};

export default CategorySelect;
