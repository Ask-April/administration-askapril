
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseFormField from "./CourseFormField";
import { supabase } from "@/integrations/supabase/client";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
}

interface CategoryDBRow {
  category_id: string;
  name: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange, errors }) => {
  const [categories, setCategories] = useState<CategoryDBRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('course_category')
        .select('category_id, name');
      if (data) setCategories(data);
      setIsLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <CourseFormField id="category" label="Category" required errors={errors}>
      <Select value={value} onValueChange={onChange} disabled={isLoading}>
        <SelectTrigger className={errors ? "border-red-500" : ""}>
          <SelectValue placeholder={isLoading ? "Loading categories..." : "Select a category"} />
        </SelectTrigger>
        <SelectContent>
          {categories.length === 0 && (
            <SelectItem value="" disabled>
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
