
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Bell, 
  Shield, 
  MessageSquare,
  Users,
  Save
} from "lucide-react";

const CommunitySettings = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Community Settings</h1>
        
        <Tabs defaultValue="general" className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Basic community configuration</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="community-name">Community Name</Label>
                    <Input id="community-name" value="Course Platform Community" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="community-description">Description</Label>
                    <Textarea 
                      id="community-description" 
                      rows={3} 
                      defaultValue="A community for learners to connect, share knowledge, and grow together." 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="community-language">Primary Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="community-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-community">Enable Community</Label>
                      <p className="text-sm text-muted-foreground">Turn the community on or off</p>
                    </div>
                    <Switch id="enable-community" defaultChecked />
                  </div>
                  <Button className="w-full mt-4">Save General Settings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Discussion Settings</CardTitle>
                    <CardDescription>Configure how discussions work</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-threads">Allow Threads</Label>
                      <p className="text-sm text-muted-foreground">Enable threaded discussions</p>
                    </div>
                    <Switch id="allow-threads" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-images">Allow Images</Label>
                      <p className="text-sm text-muted-foreground">Allow images in posts and comments</p>
                    </div>
                    <Switch id="allow-images" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-post-length">Maximum Post Length</Label>
                    <Input id="max-post-length" type="number" defaultValue="5000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-sort">Default Sort Order</Label>
                    <Select defaultValue="latest">
                      <SelectTrigger id="default-sort">
                        <SelectValue placeholder="Select sort order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="trending">Trending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full mt-4">Save Discussion Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Access & Privacy</CardTitle>
                    <CardDescription>Control who can access your community</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="community-type">Community Type</Label>
                    <Select defaultValue="private">
                      <SelectTrigger id="community-type">
                        <SelectValue placeholder="Select community type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public (Anyone can view)</SelectItem>
                        <SelectItem value="private">Private (Members only)</SelectItem>
                        <SelectItem value="secret">Secret (Invitation only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="join-approval">Require Approval to Join</Label>
                      <p className="text-sm text-muted-foreground">Approve new member requests</p>
                    </div>
                    <Switch id="join-approval" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-directory">Member Directory Visibility</Label>
                    <Select defaultValue="members">
                      <SelectTrigger id="member-directory">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="members">Members Only</SelectItem>
                        <SelectItem value="admins">Admins Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="search-indexing">Allow Search Engines</Label>
                      <p className="text-sm text-muted-foreground">Allow search engines to index your community</p>
                    </div>
                    <Switch id="search-indexing" />
                  </div>
                  <Button className="w-full mt-4">Save Privacy Settings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Content Privacy</CardTitle>
                    <CardDescription>Control content visibility and privacy</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="profile-visibility">Public Profiles</Label>
                      <p className="text-sm text-muted-foreground">Allow member profiles to be publicly visible</p>
                    </div>
                    <Switch id="profile-visibility" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discussion-visibility">Discussion Visibility</Label>
                    <Select defaultValue="members">
                      <SelectTrigger id="discussion-visibility">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="members">Members Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="hide-email">Hide Email Addresses</Label>
                      <p className="text-sm text-muted-foreground">Hide members' email addresses from other members</p>
                    </div>
                    <Switch id="hide-email" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-export">Allow Data Export</Label>
                      <p className="text-sm text-muted-foreground">Allow members to export their content</p>
                    </div>
                    <Switch id="data-export" defaultChecked />
                  </div>
                  <Button className="w-full mt-4">Save Content Privacy Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Configure community notifications</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-digest">Email Digest</Label>
                      <p className="text-sm text-muted-foreground">Send periodic email digests of activity</p>
                    </div>
                    <Switch id="email-digest" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="digest-frequency">Digest Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="digest-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="welcome-email">Welcome Email</Label>
                      <p className="text-sm text-muted-foreground">Send welcome email to new members</p>
                    </div>
                    <Switch id="welcome-email" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Textarea 
                      id="welcome-message" 
                      rows={3} 
                      defaultValue="Welcome to our community! We're excited to have you join us. Here, you'll find resources, discussions, and support from fellow learners." 
                    />
                  </div>
                  <Button className="w-full mt-4">Save Notification Settings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Activity Notifications</CardTitle>
                    <CardDescription>Configure which activities trigger notifications</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-posts">New Posts</Label>
                      <p className="text-sm text-muted-foreground">Notify when new posts are created</p>
                    </div>
                    <Switch id="new-posts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="replies">Replies</Label>
                      <p className="text-sm text-muted-foreground">Notify when someone replies to a post</p>
                    </div>
                    <Switch id="replies" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mentions">Mentions</Label>
                      <p className="text-sm text-muted-foreground">Notify when someone mentions a user</p>
                    </div>
                    <Switch id="mentions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="likes">Likes</Label>
                      <p className="text-sm text-muted-foreground">Notify when someone likes a post</p>
                    </div>
                    <Switch id="likes" />
                  </div>
                  <Button className="w-full mt-4">Save Activity Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="moderation" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Moderation Settings</CardTitle>
                    <CardDescription>Control how content is moderated</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-moderation">Auto-Moderation</Label>
                      <p className="text-sm text-muted-foreground">Automatically filter inappropriate content</p>
                    </div>
                    <Switch id="auto-moderation" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="moderation-level">Moderation Level</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="moderation-level">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Filter extreme content)</SelectItem>
                        <SelectItem value="medium">Medium (Balance)</SelectItem>
                        <SelectItem value="high">High (Strict filtering)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pre-moderation">Pre-Moderation</Label>
                      <p className="text-sm text-muted-foreground">Approve posts before they appear</p>
                    </div>
                    <Switch id="pre-moderation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-words">Custom Filter Words</Label>
                    <Textarea 
                      id="custom-words" 
                      rows={3} 
                      placeholder="Enter words or phrases to filter, separated by commas" 
                    />
                  </div>
                  <Button className="w-full mt-4">Save Moderation Settings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Save className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Reporting & Flagging</CardTitle>
                    <CardDescription>Configure content reporting options</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-reporting">Allow Content Reporting</Label>
                      <p className="text-sm text-muted-foreground">Allow members to report content</p>
                    </div>
                    <Switch id="allow-reporting" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-threshold">Report Threshold</Label>
                    <Input id="report-threshold" type="number" defaultValue="3" />
                    <p className="text-xs text-muted-foreground">Number of reports before auto-hiding content</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-moderators">Notify Moderators</Label>
                      <p className="text-sm text-muted-foreground">Email moderators when content is reported</p>
                    </div>
                    <Switch id="notify-moderators" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-categories">Report Categories</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="report-categories">
                        <SelectValue placeholder="Select categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="limited">Limited Categories</SelectItem>
                        <SelectItem value="custom">Custom Categories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full mt-4">Save Reporting Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default CommunitySettings;
