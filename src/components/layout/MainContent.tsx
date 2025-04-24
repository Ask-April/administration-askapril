
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
  
  return (
    <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${!isMobile ? "md:pl-64" : ""}`}>
      <Navbar profile={profile} />
      <main className="pt-16 px-4 md:px-6 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MainContent;
