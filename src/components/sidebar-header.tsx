import React from "react";
import { SidebarHeader } from "./ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Label } from "./ui/label";

export default function SideHeader() {
  return (
    <SidebarHeader className="">
      <Avatar className="">
        <AvatarImage src="https://github.com/shadcn.png" width={5} height={5} />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Label>Leoniel Nacman</Label>
    </SidebarHeader>
  );
}
