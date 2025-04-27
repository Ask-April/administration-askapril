import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarMenuItem from "./SidebarMenuItem";
import { useLocation } from "react-router-dom";
interface SidebarNavigationProps {
  expanded: boolean;
  openMenu: string | null;
  toggleMenu: (menu: string) => void;
  mainNavItems: {
    name: string;
    icon: JSX.Element;
    path: string;
    hasSubMenu: boolean;
  }[];
  subMenuItems: Record<string, {
    name: string;
    icon: JSX.Element;
    path: string;
  }[]>;
}
const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  expanded,
  openMenu,
  toggleMenu,
  mainNavItems,
  subMenuItems
}) => {
  const location = useLocation();
  const isMenuOpen = (menu: string) => openMenu === menu;
  return <ScrollArea className="flex-1 overflow-hidden hover:overflow-auto">
      <nav className="grid gap-1 py-4 mx-0 px-0">
        {mainNavItems.map(item => <div key={item.path} className="flex flex-col">
            <SidebarMenuItem item={item} expanded={expanded} isMenuOpen={isMenuOpen(item.name)} toggleMenu={toggleMenu} subMenuItems={subMenuItems} location={location} />
          </div>)}
      </nav>
    </ScrollArea>;
};
export default SidebarNavigation;