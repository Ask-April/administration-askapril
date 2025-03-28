
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If not loading and no user, redirect to sign in
    if (!loading && !user) {
      navigate("/auth/signin");
    }
  }, [user, loading, navigate]);

  // If loading, show a loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If no user after loading (should redirect, but just in case)
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col w-0 pl-[78px] transition-all duration-300">
        <Navbar />
        <main className="pt-16 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
