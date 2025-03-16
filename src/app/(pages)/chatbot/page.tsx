"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AiChatbot from "@/components/ai-chatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EbookFinder from "@/components/ebook-finder";
import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  return (
    <div className="m-5">
      <SidebarProvider>
        <AppSidebar setMessages={setMessages} />
        <SidebarTrigger />
        <div className="max-h-screen max-w-5xl mx-auto pb-28">
          <Tabs defaultValue="chatbot" className="min-w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
              <TabsTrigger value="ebook">Ebook Finder</TabsTrigger>
            </TabsList>

            <TabsContent value="chatbot">
              <AiChatbot messages={messages} setMessages={setMessages} />
            </TabsContent>

            <TabsContent value="ebook">
              <EbookFinder />
            </TabsContent>
          </Tabs>

          {/* <AiChatbot /> */}
        </div>
      </SidebarProvider>
    </div>
  );
}
