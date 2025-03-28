import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Course = Tables<"courses">;

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) return;
        
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error("Error fetching course:", error);
          toast.error("Failed to load course");
          navigate("/courses/overview");
          return;
        }
        
        setCourse(data);
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setCourse(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleSave = async () => {
    try {
      if (!course) return;
      
      setSaving(true);
      
      const { error } = await supabase
        .from('courses')
        .update({
          title: course.title,
          description: course.description,
          category: course.category,
          status: course.status,
          duration: course.duration,
          image: course.image,
          updated_at: new Date().toISOString()
        })
        .eq('id', course.id);
        
      if (error) {
        console.error("Error updating course:", error);
        toast.error("Failed to update course");
        return;
      }
      
      toast.success("Course updated successfully");
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <PageTransition>
        <div className="container p-6">
          <div className="flex justify-center items-center py-12">
            <p className="text-muted-foreground">Loading course...</p>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  if (!course) {
    return (
      <PageTransition>
        <div className="container p-6">
          <div className="flex justify-center items-center py-12">
            <p className="text-muted-foreground">Course not found</p>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <CoursePageHeader
        title={course.title}
        actions={
          <>
            <Button 
              variant="outline" 
              onClick={() => navigate("/courses/overview")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button 
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </>
        }
      />
      
      <div className="container px-4 pb-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Course Title</label>
                    <Input
                      id="title"
                      name="title"
                      value={course.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      name="description"
                      value={course.description || ""}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">Category</label>
                      <Select
                        value={course.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Development">Development</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="status" className="text-sm font-medium">Status</label>
                      <Select
                        value={course.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="duration" className="text-sm font-medium">Duration</label>
                    <Input
                      id="duration"
                      name="duration"
                      value={course.duration}
                      onChange={handleInputChange}
                      placeholder="e.g. 6 hours"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium">Course Image URL</label>
                    <Input
                      id="image"
                      name="image"
                      value={course.image || ""}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                    />
                    {course.image && (
                      <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="curriculum">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Manage your course sections and lessons here.</p>
                <Button>Add Section</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Configure additional course settings here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default EditCourse;
