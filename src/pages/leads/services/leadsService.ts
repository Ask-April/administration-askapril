
import { Lead, Source } from "@/services/types";

// Mock data for leads
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    source: "website",
    status: "new",
    created_at: new Date().toISOString(),
    phone: "555-123-4567",
    tags: ["potential", "website-visitor"]
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    source: "referral",
    status: "contacted",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    phone: "555-987-6543",
    tags: ["referral", "high-priority"]
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    source: "social",
    status: "qualified",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    last_contacted: new Date(Date.now() - 86400000).toISOString()
  }
];

// Mock data for sources
const mockSources: Source[] = [
  {
    id: "website",
    name: "Website Form",
    count: 325,
    conversion: "42%",
    trend: "up",
    change: "15%"
  },
  {
    id: "referral",
    name: "Referral",
    count: 164,
    conversion: "68%",
    trend: "up",
    change: "24%"
  },
  {
    id: "social",
    name: "Social Media",
    count: 243,
    conversion: "31%",
    trend: "down",
    change: "8%"
  },
  {
    id: "email",
    name: "Email Campaign",
    count: 197,
    conversion: "25%",
    trend: "down",
    change: "12%"
  }
];

export const leadsService = {
  getAllLeads: async (): Promise<Lead[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLeads;
  },
  
  searchLeads: async (query: string): Promise<Lead[]> => {
    // Search implementation
    const searchTerm = query.toLowerCase();
    return mockLeads.filter(lead => 
      lead.name.toLowerCase().includes(searchTerm) || 
      lead.email.toLowerCase().includes(searchTerm)
    );
  },
  
  updateLeadStatus: async (id: string, status: string): Promise<void> => {
    console.log(`Updating lead ${id} status to ${status}`);
    return Promise.resolve();
  },
  
  deleteLead: async (id: string): Promise<void> => {
    console.log(`Deleting lead ${id}`);
    return Promise.resolve();
  },
  
  getLeadSources: async (): Promise<Source[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSources;
  }
};
