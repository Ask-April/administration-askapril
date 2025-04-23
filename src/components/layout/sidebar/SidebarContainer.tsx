
import React from "react";
import SidebarController from "./SidebarController";
import { useSidebar } from "@/components/ui/sidebar";

const SidebarContainer: React.FC = () => {
  const { isMobile } = useSidebar();

  // Show sidebar only on desktop (md+) as before, hidden on mobile.
  return (
    <div className="hidden md:block h-full">
      <SidebarController />
    </div>
  );
};

export default SidebarContainer;
