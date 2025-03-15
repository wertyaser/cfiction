"use client";

import React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { SendHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";

export default function AiChatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);

    const userMessage = { role: "user", content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "bot", content: data.message }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { role: "bot", content: "Failed to get a response." },
      ]);
    }

    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center mt-5">
      {/* Card: Responsive width, fixed height */}
      <Card className="h-[90vh] w-full max-w-5xl md:w-[1000px] sm:w-[900px] shadow-lg bg-primary">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Scrollable message list */}
          <div className="flex-1 overflow-y-auto">
            <ChatMessageList>
              {messages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  variant={msg.role === "user" ? "sent" : "received"}
                >
                  <ChatBubbleAvatar
                    fallback={msg.role === "user" ? "Us" : "Ai"}
                  />
                  <ChatBubbleMessage>
                    <span className="text-sm">{msg.content}</span>
                  </ChatBubbleMessage>
                </ChatBubble>
              ))}

              {loading && (
                <ChatBubble variant="received">
                  <ChatBubbleAvatar fallback="AI" />
                  <ChatBubbleMessage isLoading />
                </ChatBubble>
              )}
            </ChatMessageList>
          </div>

          <Separator className="my-2" />

          {/* Chat Input */}
          <div className="flex items-center">
            <ChatInput
              placeholder="Type your message here!"
              className="flex-grow rounded-r-none min-h-12 resize-none bg-background border-0 p-4 shadow-none focus-visible:ring-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Button
              onClick={sendMessage}
              className="ml-auto gap-1.5 h-full"
              disabled={loading}
            >
              Send
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
