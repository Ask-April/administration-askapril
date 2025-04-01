
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageTransition from "@/components/layout/PageTransition";
import { UserPlus, FileInput, MapPin, Tag } from "lucide-react";

const Leads = () => {
  const navigate = useNavigate();
  
  const cards = [
    {
      title: "All Leads",
      description: "View and manage all leads in your system",
      icon: <UserPlus className="h-10 w-10 text-primary" />,
      path: "/leads/all"
    },
    {
      title: "Lead Forms",
      description: "Create and manage lead capture forms",
      icon: <FileInput className="h-10 w-10 text-primary" />,
      path: "/leads/forms"
    },
    {
      title: "Lead Sources",
      description: "Track and analyze lead sources",
      icon: <MapPin className="h-10 w-10 text-primary" />,
      path: "/leads/sources"
    },
    {
      title: "Lead Tags",
      description: "Organize leads with custom tags",
      icon: <Tag className="h-10 w-10 text-primary" />,
      path: "/leads/tags"
    }
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Leads Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Card 
              key={index} 
              className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => navigate(card.path)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Leads;
