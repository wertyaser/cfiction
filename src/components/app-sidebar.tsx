"use client";
// import { useState } from "react";
import { Files, Settings, LogOut, Search, User } from "lucide-react";
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
import ThemeSwitch from "./ui/theme-switch";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
// import { url } from "inspector";

const items = [
  {
    title: "Downloads",
    icon: Files,
    content: "Here you can view and manage your downloads.",
  },
  {
    title: "Search History",
    icon: Search,
    content: "Your recent searches will be displayed here.",
  },
  {
    title: "Account Details",
    icon: Settings,
    content: "Manage your account settings here.",
  },
];

const downloadedList = [
  {
    id: 1,
    title: "The Great Gatsby",
    icon: Files,
    url: "https://www.gutenberg.org/ebooks/64317",
  },
  {
    id: 2,
    title: "1984",
    icon: Files,
    url: "https://www.gutenberg.org/ebooks/1342",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    icon: Files,
    url: "https://www.gutenberg.org/ebooks/174",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    icon: Files,
    url: "https://www.gutenberg.org/ebooks/42671",
  },
];

const searchList = [
  {
    id: 1,
    title: "The Great Gatsby",
    icon: Files,
  },
  {
    id: 2,
    title: "1984",
    icon: Files,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    icon: Files,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    icon: Files,
  },
];

const accountDetails = [
  {
    id: 1,
    img: User,
    name: "Leoniel Nacman",
    email: "2021-102673@rtu.edu.ph",
    password: "",
  },
];
export default function AppSidebar() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const dateToday = new Date().toISOString().split("T")[0];

  return (
    <Sidebar>
      <SideHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex items-center justify-between">
              <ThemeSwitch />
            </SidebarMenu>
          </SidebarGroupContent>
          <Separator className="my-3" />
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Sheet key={item.title}>
                  <SheetTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>{item.title}</SheetTitle>
                      <SheetDescription>
                        {item.title === "Downloads" && (
                          <ul className="mt-4 space-y-2">
                            {downloadedList.map((index) => (
                              <a
                                key={index.id}
                                href={index.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-100 transition"
                              >
                                <index.icon className="w-6 h-6 text-blue-500" />
                                <span>{index.title}</span>
                              </a>
                            ))}
                          </ul>
                        )}
                        {item.title === "Search History" && (
                          <ul className="mt-4 space-y-2">
                            {searchList.map((index) => (
                              <li key={index.id} className="p-2 border rounded">
                                <div className="flex items-center justify-between">
                                  <span>{index.title}</span>
                                  <span>{dateToday}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.title === "Account Details" && (
                          <ul className="mt-4 space-y-2">
                            {accountDetails.map((index) => (
                              <div
                                key={index.id}
                                className="flex flex-col items-center justify-center gap-2"
                              >
                                <index.img size={100} />
                                <div className="flex flex-col gap-4 w-full">
                                  <div>
                                    <Label>Name</Label>
                                    <Input type="text" value={index.name} />
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <Input type="email" value={index.email} />
                                  </div>
                                  <div>
                                    <Label>Password</Label>
                                    <Input
                                      type="password"
                                      value={index.password}
                                      placeholder="*********"
                                    />
                                  </div>
                                  <div>
                                    <Label>Confirm Password</Label>
                                    <Input
                                      type="password"
                                      placeholder="*********"
                                    />
                                  </div>
                                  <Button type="submit">Save Changes</Button>
                                </div>
                              </div>
                            ))}
                          </ul>
                        )}
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
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
