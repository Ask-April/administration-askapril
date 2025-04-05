
import React, { useState, useEffect } from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, ExternalLink, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Source = {
  id: string;
  name: string;
  count: number;
  conversion: string;
  trend: "up" | "down";
  change: string;
};

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
      const { data, error } = await supabase
        .from('sources')
        .select('*')
        .order('count', { ascending: false });
      
      if (error) {
        throw error;
      }

      setSources(data || []);
    } catch (error) {
      console.error('Error fetching sources:', error);
      toast({
        title: "Error fetching sources",
        description: "There was a problem loading your lead sources.",
        variant: "destructive"
      });
    } finally {
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
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : sources.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No sources found</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any lead sources yet. Start by adding your first source.
                  </p>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Source
                  </Button>
                </div>
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
