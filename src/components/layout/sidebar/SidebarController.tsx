import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/components/ui/sidebar";
import SidebarLogo from "./SidebarLogo";
import SidebarNavigation from "./SidebarNavigation";
import SidebarUser from "./SidebarUser";
import {
  LayoutDashboard,
  BookOpen,
  UserPlus,
  Radio,
  Users,
  PieChart,
  Package,
  List,
  FileText,
  Ticket,
  Image,
  ChartBar,
  Filter,
  Tag,
  FileInput,
  MapPin,
  Settings,
  User,
  MessageSquare,
  ArrowUpRight,
  CheckCircle
} from "lucide-react";

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

  // Main navigation items
  const mainNavItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
      hasSubMenu: false,
    },
    {
      name: "Courses",
      icon: <BookOpen size={20} />,
      path: "/courses",
      hasSubMenu: true,
    },
    {
      name: "Leads",
      icon: <UserPlus size={20} />,
      path: "/leads",
      hasSubMenu: true,
    },
    {
      name: "Broadcasts",
      icon: <Radio size={20} />,
      path: "/broadcasts",
      hasSubMenu: true,
    },
    {
      name: "Communities",
      icon: <Users size={20} />,
      path: "/communities",
      hasSubMenu: true,
    },
    {
      name: "Analytics",
      icon: <PieChart size={20} />,
      path: "/analytics",
      hasSubMenu: true,
    },
  ];

  // Sub menu items for each main nav item that has a submenu
  const subMenuItems = {
    Courses: [
      {
        name: "Overview",
        icon: <BookOpen size={16} />,
        path: "/courses/overview",
      },
      {
        name: "Bundles",
        icon: <Package size={16} />,
        path: "/courses/bundles",
      },
      {
        name: "Categories",
        icon: <List size={16} />,
        path: "/courses/categories",
      },
      {
        name: "Assignments",
        icon: <FileText size={16} />,
        path: "/courses/assignments",
      },
      { name: "Coupons", icon: <Ticket size={16} />, path: "/courses/coupons" },
      { name: "People", icon: <Users size={16} />, path: "/courses/people" },
      {
        name: "Media Library",
        icon: <Image size={16} />,
        path: "/courses/media",
      },
      {
        name: "Reports",
        icon: <ChartBar size={16} />,
        path: "/courses/reports",
      },
    ],
    Leads: [
      { name: "All Leads", icon: <UserPlus size={16} />, path: "/leads/all" },
      {
        name: "Lead Forms",
        icon: <FileInput size={16} />,
        path: "/leads/forms",
      },
      {
        name: "Lead Sources",
        icon: <MapPin size={16} />,
        path: "/leads/sources",
      },
      { name: "Lead Tags", icon: <Tag size={16} />, path: "/leads/tags" },
    ],
    Broadcasts: [
      {
        name: "All Broadcasts",
        icon: <Radio size={16} />,
        path: "/broadcasts/all",
      },
      {
        name: "Subscribers",
        icon: <Users size={16} />,
        path: "/broadcasts/subscribers",
      },
      {
        name: "Analytics",
        icon: <ChartBar size={16} />,
        path: "/broadcasts/analytics",
      },
      {
        name: "Settings",
        icon: <Settings size={16} />,
        path: "/broadcasts/settings",
      },
    ],
    Communities: [
      {
        name: "All Communities",
        icon: <Users size={16} />,
        path: "/communities/all",
      },
      {
        name: "Discussions",
        icon: <MessageSquare size={16} />,
        path: "/communities/discussions",
      },
      {
        name: "Members",
        icon: <User size={16} />,
        path: "/communities/members",
      },
      {
        name: "Manage",
        icon: <Settings size={16} />,
        path: "/communities/manage",
      },
      {
        name: "Settings",
        icon: <Settings size={16} />,
        path: "/communities/settings",
      },
    ],
    Analytics: [
      {
        name: "Overview",
        icon: <PieChart size={16} />,
        path: "/analytics/overview",
      },
      {
        name: "Traffic",
        icon: <ArrowUpRight size={16} />,
        path: "/analytics/traffic",
      },
      {
        name: "Conversions",
        icon: <CheckCircle size={16} />,
        path: "/analytics/conversions",
      },
    ],
  };

  return (
    <div className="bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out flex flex-col h-full">
      <div className="flex h-16 items-center justify-center px-4">
        <SidebarLogo expanded={expanded} />
      </div>
      <SidebarNavigation
        expanded={expanded}
        openMenu={openMenu}
        toggleMenu={toggleMenu}
        mainNavItems={mainNavItems}
        subMenuItems={subMenuItems}
      />
      <div className="mt-auto p-4">
        <SidebarUser expanded={expanded} user={user} />
      </div>
    </div>
  );
};

export default SidebarController;
