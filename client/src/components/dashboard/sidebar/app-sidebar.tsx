"use client";

import * as React from "react";
import {
  Bot,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./app-user";

const data = {
  navMain: [
    {
      title: "Admin Dashboard",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Manage Medicines",
      url: "/admin/medicines/all-medicines",
      icon: Bot,
      items: [
        {
          title: "Add Medicine",
          url: "/admin/medicines/create-medicines",
        },
        {
          title: "All Medicines",
          url: "/admin/medicines/all-medicines",
        },
      ],
    },
    {
      title: "Manage Categories",
      url: "/admin/categories",
      icon: Bot,
      items: [
        {
          title: "All Categories",
          url: "/admin/categories",
        },
      ],
    },
    {
      title: "Manage Orders",
      url: "/admin/orders",
      icon: Bot,
      items: [
        {
          title: "All Orders",
          url: "/admin/orders",
        },
      ],
    },
    {
      title: "Manage Users",
      url: "/admin/users",
      icon: Bot,
      items: [
        {
          title: "All Users",
          url: "/admin/users",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={'/'} className="text-2xl font-bold flex items-center gap-2">
              <span>💊</span>
              <h1>Medi<span className="text-cyan-900">Mart</span></h1>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}