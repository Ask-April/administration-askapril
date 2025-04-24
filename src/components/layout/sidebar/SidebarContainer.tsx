
import React from "react";
import SidebarController from "./SidebarController";
import { useSidebar } from "@/components/ui/sidebar";
import SearchBar from "../navbar/SearchBar";
import { useIsMobile } from "@/hooks/use-mobile";

const SidebarContainer: React.FC = () => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  
  // Only show sidebar if:
  // 1. On mobile: when state is "expanded"
  // 2. On desktop: always show
  const shouldShowSidebar = isMobile ? state === "expanded" : true;
  
  if (!shouldShowSidebar) {
    return null;
  }

  return (
    <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'} h-full`}>
      <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <SidebarController />
        
        {/* Search bar at the bottom of sidebar */}
        <div className="mt-auto p-4 w-full">
          <SearchBar sidebarVariant={true} />
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
