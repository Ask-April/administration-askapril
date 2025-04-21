
// This file is now only responsible for rendering the sidebar content/layout using Shadcn's UI Sidebar
import React, { useState } from "react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import SidebarLogo from "./sidebar/SidebarLogo";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarUser from "./sidebar/SidebarUser";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = ({ className }: { className?: string }) => {
  const { user } = useAuth();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(item => item !== menu) 
        : [...prev, menu]
    );
  };

  return (
    <ShadcnSidebar className={className}>
      <SidebarContent>
        <div className="flex flex-col h-full">
          <div className="flex h-16 items-center justify-between px-4">
            <SidebarLogo expanded={true} />
          </div>
          <SidebarNavigation 
            expanded={true} 
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          />
          <div className="mt-auto p-4">
            <SidebarUser expanded={true} user={user} />
          </div>
        </div>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default Sidebar;
