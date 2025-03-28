
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Trash2 } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { toast } from "sonner";

// Mock function to get course by ID
const getCourseById = (id: string) => {
  // In a real app, this would fetch from an API
  return {
    id,
    title: `Course ${id}`,
    description: "This is a sample course description. It provides an overview of what students will learn in this course.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    status: "published",
    price: 99.99,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const courseData = getCourseById(id);
        setCourse(courseData);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleSave = () => {
    toast.success("Course saved successfully!");
  };

  const handleDelete = () => {
    toast.error("Course deleted!");
    navigate('/courses/overview');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-xl font-semibold mb-2">Course Not Found</h3>
        <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/courses/overview')}>
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <CoursePageHeader 
          title={`Edit Course: ${course.title}`} 
          backPath="/courses/overview"
          actions={
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDelete} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          }
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Course Information</h3>
                    <p className="text-muted-foreground mb-4">Basic information about your course.</p>
                    
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          value={course.title}
                          onChange={(e) => setCourse({...course, title: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea 
                          className="w-full p-2 border rounded-md min-h-[100px]" 
                          value={course.description}
                          onChange={(e) => setCourse({...course, description: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Course Content</h3>
                <p className="text-muted-foreground mb-4">Manage your course content, sections and lessons.</p>
                <div className="p-4 bg-muted rounded-md text-center">
                  <p>Content editor coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pricing">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Pricing</h3>
                <p className="text-muted-foreground mb-4">Set pricing options for your course.</p>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded-md" 
                    value={course.price}
                    onChange={(e) => setCourse({...course, price: parseFloat(e.target.value)})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Course Settings</h3>
                <p className="text-muted-foreground mb-4">Configure additional course settings.</p>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={course.status}
                    onChange={(e) => setCourse({...course, status: e.target.value})}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default EditCourse;
