import { useState } from "react";
import { Trash, MessageCircle } from "lucide-react";

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

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

interface AppSidebarProps {
  onDeleteChat: (id: string) => void;
  onSelectChat: (id: string) => void;
  selectedChatId: string | null;
}

export function AppSidebar({
  onDeleteChat,
  onSelectChat,
  selectedChatId,
}: AppSidebarProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const loadConversation = () => {
    onSelectChat(chatHistory[0].role);
  };

  const clearHistory = () => {
    setChatHistory([]);
    onDeleteChat(selectedChatId || "");
  };

  return (
    <Sidebar>
      <SideHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.length > 0 ? (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={loadConversation}>
                    <MessageCircle />
                    <span>Continue Chat</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <p className="text-center text-gray-500">
                  No history available
                </p>
              )}

              {chatHistory.length > 0 && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={clearHistory}
                    className="text-red-500"
                  >
                    <Trash />
                    <span>Clear History</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
