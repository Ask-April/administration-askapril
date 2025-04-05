
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Edit, 
  Settings, 
  BarChart, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface QuizzesTabProps {
  courseId: string;
}

const QuizzesTab: React.FC<QuizzesTabProps> = ({ courseId }) => {
  // Mock quiz data
  const quizzes = [
    { id: '1', title: 'Module 1 Assessment', questions: 10, attempts: 25, avgScore: 82 },
    { id: '2', title: 'Midterm Quiz', questions: 15, attempts: 18, avgScore: 76 },
    { id: '3', title: 'Final Assessment', questions: 20, attempts: 12, avgScore: 79 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Quizzes & Assessments</h3>
            <Button>Create New Quiz</Button>
          </div>
          
          <Tabs defaultValue="creation" className="w-full">
            <TabsList className="mb-4 grid grid-cols-3 md:w-auto w-full">
              <TabsTrigger value="creation" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                <span className="hidden md:inline">Quiz Creation</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Quiz Settings</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden md:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="creation">
              <div className="space-y-4">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quiz Title</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Attempts</TableHead>
                        <TableHead>Avg. Score</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quizzes.map((quiz) => (
                        <TableRow key={quiz.id}>
                          <TableCell className="font-medium">{quiz.title}</TableCell>
                          <TableCell>{quiz.questions}</TableCell>
                          <TableCell>{quiz.attempts}</TableCell>
                          <TableCell>{quiz.avgScore}%</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">Preview</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">Question Bank</h4>
                  <div className="flex justify-between mb-4">
                    <div className="relative w-72">
                      <Input 
                        placeholder="Search questions..." 
                        className="pl-8" 
                      />
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <Button>Add Question</Button>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="question-types">
                      <AccordionTrigger>Question Types</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="multiple-choice" defaultChecked />
                              <label htmlFor="multiple-choice" className="ml-2 font-medium">
                                Multiple Choice
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Select one or more correct options
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="true-false" defaultChecked />
                              <label htmlFor="true-false" className="ml-2 font-medium">
                                True/False
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Simple binary choice questions
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="matching" defaultChecked />
                              <label htmlFor="matching" className="ml-2 font-medium">
                                Matching
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Match items from two lists
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="fill-blank" defaultChecked />
                              <label htmlFor="fill-blank" className="ml-2 font-medium">
                                Fill in the Blank
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Complete text with missing words
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="essay" />
                              <label htmlFor="essay" className="ml-2 font-medium">
                                Essay
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Free-form text responses
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="code" />
                              <label htmlFor="code" className="ml-2 font-medium">
                                Code
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Programming exercises
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="randomization">
                      <AccordionTrigger>Randomization</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">Randomize Question Order</h5>
                              <p className="text-sm text-muted-foreground">
                                Present questions in random order
                              </p>
                            </div>
                            <Switch id="question-order" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">Randomize Answer Order</h5>
                              <p className="text-sm text-muted-foreground">
                                Shuffle multiple choice answers
                              </p>
                            </div>
                            <Switch id="answer-order" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">Random Question Selection</h5>
                              <p className="text-sm text-muted-foreground">
                                Draw questions randomly from question bank
                              </p>
                            </div>
                            <Switch id="question-selection" />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="media-integration">
                      <AccordionTrigger>Media Integration</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="images" defaultChecked />
                              <label htmlFor="images" className="ml-2 font-medium">
                                Images
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Add images to questions or answers
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="videos" defaultChecked />
                              <label htmlFor="videos" className="ml-2 font-medium">
                                Videos
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Include videos in questions
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="audio" />
                              <label htmlFor="audio" className="ml-2 font-medium">
                                Audio
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Add audio clips to questions
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-3">
                            <div className="flex items-center mb-1">
                              <Switch id="interactive" />
                              <label htmlFor="interactive" className="ml-2 font-medium">
                                Interactive Elements
                              </label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Add interactive components
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Quiz Settings</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Time Limits</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Enable time limits per quiz
                      </p>
                      <Switch id="time-limit-quiz" defaultChecked />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Default time limit:</p>
                      <Input 
                        id="default-time" 
                        type="number" 
                        placeholder="30" 
                        className="w-20" 
                      />
                      <span className="text-sm">minutes</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Enable time extensions for accommodations
                      </p>
                      <Switch id="time-extensions" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Attempt Limits</h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Maximum attempts:</p>
                      <Select defaultValue="3">
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Retry policy:</p>
                      <Select defaultValue="highest">
                        <SelectTrigger>
                          <SelectValue placeholder="Select policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="highest">Keep highest score</SelectItem>
                          <SelectItem value="latest">Keep latest attempt</SelectItem>
                          <SelectItem value="average">Average of all attempts</SelectItem>
                          <SelectItem value="first">First attempt only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Grading Options</h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Passing score:</p>
                      <Input 
                        id="passing-score" 
                        type="number" 
                        placeholder="70" 
                        className="w-20" 
                      />
                      <span className="text-sm">%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Enable weighted questions
                      </p>
                      <Switch id="weighted-questions" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Allow partial credit for answers
                      </p>
                      <Switch id="partial-credit" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-2">Result Display</h5>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">When to show results:</p>
                      <Select defaultValue="immediate">
                        <SelectTrigger>
                          <SelectValue placeholder="Select when to show results" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediately after submission</SelectItem>
                          <SelectItem value="delayed">After quiz closes for all</SelectItem>
                          <SelectItem value="manual">After manual review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Show correct answers after completion
                      </p>
                      <Switch id="show-answers" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Show detailed feedback for each question
                      </p>
                      <Switch id="detailed-feedback" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="border rounded-md p-4">
              <h4 className="font-medium mb-4">Analytics & Reporting</h4>
              <p className="text-muted-foreground">Quiz analytics content coming soon</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizzesTab;
