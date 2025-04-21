
import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import LoadingSpinner from "./LoadingSpinner";
import { useRequireAuth } from "@/hooks/use-require-auth";

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
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <MainContent profile={profile}>
        {children}
      </MainContent>
    </div>
  );
};

export default Layout;
