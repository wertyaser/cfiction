"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import ReactMarkdown from "react-markdown";

export default function AiChatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assis",
      content: "Hi! I'm Ctrl, your AI Librarian. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    // Add user message to the chat
    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      //Send the Message to the API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();

      if (data.messages) {
        // Update the chat with the response from the API
        setMessages(data.messages);
      } else {
        //
        const errorMessage = {
          role: "assistant",
          content: "Sorry, I couldn't get a response. Please try again later.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error fetching ai response:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I couldn't get a response. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  // Save messages to localStorage whenever they change

  // const sendMessage = async () => {
  //   if (!inputValue.trim()) return;
  //   setLoading(true);

  //   const userMessage = { role: "user", content: inputValue };
  //   const newMessages = [...messages, userMessage];
  //   setMessages(newMessages);
  //   setInputValue("");

  //   try {
  //     const res = await fetch("/api/chat", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ messages: newMessages }),
  //     });

  //     const data = await res.json();
  //     setMessages([...newMessages, { role: "bot", content: data.message }]);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setMessages([
  //       ...newMessages,
  //       { role: "bot", content: "Failed to get a response." },
  //     ]);
  //   }

  //   setLoading(false);
  // };

  return (
    <div className="flex justify-center items-center mt-5 rounded-lg">
      {/* Card: Responsive width, fixed height */}
      <Card className=" h-[90vh] w-full max-w-5xl md:w-[760px] sm:w-[900px] shadow-xl bg-background">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Scrollable message list */}
          <div className="flex-1 overflow-y-auto mb-2" ref={chatContainerRef}>
            <ChatMessageList>
              {messages.map((msg, index) => (
                <ChatBubble key={index} variant={msg.role === "user" ? "sent" : "received"}>
                  <ChatBubbleAvatar fallback={msg.role === "user" ? "US" : "AI"} />
                  <ChatBubbleMessage>
                    <span className="text-sm">{msg.content}</span>
                  </ChatBubbleMessage>
                </ChatBubble>
              ))}

              {loading && (
                <ChatBubble variant="received" className="mb-2 sm:mb-3">
                  <ChatBubbleAvatar fallback="AI" className="hidden sm:flex" />
                  <ChatBubbleMessage isLoading />
                </ChatBubble>
              )}
            </ChatMessageList>
          </div>

          <Separator className="my-2" />

          {/* Chat Input */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Textarea
              placeholder="Type your message here!"
              className="flex-grow min-h-12 h-12 sm:min-h-14 resize-none bg-background border p-2 sm:p-3 rounded-lg"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <Button onClick={handleSubmit} className="ml-auto gap-1.5 h-full" disabled={loading}>
              <Send size={50} className="sm:size-5 md:size-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
