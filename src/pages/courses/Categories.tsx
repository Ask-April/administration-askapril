
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, BookOpen, Code, Database, PenTool, Globe, Cpu } from "lucide-react";

const Categories = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Course Categories</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Programming</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">12 courses</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Data Science</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">8 courses</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">6 courses</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">4 courses</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Business</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">7 courses</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>AI & Machine Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">5 courses</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Categories;
