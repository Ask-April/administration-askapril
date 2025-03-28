
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ content, onContentChange }) => {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Enter or paste code here..."
        rows={6}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="font-mono"
      />
    </div>
  );
};

export default CodeEditor;
