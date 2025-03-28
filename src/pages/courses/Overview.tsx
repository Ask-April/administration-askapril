
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";

const Overview = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Course Overview</h1>
          <Link to="/courses/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </Link>
        </div>
        
        <div className="bg-muted/30 p-8 rounded-lg text-center">
          <h2 className="text-xl font-medium mb-2">No courses found</h2>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first course
          </p>
          <Link to="/courses/create">
            <Button>
              Create Your First Course
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default Overview;
