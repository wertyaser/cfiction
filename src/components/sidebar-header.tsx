import React from "react";
import { SidebarHeader } from "./ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export default function SideHeader() {
  return (
    <SidebarHeader className=" p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            width={5}
            height={5}
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Separator orientation="vertical" />
        <div className="flex flex-col">
          <Label>Leoniel Nacman</Label>
          <span className="text-[0.7rem] font-thin">
            2021-102673@rtu.edu.ph
          </span>
        </div>
      </div>
    </SidebarHeader>
  );
}
