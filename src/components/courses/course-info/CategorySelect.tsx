
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
  const [categoryNames, setCategoryNames] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const data = await categoryService.getCategories();
        setCategories(data || []);
        
        // Create a mapping of category IDs to names
        const namesMap: Record<string, string> = {};
        data?.forEach(cat => {
          namesMap[cat.category_id] = cat.name;
        });
        setCategoryNames(namesMap);
        
        console.log("Fetched categories:", data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCategories();
  }, []);

  // Get the display name for the selected category
  const getDisplayName = (categoryId: string): string => {
    return categoryNames[categoryId] || categoryId;
  };

  return (
    <CourseFormField id="category" label="Category" required errors={errors}>
      <Select value={value} onValueChange={onChange} disabled={isLoading}>
        <SelectTrigger className={errors?.length ? "border-red-500" : ""}>
          <SelectValue placeholder={isLoading ? "Loading categories..." : "Select a category"}>
            {value ? getDisplayName(value) : "Select a category"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {categories.length === 0 && (
            <SelectItem value="no-categories" disabled>
              No categories available
            </SelectItem>
          )}
          {categories.map((cat) => (
            <SelectItem key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CourseFormField>
  );
};

export default CategorySelect;
