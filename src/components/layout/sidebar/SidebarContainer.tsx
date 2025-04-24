
import React from "react";
import SidebarController from "./SidebarController";
import { useSidebar } from "@/components/ui/sidebar";
import SearchBar from "../navbar/SearchBar";
import { useIsMobile } from "@/hooks/use-mobile";

const SidebarContainer: React.FC = () => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  
  const shouldShowSidebar = isMobile ? state === "expanded" : true;
  
  if (!shouldShowSidebar) {
    return null;
  }

  return (
    <div 
      className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-[280px] shadow-lg' : 'relative'} 
        h-full backdrop-blur-lg
      `}
    >
      <div className="flex flex-col h-full bg-sidebar/95 text-sidebar-foreground border-r border-sidebar-border">
        <SidebarController />
        
        {/* Search bar at the bottom of sidebar with improved mobile spacing */}
        <div className="mt-auto p-4 w-full">
          <SearchBar sidebarVariant={true} />
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black/20 -z-10"
          onClick={() => {
            // Close sidebar on backdrop click for mobile
            const sidebar = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement;
            if (sidebar) sidebar.click();
          }}
        />
      )}
    </div>
  );
};

export default SidebarContainer;
