"use client";
import { Files, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SideHeader from "./sidebar-header";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import ThemeSwitch from "./ui/theme-switch";
import { Separator } from "./ui/separator";

const items = [
  {
    title: "Files",
    url: "#",
    icon: Files,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <Sidebar>
      <SideHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              <ThemeSwitch />
            </SidebarMenu>
          </SidebarGroupContent>
          <Separator className="my-3" />
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-4 mb-12">
        <Button
          onClick={handleLogout}
          className="w-full flex items-center gap-2"
        >
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </Sidebar>
  );
}
