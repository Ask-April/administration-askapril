
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Settings, Shield, BellRing, MessageSquare, UserPlus, Flag } from "lucide-react";

const Manage = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Manage Communities</h1>
        
        <Tabs defaultValue="general" className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Community Settings</CardTitle>
                    <CardDescription>
                      Manage general settings for all communities
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Allow file uploads in discussions</h3>
                      <p className="text-sm text-muted-foreground">Let users attach files to their discussion posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable community search</h3>
                      <p className="text-sm text-muted-foreground">Allow users to search content within communities</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Allow rich text formatting</h3>
                      <p className="text-sm text-muted-foreground">Enable markdown and rich text in community posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable code snippets</h3>
                      <p className="text-sm text-muted-foreground">Allow users to share formatted code in discussions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="moderation" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Moderation Controls</CardTitle>
                    <CardDescription>
                      Manage content moderation settings and tools
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Auto-moderate offensive content</h3>
                      <p className="text-sm text-muted-foreground">Automatically filter potentially harmful content</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Require post approval</h3>
                      <p className="text-sm text-muted-foreground">New posts require moderator approval before publishing</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable spam detection</h3>
                      <p className="text-sm text-muted-foreground">Automatically flag potential spam content</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Content reporting threshold</h3>
                      <p className="text-sm text-muted-foreground">Number of reports before content is automatically hidden</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>5</span>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BellRing className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how and when notifications are sent
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email digests</h3>
                      <p className="text-sm text-muted-foreground">Send weekly email digests of community activity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New discussion notifications</h3>
                      <p className="text-sm text-muted-foreground">Notify members when new discussions are created</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Reply notifications</h3>
                      <p className="text-sm text-muted-foreground">Notify users when someone replies to their posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Moderator alerts</h3>
                      <p className="text-sm text-muted-foreground">Send alerts to moderators for flagged content</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="membership" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <UserPlus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Membership Controls</CardTitle>
                    <CardDescription>
                      Manage how users join and participate in communities
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Open membership</h3>
                      <p className="text-sm text-muted-foreground">Allow anyone to join communities without approval</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Require membership approval</h3>
                      <p className="text-sm text-muted-foreground">New members must be approved by moderators</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Allow invitation by members</h3>
                      <p className="text-sm text-muted-foreground">Existing members can invite others to join</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Waiting period for new members</h3>
                      <p className="text-sm text-muted-foreground">Days before new members can post (0 for none)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>1</span>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Flag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Content Reports</CardTitle>
                    <CardDescription>
                      View and manage reported content across communities
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md flex items-start gap-4">
                    <MessageSquare className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Reported post in Web Development</h4>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">3 reports</Badge>
                      </div>
                      <p className="text-sm mt-1">This post contains inappropriate content and spam links...</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" variant="destructive">Remove</Button>
                        <Button size="sm" variant="outline">Keep</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md flex items-start gap-4">
                    <MessageSquare className="h-5 w-5 text-amber-500 mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Reported post in Data Science</h4>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">1 report</Badge>
                      </div>
                      <p className="text-sm mt-1">This post may contain misleading information about data practices...</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" variant="destructive">Remove</Button>
                        <Button size="sm" variant="outline">Keep</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md flex items-start gap-4">
                    <MessageSquare className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Reported post in AI & Machine Learning</h4>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">2 reports</Badge>
                      </div>
                      <p className="text-sm mt-1">This post contains offensive language and personal attacks...</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" variant="destructive">Remove</Button>
                        <Button size="sm" variant="outline">Keep</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Manage;
