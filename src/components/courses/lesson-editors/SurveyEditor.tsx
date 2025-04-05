
import React, { useState } from "react";
import { ClipboardList, Plus, Trash2, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

type QuestionType = 'multiple_choice' | 'text' | 'rating' | 'checkbox';

interface SurveyQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  required: boolean;
}

interface SurveyEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const SurveyEditor: React.FC<SurveyEditorProps> = ({ content, onContentChange }) => {
  // Parse content or initialize with default structure
  const [questions, setQuestions] = useState<SurveyQuestion[]>(() => {
    try {
      if (content) {
        const parsedContent = JSON.parse(content);
        if (Array.isArray(parsedContent)) {
          return parsedContent;
        }
      }
      return [];
    } catch (e) {
      console.error("Error parsing survey content:", e);
      return [];
    }
  });

  const [showAddQuestion, setShowAddQuestion] = useState<boolean>(false);
  const [newQuestionText, setNewQuestionText] = useState<string>("");
  const [newQuestionType, setNewQuestionType] = useState<QuestionType>("multiple_choice");
  
  // Update parent component's content when questions change
  React.useEffect(() => {
    onContentChange(JSON.stringify(questions));
  }, [questions, onContentChange]);

  const addQuestion = () => {
    if (!newQuestionText.trim()) return;

    const newQuestion: SurveyQuestion = {
      id: Date.now().toString(),
      text: newQuestionText,
      type: newQuestionType,
      options: newQuestionType === 'multiple_choice' || newQuestionType === 'checkbox' ? ["Option 1"] : undefined,
      required: false
    };

    setQuestions([...questions, newQuestion]);
    setNewQuestionText("");
    setShowAddQuestion(false);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<SurveyQuestion>) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const options = q.options || [];
        return {
          ...q,
          options: [...options, `Option ${options.length + 1}`]
        };
      }
      return q;
    }));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        return {
          ...q,
          options: q.options.filter((_, i) => i !== optionIndex)
        };
      }
      return q;
    }));
  };

  const moveQuestion = (dragIndex: number, hoverIndex: number) => {
    const dragItem = questions[dragIndex];
    const newQuestions = [...questions];
    newQuestions.splice(dragIndex, 1);
    newQuestions.splice(hoverIndex, 0, dragItem);
    setQuestions(newQuestions);
  };

  const renderQuestionEditor = (question: SurveyQuestion) => {
    return (
      <Card key={question.id} className="mb-3">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <GripVertical className="cursor-grab h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <Input
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                  className="font-medium"
                  placeholder="Question text"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select
                value={question.type}
                onValueChange={(value) => updateQuestion(question.id, { 
                  type: value as QuestionType,
                  options: (value === 'multiple_choice' || value === 'checkbox') ? question.options || ["Option 1"] : undefined
                })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="text">Text Answer</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeQuestion(question.id)}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`required-${question.id}`}
                checked={question.required}
                onCheckedChange={(checked) => 
                  updateQuestion(question.id, { required: !!checked })
                }
              />
              <Label htmlFor={`required-${question.id}`}>Required</Label>
            </div>
          </div>
          
          {/* Option editor for multiple choice or checkbox questions */}
          {(question.type === 'multiple_choice' || question.type === 'checkbox') && (
            <div className="mt-3 space-y-2">
              <Label>Options</Label>
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(question.id, index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-grow"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeOption(question.id, index)}
                    disabled={question.options?.length === 1}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addOption(question.id)}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            </div>
          )}
          
          {/* Text answer question placeholder */}
          {question.type === 'text' && (
            <div className="mt-3">
              <Label className="mb-1 block text-muted-foreground text-xs">Preview:</Label>
              <Textarea
                disabled
                placeholder="Text answer will appear here"
                className="bg-muted/30"
              />
            </div>
          )}
          
          {/* Rating question preview */}
          {question.type === 'rating' && (
            <div className="mt-3">
              <Label className="mb-1 block text-muted-foreground text-xs">Rating Scale (1-5):</Label>
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <Button 
                    key={num} 
                    variant="outline" 
                    disabled 
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {questions.length === 0 && !showAddQuestion ? (
        <div className="text-center p-6 border-2 border-dashed rounded-md">
          <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No questions yet</p>
          <Button 
            variant="outline" 
            onClick={() => setShowAddQuestion(true)} 
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Question
          </Button>
        </div>
      ) : (
        <>
          {questions.map((question) => renderQuestionEditor(question))}
          
          {showAddQuestion ? (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <Label>Question Text</Label>
                    <Input
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="Enter your question here..."
                    />
                  </div>
                  <div>
                    <Label>Question Type</Label>
                    <Select
                      value={newQuestionType}
                      onValueChange={(value) => setNewQuestionType(value as QuestionType)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Question Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="text">Text Answer</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddQuestion(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={addQuestion}
                      disabled={!newQuestionText.trim()}
                    >
                      Add Question
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setShowAddQuestion(true)} 
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default SurveyEditor;
