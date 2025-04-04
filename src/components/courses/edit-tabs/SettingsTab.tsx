
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  UserCog, 
  Paintbrush, 
  Link, 
  ShieldAlert, 
  Wrench 
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingsTabProps {
  editedCourse: any;
  setEditedCourse: (course: any) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ 
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
          <h3 className="text-lg font-medium mb-4">Course Settings</h3>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="mb-4 grid grid-cols-5 md:w-auto w-full">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                <span className="hidden md:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="branding" className="flex items-center gap-2">
                <PaintBrush className="h-4 w-4" />
                <span className="hidden md:inline">Branding</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                <span className="hidden md:inline">Integrations</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                <span className="hidden md:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                <span className="hidden md:inline">Advanced</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-4">Profile Settings</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Public Profile</h5>
                      <p className="text-sm text-muted-foreground">
                        Make instructor profile visible to students
                      </p>
                    </div>
                    <Switch 
                      id="public-profile"
                      checked={editedCourse.publicProfile || true}
                      onCheckedChange={(checked) => updateCourseData('publicProfile', checked)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="instructor-bio">Instructor Bio</Label>
                    <Input
                      id="instructor-bio"
                      value={editedCourse.instructorBio || ""}
                      onChange={(e) => updateCourseData('instructorBio', e.target.value)}
                      placeholder="Enter your professional bio"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-4">Team Management</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">Course Team</h5>
                      <p className="text-sm text-muted-foreground">
                        Manage team members and permissions
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Manage Team</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Teaching Assistants</h5>
                      <p className="text-sm text-muted-foreground">
                        Allow teaching assistants to help manage the course
                      </p>
                    </div>
                    <Switch 
                      id="teaching-assistants"
                      checked={editedCourse.enableTAs || false}
                      onCheckedChange={(checked) => updateCourseData('enableTAs', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-4">Notification Preferences</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="student-enrollments"
                      checked={editedCourse.notifyEnrollments || true}
                      onCheckedChange={(checked) => updateCourseData('notifyEnrollments', checked)}
                    />
                    <Label htmlFor="student-enrollments">Student enrollments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="course-reviews"
                      checked={editedCourse.notifyReviews || true}
                      onCheckedChange={(checked) => updateCourseData('notifyReviews', checked)}
                    />
                    <Label htmlFor="course-reviews">New reviews</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="student-questions"
                      checked={editedCourse.notifyQuestions || true}
                      onCheckedChange={(checked) => updateCourseData('notifyQuestions', checked)}
                    />
                    <Label htmlFor="student-questions">Student questions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="course-completions"
                      checked={editedCourse.notifyCompletions || false}
                      onCheckedChange={(checked) => updateCourseData('notifyCompletions', checked)}
                    />
                    <Label htmlFor="course-completions">Course completions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="weekly-summary"
                      checked={editedCourse.notifyWeeklySummary || false}
                      onCheckedChange={(checked) => updateCourseData('notifyWeeklySummary', checked)}
                    />
                    <Label htmlFor="weekly-summary">Weekly summary</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="branding" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Course Branding</h4>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Branding Options</h5>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="primary-color"
                          type="text"
                          value={editedCourse.primaryColor || "#3b82f6"}
                          onChange={(e) => updateCourseData('primaryColor', e.target.value)}
                          className="w-32"
                        />
                        <div 
                          className="ml-2 w-6 h-6 rounded-md border"
                          style={{ backgroundColor: editedCourse.primaryColor || "#3b82f6" }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="course-theme">Course Theme</Label>
                      <Select
                        value={editedCourse.theme || "default"}
                        onValueChange={(value) => updateCourseData('theme', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="dark">Dark Mode</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Custom Course Landing Page</h5>
                        <p className="text-sm text-muted-foreground">
                          Create a custom landing page for this course
                        </p>
                      </div>
                      <Switch 
                        id="custom-landing"
                        checked={editedCourse.customLanding || false}
                        onCheckedChange={(checked) => updateCourseData('customLanding', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Custom Domain</h5>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Use a custom domain for this course
                      </p>
                    </div>
                    <Switch 
                      id="custom-domain"
                      checked={editedCourse.customDomain || false}
                      onCheckedChange={(checked) => updateCourseData('customDomain', checked)}
                    />
                  </div>
                  
                  {editedCourse.customDomain && (
                    <div className="mt-2">
                      <Label htmlFor="domain-name">Domain Name</Label>
                      <Input
                        id="domain-name"
                        value={editedCourse.domainName || ""}
                        onChange={(e) => updateCourseData('domainName', e.target.value)}
                        placeholder="yourcourse.com"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="border rounded-md p-4">
              <p className="text-muted-foreground">Integration management content coming soon</p>
            </TabsContent>

            <TabsContent value="privacy" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Privacy & Access Control</h4>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Privacy Controls</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">GDPR Compliance</h5>
                        <p className="text-sm text-muted-foreground">
                          Enable enhanced GDPR compliance features
                        </p>
                      </div>
                      <Switch 
                        id="gdpr-compliance"
                        checked={editedCourse.gdprCompliance || true}
                        onCheckedChange={(checked) => updateCourseData('gdprCompliance', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Student Data Collection</h5>
                        <p className="text-sm text-muted-foreground">
                          Collect additional student data for analytics
                        </p>
                      </div>
                      <Switch 
                        id="data-collection"
                        checked={editedCourse.dataCollection || false}
                        onCheckedChange={(checked) => updateCourseData('dataCollection', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Access Control</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Password Protection</h5>
                        <p className="text-sm text-muted-foreground">
                          Require password to access the course
                        </p>
                      </div>
                      <Switch 
                        id="password-protection"
                        checked={editedCourse.passwordProtection || false}
                        onCheckedChange={(checked) => updateCourseData('passwordProtection', checked)}
                      />
                    </div>
                    
                    {editedCourse.passwordProtection && (
                      <div className="pl-6">
                        <Label htmlFor="access-password">Access Password</Label>
                        <Input
                          id="access-password"
                          type="password"
                          value={editedCourse.accessPassword || ""}
                          onChange={(e) => updateCourseData('accessPassword', e.target.value)}
                          placeholder="Enter password"
                          className="mt-1"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Domain Restrictions</h5>
                        <p className="text-sm text-muted-foreground">
                          Limit access to specific email domains
                        </p>
                      </div>
                      <Switch 
                        id="domain-restrictions"
                        checked={editedCourse.domainRestrictions || false}
                        onCheckedChange={(checked) => updateCourseData('domainRestrictions', checked)}
                      />
                    </div>
                    
                    {editedCourse.domainRestrictions && (
                      <div className="pl-6">
                        <Label htmlFor="allowed-domains">Allowed Email Domains (comma separated)</Label>
                        <Input
                          id="allowed-domains"
                          value={editedCourse.allowedDomains || ""}
                          onChange={(e) => updateCourseData('allowedDomains', e.target.value)}
                          placeholder="example.com, company.org"
                          className="mt-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Advanced Settings</h4>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">System Settings</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Backup Course</h5>
                        <p className="text-sm text-muted-foreground">
                          Automatically back up course content
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Create Backup</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Cache Control</h5>
                        <p className="text-sm text-muted-foreground">
                          Manage course content caching
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Clear Cache</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Course Status</h5>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="course-status">Current Status</Label>
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
                    
                    <div className="pt-4 border-t">
                      <Button variant="destructive">Delete Course</Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
