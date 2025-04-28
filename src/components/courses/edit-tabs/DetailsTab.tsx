
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "@/components/courses/ImageUpload";
import { toast } from "sonner";
import { Course } from "@/services/types";
import { supabase } from "@/integrations/supabase/client";

interface DetailsTabProps {
  editedCourse: Partial<Course>;
  setEditedCourse: (course: Partial<Course>) => void;
}

interface Category {
  category_id: string;
  name: string;
  description: string;
}

const DetailsTab: React.FC<DetailsTabProps> = ({
  editedCourse,
  setEditedCourse
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const { data, error } = await supabase
          .from('course_category')
          .select('category_id, name, description');
          
        if (error) throw error;
        if (data) setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error("Failed to load categories");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Function to update any course property
  const updateCourseData = (field: string, value: any) => {
    try {
      setEditedCourse({
        ...editedCourse,
        [field]: value
      });
    } catch (error) {
      console.error("Error updating course data:", error);
      toast.error("Failed to update field. Please try again.");
    }
  };

  // Special handler for category to ensure we update both category and category_id
  const handleCategoryChange = (value: string) => {
    updateCourseData('category', value);
    updateCourseData('category_id', value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-6">Course Details</h3>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <div className="flex items-center">
                    <Input 
                      id="title" 
                      value={editedCourse.title || ""} 
                      onChange={e => updateCourseData('title', e.target.value)} 
                      maxLength={60} 
                      placeholder="Enter course title" 
                      className="mt-1" 
                    />
                    <span className="ml-2 text-xs text-muted-foreground">
                      {(editedCourse.title?.length || 0)}/60
                    </span>
                  </div>
                </div>
                
                {/* Subtitle */}
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <div className="flex items-center">
                    <Input 
                      id="subtitle" 
                      value={editedCourse.subtitle || ""} 
                      onChange={e => updateCourseData('subtitle', e.target.value)} 
                      maxLength={120} 
                      placeholder="Enter subtitle" 
                      className="mt-1" 
                    />
                    <span className="ml-2 text-xs text-muted-foreground">
                      {(editedCourse.subtitle?.length || 0)}/120
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={editedCourse.description || ""} 
                    onChange={e => updateCourseData('description', e.target.value)} 
                    placeholder="Enter course description" 
                    className="mt-1" 
                    rows={5} 
                  />
                  <span className="text-xs text-muted-foreground">
                    {(editedCourse.description?.length || 0)}/5000
                  </span>
                </div>
                
                {/* Category */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={editedCourse.category || editedCourse.category_id || ""} 
                    onValueChange={handleCategoryChange}
                    disabled={isLoadingCategories}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={isLoadingCategories ? "Loading categories..." : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length === 0 ? (
                        <SelectItem value="no-categories" disabled>
                          No categories available
                        </SelectItem>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category.category_id} value={category.category_id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Thumbnail */}
              <div>
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Recommended size: 1280×720 pixels
                </p>
                <ImageUpload 
                  value={editedCourse.image || editedCourse.image_url || ""} 
                  onChange={url => {
                    updateCourseData('image', url);
                    updateCourseData('image_url', url);
                  }} 
                />
              </div>
            </div>
            
            {/* Course Settings */}
            <div className="pt-6 mt-6 border-t">
              <h4 className="font-medium mb-4">Course Settings</h4>
              
              <div className="space-y-4">
                {/* Featured Course */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Featured Course</Label>
                    <p className="text-sm text-muted-foreground">
                      Feature this course on your homepage
                    </p>
                  </div>
                  <Switch 
                    id="featured" 
                    checked={editedCourse.featured || false} 
                    onCheckedChange={checked => updateCourseData('featured', checked)} 
                  />
                </div>
                
                {/* Hide Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="hide-price">Hide Price</Label>
                    <p className="text-sm text-muted-foreground">
                      Hide the course price from visitors
                    </p>
                  </div>
                  <Switch 
                    id="hide-price" 
                    checked={!editedCourse.price_visible} 
                    onCheckedChange={checked => updateCourseData('price_visible', !checked)} 
                  />
                </div>
                
                {/* Hide Course */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="hide-course">Hide Course</Label>
                    <p className="text-sm text-muted-foreground">
                      Hide this course from course listings
                    </p>
                  </div>
                  <Switch 
                    id="hide-course" 
                    checked={editedCourse.hidden || false} 
                    onCheckedChange={checked => updateCourseData('hidden', checked)} 
                  />
                </div>
                
                {/* Enable Certificate */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-certificate">Enable Certificate</Label>
                    <p className="text-sm text-muted-foreground">
                      Issue a certificate upon course completion
                    </p>
                  </div>
                  <Switch 
                    id="enable-certificate" 
                    checked={editedCourse.has_certificate || false} 
                    onCheckedChange={checked => updateCourseData('has_certificate', checked)} 
                  />
                </div>
                
                {/* Certificate Upload - Only show if certificates are enabled */}
                {editedCourse.has_certificate && (
                  <div className="ml-6 mt-2">
                    <Label htmlFor="certificate-template">Certificate Template</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a custom certificate template
                    </p>
                    <ImageUpload 
                      value={editedCourse.certificateTemplate || ""} 
                      onChange={url => updateCourseData('certificateTemplate', url)} 
                    />
                  </div>
                )}
                
                {/* Enrollment Limits */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enrollment-limit">Set Enrollment Limits</Label>
                    <p className="text-sm text-muted-foreground">
                      Limit the number of students who can enroll
                    </p>
                  </div>
                  <Switch 
                    id="enrollment-limit" 
                    checked={editedCourse.has_enrollment_limit || false} 
                    onCheckedChange={checked => updateCourseData('has_enrollment_limit', checked)} 
                  />
                </div>
                
                {/* Enrollment Limit Input - Only show if enrollment limits are enabled */}
                {editedCourse.has_enrollment_limit && (
                  <div className="ml-6 mt-2">
                    <Label htmlFor="max-enrollments">Maximum Enrollments</Label>
                    <Input 
                      id="max-enrollments" 
                      type="number" 
                      min="1" 
                      value={editedCourse.max_enrollments || ""} 
                      onChange={e => updateCourseData('max_enrollments', parseInt(e.target.value))} 
                      placeholder="100" 
                      className="mt-1 w-24" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsTab;
