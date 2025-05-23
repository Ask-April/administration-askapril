
import React from "react";
import SidebarController from "./SidebarController";
import { useSidebar } from "@/components/ui/sidebar";
import SearchBar from "../navbar/SearchBar";

const SidebarContainer: React.FC = () => {
  const { state } = useSidebar();

  // Show sidebar based on sidebar state
  // On mobile, it will only show if state is "expanded"
  // On desktop (md+), it's always visible
  return (
    <div 
      className={`
        ${state === "expanded" ? "block" : "hidden"} 
        md:block 
        fixed 
        inset-y-0 
        left-0 
        z-40 
        w-64 
        h-full 
        transition-transform 
        duration-300
      `}
    >
      <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <SidebarController />
      </div>
    </div>
  );
};

export default SidebarContainer;
