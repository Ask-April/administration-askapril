
import React from "react";
import { Label } from "@/components/ui/label";
import { AlertOctagon } from "lucide-react";

interface CourseFormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  errors?: string[];
  children: React.ReactNode;
  hint?: string;
  className?: string;
  characterCount?: {
    current: number;
    max: number;
  };
}

const CourseFormField: React.FC<CourseFormFieldProps> = ({
  id,
  label,
  required = false,
  errors,
  children,
  hint,
  className = "",
  characterCount
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="flex items-center">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {characterCount && (
          <span className={`text-xs ${characterCount.current > characterCount.max - 20 ? 'text-amber-500' : 'text-muted-foreground'}`}>
            {characterCount.current}/{characterCount.max}
          </span>
        )}
      </div>
      
      {children}
      
      {errors && errors.map((error, index) => (
        <p key={index} className="text-sm text-red-500 mt-1 flex items-center">
          <AlertOctagon className="h-3 w-3 mr-1" />
          {error}
        </p>
      ))}
      
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
};

export default CourseFormField;
