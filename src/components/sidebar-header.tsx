import React from "react";
import { SidebarHeader } from "./ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Label } from "./ui/label";

export default function SideHeader() {
  return (
    <SidebarHeader className="flex items-center justify-between p-4">
      <Label>Leoniel Nacman</Label>
      <Avatar className="">
        <AvatarImage src="https://github.com/shadcn.png" width={5} height={5} />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </SidebarHeader>
  );
}
