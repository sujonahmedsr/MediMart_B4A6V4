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
  SidebarMenuButton,
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
      url: "/admin/categories",
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
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">MediMart</h2>
                </div>
              </Link>
            </SidebarMenuButton>
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