
import React from "react";
import Navbar from "./Navbar";
import { Profile } from "@/hooks/auth/use-profile";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainContentProps {
  children: React.ReactNode;
  profile: Profile | null;
}

const MainContent: React.FC<MainContentProps> = ({ children, profile }) => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  
  // Only apply sidebar padding on desktop
  const sidebarPadding = !isMobile ? "pl-64" : "";
  
  return (
    <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${sidebarPadding}`}>
      <Navbar profile={profile} />
      <main className="pt-16 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MainContent;
