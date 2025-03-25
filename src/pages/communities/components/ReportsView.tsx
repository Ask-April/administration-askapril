
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flag, MessageSquare } from "lucide-react";

const ReportsView = () => {
  return (
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
          <ReportItem 
            community="Web Development"
            reportCount={3}
            severity="high"
            content="This post contains inappropriate content and spam links..."
          />
          
          <ReportItem 
            community="Data Science"
            reportCount={1}
            severity="medium"
            content="This post may contain misleading information about data practices..."
          />
          
          <ReportItem 
            community="AI & Machine Learning"
            reportCount={2}
            severity="high"
            content="This post contains offensive language and personal attacks..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

type ReportItemProps = {
  community: string;
  reportCount: number;
  severity: "high" | "medium" | "low";
  content: string;
};

const ReportItem = ({ community, reportCount, severity, content }: ReportItemProps) => {
  const getBadgeStyles = () => {
    if (severity === "high") {
      return "bg-red-50 text-red-700 border-red-200";
    } else if (severity === "medium") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  const getIconColor = () => {
    return severity === "high" || severity === "medium" ? 
      (severity === "high" ? "text-red-500" : "text-amber-500") : 
      "text-blue-500";
  };

  return (
    <div className="bg-muted p-4 rounded-md flex items-start gap-4">
      <MessageSquare className={`h-5 w-5 ${getIconColor()} mt-1`} />
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-medium">Reported post in {community}</h4>
          <Badge variant="outline" className={getBadgeStyles()}>
            {reportCount} {reportCount === 1 ? "report" : "reports"}
          </Badge>
        </div>
        <p className="text-sm mt-1">{content}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button size="sm" variant="destructive">Remove</Button>
          <Button size="sm" variant="outline">Keep</Button>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
