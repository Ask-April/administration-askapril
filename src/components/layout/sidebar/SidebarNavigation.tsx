import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarMenuItem from "./SidebarMenuItem";
import { useLocation } from "react-router-dom";
import { BarChart3, BookOpen, BrainCircuit, Megaphone, UserPlus, Users, MessageSquare } from "lucide-react";
interface SidebarNavigationProps {
  expanded: boolean;
  openMenus?: string[];
  toggleMenu?: (menu: string) => void;
  mainNavItems?: {
    name: string;
    icon: JSX.Element;
    path: string;
    hasSubMenu: boolean;
  }[];
  subMenuItems?: Record<string, {
    name: string;
    icon: JSX.Element;
    path: string;
  }[]>;
}
const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  expanded,
  openMenus = [],
  toggleMenu = () => {},
  mainNavItems,
  subMenuItems = {}
}) => {
  const location = useLocation();
  const [localOpenMenus, setLocalOpenMenus] = useState<string[]>(openMenus);

  // Default navigation items if none are provided
  const defaultMainNavItems = [{
    name: "Dashboard",
    icon: <BarChart3 size={20} />,
    path: "/",
    hasSubMenu: false
  }, {
    name: "Courses",
    icon: <BookOpen size={20} />,
    path: "/courses",
    hasSubMenu: true
  }, {
    name: "Leads",
    icon: <UserPlus size={20} />,
    path: "/leads",
    hasSubMenu: true
  }, {
    name: "Broadcasts",
    icon: <Megaphone size={20} />,
    path: "/broadcasts",
    hasSubMenu: true
  }, {
    name: "Communities",
    icon: <Users size={20} />,
    path: "/communities",
    hasSubMenu: true
  }, {
    name: "Analytics",
    icon: <BrainCircuit size={20} />,
    path: "/analytics",
    hasSubMenu: true
  }];

  // Default submenu items
  const defaultSubMenuItems = {
    "Courses": [{
      name: "Overview",
      icon: <BarChart3 size={16} />,
      path: "/courses/overview"
    }, {
      name: "Create Course",
      icon: <BookOpen size={16} />,
      path: "/courses/create"
    }, {
      name: "Bundles",
      icon: <BookOpen size={16} />,
      path: "/courses/bundles"
    }, {
      name: "Categories",
      icon: <BookOpen size={16} />,
      path: "/courses/categories"
    }],
    "Leads": [{
      name: "All Leads",
      icon: <UserPlus size={16} />,
      path: "/leads/all"
    }, {
      name: "Lead Forms",
      icon: <UserPlus size={16} />,
      path: "/leads/forms"
    }, {
      name: "Sources",
      icon: <UserPlus size={16} />,
      path: "/leads/sources"
    }],
    "Broadcasts": [{
      name: "All Broadcasts",
      icon: <Megaphone size={16} />,
      path: "/broadcasts/all"
    }, {
      name: "Subscribers",
      icon: <Users size={16} />,
      path: "/broadcasts/subscribers"
    }, {
      name: "Analytics",
      icon: <BarChart3 size={16} />,
      path: "/broadcasts/analytics"
    }],
    "Communities": [{
      name: "All Communities",
      icon: <Users size={16} />,
      path: "/communities/all"
    }, {
      name: "Discussions",
      icon: <MessageSquare size={16} />,
      path: "/communities/discussions"
    }, {
      name: "Members",
      icon: <Users size={16} />,
      path: "/communities/members"
    }],
    "Analytics": [{
      name: "Overview",
      icon: <BarChart3 size={16} />,
      path: "/analytics/overview"
    }, {
      name: "Traffic",
      icon: <BarChart3 size={16} />,
      path: "/analytics/traffic"
    }, {
      name: "Conversions",
      icon: <BarChart3 size={16} />,
      path: "/analytics/conversions"
    }]
  };

  // Use provided items or defaults
  const navItems = mainNavItems || defaultMainNavItems;
  const subItems = Object.keys(subMenuItems).length ? subMenuItems : defaultSubMenuItems;
  const isMenuOpen = (menu: string) => localOpenMenus.includes(menu);
  const handleToggleMenu = (menu: string) => {
    if (toggleMenu) {
      toggleMenu(menu);
    } else {
      setLocalOpenMenus(prev => prev.includes(menu) ? prev.filter(item => item !== menu) : [...prev, menu]);
    }
  };
  return <ScrollArea className="flex-1 overflow-hidden hover:overflow-auto">
      <nav className="grid gap-1 px-2 py-0">
        {navItems && navItems.map(item => <div key={item.path} className="flex flex-col">
            <SidebarMenuItem item={item} expanded={expanded} isMenuOpen={isMenuOpen(item.name)} toggleMenu={handleToggleMenu} subMenuItems={subItems} location={location} />
          </div>)}
      </nav>
    </ScrollArea>;
};
export default SidebarNavigation;