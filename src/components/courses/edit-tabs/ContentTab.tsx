
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import { ContentOrganization } from "@/components/courses/content";

interface ContentTabProps {
  editedCourse?: any;
  setEditedCourse?: (course: any) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({ 
  editedCourse, 
  setEditedCourse 
}) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Course Organization</h3>
          </div>
          <ContentOrganization />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;
