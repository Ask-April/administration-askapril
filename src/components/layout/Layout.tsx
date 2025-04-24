import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MainContent from "./MainContent";
import LoadingSpinner from "./LoadingSpinner";
import { useRequireAuth } from "@/hooks/use-require-auth";
import SidebarContainer from "./sidebar/SidebarContainer";

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
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full overflow-hidden">
        <SidebarContainer />
        <MainContent profile={profile}>
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
