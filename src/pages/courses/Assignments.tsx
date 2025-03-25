
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock } from "lucide-react";

const Assignments = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Course Assignments</h1>
        <div className="grid gap-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Web Development Final Project</CardTitle>
                  <p className="text-sm text-muted-foreground">Web Development Basics</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Due in 5 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Create a responsive website using HTML, CSS and JavaScript</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">32 submissions</span>
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  24 graded
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Data Visualization Project</CardTitle>
                  <p className="text-sm text-muted-foreground">Data Science Fundamentals</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Due in 3 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Create interactive data visualizations using a dataset of your choice</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">28 submissions</span>
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  12 graded
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>UI/UX Design Case Study</CardTitle>
                  <p className="text-sm text-muted-foreground">Design Principles</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Due in 7 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Create a case study for a mobile app redesign</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">18 submissions</span>
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  8 graded
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Assignments;
