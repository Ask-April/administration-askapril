import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import LoadingSpinner from "./LoadingSpinner";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, loading, profile } = useRequireAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return null;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <MainContent profile={profile}>
          {children}
        </MainContent>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
