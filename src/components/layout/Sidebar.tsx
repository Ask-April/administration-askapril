
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  Users,
  User,
  Package,
  List,
  FileText,
  Ticket,
  Image,
  ChartBar,
  UserPlus,
  Filter,
  Radio,
  MessageSquare,
  PieChart,
  LineChart,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarLogo, SidebarUser, SidebarNavigation } from "./sidebar";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [expanded, setExpanded] = useState(true);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setExpanded(!expanded);
    // Update the layout padding when sidebar state changes
    const mainContent = document.querySelector('div.flex-1.flex.flex-col');
    if (mainContent) {
      if (!expanded) {
        mainContent.classList.remove('pl-[78px]');
        mainContent.classList.add('pl-64');
      } else {
        mainContent.classList.remove('pl-64');
        mainContent.classList.add('pl-[78px]');
      }
    }
  };

  // Set initial padding based on sidebar state
  useEffect(() => {
    const mainContent = document.querySelector('div.flex-1.flex.flex-col');
    if (mainContent) {
      if (expanded) {
        mainContent.classList.remove('pl-[78px]');
        mainContent.classList.add('pl-64');
      } else {
        mainContent.classList.remove('pl-64');
        mainContent.classList.add('pl-[78px]');
      }
    }
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenus(prevOpenMenus => 
      prevOpenMenus.includes(menu) 
        ? prevOpenMenus.filter(item => item !== menu)
        : [...prevOpenMenus, menu]
    );
  };

  // Main navigation items
  const mainNavItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/", hasSubMenu: false },
    { name: "Courses", icon: <BookOpen size={20} />, path: "/courses", hasSubMenu: true },
    { name: "Leads", icon: <UserPlus size={20} />, path: "/leads", hasSubMenu: true },
    { name: "Broadcasts", icon: <Radio size={20} />, path: "/broadcasts", hasSubMenu: true },
    { name: "Communities", icon: <Users size={20} />, path: "/communities", hasSubMenu: true },
    { name: "Analytics", icon: <PieChart size={20} />, path: "/analytics", hasSubMenu: true },
  ];

  // Sub menu items for each main nav item that has a submenu
  const subMenuItems: Record<string, { name: string; icon: JSX.Element; path: string }[]> = {
    "Courses": [
      { name: "Overview", icon: <BookOpen size={16} />, path: "/courses/overview" },
      { name: "Bundles", icon: <Package size={16} />, path: "/courses/bundles" },
      { name: "Categories", icon: <List size={16} />, path: "/courses/categories" },
      { name: "Assignments", icon: <FileText size={16} />, path: "/courses/assignments" },
      { name: "Coupons", icon: <Ticket size={16} />, path: "/courses/coupons" },
      { name: "People", icon: <Users size={16} />, path: "/courses/people" },
      { name: "Media Library", icon: <Image size={16} />, path: "/courses/media" },
      { name: "Reports", icon: <ChartBar size={16} />, path: "/courses/reports" },
    ],
    "Leads": [
      { name: "Leads", icon: <UserPlus size={16} />, path: "/leads/all" },
      { name: "All Funnels", icon: <Filter size={16} />, path: "/leads/funnels" },
    ],
    "Broadcasts": [
      { name: "All Broadcasts", icon: <Radio size={16} />, path: "/broadcasts/all" },
      { name: "Subscribers", icon: <Users size={16} />, path: "/broadcasts/subscribers" },
      { name: "Analytics", icon: <ChartBar size={16} />, path: "/broadcasts/analytics" },
    ],
    "Communities": [
      { name: "All Communities", icon: <Users size={16} />, path: "/communities/all" },
      { name: "Discussions", icon: <MessageSquare size={16} />, path: "/communities/discussions" },
      { name: "Members", icon: <User size={16} />, path: "/communities/members" },
      { name: "Manage", icon: <Settings size={16} />, path: "/communities/manage" },
      { name: "Settings", icon: <Settings size={16} />, path: "/communities/settings" },
    ],
    "Analytics": [
      { name: "Overview", icon: <PieChart size={16} />, path: "/analytics/overview" },
      { name: "Traffic", icon: <LineChart size={16} />, path: "/analytics/traffic" },
      { name: "Conversions", icon: <CheckCircle size={16} />, path: "/analytics/conversions" },
    ],
  };

  return (
    <>
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out fixed inset-y-0 z-40 flex flex-col",
          expanded ? "w-64" : "w-[78px]",
          className
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <SidebarLogo expanded={expanded} />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors duration-200"
          >
            {expanded ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </Button>
        </div>
        
        <SidebarNavigation 
          expanded={expanded}
          openMenus={openMenus}
          toggleMenu={toggleMenu}
          mainNavItems={mainNavItems}
          subMenuItems={subMenuItems}
        />
        
        <div className="mt-auto p-4">
          <SidebarUser expanded={expanded} user={user} />
        </div>
      </aside>
      
      {expanded && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
