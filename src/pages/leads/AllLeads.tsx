import React, { useState, useEffect } from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lead } from "@/services/types";
import { 
  PlusCircle, 
  Filter, 
  Mail, 
  Phone, 
  Tag, 
  Calendar, 
  Loader2,
  ChevronDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

type SortField = "name" | "email" | "source" | "status" | "last_contact";
type SortDirection = "asc" | "desc";

const AllLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [pageSizeOptions] = useState([50, 100, 500, 1000]);
  const [sortField, setSortField] = useState<SortField>("last_contact");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, [currentPage, pageSize, sortField, sortDirection]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      
      // First, get the total count of leads
      const { count, error: countError } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        throw countError;
      }
      
      setTotalLeads(count || 0);
      
      // Then get the paginated leads
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;
      
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order(sortField === 'last_contact' ? 'joined_on' : sortField, { 
          ascending: sortDirection === 'asc' 
        })
        .range(from, to);

      if (error) {
        throw error;
      }

      // Transform the data to match our Lead type
      const transformedLeads: Lead[] = data.map(lead => ({
        id: lead.id || '',
        first_name: lead.first_name || null,
        last_name: lead.last_name || null,
        email: lead.email || null,
        phone: lead.phone || null,
        source: lead.source || null,
        status: lead.status || 'Cold',
        joined_on: lead.joined_on || null,
        tags: lead.tags ? (typeof lead.tags === 'string' ? JSON.parse(lead.tags) : lead.tags) : [],
        name: `${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
        last_contact: formatLastContact(lead.joined_on)
      }));
      
      setLeads(transformedLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error fetching leads",
        description: "There was a problem loading your leads.",
        variant: "destructive"
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
    return name.split(' ').map(part => part.charAt(0).toUpperCase()).join('').substring(0, 2);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  const totalPages = Math.ceil(totalLeads / pageSize);
  
  const viewLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadDetails(true);
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

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  {pageSize} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {pageSizeOptions.map(size => (
                  <DropdownMenuItem 
                    key={size} 
                    onClick={() => handlePageSizeChange(size)}
                    className={pageSize === size ? "bg-accent" : ""}
                  >
                    {size} per page
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-muted-foreground ml-4">
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalLeads)} - {Math.min(currentPage * pageSize, totalLeads)} of {totalLeads} leads
            </span>
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
                    <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('name')}>
                      <span className="flex items-center">Name {renderSortIcon('name')}</span>
                    </div>
                    <div className="cursor-pointer flex items-center" onClick={() => handleSort('source')}>
                      <span className="flex items-center">Source {renderSortIcon('source')}</span>
                    </div>
                    <div className="cursor-pointer flex items-center" onClick={() => handleSort('status')}>
                      <span className="flex items-center">Status {renderSortIcon('status')}</span>
                    </div>
                    <div>Tags</div>
                    <div className="cursor-pointer flex items-center" onClick={() => handleSort('last_contact')}>
                      <span className="flex items-center">Last Contact {renderSortIcon('last_contact')}</span>
                    </div>
                    <div>Actions</div>
                  </div>
                  <div className="divide-y">
                    {leads.map(lead => (
                      <div key={lead.id} className="grid grid-cols-7 p-4 items-center">
                        <div className="col-span-2 flex items-center gap-3">
                          <Avatar>
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
                        <div>
                          <Button variant="outline" size="sm" onClick={() => viewLeadDetails(lead)}>View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {!loading && totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Logic to show pagination numbers with ellipsis
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                    if (i === 4) return (
                      <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                    if (i === 0) return (
                      <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  } else {
                    if (i === 0) return (
                      <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                    else if (i === 4) return (
                      <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                    else pageNum = currentPage - 1 + (i - 1);
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>

      {/* Lead Details Sheet */}
      <Sheet open={showLeadDetails} onOpenChange={setShowLeadDetails}>
        <SheetContent className="md:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Lead Details</SheetTitle>
            <SheetDescription>
              Detailed information about the selected lead.
            </SheetDescription>
          </SheetHeader>
          
          {selectedLead && (
            <div className="mt-6 space-y-6">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">{getInitials(selectedLead.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedLead.name}</h2>
                    <div className="mt-1">{getStatusBadge(selectedLead.status)}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedLead.email}</span>
                      </div>
                      {selectedLead.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedLead.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Lead Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Source:</span>
                        <span>{selectedLead.source || '-'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last Activity:</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {selectedLead.last_contact}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedLead.tags && selectedLead.tags.length > 0 ? (
                        selectedLead.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No tags</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-end">
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageTransition>
  );
};

export default AllLeads;
