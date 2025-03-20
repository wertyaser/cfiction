"use client";

import React from "react";
import { SidebarHeader } from "./ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";

export default function SideHeader() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "Guest";
  const userName = session?.user?.name;
  const userImage = session?.user?.image;

  return (
    <SidebarHeader className="p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={userImage || undefined} />
          <AvatarFallback>{userName?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Separator orientation="vertical" />
        <div className="flex flex-col">
          <Label>{userName}</Label>
          <span className="text-[0.7rem] font-thin">{userEmail}</span>
        </div>
      </div>
    </SidebarHeader>
  );
}
