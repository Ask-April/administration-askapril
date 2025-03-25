
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

const Bundles = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Course Bundles</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Web Development</CardTitle>
                <CardDescription>5 courses</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Complete web development bundle including HTML, CSS, JavaScript, React, and Node.js</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">$199.99</span>
                <span className="text-sm text-muted-foreground">42 students</span>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Data Science</CardTitle>
                <CardDescription>4 courses</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Complete data science bundle including Python, SQL, Machine Learning, and Data Visualization</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">$249.99</span>
                <span className="text-sm text-muted-foreground">36 students</span>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Mobile Development</CardTitle>
                <CardDescription>3 courses</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Complete mobile development bundle including React Native, Flutter, and iOS Development</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">$179.99</span>
                <span className="text-sm text-muted-foreground">28 students</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Bundles;
