
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
import { Settings, Mail, BellRing, Send, Clock, Save } from "lucide-react";

const BroadcastSettings = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Broadcast Settings</h1>
        
        <Tabs defaultValue="general" className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
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
                    <CardDescription>Configure basic broadcast settings</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Sender Name</Label>
                    <Input id="sender-name" value="Course Platform" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reply-to">Reply-To Email</Label>
                    <Input id="reply-to" type="email" value="hello@courseplatform.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-subject">Default Subject Line Prefix</Label>
                    <Input id="default-subject" value="[Course Platform]" />
                  </div>
                  <Button className="w-full mt-4">Save Settings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>Manage default email templates</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-template">Default Template</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="email-template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Template</SelectItem>
                        <SelectItem value="minimal">Minimal Template</SelectItem>
                        <SelectItem value="promotional">Promotional Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="footer-text">Email Footer Text</Label>
                    <Textarea 
                      id="footer-text" 
                      rows={4} 
                      defaultValue="Course Platform, 123 Learning St., Education City, CA 94103. You're receiving this email because you subscribed to our updates. Unsubscribe anytime by clicking here."
                    />
                  </div>
                  <Button className="w-full mt-4">Save Template Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="delivery" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Delivery Settings</CardTitle>
                    <CardDescription>Configure how broadcasts are delivered</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="throttling">Throttle Sending</Label>
                      <p className="text-sm text-muted-foreground">Spread out email sending to improve deliverability</p>
                    </div>
                    <Switch id="throttling" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="send-rate">Send Rate (emails per hour)</Label>
                    <Input id="send-rate" type="number" defaultValue="2000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Send Timezone</Label>
                    <Select defaultValue="america">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america">America/New_York (GMT-4)</SelectItem>
                        <SelectItem value="pacific">America/Los_Angeles (GMT-7)</SelectItem>
                        <SelectItem value="europe">Europe/London (GMT+1)</SelectItem>
                        <SelectItem value="asia">Asia/Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full mt-4">Save Delivery Settings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Schedule Settings</CardTitle>
                    <CardDescription>Configure default scheduling options</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="optimal-time">Use Optimal Timing</Label>
                      <p className="text-sm text-muted-foreground">Send at optimal time for each recipient</p>
                    </div>
                    <Switch id="optimal-time" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours-start">Quiet Hours Start</Label>
                    <Input id="quiet-hours-start" type="time" defaultValue="22:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours-end">Quiet Hours End</Label>
                    <Input id="quiet-hours-end" type="time" defaultValue="07:00" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekend">Allow Weekend Sending</Label>
                      <p className="text-sm text-muted-foreground">Allow broadcasts to be sent on weekends</p>
                    </div>
                    <Switch id="weekend" />
                  </div>
                  <Button className="w-full mt-4">Save Schedule Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="subscription" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BellRing className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Subscription Settings</CardTitle>
                    <CardDescription>Configure how users subscribe and unsubscribe</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="double-optin">Double Opt-in</Label>
                      <p className="text-sm text-muted-foreground">Require email confirmation to subscribe</p>
                    </div>
                    <Switch id="double-optin" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="welcome-email">Welcome Email</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger id="welcome-email">
                        <SelectValue placeholder="Welcome email" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unsubscribe-message">Unsubscribe Message</Label>
                    <Textarea 
                      id="unsubscribe-message" 
                      rows={3} 
                      defaultValue="We're sorry to see you go. You have been successfully unsubscribed from our mailing list." 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unsubscribe-page">Unsubscribe Redirect Page</Label>
                    <Input id="unsubscribe-page" defaultValue="https://courseplatform.com/unsubscribed" />
                  </div>
                  <Button className="w-full mt-4">Save Subscription Settings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Save className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>GDPR & Compliance</CardTitle>
                    <CardDescription>Settings for legal compliance</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="gdpr-mode">GDPR Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable GDPR compliance features</p>
                    </div>
                    <Switch id="gdpr-mode" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="privacy-policy">Privacy Policy Link</Label>
                    <Input id="privacy-policy" defaultValue="https://courseplatform.com/privacy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consent-text">Consent Text</Label>
                    <Textarea 
                      id="consent-text" 
                      rows={3} 
                      defaultValue="I consent to receiving marketing emails from Course Platform. I understand that I can unsubscribe at any time."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-tracking">Data Tracking</Label>
                      <p className="text-sm text-muted-foreground">Track email opens and clicks</p>
                    </div>
                    <Switch id="data-tracking" defaultChecked />
                  </div>
                  <Button className="w-full mt-4">Save Compliance Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Service Provider Integrations</CardTitle>
                  <CardDescription>Connect with email service providers to send broadcasts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <h3 className="font-medium">Mailchimp</h3>
                          <p className="text-sm text-muted-foreground">Connected</p>
                        </div>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <h3 className="font-medium">SendGrid</h3>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <h3 className="font-medium">ConvertKit</h3>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <h3 className="font-medium">ActiveCampaign</h3>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default BroadcastSettings;
