
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

interface SidebarSubMenuProps {
  expanded: boolean;
  items: SubMenuItem[];
}

const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({ expanded, items }) => {
  if (!expanded || !items) return null;
  
  return (
    <>
      {items.map((subItem) => (
        <NavLink
          key={subItem.path}
          to={subItem.path}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-x-3 rounded-md px-3 py-2 text-xs font-medium transition-all duration-200 mt-1",
              isActive
                ? "bg-sidebar-accent/70 text-sidebar-accent-foreground"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground"
            )
          }
        >
          {subItem.icon}
          <span>{subItem.name}</span>
        </NavLink>
      ))}
    </>
  );
};

export default SidebarSubMenu;
