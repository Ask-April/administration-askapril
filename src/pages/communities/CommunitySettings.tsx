
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Settings, Upload, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CommunitySettings = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Community Settings</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure basic community information and settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Community Selection</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="cursor-pointer">Web Development</Badge>
                    <Badge className="cursor-pointer">Data Science</Badge>
                    <Badge className="cursor-pointer">UX Design</Badge>
                    <Badge className="cursor-pointer">AI & Machine Learning</Badge>
                    <Badge className="cursor-pointer">Mobile Development</Badge>
                    <Badge className="cursor-pointer">Career Development</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Community Name</h3>
                  <Input defaultValue="Web Development" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Community Description</h3>
                  <Textarea 
                    defaultValue="A community for web developers to share knowledge and resources" 
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Community Banner</h3>
                  <div className="border rounded-md p-4 bg-muted/50">
                    <div className="h-32 flex items-center justify-center border border-dashed rounded-md bg-background">
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mt-2">
                          Drag and drop an image or click to browse
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Community Visibility</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public</p>
                      <p className="text-sm text-muted-foreground">Visible to all users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Searchable</p>
                      <p className="text-sm text-muted-foreground">Appears in search results</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Guest Viewing</p>
                      <p className="text-sm text-muted-foreground">Non-members can view content</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2 flex justify-between">
                  <Button variant="destructive" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Community
                  </Button>
                  <Button>Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default CommunitySettings;
