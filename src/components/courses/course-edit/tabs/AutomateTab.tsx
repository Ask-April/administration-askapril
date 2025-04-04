
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AutomateTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium">Automation</h3>
        <p className="text-muted-foreground mb-4">Set up automated emails and actions for your course.</p>
        <div className="bg-muted rounded-md p-6 text-center">
          <p>Automation features coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomateTab;
