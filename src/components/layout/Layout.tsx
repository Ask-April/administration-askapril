
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MainContent from "./MainContent";
import LoadingSpinner from "./LoadingSpinner";
import { useRequireAuth } from "@/hooks/use-require-auth";
import SidebarContainer from "./sidebar/SidebarContainer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, loading, profile } = useRequireAuth();

  // If loading, show a loading indicator
  if (loading) {
    return <LoadingSpinner />;
  }

  // If no user after loading (should redirect, but just in case)
  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <SidebarContainer />
        {/* Main content/children */}
        <MainContent profile={profile}>
          {/* Toggle button (visible on mobile) */}
          <div className="md:hidden fixed top-4 left-4 z-[60]">
            <SidebarTrigger />
          </div>
          {children}
        </MainContent>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
