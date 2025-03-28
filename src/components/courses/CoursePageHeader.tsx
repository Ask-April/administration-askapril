
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoursePageHeaderProps {
  title: string;
  backPath: string;
}

const CoursePageHeader: React.FC<CoursePageHeaderProps> = ({ title, backPath }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        className="mr-2"
        onClick={() => navigate(backPath)}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default CoursePageHeader;
