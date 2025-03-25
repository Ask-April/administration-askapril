
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flag, MessageSquare } from "lucide-react";
import { fetchContentReports, ContentReport, removeReport, updateReportStatus } from "../services/reportsService";
import { useToast } from "@/hooks/use-toast";

const ReportsView = () => {
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadReports = async () => {
      try {
        setIsLoading(true);
        const data = await fetchContentReports();
        setReports(data);
      } catch (error) {
        console.error("Failed to load reports:", error);
        toast({
          title: "Error",
          description: "Failed to load content reports. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, [toast]);

  const handleRemoveReport = async (id: string) => {
    try {
      await removeReport(id);
      setReports(reports.filter(report => report.id !== id));
      toast({
        title: "Report removed",
        description: "The report has been dismissed successfully.",
      });
    } catch (error) {
      console.error("Failed to remove report:", error);
      toast({
        title: "Error",
        description: "Failed to remove the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeepReport = async (id: string) => {
    try {
      await updateReportStatus(id, "reviewed");
      setReports(reports.map(report => 
        report.id === id ? { ...report, status: "reviewed" } : report
      ));
      toast({
        title: "Report reviewed",
        description: "The report has been marked as reviewed.",
      });
    } catch (error) {
      console.error("Failed to update report:", error);
      toast({
        title: "Error",
        description: "Failed to update the report. Please try again.",
        variant: "destructive",
      });
    }
  };

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
        {isLoading ? (
          <div className="py-4 text-center text-muted-foreground">Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">No reports found</div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <ReportItem 
                key={report.id}
                report={report}
                onRemove={() => handleRemoveReport(report.id)}
                onKeep={() => handleKeepReport(report.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type ReportItemProps = {
  report: ContentReport;
  onRemove: () => void;
  onKeep: () => void;
};

const ReportItem = ({ report, onRemove, onKeep }: ReportItemProps) => {
  const getBadgeStyles = () => {
    if (report.severity === "high") {
      return "bg-red-50 text-red-700 border-red-200";
    } else if (report.severity === "medium") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  const getIconColor = () => {
    return report.severity === "high" || report.severity === "medium" ? 
      (report.severity === "high" ? "text-red-500" : "text-amber-500") : 
      "text-blue-500";
  };

  return (
    <div className="bg-muted p-4 rounded-md flex items-start gap-4">
      <MessageSquare className={`h-5 w-5 ${getIconColor()} mt-1`} />
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-medium">Reported {report.content_type} in Community</h4>
          <Badge variant="outline" className={getBadgeStyles()}>
            {report.severity} severity
          </Badge>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {report.status}
          </Badge>
        </div>
        <p className="text-sm mt-1">{report.content_excerpt}</p>
        <p className="text-xs text-muted-foreground mt-1">Reason: {report.reason}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button size="sm" variant="destructive" onClick={onRemove}>Remove</Button>
          <Button size="sm" variant="outline" onClick={onKeep}>Keep</Button>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
