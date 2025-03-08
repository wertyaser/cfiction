"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { Download, SendHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ChatBot() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex items-center justify-center mt-10">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <Card className="max-w-7xl mx-auto h-full">
          <CardContent className="p-10">
            <ChatMessageList>
              {/* user chat */}
              <ChatBubble variant="sent">
                <ChatBubbleAvatar fallback="US" />
                <ChatBubbleMessage>
                  <span className="font-bold">What is AI</span>
                </ChatBubbleMessage>
              </ChatBubble>

              {/* bot reply */}
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage className="flex items-center space-x-2">
                  <span className="">
                    AI (Artificial Intelligence) is the simulation of human
                    intelligence in machines, allowing them to perform tasks
                    that typically require human thinking, such as
                    problem-solving, learning, reasoning, and decision-making.
                    AI systems can be rule-based (traditional programming) or
                    use machine learning, where they learn from data and improve
                    over time. There are different types of AI: Narrow AI (Weak
                    AI) Designed for specific tasks, like chatbots, trading
                    bots, or recommendation systems (e.g., Netflix suggestions).
                  </span>
                  <Download className="h-4 w-4 cursor-pointer" />
                </ChatBubbleMessage>
              </ChatBubble>

              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage isLoading />
              </ChatBubble>

              <Separator className="my-2" />

              <div className="flex justify-center items-center">
                <ChatInput
                  placeholder="Type your message here!"
                  className="flex-grow rounded-r-none min-h-12 resize-none rounded-lg bg-background border-0 p-4 shadow-none focus-visible:ring-0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <Button className="ml-auto gap-1.5 h-full">
                  Send
                  <SendHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </ChatMessageList>
          </CardContent>
        </Card>
      </SidebarProvider>
    </div>
  );
}
