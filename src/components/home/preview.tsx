"use client";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Download, SendHorizontal } from "lucide-react";
import { ChatBubble } from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { ChatBubbleMessage } from "../ui/chat/chat-bubble";
import { ChatBubbleAvatar } from "../ui/chat/chat-bubble";
import { ChatInput } from "../ui/chat/chat-input";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewEbookSearch from "./preview-ebook-search";

export default function Preview() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div id="preview" className="max-w-5xl mx-auto pb-28 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center sm:text-left">
        <span>P</span>
        <span className="font-thin">review</span>
      </h2>
      <div className="flex justify-center items-center mt-5">
        <Tabs defaultValue="ebook" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="ebook">Ebook Finder</TabsTrigger>
            <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
          </TabsList>

          {/* EBOOK */}
          <TabsContent value="ebook">
            <PreviewEbookSearch />
          </TabsContent>

          {/* CHATBOT */}
          <TabsContent value="chatbot">
            <Card>
              <CardContent className="p-4 sm:p-6 lg:p-10">
                <ChatMessageList>
                  {/* User chat */}
                  <ChatBubble variant="sent">
                    <ChatBubbleAvatar fallback="US" />
                    <ChatBubbleMessage>
                      <span className="font-bold">What is AI</span>
                    </ChatBubbleMessage>
                  </ChatBubble>

                  {/* Bot reply */}
                  <ChatBubble variant="received">
                    <ChatBubbleAvatar fallback="AI" />
                    <ChatBubbleMessage className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <span>
                        AI (Artificial Intelligence) is the simulation of human intelligence in
                        machines, allowing them to perform tasks that typically require human
                        thinking, such as problem-solving, learning, reasoning, and decision-making.
                        AI systems can be rule-based (traditional programming) or use machine
                        learning, where they learn from data and improve over time. There are
                        different types of AI: Narrow AI (Weak AI) Designed for specific tasks, like
                        chatbots, trading bots, or recommendation systems (e.g., Netflix
                        suggestions).
                      </span>
                      <Download className="h-4 w-4 cursor-pointer" />
                    </ChatBubbleMessage>
                  </ChatBubble>

                  <ChatBubble variant="received">
                    <ChatBubbleAvatar fallback="AI" />
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>

                  <Separator className="my-2" />

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <ChatInput
                      placeholder="Type your message here!"
                      className="flex-grow rounded-lg bg-background border-0 p-4 shadow-none focus-visible:ring-0"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button className="w-full sm:w-auto gap-1.5 h-full">
                      Send
                      <SendHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </ChatMessageList>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
