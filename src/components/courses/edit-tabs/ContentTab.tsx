
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ContentTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium">Course Content</h3>
        <p className="text-muted-foreground mb-4">
          Manage your course content, sections and lessons.
        </p>
        <div className="p-4 bg-muted rounded-md text-center">
          <p>Content editor coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentTab;
