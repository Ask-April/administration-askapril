
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  Users, 
  Tag, 
  Eye, 
  Award, 
  Bookmark, 
  Image 
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import ImageUpload from "@/components/courses/ImageUpload";
import { Switch } from "@/components/ui/switch";

interface DetailsTabProps {
  editedCourse: any;
  setEditedCourse: (course: any) => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ 
  editedCourse, 
  setEditedCourse 
}) => {
  // Function to update any course property
  const updateCourseData = (field: string, value: any) => {
    setEditedCourse({
      ...editedCourse,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Course Details</h3>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-4 grid grid-cols-7 md:w-auto w-full">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden md:inline">Basic Info</span>
              </TabsTrigger>
              <TabsTrigger value="instructors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Instructors</span>
              </TabsTrigger>
              <TabsTrigger value="classification" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span className="hidden md:inline">Classification</span>
              </TabsTrigger>
              <TabsTrigger value="visibility" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden md:inline">Visibility</span>
              </TabsTrigger>
              <TabsTrigger value="certification" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden md:inline">Certification</span>
              </TabsTrigger>
              <TabsTrigger value="attributes" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span className="hidden md:inline">Attributes</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span className="hidden md:inline">Media</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="border rounded-md p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <div className="flex items-center">
                    <Input
                      id="title"
                      value={editedCourse.title || ""}
                      onChange={(e) => updateCourseData('title', e.target.value)}
                      maxLength={60}
                      placeholder="Enter course title"
                      className="mt-1"
                    />
                    <span className="ml-2 text-xs text-muted-foreground">
                      {editedCourse.title?.length || 0}/60
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <div className="flex items-center">
                    <Input
                      id="subtitle"
                      value={editedCourse.subtitle || ""}
                      onChange={(e) => updateCourseData('subtitle', e.target.value)}
                      maxLength={120}
                      placeholder="Enter subtitle"
                      className="mt-1"
                    />
                    <span className="ml-2 text-xs text-muted-foreground">
                      {editedCourse.subtitle?.length || 0}/120
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="url">URL Slug</Label>
                  <div className="flex items-center">
                    <Input
                      id="url"
                      value={editedCourse.slug || ""}
                      onChange={(e) => updateCourseData('slug', e.target.value)}
                      placeholder="course-url-slug"
                      className="mt-1"
                    />
                    <div className="ml-2 flex items-center">
                      <Switch 
                        id="auto-generate"
                        checked={editedCourse.autoGenerateSlug || false}
                        onCheckedChange={(checked) => updateCourseData('autoGenerateSlug', checked)}
                      />
                      <Label htmlFor="auto-generate" className="ml-2 text-sm">Auto-generate</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editedCourse.description || ""}
                    onChange={(e) => updateCourseData('description', e.target.value)}
                    placeholder="Enter course description"
                    className="mt-1"
                    rows={5}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      Supports HTML formatting
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {editedCourse.description?.length || 0}/5000
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="learning-objectives">Learning Objectives</Label>
                  <Textarea
                    id="learning-objectives"
                    value={editedCourse.learningObjectives?.join('\n') || ""}
                    onChange={(e) => updateCourseData('learningObjectives', e.target.value.split('\n'))}
                    placeholder="Enter learning objectives (one per line)"
                    className="mt-1"
                    rows={3}
                  />
                  <span className="text-xs text-muted-foreground">
                    Recommended: 4-6 objectives
                  </span>
                </div>
                
                <div>
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Textarea
                    id="prerequisites"
                    value={editedCourse.prerequisites?.join('\n') || ""}
                    onChange={(e) => updateCourseData('prerequisites', e.target.value.split('\n'))}
                    placeholder="Enter prerequisites (one per line)"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="instructors" className="border rounded-md p-4">
              <p className="text-muted-foreground">Instructor details content coming soon</p>
            </TabsContent>
            
            <TabsContent value="classification" className="border rounded-md p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Primary Category</Label>
                  <Select 
                    value={editedCourse.category || ""}
                    onValueChange={(value) => updateCourseData('category', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select 
                    value={editedCourse.subcategory || ""}
                    onValueChange={(value) => updateCourseData('subcategory', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-design">Web Design</SelectItem>
                      <SelectItem value="graphic-design">Graphic Design</SelectItem>
                      <SelectItem value="ui-ux">UI/UX</SelectItem>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={editedCourse.tags?.join(', ') || ""}
                    onChange={(e) => updateCourseData('tags', e.target.value.split(', '))}
                    placeholder="react, javascript, programming"
                    className="mt-1"
                  />
                  <span className="text-xs text-muted-foreground">
                    Min: 3, Max: 10 tags
                  </span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="visibility" className="border rounded-md p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Featured Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Feature this course on your homepage
                    </p>
                  </div>
                  <Switch 
                    id="featured"
                    checked={editedCourse.featured || false}
                    onCheckedChange={(checked) => updateCourseData('featured', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="price-visible">Price Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Show course price to visitors
                    </p>
                  </div>
                  <Switch 
                    id="price-visible"
                    checked={editedCourse.priceVisible || false}
                    onCheckedChange={(checked) => updateCourseData('priceVisible', checked)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="course-status">Course Status</Label>
                  <Select 
                    value={editedCourse.status || "draft"}
                    onValueChange={(value) => updateCourseData('status', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            {/* Placeholder content for remaining tabs */}
            <TabsContent value="certification" className="border rounded-md p-4">
              <p className="text-muted-foreground">Certification content coming soon</p>
            </TabsContent>
            
            <TabsContent value="attributes" className="border rounded-md p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="level">Course Level</Label>
                  <Select 
                    value={editedCourse.level || ""}
                    onValueChange={(value) => updateCourseData('level', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="all-levels">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="duration">Estimated Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={editedCourse.durationHours || ""}
                    onChange={(e) => updateCourseData('durationHours', e.target.value)}
                    placeholder="8"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="self-paced">Self-paced</Label>
                    <p className="text-sm text-muted-foreground">
                      Students can complete at their own pace
                    </p>
                  </div>
                  <Switch 
                    id="self-paced"
                    checked={editedCourse.selfPaced || false}
                    onCheckedChange={(checked) => updateCourseData('selfPaced', checked)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="border rounded-md p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cover-image">Cover Image</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Recommended size: 1280×720 pixels
                  </p>
                  <ImageUpload
                    value={editedCourse.image || ""}
                    onChange={(url) => updateCourseData('image', url)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="video-intro">Video Introduction URL</Label>
                  <Input
                    id="video-intro"
                    value={editedCourse.videoIntro || ""}
                    onChange={(e) => updateCourseData('videoIntro', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsTab;
