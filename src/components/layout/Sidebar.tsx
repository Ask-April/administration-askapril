
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Courses", icon: <BookOpen size={20} />, path: "/courses" },
    { name: "Students", icon: <Users size={20} />, path: "/students" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/analytics" },
    { name: "Content", icon: <Video size={20} />, path: "/content" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

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
                <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                  <div className="text-white font-semibold">Z</div>
                </div>
                <span className="font-semibold text-lg">Zenler</span>
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
                <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                  <div className="text-white font-semibold">Z</div>
                </div>
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
            {navItems.map((item) => (
              <NavLink
                key={item.path}
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
                  <span className="text-sm font-medium">Admin User</span>
                  <span className="text-xs text-sidebar-foreground/70">admin@zenler.com</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile - closes sidebar when clicked */}
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
