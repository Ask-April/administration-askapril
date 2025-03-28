import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  Users,
  Video,
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
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
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

  const isMenuOpen = (menu: string) => openMenus.includes(menu);

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
          <AnimatePresence initial={false} mode="wait">
            {expanded ? (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <img 
                  src="/lovable-uploads/d69fe8cc-396d-4df5-9d0f-2f686f1cbea9.png" 
                  alt="AskApril.AI Logo" 
                  className="h-8 w-auto" 
                />
              </motion.div>
            ) : (
              <motion.div
                key="icon-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mx-auto"
              >
                <img 
                  src="/lovable-uploads/d69fe8cc-396d-4df5-9d0f-2f686f1cbea9.png" 
                  alt="AskApril.AI Logo" 
                  className="h-8 w-auto" 
                />
              </motion.div>
            )}
          </AnimatePresence>
          
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
        
        <ScrollArea className="flex-1 overflow-hidden hover:overflow-auto">
          <nav className="grid gap-1 px-2 py-4">
            {mainNavItems.map((item) => (
              <div key={item.path} className="flex flex-col">
                {item.hasSubMenu ? (
                  <Collapsible
                    open={expanded && isMenuOpen(item.name)}
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
                              isMenuOpen(item.name) ? "transform rotate-180" : ""
                            )}
                          />
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 pr-2">
                      {expanded && subMenuItems[item.name]?.map((subItem) => (
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
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
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
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
        
        <div className="mt-auto p-4">
          <div className={cn(
            "flex items-center gap-3 rounded-md bg-sidebar-accent/40 p-3",
            !expanded && "justify-center"
          )}>
            <div className="h-9 w-9 rounded-full bg-sidebar-primary flex items-center justify-center flex-shrink-0">
              <User size={20} className="text-sidebar-primary-foreground" />
            </div>
            
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col overflow-hidden"
                >
                  <span className="text-sm font-medium">User</span>
                  <span className="text-xs text-sidebar-foreground/70">{user?.email}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
