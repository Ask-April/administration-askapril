
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Filter, ArrowRight, Users, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Funnels = () => {
  const funnels = [
    { 
      name: "Web Development Certification", 
      steps: ["Lead Capture", "Free Workshop", "Course Offer", "Enrollment"],
      totalLeads: 325,
      conversion: 18,
      activeStep: 2
    },
    { 
      name: "Data Science Career Track", 
      steps: ["Lead Magnet", "Email Sequence", "Webinar", "Application", "Enrollment"],
      totalLeads: 187,
      conversion: 12,
      activeStep: 3
    },
    { 
      name: "UX Design Basics", 
      steps: ["Social Ad", "Landing Page", "Mini Course", "Full Course Offer"],
      totalLeads: 243,
      conversion: 24,
      activeStep: 1
    },
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">All Funnels</h1>

        <div className="grid gap-6">
          {funnels.map((funnel, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Filter className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{funnel.name}</CardTitle>
                      <CardDescription>{funnel.steps.length} steps funnel</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{funnel.totalLeads}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Total Leads</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{funnel.conversion}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Conversion</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <Progress value={(funnel.activeStep / (funnel.steps.length - 1)) * 100} className="h-2" />
                </div>
                <div className="flex justify-between">
                  {funnel.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex flex-col items-center relative">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                        ${stepIndex < funnel.activeStep ? 'bg-primary text-white' : 
                          stepIndex === funnel.activeStep ? 'bg-primary/20 text-primary border border-primary' : 
                          'bg-muted text-muted-foreground'}
                      `}>
                        {stepIndex + 1}
                      </div>
                      <span className="text-xs mt-2 text-center max-w-24 truncate" title={step}>{step}</span>
                      {stepIndex < funnel.steps.length - 1 && (
                        <ArrowRight className="absolute -right-4 top-2.5 h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Funnels;
