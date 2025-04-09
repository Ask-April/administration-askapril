
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  DollarSign,
  Code,
  Settings 
} from "lucide-react";
import {
  StudentJourneyTriggers,
  FinancialTriggers,
  AdvancedAutomation
} from "@/components/courses/automation";
import { AdministrativeTriggers, CommunicationChannels } from "@/components/courses/triggers";

interface AutomationTabProps {
  courseId: string;
}

const AutomationTab: React.FC<AutomationTabProps> = ({ courseId }) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Student Journey Triggers</h3>
          </div>
          <StudentJourneyTriggers />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Administrative Triggers</h3>
          </div>
          <AdministrativeTriggers />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Financial Triggers</h3>
          </div>
          <FinancialTriggers />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Communication Channels</h3>
          </div>
          <CommunicationChannels />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Advanced Automation</h3>
          </div>
          <AdvancedAutomation />
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationTab;
