
import React from "react";
import { NavLink } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SidebarSubMenu from "./SidebarSubMenu";

interface MenuItem {
  name: string;
  icon: JSX.Element;
  path: string;
  hasSubMenu: boolean;
}

interface SidebarMenuItemProps {
  item: MenuItem;
  expanded: boolean;
  isMenuOpen: boolean;
  toggleMenu: (menu: string) => void;
  subMenuItems?: Record<string, { name: string; icon: JSX.Element; path: string }[]>;
  location: {
    pathname: string;
  };
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ 
  item, 
  expanded, 
  isMenuOpen, 
  toggleMenu, 
  subMenuItems = {}, 
  location 
}) => {
  if (!item) return null;
  
  if (item.hasSubMenu) {
    return (
      <Collapsible
        open={expanded && isMenuOpen}
        onOpenChange={() => expanded && toggleMenu(item.name)}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "group flex items-center justify-between gap-x-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 w-full",
              location.pathname.startsWith(item.path)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <div className="flex items-center gap-x-3">
              {item.icon}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {expanded && (
              <ChevronDown
                size={16}
                className={cn(
                  "transition-transform duration-200",
                  isMenuOpen ? "transform rotate-180" : ""
                )}
              />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 pr-2">
          {subMenuItems && subMenuItems[item.name] && (
            <SidebarSubMenu expanded={expanded} items={subMenuItems[item.name] || []} />
          )}
        </CollapsibleContent>
      </Collapsible>
    );
  }
  
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-x-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )
      }
    >
      {item.icon}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );
};

export default SidebarMenuItem;
