
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarMenuItem from "./SidebarMenuItem";
import { useLocation } from "react-router-dom";

interface SidebarNavigationProps {
  expanded: boolean;
  openMenus: string[];
  toggleMenu: (menu: string) => void;
  mainNavItems: {
    name: string;
    icon: JSX.Element;
    path: string;
    hasSubMenu: boolean;
  }[];
  subMenuItems: Record<string, { name: string; icon: JSX.Element; path: string }[]>;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  expanded, 
  openMenus, 
  toggleMenu, 
  mainNavItems,
  subMenuItems 
}) => {
  const location = useLocation();
  
  const isMenuOpen = (menu: string) => openMenus.includes(menu);
  
  return (
    <ScrollArea className="flex-1 overflow-hidden hover:overflow-auto">
      <nav className="grid gap-1 px-2 py-4">
        {mainNavItems.map((item) => (
          <div key={item.path} className="flex flex-col">
            <SidebarMenuItem
              item={item}
              expanded={expanded}
              isMenuOpen={isMenuOpen(item.name)}
              toggleMenu={toggleMenu}
              subMenuItems={subMenuItems}
              location={location}
            />
          </div>
        ))}
      </nav>
    </ScrollArea>
  );
};

export default SidebarNavigation;
