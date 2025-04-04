
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  DollarSign, 
  Send, 
  Code 
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TriggersTabProps {
  courseId: string;
}

const TriggersTab: React.FC<TriggersTabProps> = ({ courseId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Automation & Triggers</h3>
          
          <Tabs defaultValue="student-journey" className="w-full">
            <TabsList className="mb-4 grid grid-cols-5 md:w-auto w-full">
              <TabsTrigger value="student-journey" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Student Journey</span>
              </TabsTrigger>
              <TabsTrigger value="administrative" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Administrative</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden md:inline">Financial</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden md:inline">Communication</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden md:inline">Advanced</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student-journey">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="enrollment">
                  <AccordionTrigger>Enrollment Triggers</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Welcome Message</h5>
                          <p className="text-sm text-muted-foreground">
                            Send a welcome email when a student enrolls
                          </p>
                        </div>
                        <Switch id="welcome-message" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Course Materials</h5>
                          <p className="text-sm text-muted-foreground">
                            Deliver initial course materials
                          </p>
                        </div>
                        <Switch id="course-materials" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Introduction Video</h5>
                          <p className="text-sm text-muted-foreground">
                            Send introduction video to new students
                          </p>
                        </div>
                        <Switch id="intro-video" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="progress">
                  <AccordionTrigger>Progress Milestones</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Percentage Completion</h5>
                          <p className="text-sm text-muted-foreground">
                            Send notifications at key completion percentages
                          </p>
                        </div>
                        <Switch id="percentage-completion" defaultChecked />
                      </div>
                      
                      <div className="pl-6">
                        <p className="text-sm mb-2">Notify at these percentages:</p>
                        <div className="flex flex-wrap gap-2">
                          {[25, 50, 75, 100].map((percent) => (
                            <div key={percent} className="flex items-center space-x-2">
                              <Switch id={`percent-${percent}`} defaultChecked={percent === 50 || percent === 100} />
                              <label htmlFor={`percent-${percent}`} className="text-sm">{percent}%</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Module Completion</h5>
                          <p className="text-sm text-muted-foreground">
                            Send notification when a module is completed
                          </p>
                        </div>
                        <Switch id="module-completion" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="course-completion">
                  <AccordionTrigger>Course Completion</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Congratulations Message</h5>
                          <p className="text-sm text-muted-foreground">
                            Send congratulations when course is completed
                          </p>
                        </div>
                        <Switch id="congrats-message" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Certificate Delivery</h5>
                          <p className="text-sm text-muted-foreground">
                            Automatically deliver completion certificate
                          </p>
                        </div>
                        <Switch id="certificate-delivery" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Next Steps</h5>
                          <p className="text-sm text-muted-foreground">
                            Recommend next courses or actions
                          </p>
                        </div>
                        <Switch id="next-steps" defaultChecked />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="inactivity">
                  <AccordionTrigger>Inactivity Detection</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Reminder Thresholds</h5>
                          <p className="text-sm text-muted-foreground">
                            Send reminders when students are inactive
                          </p>
                        </div>
                        <Switch id="inactivity-reminders" defaultChecked />
                      </div>
                      
                      <div className="pl-6">
                        <p className="text-sm mb-2">Send reminders after:</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="reminder-7" defaultChecked />
                            <label htmlFor="reminder-7" className="text-sm">7 days inactive</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="reminder-14" defaultChecked />
                            <label htmlFor="reminder-14" className="text-sm">14 days inactive</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="reminder-30" />
                            <label htmlFor="reminder-30" className="text-sm">30 days inactive</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Re-engagement Content</h5>
                          <p className="text-sm text-muted-foreground">
                            Send motivational content to re-engage students
                          </p>
                        </div>
                        <Switch id="re-engagement" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="administrative" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Administrative Triggers</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Review Submission</h5>
                    <p className="text-sm text-muted-foreground">
                      Thank students when they submit a review
                    </p>
                  </div>
                  <Switch id="review-thanks" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Question Posted</h5>
                    <p className="text-sm text-muted-foreground">
                      Notify instructors when questions are posted
                    </p>
                  </div>
                  <Switch id="question-notification" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Content Updates</h5>
                    <p className="text-sm text-muted-foreground">
                      Notify students when course content is updated
                    </p>
                  </div>
                  <Switch id="content-updates" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Deadline Approaching</h5>
                    <p className="text-sm text-muted-foreground">
                      Remind students of upcoming assignment deadlines
                    </p>
                  </div>
                  <Switch id="deadline-reminders" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="border rounded-md p-4">
              <p className="text-muted-foreground">Financial triggers content coming soon</p>
            </TabsContent>

            <TabsContent value="communication" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Communication Channels</h4>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Email Delivery</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Send automated emails
                      </p>
                      <Switch id="automated-emails" defaultChecked />
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Email template style:</p>
                      <Select defaultValue="modern">
                        <SelectTrigger>
                          <SelectValue placeholder="Select template style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="branded">Branded</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Personalize emails with student names
                      </p>
                      <Switch id="personalized-emails" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">In-Platform Notifications</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="toast-notifications" defaultChecked />
                      <label htmlFor="toast-notifications" className="text-sm">Toast notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="inbox-notifications" defaultChecked />
                      <label htmlFor="inbox-notifications" className="text-sm">Inbox messages</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="dashboard-notifications" defaultChecked />
                      <label htmlFor="dashboard-notifications" className="text-sm">Dashboard alerts</label>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">SMS Messaging</h5>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Send SMS notifications (requires opt-in)
                      </p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="border rounded-md p-4">
              <p className="text-muted-foreground">Advanced automation content coming soon</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TriggersTab;
