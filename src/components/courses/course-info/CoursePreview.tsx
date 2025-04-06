
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PreviewContent {
  title: string;
  content: string;
  image: string;
}

interface CoursePreviewProps {
  previewContent: PreviewContent[];
  previewIndex: number;
  setPreviewIndex: (index: number) => void;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ 
  previewContent, 
  previewIndex, 
  setPreviewIndex 
}) => {
  const handlePrevPreview = () => {
    setPreviewIndex(previewIndex > 0 ? previewIndex - 1 : 0);
  };

  const handleNextPreview = () => {
    setPreviewIndex(
      previewIndex < previewContent.length - 1 
      ? previewIndex + 1 
      : previewContent.length - 1
    );
  };
  
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted/50 p-3 border-b">
        <h3 className="text-sm font-medium">
          Preview: {previewContent[previewIndex].title}
        </h3>
      </div>
      
      <div className="p-4 space-y-4">
        {previewContent[previewIndex].image && (
          <div className="aspect-video rounded-md overflow-hidden bg-muted">
            <img 
              src={previewContent[previewIndex].image} 
              alt="Course preview" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <p className="text-sm">{previewContent[previewIndex].content}</p>
      </div>
      
      <div className="flex justify-between p-2 border-t bg-muted/30">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handlePrevPreview}
          disabled={previewIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleNextPreview}
          disabled={previewIndex === previewContent.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default CoursePreview;
