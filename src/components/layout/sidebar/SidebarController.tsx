
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/components/ui/sidebar";
import SidebarNavigation from "./SidebarNavigation";
import SidebarHeader from "./components/SidebarHeader";
import SidebarFooter from "./components/SidebarFooter";
import { mainNavItems, subMenuItems } from "./navigation/sidebarNavData";

interface SidebarControllerProps {
  className?: string;
}

const SidebarController: React.FC<SidebarControllerProps> = ({ className }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { user } = useAuth();
  const { state } = useSidebar();
  const expanded = state === "expanded";

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out flex flex-col h-full">
      <SidebarHeader expanded={expanded} />
      <SidebarNavigation
        expanded={expanded}
        openMenu={openMenu}
        toggleMenu={toggleMenu}
        mainNavItems={mainNavItems}
        subMenuItems={subMenuItems}
      />
      <SidebarFooter expanded={expanded} user={user} />
    </div>
  );
};

export default SidebarController;
