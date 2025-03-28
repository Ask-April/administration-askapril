
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/courses/ImageUpload";

interface CourseData {
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  lessons: number;
  status: "draft" | "published";
}

interface CourseInfoFormProps {
  courseData: CourseData;
  updateCourseData: (data: Partial<CourseData>) => void;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({
  courseData,
  updateCourseData,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Course Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Title, Description, Category */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              placeholder="Enter course title"
              value={courseData.title}
              onChange={(e) => updateCourseData({ title: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter course description"
              value={courseData.description}
              onChange={(e) => updateCourseData({ description: e.target.value })}
              rows={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={courseData.category}
              onValueChange={(value) => updateCourseData({ category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Right Column: Image Upload */}
        <div className="space-y-2">
          <Label>Course Image</Label>
          <ImageUpload
            value={courseData.image}
            onChange={(url) => updateCourseData({ image: url })}
          />
        </div>
      </div>
      
      {/* Duration and Lessons section - below both columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            placeholder="e.g. 6 hours"
            value={courseData.duration}
            onChange={(e) => updateCourseData({ duration: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lessons">Number of Lessons</Label>
          <Input
            id="lessons"
            type="number"
            min={1}
            value={courseData.lessons}
            onChange={(e) =>
              updateCourseData({ lessons: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfoForm;
