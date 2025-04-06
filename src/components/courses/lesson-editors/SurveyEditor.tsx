
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface SurveyEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const SurveyEditor: React.FC<SurveyEditorProps> = ({ 
  content, 
  onContentChange 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="survey-editor">Survey Content</Label>
        <Textarea
          id="survey-editor"
          placeholder="Enter your survey questions or embed code here..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="min-h-[200px]"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Enter your survey content or embed code from third-party survey tools.
      </p>
    </div>
  );
};

export default SurveyEditor;
