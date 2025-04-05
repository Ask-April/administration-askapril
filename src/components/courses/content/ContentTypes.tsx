
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentTypesProps {
  // Add props as needed
}

const ContentTypes: React.FC<ContentTypesProps> = () => {
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="video">
          <AccordionTrigger>Video Lectures</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium">Upload Videos</h5>
                  <p className="text-sm text-muted-foreground">
                    Upload video files directly to the platform
                  </p>
                </div>
                <Switch id="video-upload" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium">Embed External Videos</h5>
                  <p className="text-sm text-muted-foreground">
                    Embed videos from YouTube, Vimeo, etc.
                  </p>
                </div>
                <Switch id="video-embed" defaultChecked />
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Streaming Options</h5>
                <Select defaultValue="adaptive">
                  <SelectTrigger>
                    <SelectValue placeholder="Select streaming quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adaptive">Adaptive Streaming</SelectItem>
                    <SelectItem value="hd">HD Only</SelectItem>
                    <SelectItem value="sd">SD Only</SelectItem>
                    <SelectItem value="low">Low Bandwidth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="text">
          <AccordionTrigger>Text Lessons</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium">Rich Text Editor</h5>
                  <p className="text-sm text-muted-foreground">
                    Format text with WYSIWYG editor
                  </p>
                </div>
                <Switch id="rich-text" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium">Markdown Support</h5>
                  <p className="text-sm text-muted-foreground">
                    Write content in Markdown format
                  </p>
                </div>
                <Switch id="markdown" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="assessments">
          <AccordionTrigger>Assessments</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium">Quizzes</h5>
                  <p className="text-sm text-muted-foreground">
                    Create interactive quizzes
                  </p>
                </div>
                <Switch id="quizzes" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium">Assignments</h5>
                  <p className="text-sm text-muted-foreground">
                    Create assignments with submissions
                  </p>
                </div>
                <Switch id="assignments" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium">Peer Reviews</h5>
                  <p className="text-sm text-muted-foreground">
                    Enable peer review of assignments
                  </p>
                </div>
                <Switch id="peer-reviews" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="downloads">
          <AccordionTrigger>Downloadable Resources</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div>
                <h5 className="font-medium mb-2">Allowed File Types</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="pdf" defaultChecked />
                    <Label htmlFor="pdf">PDF</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="docx" defaultChecked />
                    <Label htmlFor="docx">Word (.docx)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="xlsx" defaultChecked />
                    <Label htmlFor="xlsx">Excel (.xlsx)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="zip" defaultChecked />
                    <Label htmlFor="zip">Archive (.zip)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="images" defaultChecked />
                    <Label htmlFor="images">Images</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="code" />
                    <Label htmlFor="code">Code Files</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Size Limits</h5>
                <Select defaultValue="100">
                  <SelectTrigger>
                    <SelectValue placeholder="Select file size limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 MB</SelectItem>
                    <SelectItem value="50">50 MB</SelectItem>
                    <SelectItem value="100">100 MB</SelectItem>
                    <SelectItem value="500">500 MB</SelectItem>
                    <SelectItem value="1000">1 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ContentTypes;
