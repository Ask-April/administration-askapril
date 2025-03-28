
import React from "react";
import { Bold, Italic, Underline, Strikethrough, Heading1, Heading2, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RichTextEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onContentChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-1 mb-2">
        <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
          <Underline className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        placeholder="Enter rich text content here..."
        rows={6}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </div>
  );
};

export default RichTextEditor;
