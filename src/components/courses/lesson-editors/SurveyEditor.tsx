
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardList } from "lucide-react";

interface SurveyEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const SurveyEditor: React.FC<SurveyEditorProps> = ({ content, onContentChange }) => {
  return (
    <div className="space-y-2">
      <div className="text-center p-4 border-2 border-dashed rounded-md">
        <ClipboardList className="w-10 h-10 mx-auto text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">Survey builder coming soon</p>
        <p className="text-xs text-muted-foreground">You'll be able to add questions after creating this lesson</p>
      </div>
      <Textarea
        placeholder="Add notes about this survey (optional)"
        rows={3}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </div>
  );
};

export default SurveyEditor;
