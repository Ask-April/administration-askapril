
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface RichTextEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onContentChange }) => {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Enter rich text content here..."
        rows={8}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="min-h-[200px]"
      />
      <p className="text-xs text-muted-foreground">
        A more advanced rich text editor will be available soon.
      </p>
    </div>
  );
};

export default RichTextEditor;
