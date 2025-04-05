import React, { useState, useEffect } from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  PlusCircle, 
  Filter,
  Mail,
  Phone,
  Tag,
  Calendar,
  Loader2
} from "lucide-react";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  last_contact: string;
  tags: string[];
};

const AllLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('joined_on', { ascending: false });
      
      if (error) {
        throw error;
      }

      // Transform the data to match our Lead type
      const transformedLeads = data.map(lead => ({
        id: `${lead.first_name || ''}-${lead.last_name || ''}-${lead.email || ''}`,
        name: `${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
        email: lead.email || '',
        phone: '',  // Assuming the leads table doesn't have this field
        source: '',  // Assuming the leads table doesn't have this field
        status: lead.status || 'Cold',
        last_contact: formatLastContact(lead.joined_on),
        tags: []  // Assuming the leads table doesn't have this field
      }));

      setLeads(transformedLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error fetching leads",
        description: "There was a problem loading your leads.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatLastContact = (lastContact: string) => {
    if (!lastContact) return "Never";
    
    const date = new Date(lastContact);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return "Recently";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hot":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Hot</Badge>;
      case "Warm":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Warm</Badge>;
      case "Cold":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Cold</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Leads</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Lead
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : leads.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No leads found</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any leads yet. Start by adding your first lead.
                  </p>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Lead
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 p-4 font-medium">
                    <div className="col-span-2">Name</div>
                    <div>Source</div>
                    <div>Status</div>
                    <div>Tags</div>
                    <div>Last Contact</div>
                    <div>Actions</div>
                  </div>
                  <div className="divide-y">
                    {leads.map((lead) => (
                      <div key={lead.id} className="grid grid-cols-7 p-4 items-center">
                        <div className="col-span-2 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg`} alt={lead.name} />
                            <AvatarFallback>{getInitials(lead.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <div className="flex flex-col text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                <span>{lead.email}</span>
                              </div>
                              {lead.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  <span>{lead.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div>{lead.source || '-'}</div>
                        <div>{getStatusBadge(lead.status)}</div>
                        <div className="flex flex-wrap gap-1">
                          {lead.tags && lead.tags.length > 0 ? (
                            lead.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs flex items-center gap-1">
                                <Tag className="h-2 w-2" />
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">No tags</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{lead.last_contact}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Contact</Button>
                          <Button variant="outline" size="sm">View</Button>
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

export default AllLeads;
