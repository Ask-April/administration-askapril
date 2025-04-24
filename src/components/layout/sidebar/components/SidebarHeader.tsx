
import React from "react";
import SidebarLogo from "../SidebarLogo";

interface SidebarHeaderProps {
  expanded: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ expanded }) => {
  return (
    <div className="flex h-16 items-center justify-center px-4">
      <SidebarLogo expanded={expanded} />
    </div>
  );
};

export default SidebarHeader;
