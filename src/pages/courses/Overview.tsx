
import React from "react";
import { Link } from "react-router-dom";
import { BookPlus } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Overview = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Courses Overview</h1>
          <Button asChild>
            <Link to="/courses">
              <BookPlus className="mr-2 h-4 w-4" />
              Create New Course
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Active Courses</CardTitle>
              <CardDescription>Total active courses in your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">24</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
              <CardDescription>Number of enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">1,284</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Course Completion</CardTitle>
              <CardDescription>Average completion rate</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">76%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Overview;
