"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AiChatbot from "@/components/ai-chatbot";
import { Tabs } from "@/components/ui/tabs";

export default function ChatBot() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <AiChatbot />
      </SidebarProvider>
    </div>
  );
}
