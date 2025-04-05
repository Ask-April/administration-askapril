
import React, { useState, useEffect } from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, ExternalLink, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Source } from "@/services/types";
import { EmptyState } from "@/components/ui/loading-states";
import LeadSourceSkeleton from "@/components/leads/LeadSourceSkeleton";

const LeadSources = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      setLoading(true);
      // This is a workaround until the sources table is properly added to the Supabase schema
      // For now, we'll use mock data to avoid the error
      
      // Uncomment this when the sources table exists in Supabase
      // const { data, error } = await supabase
      //   .from('sources')
      //   .select('*')
      //   .order('count', { ascending: false });
      
      // if (error) {
      //   throw error;
      // }

      // if (data) {
      //   setSources(data as Source[]);
      // }

      // Mock data for demonstration
      setTimeout(() => {
        const mockSources: Source[] = [
          { id: '1', name: 'Facebook Ads', count: 245, conversion: '12.5%', trend: 'up', change: '4.2%' },
          { id: '2', name: 'Google Search', count: 189, conversion: '8.7%', trend: 'up', change: '2.1%' },
          { id: '3', name: 'Direct Traffic', count: 142, conversion: '15.3%', trend: 'down', change: '1.8%' },
          { id: '4', name: 'Email Campaign', count: 98, conversion: '22.4%', trend: 'up', change: '5.6%' },
          { id: '5', name: 'Partner Referrals', count: 76, conversion: '18.9%', trend: 'down', change: '3.4%' },
        ];
        setSources(mockSources);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching sources:', error);
      toast({
        title: "Error fetching sources",
        description: "There was a problem loading your lead sources.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };
  
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Lead Sources</h1>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Source
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium">
                    <div className="col-span-2">Source</div>
                    <div>Leads</div>
                    <div>Conversion Rate</div>
                    <div>Trend</div>
                  </div>
                  <LeadSourceSkeleton />
                </div>
              ) : sources.length === 0 ? (
                <EmptyState
                  title="No sources found"
                  description="You don't have any lead sources yet. Start by adding your first source."
                  icon={PlusCircle}
                  action={
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Source
                    </Button>
                  }
                />
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium">
                    <div className="col-span-2">Source</div>
                    <div>Leads</div>
                    <div>Conversion Rate</div>
                    <div>Trend</div>
                  </div>
                  <div className="divide-y">
                    {sources.map((source) => (
                      <div key={source.id} className="grid grid-cols-5 p-4 items-center">
                        <div className="col-span-2 flex items-center gap-2">
                          <span className="font-medium">{source.name}</span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <div>{source.count}</div>
                        <div>{source.conversion}</div>
                        <div className="flex items-center gap-2">
                          {source.trend === "up" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                              <ArrowUp className="h-3 w-3" />
                              {source.change}
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
                              <ArrowDown className="h-3 w-3" />
                              {source.change}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default LeadSources;
