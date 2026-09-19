"use client";

import {
  CalendarDays,
  ChartColumn,
  CircleDollarSign,
  Compass,
  FileText,
  LucideIcon,
  Map,
  MessageCircleMore,
  MessageSquare,
  UserRound,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type AppPath = `/${string}`;

type NavigationTypes = {
  title: string;
  icon: LucideIcon;
  url: AppPath;
};

const mainNavigation: NavigationTypes[] = [
  {
    title: "Dashboard",
    icon: ChartColumn,
    url: "/dashboard",
  },
  {
    title: "Tours",
    icon: Compass,
    url: "/dashboard/tours",
  },
  {
    title: "Bookings",
    icon: CalendarDays,
    url: "/dashboard/bookings",
  },
  {
    title: "Clients",
    icon: Users,
    url: "/dashboard/clients",
  },
  {
    title: "Guides",
    icon: UserRound,
    url: "/dashboard/guides",
  },
  {
    title: "Reviews",
    icon: MessageCircleMore,
    url: "/dashboard/reviews",
  },
];

const managementNavigation: NavigationTypes[] = [
  {
    title: "Destinations",
    icon: Map,
    url: "/dashboard/destinations",
  },
  {
    title: "Payments",
    icon: CircleDollarSign,
    url: "/dashboard/payments",
  },
  {
    title: "Invoices",
    icon: FileText,
    url: "/dashboard/invoices",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    url: "/dashboard/messages",
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex h-9 items-center ">
          <div className="flex items-center gap-2 ">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Compass className="size-4" />
            </div>

            <div>
              <div>
                <h4 className="text-xl font-semibold tracking-tight">
                  TourCRM
                </h4>
              </div>
              <div>
                <h4 className="text-xs tracking-tighter text-blue-900">
                  Администратор
                </h4>
              </div>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            {mainNavigation.map((option, i) => {
              return (
                <SidebarMenuItem key={option.title}>
                  <SidebarMenuButton
                    render={<a href={option.url} />}
                    isActive={isActive(option.url)}
                    tooltip={option.title}
                  >
                    <option.icon />

                    <span>{option.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Managament</SidebarGroupLabel>
          <SidebarMenu>
            {managementNavigation.map((option, i) => {
              return (
                <SidebarMenuItem key={option.title}>
                  <SidebarMenuButton
                    render={<a href={option.url} />}
                    tooltip={option.title}
                  >
                    <option.icon />
                    <span>{option.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
