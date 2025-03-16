import { useEffect, useState } from "react";
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

type ChatMessage = { role: "user" | "bot"; content: string };

export function AppSidebar({
  setMessages,
}: {
  setMessages: (messages: ChatMessage[]) => void;
}) {
  const [chatHistory, setChatHistory] = useState<
    { role: string; content: string }[]
  >([]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setChatHistory(JSON.parse(savedMessages) as ChatMessage[]);
    }
  }, []);

  const loadConversation = () => {
    setMessages(chatHistory);
  };

  const clearHistory = () => {
    setChatHistory([]);
    setMessages([]);
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
